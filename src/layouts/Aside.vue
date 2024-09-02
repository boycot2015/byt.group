<script setup>
import { onMounted, ref } from 'vue'
import { ElMenu, ElMenuItem, ElIcon, ElButton, ElImage } from 'element-plus'
import config from '@/config'
const props = defineProps({ routerPath: [String, undefined] })
const handleChange = (key) => {
    window.location.href = key
}
let collapse = ref(false)
onMounted(() => {
    window.addEventListener('resize', () => {
        collapse.value = window.innerWidth < 768
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
    <a href="/" class="logo absolute z-2 flex justify-around h-60px items-center border w-[100%] border-[grey]">
        <!-- <el-image src="/logo.svg" alt="logo" class="w-12 h-12 cursor-pointer" /> -->
         <h3 v-show="!collapse" class="p-0 m-0 w-120px text-color-[var(--el-color-primary)]">{{ config.websiteName }}</h3>
        <ElButton type="primary" @click="() => collapse = !collapse" class="toggle-menu z-2">
            <span class="i-carbon-menu text-xl"></span>
        </ElButton>
    </a>
    <ElMenu
        :hide-timeout="500"
        style="width: 100%;padding-top: 60px;"
        :style="{width: collapse ? '100%': '220px'}"
        mode="vertical"
        :collapse="collapse"
        :default-active="'/' + props.routerPath.split('/').filter(_=>_)[0]"
        @select="handleChange"
    >
        <ElMenuItem index="/music">
            <span class="i-carbon-music text-xl mr-2"></span>
            <span>音乐</span>
        </ElMenuItem>
        <ElMenuItem index="/news">
            <span class="i-carbon-sun text-xl mr-2"></span>
            <span>新闻</span>
        </ElMenuItem>
        <!-- <ElMenuItem index="/blog">
            <ElIcon><i class="i-carbon-blog"></i></ElIcon>
            <span>博客</span>
        </ElMenuItem> -->
    </ElMenu>
</template>