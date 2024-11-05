<script setup>
import { baseApiUrl } from '@/api/index';
import Banner from './banner.vue';
import Category from './cate.vue';
import { ref } from 'vue'
import GoodsItem from './goodsItem.vue';
import { ElRow, ElCol, ElCard, ElImage, ElSkeleton, ElSkeletonItem, ElLink, ElLoading } from 'element-plus';
defineOptions({
    name: 'Digital',
})
const vLoading = ElLoading.directive
const loading = ref(true)
const pageLoading = ref(true)
const data = ref({})
const cates = ref([])
const getData = async (type = 'xiaomi') => {
    loading.value = true
    let json = await fetch(baseApiUrl + '/digital/list?type=' + type)
    let cateJson = await fetch(baseApiUrl + '/digital/cate')
    let cateDefaultJson = await fetch(baseApiUrl + '/digital/cate?type=' + type)
    let cate = await cateJson.json()
    let cateDefault = await cateDefaultJson.json()
    let res = await json.json()
    data.value = res.data || {}
    cates.value = cate.data.map(el => {
        if (el.type === type) {
            el.children = cateDefault.data
        }
        return el
    })
    pageLoading.value = false
    setTimeout(() => {
        loading.value = pageLoading.value || false
    }, 500)
    // console.log(res.data, cate.data, 'res');
 }
 getData()
</script>
<template>
    <el-skeleton style="width: 100%;text-align: left;" :loading="pageLoading" animated>
        <template #template>
            <div class="mb-[10px]">
                <el-skeleton-item v-for="item in 5" variant="button" style="width: 10%;margin-right: 16px;height: 25px;" />
            </div>
            <div class="mb-[10px]">
                <el-skeleton-item v-for="item in 10" variant="button" style="width: 5%;margin-right: 16px;height: 25px;" />
            </div>
            <el-skeleton-item variant="image" style="width: 100%; height: 420px" />
            <div class="w-[100%]" v-for="item in 8">
                <div class="flex justify-between mb-[20px]">
                    <el-skeleton-item variant="h3" style="width: 20%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                </div>
                <div class="flex justify-between">
                    <el-skeleton-item variant="image" style="width: 200px; height: 420px;margin-right: 20px;" />
                    <el-row class="flex w-[100%]" :gutter="20">
                        <el-col
                            v-for="item in 12"
                            :span="12"
                            :xs="{span:12}"
                            :sm="{span:8}"
                            :md="{span:6}"
                            :lg="{span:4}"
                            :xl="{span:4}"
                            :xxl="{span:3}"
                            class="mb-[20px]"
                        >
                            <el-skeleton-item variant="image" style="width: 100%; height: 180px;margin-bottom: 20px;" />
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
            <Category :cates="cates" @change="getData" />
            <div v-loading="loading" style="min-height: 500px;">
                <Banner :banner="data.banner || {}"/>
                <div class="list" v-for="item in data.indexData || []" :key="item.name">
                    <div class="header flex justify-between mb-[20px]">
                        <div class="title">{{ item.name }}</div>
                        <el-link class="more" v-if="item.url" :href="item.url" target="_brank">{{ item.more_text || item.list && item.list.length ? '查看更多':'' }}</el-link>
                    </div>
                    <div class="body flex">
                        <div class="imgs" v-if="item.list && item.list.length">
                            <Banner :height="item.list && item.list.length?'490px': '240px'" class="mr-[20px]" :class="{'w-[200px] ': item.list && item.list.length}" :banner="item.bg_imgs || []" imgClass="w-[100%] !h-[auto]" arrow="never" />
                        </div>
                        <el-image v-else v-if="item.bg_imgs && item.bg_imgs.length" :src="item.bg_imgs[0].img" alt="" fit="cover" class="mb-[20px] h-[120px]" />
                        <el-row :gutter="20" class="flex-1" v-if="item.list && item.list.length">
                            <el-col
                            v-for="goods in item.list || []" :key="goods.id"
                            :span="12"
                            :xs="{span:12}"
                            :sm="{span:8}"
                            :md="{span:6}"
                            :lg="{span:4}"
                            :xl="{span:4}"
                            :xxl="{span:3}"
                            class="mb-[20px]"
                            >
                            <el-card>
                                <GoodsItem :goods="goods"/>
                            </el-card>
                        </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </template>
    </el-skeleton>
</template>