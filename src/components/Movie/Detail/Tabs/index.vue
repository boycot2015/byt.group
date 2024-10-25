<script lang="ts" setup>
import { ref, provide } from 'vue';
import Intro from './intro.vue';
import Award from './award.vue';
import Photos from './photos.vue';
import Roles from './roles.vue';

import { ElTabs, ElTabPane } from 'element-plus';
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    }
})
defineOptions({
    name: 'MovieDetailTabs',
    components: {
        Intro, Award, Photos, Roles
    }
})
let state:any = ref({ ...props.data });
provide('tabsData', state);
let activeTab:any = ref('intro');
let tabs:any = ref([
    {
        label: '介绍',
        name: 'intro'
    },
    // {
    //     label: '演职人员',
    //     name: 'roles'
    // },
    // {
    //     label: '奖项',
    //     name: 'award'
    // },
    {
        label: '图集',
        name: 'photos'
    },
]);
</script>
<style>
    /* audio::-webkit-media-controls-panel {
        background-color: #fff;
    } */
</style>
<template>
    <ElTabs class="movie-detail" v-model="activeTab">
        <ElTabPane v-for="item in tabs" :label="item.label" :key="item.name" :name="item.name">
            <component :is="item.name" v-bind="{ data: state }" />
        </ElTabPane>
    </ElTabs>
</template>