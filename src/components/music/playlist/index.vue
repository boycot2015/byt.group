<script setup>
import { onMounted, ref } from 'vue'
import {
	ElRow, ElCol, ElCard, ElImage, ElIcon,
	ElText, ElSkeleton, ElTabs, ElTabPane, ElPopover,
	ElSkeletonItem, ElInfiniteScroll, ElBacktop } from 'element-plus'
import { baseApiUrl } from '@/api/index'
defineOptions({
	directives: {
		'infinite-scroll': ElInfiniteScroll
	}
})
const props = defineProps({ id: [String, Number], type: [String] })
const { type, id } = props
const loading = ref(true);
const pageLoading = ref(true);
const state = ref({
	playList: [],
	cateData: {},
	cateId: '',
	currentPage: 0,
	totalCount: 0,
	hasMore: true
});
const getData = async (currentPage = state.value.currentPage) => {
	loading.value = true
	let res = await fetch(`${baseApiUrl}/music?type=${type}&offset=${currentPage}&id=${state.value.cateId}`)
	let { data } = await res.json()
	if (!data.result || !data.result.length) {
		loading.value = false
		return state.value = {
			...state.value,
			hasMore: false
		}
	}
	state.value = {
		...state.value,
		playList: currentPage > 1 ? [...state.value.playList, ...data.result] : data.result || [],
		currentPage,
		hasMore: !!data?.hasNextPage || (!!data.result?.length && data.result?.length > 10),
	}
	loading.value = state.value.hasMore
}
const getCateData = async () => {
	let res = await fetch(`${baseApiUrl}/music/cate?type=${type}`)
	let { data } = await res.json()
	if (!data) {
		pageLoading.value = false
		return
	}
 	state.value = {
		...state.value,
		cateId: data.recommend[0].id || '',
		cateData: { ...data, recommend: [...data.recommend, {name: '更多', id: '-1' }] },
	}
	pageLoading.value = false
}
const onView = (row) => {
    window.location.href = `/music/${type}/playlist?id=${row.id}`;
}
const onTabChange = (val) => {
	if (val == '-1') return
	state.value.currentPage = 0
	state.value.cateId = val
	state.value.playList = []
	getData()
}
const onLeave = (val) => {
	return val !== '-1'
}

onMounted(() => {
	pageLoading.value = true
	getCateData()
	getData()
})
</script>
<style lang="less">
.el-row {
    line-height: 22px;
	.el-col {
		margin-bottom: 16px;
		cursor: pointer;
	}
}
</style>
<template>
	<ElSkeleton :loading="pageLoading" animated>
		<template #template>
			<div class="flex mb-2">
				<el-skeleton-item v-for="item in 10" variant="button" style="margin-right: 15px;" :key="item" />
			</div>
		</template>
		<template #default>
			<div class="relative">
				<el-tabs v-model="state.cateId" :before-leave="onLeave" class="m-t[-15px]" @tab-change="onTabChange">
					<el-tab-pane v-for="tab in state.cateData.recommend" :label="tab.name" :key="tab.id" :name="tab.id+''">
						<template #label>
							<span v-if="tab.id=='-1'">
								<el-popover trigger="hover" effect="light" width="600px">
									<div class="p-3 overflow-hidden overflow-y-auto h-[300px]" v-if="state.cateData.all">
										<div class="flex items-center mb-5" :key="item.name" v-for="item in state.cateData.all">
											<div class="title text-xl mr-5">{{item.category}}</div>
											<div class="content flex !w-[85%] flex-wrap" v-if="item.filters">
												<span class="text-[14px] leading-28px mr-5 cursor-pointer !hover:text-color-[var(--el-color-primary)]" @click="onTabChange(cate.id)" :key="cate.name" v-for="cate in item.filters">{{cate.name}}</span>
											</div>
										</div>
									</div>
									<template #reference>
										<span class="flex items-center">{{ tab.name }}<el-icon size="18" class="ml-2"><i class="i-carbon-chevron-down"></i></el-icon></span>
									</template>
								</el-popover>
							</span>
							<span v-else>{{ tab.name }}</span>
						</template>
					</el-tab-pane>
				</el-tabs>
				<!-- <div class="more absolute cursor-pointer !hover:text-color-[var(--el-color-primary)] z-2 text-sm right-0 bottom-5">
					<el-popover trigger="hover" effect="light" width="600px">
						<div class="p-3 overflow-hidden overflow-y-auto h-[300px]" v-if="state.cateData.all">
							<div class="flex items-center mb-5" :key="item.name" v-for="item in state.cateData.all">
								<div class="title text-xl flex-base-[200px] mr-10">{{item.category}}</div>
								<div class="content flex flex-wrap" v-if="item.filters">
									<span class="text-[14px] leading-28px mr-5 cursor-pointer !hover:text-color-[var(--el-color-primary)]" @click="onTabChange(cate.id)" :key="cate.name" v-for="cate in item.filters">{{cate.name}}</span>
								</div>
							</div>
						</div>
						<template #reference>
							<span class="flex items-center">更多<el-icon size="18" class="ml-2"><i class="i-carbon-chevron-down"></i></el-icon></span>
						</template>
					</el-popover>
				</div> -->
			</div>
		</template>
	</ElSkeleton>
	<div class="px-0 h-[100%] playlist-scroll-wrap overflow-hidden overflow-y-auto" v-infinite-scroll="() => getData(++state.currentPage)">
		<ElRow :gutter="16">
			<ElCol :span="12" class="text-left" :xs="{span: 8}" :sm="{span: 6}" :md="{span: 4}" :lg="{span: 3}" :xl="{span: 2}" v-for="item in (pageLoading ? 24 : state.playList)" :key="item.id || item">
				<ElSkeleton :loading="pageLoading" animated>
				<template #template>
					<ElSkeletonItem variant="image" style="width: 100%; height: 180px;margin-bottom: 10px;" />
					<el-skeleton-item variant="text" style="width: 100%" />
					<el-skeleton-item variant="text" style="width: 60%" />
				</template>
				<template #default>
					<ElCard class="text-left md:min-h-[230px] lg:min-h-[auto]" @click="onView(item)" :body-style="{padding: 0}" style="width: 100%;">
						<ElImage class="min-h-[60px] lg:min-h-[120px]" :src="item.cover_img_url||item.img_url" style="width: 100%;" lazy></ElImage>
						<ElText line-clamp="2" style="padding: 0 10px;">{{ item.title }}</ElText>
					</ElCard>
				</template>
				</ElSkeleton>
			</ElCol>
		</ElRow>
		<p v-if="loading">加载中...</p>
		<p v-if="!state.hasMore">{{state.playList?.length ? '-------------我是有底线的-------------':'暂无数据~'}}</p>
		<ElBacktop style="right: 50px;bottom: 120px;" target=".playlist-scroll-wrap" />
	</div>
</template>