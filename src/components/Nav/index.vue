<script setup>
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import 'virtual:uno.css';
const handleCommand = (command) => {
    // window.open(command)
    window.location.href = command;
};
</script>
<template>
    <el-dropdown @command="handleCommand" placement="top" trigger="click">
        <span class="el-dropdown-link text-color-white !focus-visible:outline-none rounded-full p-4 text-[30px] m-1 i-carbon-web-services-container">
            <!-- 导航 -->
            <span class="i-carbon-box"></span>
        </span>
        <template #dropdown>
        <el-dropdown-menu>
            <el-dropdown-item command="/"><i class="text-[22px] i-carbon-home"></i>首页</el-dropdown-item>
            <el-dropdown-item command="/music"><i class="text-[22px] i-carbon-music"></i>音乐</el-dropdown-item>
            <el-dropdown-item command="/movie"><i class="text-[22px] i-carbon-video-player"></i>电影</el-dropdown-item>
            <el-dropdown-item command="/wallpaper"><i class="text-[22px] i-carbon-image"></i>壁纸</el-dropdown-item>
            <el-dropdown-item command="/digital"><i class="text-[22px] i-carbon-box"></i>数码</el-dropdown-item>
            <el-dropdown-item command="/micro/ione"><i class="text-[22px] i-carbon-link"></i>导航</el-dropdown-item>
            <el-dropdown-item command="/micro/links"><i class="text-[22px] i-carbon-link"></i>网址</el-dropdown-item>
        </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>