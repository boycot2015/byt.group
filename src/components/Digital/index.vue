<script setup>
import { baseApiUrl } from '@/api/index';
import Banner from './banner.vue';
import Category from './cate.vue';
import SearchList from './searchList.vue';
import { ref, nextTick, onMounted } from 'vue'
import GoodsItem from './goodsItem.vue';
import { ElRow, ElCol, ElCard,
    ElImage, ElSkeleton,
    ElSkeletonItem, ElLink, ElLoading } from 'element-plus';
defineOptions({
    name: 'Digital',
})
const isMobile = ref(false)
onMounted(() => {
    isMobile.value = window.innerWidth < 768
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768
    })
})
const vLoading = ElLoading.directive
const loading = ref(true)
const keywordRef = ref('')
const pageLoading = ref(true)
const data = ref({})
const cates = ref([])
const getSearchData = async (type, keyword) => {
    loading.value = true
    let json = await fetch(`${baseApiUrl}/digital/search?type=${type}&keyword=${keyword}`)
    let res = await json.json()
    console.log(res, 'getSearchData');
    data.value = res.data || {}
    pageLoading.value = false
    nextTick(() => {
        loading.value = pageLoading.value || false
    })
 }
const getData = async (type = 'xiaomi') => {
    loading.value = true
    data.value = {}
    const getParams = new URLSearchParams(window.location.search.split('?')[1])
    let cateJson = await fetch(baseApiUrl + '/digital/cate')
    let cate = await cateJson.json()
    cates.value = cate.data
    if (getParams.get('keyword')) {
        keywordRef.value = getParams.get('keyword')
        getSearchData(type, getParams.get('keyword'))
        return
    }
    let json = await fetch(baseApiUrl + '/digital/list?type=' + type)
    let cateDefaultJson = await fetch(baseApiUrl + '/digital/cate?type=' + type)
    let cateDefault = await cateDefaultJson.json()
    let res = await json.json()
    data.value = res.data || {}
    cates.value = cate.data.map(el => {
        if (el.type === type) {
            el.children = cateDefault.data
        }
        return el
    })
    data.value.type = type
    pageLoading.value = false
    nextTick(() => {
        loading.value = pageLoading.value || false
    })
}
getData()
</script>
<template>
    <el-skeleton style="width: 100%;text-align: left;" :loading="pageLoading" animated>
        <template #template>
            <div class="mb-[10px]">
                <el-skeleton-item v-for="item in 5" :key="item" variant="button" style="width: 10%;margin-right: 16px;height: 25px;" />
            </div>
            <div class="mb-[10px]">
                <el-skeleton-item v-for="item in 8" :key="item" variant="button" style="width: 8%;margin-right: 16px;height: 25px;" />
            </div>
            <el-skeleton-item variant="image" class="w-[100%] !h-[120px] !md:h-[420px] mb-[var(--gap)]" />
            <div class="w-[100%]" v-for="item in 8" :key="item">
                <div class="flex justify-between mb-[var(--gap)]">
                    <el-skeleton-item variant="h3" style="width: 20%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                </div>
                <div class="flex flex-col md:flex-row md:justify-between">
                    <el-skeleton-item class="!hidden !md:block" variant="image" style="width: 200px; height: 420px;margin-right: 20px;" />
                    <el-row :gutter="15">
                        <el-col
                            v-for="item in 6"
                            :key="item"
                            :span="12"
                            :xs="{span:12}"
                            :sm="{span:8}"
                            :md="{span:6}"
                            :lg="{span:4}"
                            :xl="{span:4}"
                            :xxl="{span:3}"
                            class="mb-[var(--gap)]"
                        >
                            <el-skeleton-item variant="image" style="width: 100%; width: 170px; height: 170px;margin-bottom: 20px;" />
                            <div class="flex felx-col">
                                <el-skeleton-item variant="h3" style="width: 50%" />
                                <el-skeleton-item variant="text" style="width: 30%" />
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </template>
        <template #default>
            <Category :disabled="pageLoading || loading" :cates="cates" :keyword="keywordRef" @change="getData" />
            <div v-loading="loading" element-loading-background="rgba(255,255, 255, 0.5)" class="min-h-[100%] md:min-h-[84%]">
                <template v-if="keywordRef">
                    <SearchList :data="data" />
                </template>
                <template v-else>
                    <Banner v-if="data.banner && data.banner.length" :banner="data.banner || []" :key="Math.random()" class="mb-[var(--gap)]" />
                    <div class="list" v-for="item in data.indexData || []" :key="item.name">
                        <div class="header flex justify-between mb-[var(--gap)]" v-if="item.name">
                            <div class="title min-w-[100px] text-left">{{ item.name }}</div>
                            <div class="links flex overflow-x-scroll md:overflow-hidden">
                                <el-link class="link-item first:ml-0 mx-5 last:mr-0" style="flex: 0 0 auto" v-for="link in item.links" :key="link.name" :href="link.url" target="_brank">{{ link.name }}</el-link>
                            </div>
                            <el-link class="more" v-if="item.url" :href="item.url" target="_brank">{{ item.more_text || item.list && item.list.length ? '查看更多':'' }}</el-link>
                        </div>
                        <div class="body flex flex-col md:flex-row" :class="{'flex-wrap': item.view_type === 'cells_auto_fill'}">
                            <template v-if="item.bg_imgs && item.bg_imgs.length">
                                <a :href="item.bg_imgs[0].url" target="_blank" rel="noopener noreferrer" v-if="item.view_type && item.view_type === 'cells_auto_fill'" class="w-[100%]">
                                    <el-image :src="item.bg_imgs[0].img" :style="{height: data.type === 'honor'&&isMobile?'110px':data.type === 'xiaomi'&&isMobile?'58px':item.bg_imgs[0].height ? item.bg_imgs[0].height + 'px' : ''}" alt="" :fit="data.type === 'honor'&&isMobile?'contain':item.bg_imgs[0].fit||'cover'" class="mb-[var(--gap)] h-[68px] md:h-[200px] w-[100%] rounded-md" />
                                </a>
                                <div class="imgs w-[100%] md:w-[auto] md:mr-5 hidden md:block" v-else-if="(item.view_type && item.view_type === 'list_eight_product') || (item.bg_imgs && item.bg_imgs.length === 1)">
                                    <el-image :src="item.bg_imgs[0]?.img" alt="" fit="cover" class="mb-[var(--gap)] h-[585px] rounded-md fit-cover" ></el-image>
                                </div>
                                <div class="flex flex-row mx-[-10px] md:ml-0 md:mr-[var(--gap)] justify-between md:justify-start md:flex-col" v-else-if="item.bg_imgs">
                                    <a :href="item.url" v-for="item in item.bg_imgs" :key="item.img" target="_blank" rel="noopener noreferrer" class="px-[10px] md:px-0 w-[100%] mb-[var(--gap)]">
                                        <el-image :src="item.img" alt="" fit="cover" class="w-[100%] h-[285px] rounded-md" ></el-image>
                                    </a>
                                </div>
                            </template>
                            <el-row :gutter="15" class="flex-1 mt-[0px]" v-if="item.list && item.list.length">
                                <el-col
                                v-for="goods in item.list.slice(0, 12) || []" :key="goods.id"
                                :span="12"
                                :xs="{span:12}"
                                :sm="{span:8}"
                                :md="{span:6}"
                                :lg="{span:4}"
                                :xl="{span:4}"
                                class="mb-[var(--gap)]"
                                >
                                <el-card class="!rounded-md overflow-hidden shadow-lg !hover:translate-y-[-3px] transform-gpu" body-class="!px-[10px] !pb-[15px]">
                                    <GoodsItem :goods="goods"/>
                                </el-card>
                            </el-col>
                            </el-row>
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </el-skeleton>
</template>