<template>
    <div class="text-left">
        <div class="title text-[18px] leading-[18px] pl-[12px] border-l-[var(--color-primary)]  border-l-solid border-l-4">剧情简介</div>
        <p class="desc text-[14px] mt-[10px] leading-[26px]">{{ data.dra }}</p>
        <div class="title text-[18px] leading-[18px] pl-[12px] border-l-[var(--color-primary)] my-[15px] border-l-solid border-l-4">演职人员</div>
        <div class="dir">
            <div class="main-dir flex items-center">
                <div class="title leading-[32px]">主演：</div>
                <div class="name">{{ data.dir }}</div>
            </div>
            <div class="dirs flex items-center">
                <div class="title leading-[32px]">演员：</div>
                <div class="name">{{ data.star }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { inject } from 'vue';
const data:any = inject('tabsData');
</script>