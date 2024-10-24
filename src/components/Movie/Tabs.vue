<script setup lang="ts">
import { ref } from 'vue';
import { ElTabs, ElTabPane } from 'element-plus';
let cates = ref({
    hot: '热映',
    comming: '即将上映',
    expceted: '最期待',
    class: '经典'
});
let active = ref('hot');
</script>
<template>
    <ElTabs v-model="active">
        <ElTabPane v-for="(cate, key) in cates" :key="key" :name="key" :label="cate"></ElTabPane>
</ElTabs>
</template>