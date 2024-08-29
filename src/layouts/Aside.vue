<script setup>
import { defineProps } from 'vue'
import { ElMenu, ElMenuItem,ElIcon } from 'element-plus'
const props = defineProps({ routerPath: [String, undefined] })
const handleChange = (key) => {
    window.location.href = key
}

</script>
<style lang="less" scoped>
a {
    color: inherit;
    text-decoration: none;
}
</style>
<template>
    <ElMenu
        style="width: 100%;"
        mode="vertical"
        :default-active="'/' + props.routerPath.split('/').filter(_=>_)[0]"
        @select="handleChange"
    >
        <ElMenuItem index="/music">
            <ElIcon><i class="i-carbon-music"></i></ElIcon>
            <span>音乐</span>
        </ElMenuItem>
        <ElMenuItem index="/news">
            <ElIcon><i class="i-carbon-sun dark:i-carbon-moon"></i></ElIcon>
            <span>新闻</span>
        </ElMenuItem>
        <ElMenuItem index="/blog">
            <ElIcon><i class="i-carbon-blog"></i></ElIcon>
            <span>博客</span>
        </ElMenuItem>
    </ElMenu>
</template>