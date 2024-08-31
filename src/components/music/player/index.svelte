<script lang="ts">
    import { onMount } from "svelte";
    import { KImage, KProgress } from "@ikun-ui/core";
    import { StorageEmitter } from '@/utils';
    import { onDestroy } from 'svelte';
	let percentage = 10;
	let timer = setInterval(() => {
		if (percentage >= 100) {
			percentage = 10;
		}
		percentage+=0.1;
	}, 50);
    export let state:any = {};
    const getData = () => {
        let data:any = window.localStorage.getItem('playData');
        try {
            data = JSON.parse(data);
        } catch (error) {
            data = {}
        }
        state = { ...state, ...data };
    }
    const formatPercentage = () => {
        return '3:30'
    }
    onMount(() => {
        getData();
    })
	onDestroy(() => clearInterval(timer));
    StorageEmitter.on('play', () => {
        percentage = 0
        getData();
    })    
</script>
<div class="leading-60px w-[calc(100% - 220px)] px-3 items-center bg-white box-shadow flex justify-around h-[60px] overflow-hidden">
    <div class="image w-[40px] h-[40px] bg-[black]">
        <KImage cls="w-[100%] h-[100%]" src={state.img_url}></KImage>
    </div>
    <div class="progress flex-1 px-4">
        <KProgress strokeWidth={8} status={'primary'} percentage={percentage} format={formatPercentage}></KProgress>
        <audio autoplay src={state.url}></audio>
    </div>
    <div class="lyric flex-1">
        <slot name="lyric" data={state}></slot>
    </div>
</div>