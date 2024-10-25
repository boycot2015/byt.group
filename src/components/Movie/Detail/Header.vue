<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElImage, ElButton, ElRate } from 'element-plus';
// import { baseApiUrl } from '@/api/index';
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    }
})
let state:any = ref({ ...props.data, stars: props.data.sc / 2 });
</script>
<style>
    /* audio::-webkit-media-controls-panel {
        background-color: #fff;
    } */
</style>
<template>
    <div class="movie-detail-header flex flex-wrap md:flex-no-wrap justify-center lg:items-center text-center lg:text-left py-[30px]" :style="{background: state.backgroundColor}">
        <div class="img relative">
            <ElImage class="mr-[30px] w-[200px]" :src="state.img"></ElImage>
            <i className="score text-white text-xl absolute  top-[0] text-left bg-[var(--color-primary)] w-[100px] pl-[10px] left-[-6px] z-[10]">{{state.version.slice(1,).toUpperCase()}}</i>
        </div>
        <div class="info mr-[30px]">
            <h1 class="text-[24px] font-bold text-white">{{ state.nm }}</h1>
            <p class="text-[18px] text-white mt-[5px]">{{ state.enm }}</p>
            <p class="text-[14px] text-white mt-[20px]">{{ state.cat }}</p>
            <p class="text-[14px] text-white mt-[15px]">{{ state.src }}/{{ state.dur }}分钟</p>
            <p class="text-[14px] text-white mt-[15px]">{{ state.pubDesc }}</p>
            <div class="btns mt-[50px]">
                <ElButton><i class="i-cardon-star"></i>想看</ElButton>
                <ElButton><i class="i-cardon-rate"></i>评分</ElButton>
                <ElButton class="w-[100%] mt-[10px] !mx-[0px]" type="primary">特惠购票</ElButton>
            </div>
        </div>
        <div class="stars lg:self-end">
            <p class="text-[14px] text-white mt-[20px]">猫眼口碑</p>
            <div class="score text-[32px] flex justify-between items-center text-color-[orange]">
                <p class="mt-[15px] mr-[10px]">{{ state.sc }}</p>
                <div class="star-section">
                    <ElRate :max="5" v-model="state.stars" text-color="#ff9900" allow-half :high-threshold="5" :low-threshold="0"
                    disabled></ElRate>
                    <p class="text-[14px] text-white">{{ state.snum }}人评分</p>
                </div>
            </div>
            <p class="text-[14px] mt[10px] text-white">累计票房</p>
            <p class="text-[26px] mt-[15px] text-white">{{ ((state.watched * state.pn) / 10000000).toFixed(2) }}<span class="ml-[5px] text-[14px] text-white">亿</span></p>
        </div>
    </div>
</template>