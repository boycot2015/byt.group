<script setup>
import { onMounted, ref } from 'vue'
import { ElMenu, ElMenuItem, ElButton, ElImage } from 'element-plus'
import config from '@/config'
import 'virtual:uno.css';

const props = defineProps({
    routerPath: [String, undefined],
    props: {},
    params: {}
})
let activeMenu = ref(props.props.activePath || '')
// console.log(props.props, props.params, 'params');
const handleChange = (key) => {
    if (activeMenu.value === key) return
    activeMenu.value = key
    window.location.href = key
}
let collapse = ref(false)
onMounted(() => {
    activeMenu.value = activeMenu.value || window.location.pathname
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
    <div>
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
        <el-menu
            style="width: 100%;padding-top: 60px;height: calc(100vh - 60px);background-color: transparent;"
            :style="{width: collapse ? '100%': '120px'}"
            mode="vertical"
            :collapse="collapse"
            :default-active="activeMenu"
            @select="handleChange"
        >
            <el-menu-item v-for="item in config.menus.filter(el => !el.hideInMenu)" :index="item.path" :key="item.path">
                <i class="i-carbon-music hidden"></i>
                <i class="i-carbon-book hidden"></i>
                <i class="i-carbon-video-player hidden"></i>
                <i class="text-xl mr-2" :class="`${item.icon}`"></i>
                <span>{{item.title}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>