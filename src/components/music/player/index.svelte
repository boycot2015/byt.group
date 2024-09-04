<script lang="ts">
    import { onMount } from "svelte";
    import { KImage } from "@ikun-ui/core";
    import { CustomEvent } from '@/utils';
    import { onDestroy } from 'svelte';
    import { KIcon } from '@ikun-ui/icon';
    $:state = {} as any;

    let audioRef: HTMLAudioElement | {currentTime?: number} = {};
    const getData = (playData?:any, isNext?:boolean) => {
        try {
            state = JSON.parse(window.localStorage.getItem('playData') as string) || playData || {};
        } catch (error) {
            state = {...playData || {}}
        }
		if (isNext) {
            CustomEvent.emit('playNext', playData, state.playIndex)
        }
    }
    const onPlaying = (e:any) => {
        CustomEvent.emit('playing', audioRef)
    }
    const playNext = (isNext:boolean, data?:any) => {
		if (isNext) {
            state = {
                ...state,
                playIndex: isNext ? ++state.playIndex : --state.playIndex
            }
		}
        if (!state.songs[state.playIndex]) {
            state.playIndex = 0
        }
        
        getData(data || state.songs[state.playIndex] || {}, true)
    }
    onMount(() => {
        getData();
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
    <div class="image w-[40px] h-[40px] bg-[black]">
        <KImage cls="w-[100%] h-[100%]" src={state.img_url}></KImage>
    </div>
    <!-- <div class="progress flex-1 px-4">
        <KProgress strokeWidth={8} status={'primary'} percentage={percentage} format={formatPercentage}></KProgress>
    </div> -->
    <div class="play-section flex flex-2 justify-around items-center px-4 w-[80%] md:w-[70%] lg:w-[50%]">
        <KIcon icon="i-carbon-play-filled-alt" title="上一曲" cls="cursor-pointer transform-rotate-z-[180deg]" size={20} on:click={() => playNext(false)}></KIcon>
        <audio bind:this={audioRef} class="flex-1" autoplay volume={20} controls src={state.url} on:ended={() => playNext(true)} on:timeupdate={onPlaying}></audio>
        <KIcon icon="i-carbon-play-filled-alt" on:click={() => playNext(true)} title="下一曲" cls="cursor-pointer" size={20} ></KIcon>
    </div>
    <!-- <div class="lyric hidden lg:flex flex-1">
        <slot name="lyric" data={state}></slot>
    </div> -->
</div>