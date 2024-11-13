<script setup>
import { onMounted, ref } from 'vue'
import { ElMenu, ElMenuItem, ElButton, ElImage } from 'element-plus'
import config from '@/config'
import 'virtual:uno.css';
let activeMenu = ref('/')
const props = defineProps({ routerPath: [String, undefined] })
const handleChange = (key) => {
    if (activeMenu.value === key) return
    activeMenu.value = key
    window.location.href = key
}
let collapse = ref(true)
onMounted(() => {
    activeMenu.value = window.location.pathname
    collapse.value = window.innerWidth < 1200
    window.addEventListener('resize', () => {
        collapse.value = window.innerWidth < 1200
    })
})

</script>
<style lang="less" scoped>
a {
    color: inherit;
    text-decoration: none;
}
</style>
<template>
    <div class="logo absolute z-2 flex justify-center h-60px items-center w-[100%] border-b-1 border-[#eee] border-b-solid">
        <!-- <el-image src="/logo.svg" alt="logo" class="w-12 h-12 cursor-pointer" /> -->
        <a href="/" class="flex justify-center" :title="config.websiteName">
            <i class="i-carbon-web-services-container text-[30px] text-color-[var(--color-primary)]"></i>
             <!-- <h3 class="p-0 m-0 w-120px text-color-[var(--el-color-primary)]">{{ config.websiteName }}</h3> -->
         </a>
        <!-- <ElButton v-if="collapse" type="primary" @click="() => collapse = !collapse" class="toggle-menu z-2">
            <span class="i-carbon-menu text-xl"></span>
        </ElButton> -->
    </div>
    <ElMenu
        style="width: 100%;padding-top: 60px;"
        :style="{width: collapse ? '100%': '100px'}"
        mode="vertical"
        :collapse="collapse"
        :router="false"
        :default-active="'/' + (props.routerPath.split('/').filter(_=>_)[0] || 'music')"
        @select="handleChange"
    >
        <ElMenuItem index="/music">
            <i class="i-carbon-music text-xl mr-2 !visible"></i>
            <span>音乐</span>
        </ElMenuItem>
        <ElMenuItem index="/news">
            <i class="i-carbon-book text-xl mr-2"></i>
            <span>新闻</span>
        </ElMenuItem>
        <ElMenuItem index="/movie">
            <i class="i-carbon-video-player text-xl mr-2"></i>
            <span>电影</span>
        </ElMenuItem>
        <ElMenuItem index="/wallpaper">
            <i class="i-carbon-image text-xl mr-2"></i>
            <span>壁纸</span>
        </ElMenuItem>
        <ElMenuItem index="/digital">
            <i class="i-carbon-box text-xl mr-2"></i>
            <span>数码</span>
        </ElMenuItem>
    </ElMenu>
</template>