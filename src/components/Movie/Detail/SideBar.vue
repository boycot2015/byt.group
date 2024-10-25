<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElImage, ElText, ElSpace, ElLink } from 'element-plus';
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    }
})
let state:any = ref({ ...props.data });
</script>
<style>
    /* audio::-webkit-media-controls-panel {
        background-color: #fff;
    } */
</style>
<template>
    <div class="movie-detail">
        <div class="title text-[18px] leading-[18px] pl-[12px] border-l-[var(--color-primary)]  border-l-solid border-l-4 mb-[20px]">预告片</div>
        <el-link :href="state.videourl" target="_blank" type="info" :underline="false">
            <ElSpace>
                <ElImage class="w-[100px]" :src="state.videoImg"></ElImage>
                <div class="desc ml-[10px]">
                    <el-text line-clamp="2">{{ state.videoName }}</el-text>
                    <div class="play-num">
                        <i class="i-cardon-play"></i>
                        播放量：{{ (state.watched/10000).toFixed(2)  }} 万
                    </div>
                </div>
            </ElSpace>
        </el-link>
    </div>
</template>