<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElTabs, ElTabPane, ElImage, ElText, ElSpace, ElLink, ElTag } from 'element-plus';
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    }
})
let state:any = ref({ ...props.data });
const videoUrl = ref(props.data.videourl?.split(',') || [props.data.videos[0]?.list[0]?.url]);
const videos = ref(props.data.videos || []);
const activePlay = ref(videos.value[0]?.playFrom);
</script>
<style>
    /* audio::-webkit-media-controls-panel {
        background-color: #fff;
    } */
</style>
<template>
    <div class="movie-detail">
        <div class="title text-[18px] leading-[18px] pl-[12px] border-l-[var(--color-primary)]  border-l-solid border-l-4 mb-[20px]">{{state.status || '预告片'}}</div>
        <el-link :href="videoUrl[0]" target="_blank" type="info" :underline="false">
            <ElSpace>
                <ElImage class="h-[60px]" :src="state.videoImg"></ElImage>
                <div class="desc ml-[10px]">
                    <el-text line-clamp="2">{{ state.videoName }}</el-text>
                    <div class="play-num">
                        <i class="i-cardon-play"></i>
                        播放量：<span v-if="state.watched > 10000">{{ (state.watched/10000).toFixed(2)  }} 万</span><span v-else>{{state.watched}}</span>
                    </div>
                </div>
            </ElSpace>
        </el-link>
        <div class="serises w-full mt-2 max-h-[300px] inline-flex flex-wrap overflow-y-auto" v-if="videos && videos.length">
            <el-tabs v-model="activePlay" >
                <el-tab-pane v-for="item in videos" :key="item.playFrom" :name="item.playFrom" :label="item.playFrom">
                    <el-tag class="mr-2 mb-2" v-for="list in item.list" :key="list.name">
                        <el-link :href="list.url" target="_blank" >{{ list.name }}</el-link>
                    </el-tag>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>