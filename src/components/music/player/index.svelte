<script lang="ts">
    import { onMount } from "svelte";
    import { KImage, KPopover, KMsgBox, KMessage, KSlider } from "@ikun-ui/core";
    import { CustomEvent } from '@/utils';
    import { onDestroy } from 'svelte';
    import { KIcon } from '@ikun-ui/icon';
    import { baseApiUrl } from '@/api/index';
    import type { PlayData } from "@/types";
    import config from "@/config";
    import 'virtual:uno.css';
    let visible = false;
    let lyricVisible = true;
    let state:PlayData = {
        playIndex: 0,
        isPlay: true,
        progress: 0,
        flag: false,
        songs: []
    };
    let websiteName = config.websiteName
    let requestTimes = 0;
    let audioRef: HTMLAudioElement | {
        currentTime?: number,
        duration?: number
        pause?: any
        play?: any
    } = {};
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
        getValueData()
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
        if (!state.img_url) return
        visible = !visible
        CustomEvent.emit('toggleCover', {...state, visible })
    }
    const toggleLyric = () => {
        lyricVisible = !lyricVisible
        CustomEvent.emit('toggleLyric', lyricVisible)
    }
    const togglePlay = () => {
        state.isPlay = !state.isPlay
        state.isPlay ? audioRef.play() : audioRef.pause()
        getValueData()
    }
    const getValueData = () => {
        state.progress = audioRef.currentTime
    }
    const onSliderChange = (e:any) => {
        audioRef.pause()
        audioRef.currentTime = e.detail
        state.progress = e.detail || state.progress
        state.isPlay ? audioRef.play() : audioRef.pause()
    }
    const onPlay = async (item?:any, index?:number) => {
		if (!item) {
			KMsgBox({
				title:'提示',
				content:'此操作会替换播放列表, 确定继续?',
				onConfirm: () => {
                    state = { ...state, isPlay: true }
					onPlay(state.songs[0], 0);
				}
			})
			return
		}
		item = item || state.songs[index||0] || {}
		try {
			let playData = {
				...item,
                isPlay: true,
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
                state.isPlay = false
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
        // websiteName = document.title
        CustomEvent.on('playNext', onPlay)
        CustomEvent.on('play', getData)
    })
	onDestroy(() => {});
</script>
<style>
    audio::-webkit-media-controls-panel {
        background-color: transparent !important;
    }
</style>
<div class="px-3 items-center box-shadow flex justify-between md:justify-center overflow-hidden">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if state.lyric || state.img_url}
    <div class="image w-[40px] h-[40px] rounded-md overflow-hidden relative cursor-pointer" on:click={() => toggleCover()}>
        <KImage cls="w-[40px] h-[40px]" src={state.img_url || '/favicon.ico'}></KImage>
        <span class="absolute transition-all {visible?'!rotate-180':''} top-2 left-2 i-carbon-chevron-up text-2xl !text-color-[white]"></span>
    </div>
    {/if}
    {#if state.lyric || state.img_url}
    <div class="play-section leading-60px h-[60px] flex flex-2 justify-around items-center px-2 w-[auto] md:w-[70%] lg:w-[50%]">
        <KIcon icon="i-carbon-play-filled-alt" title="上一曲" cls="cursor-pointer transform-rotate-z-[180deg] !h-[18px] text-color-[#333] md:block" on:click={() => playNext(false)}></KIcon>
        <audio bind:this={audioRef} class="flex-1 hidden !bg-[transparent]" autoplay volume={20} controls src={state.url} on:ended={() => playNext(true)} on:timeupdate={onPlaying}></audio>
        <KIcon icon={`i-carbon-${!state.isPlay?'play-filled':'pause-outline-filled'}`} on:click={() => togglePlay()} title="下一曲" cls="cursor-pointer !h-[24px] text-color-[#333] md:block mx-[10px]" ></KIcon>
        <i class="i-carbon-pause-outline-filled hidden"></i>
        <KIcon icon="i-carbon-play-filled-alt" on:click={() => playNext(true)} title="下一曲" cls="cursor-pointer !h-[18px] text-color-[#333] md:block mr-[10px]" ></KIcon>
        <KSlider cls="!leading-[20px] hidden md:flex" min={0} max={audioRef.duration||100} value={state.progress} step={0.1} on:input={onSliderChange}></KSlider>
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
    {:else}
    <p class="title ml-[--gap] md:w-[700px] text-[14px]">{websiteName} {config.footer.copyright} {config.footer.beian} {config.footer.email}</p>
    {/if}
</div>