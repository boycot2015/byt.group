<script setup>
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import config from '@/config';
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
            <el-dropdown-item :command="item.path" v-for="item in config.menus" :key="item.path"><i class="text-[22px]" :class="'i-carbon-' + item.icon"></i>{{item.title}}</el-dropdown-item>
        </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>