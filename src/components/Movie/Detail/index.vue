<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { baseApiUrl } from '@/api/index';
import Header from './Header.vue';
import Side from './SideBar.vue';
import Tabs from './Tabs/index.vue';
import { ElSkeleton, ElSkeletonItem,
    ElBreadcrumb, ElBreadcrumbItem,
    ElRow, ElCol, ElLink
} from 'element-plus';
let state:any = ref({});
let loading = ref(true);
defineOptions({
    name: 'MovieDetail'
})
const getData = async () => {
    const getParams = new URLSearchParams(window.location.search.split('?')[1]);
    try {
        let res = await fetch(`${baseApiUrl}/movie/detail?id=${getParams.get('id') || 1}&type=${getParams.get('type') || 1}`);
        let data = await res.json();
        state = data.data;
    } catch (error) {
        console.log(error, 'error');
    } finally {
        state = {...state || {} }
    }
    loading.value = false;    
    return state
}
onMounted(() => {
    getData()
});
</script>
<style>
    /* audio::-webkit-media-controls-panel {
        background-color: #fff;
    } */
</style>
<template>
    <div class="movie-detail mt-[-30px] mx-[-16px] md:mx-[auto] text-left">
        <ElSkeleton :loading="loading" animated>
            <template #template>
                <el-skeleton-item variant="image" style="width: 240px; height: 240px;margin: 20px auto;" />
                <div style="padding: 14px">
                <el-skeleton-item variant="h3" style="width: 50%" />
                <div
                    style="
                    display: flex;
                    align-items: center;
                    justify-items: space-between;
                    margin-top: 16px;
                    height: 16px;
                    "
                >
                    <el-skeleton-item variant="text" style="margin-right: 16px" />
                    <el-skeleton-item variant="text" style="width: 30%" />
                </div>
                </div>
            </template>
            <template #default>
                <div class="hidden md:flex mt-[20px]">
                    
                    <ElBreadcrumb separator=">" class="my-[10px]">
                        <ElBreadcrumbItem to="/movie" replace><ElLink href="/movie" class="mr-[10]" type="primary">影视</ElLink></ElBreadcrumbItem>
                        <ElBreadcrumbItem >{{state.typeDesc}}</ElBreadcrumbItem>
                        <ElBreadcrumbItem>{{state.nm}}</ElBreadcrumbItem>
                    </ElBreadcrumb>
                </div>
                <Header :data="state" class="mt-[10px]"></Header>
                <div class="content">
                    <ElRow class="bg-white w-[100%] p-[10px] py-[20px] !m-0" :gutter="20">
                        <ElCol :span="24" :lg="{ span: 16 }">
                            <Tabs :data="state" class="bg-white"></Tabs>
                        </ElCol>
                        <ElCol :span="24" :lg="{ span: 8 }" class="mt-[15px] lg:mt-0">
                            <Side :data="state" class="bg-white"></Side>
                        </ElCol>
                    </ElRow>
                </div>
            </template>
        </ElSkeleton>
    </div>
</template>