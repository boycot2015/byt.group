<script setup>
import { onMounted, ref } from 'vue'
import { ElMenu, ElMenuItem, ElButton, ElImage } from 'element-plus'
import config from '@/config'
import 'virtual:uno.css';
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
console.log(props.routerPath.split('/').filter(_=>_)[0], '1232');

</script>
<style lang="less" scoped>
a {
    color: inherit;
    text-decoration: none;
}
</style>
<template>
    <div class="logo absolute z-2 flex justify-around h-60px items-center border w-[100%] border-[grey]">
        <!-- <el-image src="/logo.svg" alt="logo" class="w-12 h-12 cursor-pointer" /> -->
         <a href="/" v-show="!collapse" >
             <h3 class="p-0 m-0 w-120px text-color-[var(--el-color-primary)]">{{ config.websiteName }}</h3>
         </a>
        <ElButton type="primary" @click="() => collapse = !collapse" class="toggle-menu z-2">
            <span class="i-carbon-menu text-xl"></span>
        </ElButton>
    </div>
    <ElMenu
        style="width: 100%;padding-top: 60px;"
        :style="{width: collapse ? '100%': '220px'}"
        mode="vertical"
        :collapse="collapse"
        :default-active="'/' + (props.routerPath.split('/').filter(_=>_)[0] || 'music')"
        @select="handleChange"
    >
        <ElMenuItem index="/music">
            <i class="i-carbon-music text-xl mr-2 !visible"></i>
            <span>音乐</span>
        </ElMenuItem>
        <ElMenuItem index="/news">
            <i class="i-carbon-sun text-xl mr-2"></i>
            <span>新闻</span>
        </ElMenuItem>
        <!-- <ElMenuItem index="/blog">
            <ElIcon><i class="i-carbon-blog"></i></ElIcon>
            <span>博客</span>
        </ElMenuItem> -->
    </ElMenu>
</template>