<script lang="ts">
    import { onMount } from "svelte";
    import { KImage } from "@ikun-ui/core";
    import { CustomEvent } from '@/utils';
    import { onDestroy } from 'svelte';
    import { KIcon } from '@ikun-ui/icon';
    $:state = { visible: false, lyricVisible: true } as any;

    let audioRef: HTMLAudioElement | {currentTime?: number} = {};
    const getData = (playData?:any, isNext?:boolean) => {
        try {
            state = JSON.parse(window.localStorage.getItem('playData') as string) || playData || {};
        } catch (error) {
            console.log(error, 'error');
        } finally {
            state = {...state, ...playData || {}}
        }
		if (isNext) {
            CustomEvent.emit('playNext', state, state.playIndex)
        }
    }
    const onPlaying = (e:any) => {
        CustomEvent.emit('playing', audioRef)
    }
    const playNext = (isNext:boolean, data?:any) => {
        isNext ? state.playIndex += 1 : state.playIndex -= 1
        if (!state.songs[state.playIndex]) {
            state.playIndex = 0
        }
        window.localStorage.setItem('playData', JSON.stringify({...state, ...(data || state.songs[state.playIndex] || {})}))
        getData(data || state.songs[state.playIndex] || {}, true)
    }
    const toggleCover = () => {
        state.visible = !state.visible
        CustomEvent.emit('toggleCover', {...state, visible: state.visible })
    }
    const toggleLyric = () => {
        state.lyricVisible = !state.lyricVisible
        CustomEvent.emit('toggleLyric', state.lyricVisible)
    }
    onMount(() => {
        getData();
        CustomEvent.on('play', getData)
    })
    CustomEvent.on('toggleCover', ({ visible }:any) => {
        state.visible = visible
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
    <div class="image w-[40px] h-[40px] bg-[black] realtive cursor-pointer" on:click={toggleCover}>
        <KImage cls="w-[100%] h-[100%]" src={state.img_url}></KImage>
        <KIcon class="h-full w-full absolute z-10" icon="i-carbon-arrow-up" size={32}></KIcon>
    </div>
    <!-- <div class="progress flex-1 px-4">
        <KProgress strokeWidth={8} status={'primary'} percentage={percentage} format={formatPercentage}></KProgress>
    </div> -->
    <div class="play-section flex flex-2 justify-around items-center px-4 w-[80%] md:w-[70%] lg:w-[50%]">
        <KIcon icon="i-carbon-play-filled-alt" title="上一曲" cls="cursor-pointer transform-rotate-z-[180deg]" size={20} on:click={() => playNext(false)}></KIcon>
        <KIcon icon="i-carbon-play-filled-alt" on:click={() => playNext(true)} title="下一曲" cls="cursor-pointer" size={20} ></KIcon>
        <audio bind:this={audioRef} class="flex-1" autoplay volume={20} controls src={state.url} on:ended={() => playNext(true)} on:timeupdate={onPlaying}></audio>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span class="lyric-text cursor-pointer {state.lyricVisible?'text-color-[var(--el-color-primary)]':''}" on:click={() => toggleLyric()}>词</span>
    </div>
    <slot name="lyric" data={state}></slot>
    <!-- <div class="lyric hidden lg:flex flex-1">
        <slot name="lyric" data={state}></slot>
    </div> -->
</div>