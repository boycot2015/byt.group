<template>
    <div class="text-left">
        <div class="title text-[18px] leading-[18px] pl-[12px] border-l-[var(--color-primary)]  border-l-solid border-l-4">剧情简介</div>
        <p class="desc text-[14px] mt-[10px] leading-[26px]">{{ data.dra }}</p>
        <div class="title text-[18px] leading-[18px] pl-[12px] border-l-[var(--color-primary)] my-[15px] border-l-solid border-l-4">演职人员</div>
        <div class="dir">
            <el-row class="main-dir w-full flex items-center">
                <el-col :span="4" :md="2" class="title basis-[140px] leading-[32px]">导演：</el-col>
                <el-col :span="20" :md="22" class="name">{{ data.dir || '--' }}</el-col>
            </el-row>
            <el-row class="dirs w-full flex">
                <el-col :span="4" :md="2" class="title basis-[140px]">演员：</el-col>
                <el-col :span="20" :md="22" class="name">{{ data.star || '--' }}</el-col>
            </el-row>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { inject } from 'vue';
import { ElRow, ElCol } from 'element-plus';
const data:any = inject('tabsData');
</script>