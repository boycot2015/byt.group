<script lang="ts">
    import { onMount } from "svelte";
    import { KImage, KPopover, KMsgBox, KMessage } from "@ikun-ui/core";
    import { CustomEvent } from '@/utils';
    import { onDestroy } from 'svelte';
    import { KIcon } from '@ikun-ui/icon';
    import { baseApiUrl } from '@/api/index';
    import type { PlayData } from "@/types";
    let visible = false;
    let lyricVisible = true;
    let state:PlayData = {
        playIndex: 0,
        songs: []
    };
    let requestTimes = 0;
    let audioRef: HTMLAudioElement | {currentTime?: number} = {};
    const getData = (playData?:PlayData, isNext?:boolean) => {
        try {
            state = JSON.parse(window.localStorage.getItem('playData') as string) || playData || {};
        } catch (error) {
            console.log(error, 'error');
        } finally {
            state = {...state, ...playData || {} }
        }
		if (isNext) {
            CustomEvent.emit('playNext', state, state.playIndex)
        }
        return state
    }
    const onPlaying = (e:Event) => {
        CustomEvent.emit('playing', audioRef)
    }
    const playNext = (isNext:boolean, data?:PlayData) => {
        isNext ? state.playIndex += 1 : state.playIndex -= 1
        if (!state.songs[state.playIndex]) {
            state.playIndex = 0
        }
        window.localStorage.setItem('playData', JSON.stringify({...state, ...(data || state.songs[state.playIndex] || {})}))
        getData({...state, ...(data || state.songs[state.playIndex] || {})}, true)
    }
    const toggleCover = () => {
        visible = !visible
        CustomEvent.emit('toggleCover', {...state, visible })
    }
    const toggleLyric = () => {
        lyricVisible = !lyricVisible
        CustomEvent.emit('toggleLyric', lyricVisible)
    }
    const onPlay = async (item?:any, index?:number) => {
		if (!item) {
			KMsgBox({
				title:'提示',
				content:'此操作会替换播放列表, 确定继续?',
				onConfirm: () => {
					onPlay(state.songs[0], 0);
				}
			})
			return
		}
		item = item || state.songs[index||0] || {}
		try {
			let playData = {
				...item,
				type: item.type,
				songs: (state.songs.length ? state.songs : item.songs) || [],
				playIndex: index || 0
			}
			setTimeout(() => {
				requestTimes = 0;
			}, 200);
			if (!item.id || requestTimes) return
			requestTimes++
			let lyricData = await fetch(`${baseApiUrl}/music/lyric?id=${item.id}&type=${playData.source||playData.type}`);
			let urlDta = await fetch(`${baseApiUrl}/music/url?id=${item.id}&type=${playData.source||playData.type}`);
			let lyricRes = await lyricData.json();
			let urlRes = await urlDta.json();
			playData = { ...playData, ...lyricRes.data, type: playData.source||playData.type, url: urlRes.data?.url || urlRes.data };
			if(!urlRes.data && !urlRes.data?.url) {
				KMessage.info({
                    content: `<span style="font-size: 14px;font-weight:normal;color:var(--el-color-primary)">获取歌曲失败，无法播放此歌曲~</span>`,
                    close: false
                });
			}
			window.localStorage.setItem('playData', JSON.stringify(playData))
			CustomEvent.emit('play', playData)
		} catch (error) {
			console.log(error, item, index, 'isNext');
		}
    }
    onMount(() => {
        getData();
        CustomEvent.on('toggleCover', ({ visible: val }:any) => {
            visible = val
        })
        CustomEvent.on('playNext', onPlay)
        CustomEvent.on('play', getData)
    })
	onDestroy(() => {});
</script>
<style>
    audio::-webkit-media-controls-panel {
        background-color: #fff;
    }
</style>
<div class="leading-60px w-[calc(100% - 220px)] px-3 items-center bg-white box-shadow flex justify-center h-[60px] overflow-hidden">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="image w-[40px] h-[40px] rounded-md overflow-hidden realtive cursor-pointer" on:click={() => toggleCover()}>
        <KImage cls="w-[40px] h-[40px]" src={state.img_url}></KImage>
        <KIcon class="h-full w-full absolute z-10" icon="i-carbon-arrow-up" size={32}></KIcon>
    </div>
    <div class="play-section flex flex-2 justify-around items-center px-2 w-[auto] md:w-[70%] lg:w-[50%]">
        <KIcon icon="i-carbon-play-filled-alt" title="上一曲" cls="cursor-pointer transform-rotate-z-[180deg] !h-[18px] text-color-[#333] md:block" on:click={() => playNext(false)}></KIcon>
        <audio bind:this={audioRef} class="flex-1 hidden md:block" autoplay volume={20} controls src={state.url} on:ended={() => playNext(true)} on:timeupdate={onPlaying}></audio>
        <KIcon icon="i-carbon-play-filled-alt" on:click={() => playNext(true)} title="下一曲" cls="cursor-pointer !h-[18px] text-color-[#333] md:block mr-[10px]" ></KIcon>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span class="lyric-text cursor-pointer hidden md:block {lyricVisible?'text-color-[var(--el-color-primary)]':''}" on:click={() => toggleLyric()}>词</span>
    </div>
    <slot name="lyric" data={state}></slot>
    <KPopover placement="top" cls="!md:left-[50%] !md:ml-[-450px] w-[100vw] !bottom-[60px] md:w-[auto]" trigger="click">
        <KIcon slot="triggerEl" icon="i-carbon-list" title="播放列表" cls="cursor-pointer ml-4" size={16}></KIcon>
        <div slot="contentEl" class="flex flex-col h-[520px]">
            <slot name="playlist"></slot>
        </div>
    </KPopover>
    <slot name="cover" data={state}></slot>
</div>