<template>
    <ElRow :gutter="20">
        <ElCol class="mb-[20px] overflow-hidden max-h-[200px]" v-for="(item, index) in data.photos" :key="item" :span="8" :md="{ span: 6 }" :lg="{ span: 4 }" :xl="{ span: 3 }">
            <ElImage fit="cover" :preview-src-list="data.photos" :initial-index="index" class="h-[100%]" :src="item"></ElImage>
        </ElCol>
    </ElRow>
</template>
<script lang="ts" setup>
import { inject } from 'vue';
import { ElRow, ElCol, ElImage } from 'element-plus';
const data:any = inject('tabsData');
</script>