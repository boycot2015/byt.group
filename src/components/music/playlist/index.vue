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
    // window.location.href = `/music/${type}/playlist?id=${row.id}`;
	let link = document.createElement('a')
	link.href = `/music/${type}/playlist?id=${row.id}`;
	document.body.appendChild(link)
	link.click()
	setTimeout(() => {
		document.body.removeChild(link)
	}, 1000);
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
<style lang="less" scoped>
</style>
<template>
	<ElSkeleton :loading="pageLoading" animated>
		<template #template>
			<el-tabs class="mb-[--gap]">
				<el-tab-pane v-for="item in 10" :key="item" disabled>
					<template #label>
						<el-skeleton-item variant="button" />
					</template>
				</el-tab-pane>
			</el-tabs>
		</template>
		<template #default>
			<div class="relative mb-[--gap]" v-if="state.cateData.recommend && state.cateData.recommend.length">
				<el-tabs v-model="state.cateId" :before-leave="onLeave" class="m-t[-15px]" @tab-change="onTabChange">
					<el-tab-pane v-for="tab in state.cateData.recommend" :label="tab.name" :key="tab.id" :name="tab.id+''">
						<template #label>
							<span v-if="tab.id=='-1'">
								<el-popover :show-arrow="false" trigger="hover" popper-class="!backdrop-blur-md !w-[100vw] !md:w-[50vw] !bg-[rgba(255,255,255,0.6)]" ffect="light" width="auto">
									<div class="p-3 py-0 overflow-hidden overflow-y-auto max-h-[360px]" v-if="state.cateData.all">
										<div class="flex mb-5" :key="item.name" v-for="item in state.cateData.all">
											<div class="title text-xl mr-5">{{item.category}}</div>
											<div class="content flex !text-justify !w-[82%] !md:w-[90%] flex-wrap" v-if="item.filters">
												<span class="text-[14px] leading-28px mr-5 cursor-pointer !hover:text-color-[var(--el-color-primary)]" :class="{'text-color-[var(--el-color-primary)]': cate.id === state.cateId}" @click="onTabChange(cate.id)" :key="cate.name" v-for="cate in item.filters">{{cate.name}}</span>
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
			</div>
		</template>
	</ElSkeleton>
	<div class="px-0 h-[100%] playlist-scroll-wrap overflow-hidden overflow-y-auto" v-infinite-scroll="() => getData(++state.currentPage)">
		<ElRow :gutter="16" class="pt-[5px]">
			<ElCol :span="12" class="text-left mb-[--gap]" :xs="{span: 8}" :sm="{span: 6}" :md="{span: 4}" :lg="{span: 3}" :xl="{span: 2}" v-for="item in (pageLoading ? 24 : state.playList)" :key="item.id || item">
				<ElSkeleton :loading="pageLoading" animated>
				<template #template>
					<ElSkeletonItem variant="image" style="width: 100%; height: 130px;margin-bottom: 10px;" />
					<el-skeleton-item variant="text" style="width: 100%" />
					<el-skeleton-item variant="text" style="width: 60%" />
				</template>
				<template #default>
					<ElCard class="text-left !rounded-md md:min-h-[230px] lg:min-h-[auto] hover:translate-y-[-3px] transition-all duration-500" @click="onView(item)" :body-style="{padding: 0}" style="width: 100%;">
						<ElImage class="min-h-[60px] lg:min-h-[160px]" fit="cover" :src="item.cover_img_url||item.img_url" style="width: 100%;" lazy></ElImage>
						<ElText line-clamp="2" style="padding: 0 10px;">{{ item.title }}</ElText>
					</ElCard>
				</template>
				</ElSkeleton>
			</ElCol>
		</ElRow>
		<p v-if="loading">加载中...</p>
		<p v-if="!state.hasMore">{{state.playList?.length>10 ? '-------------我是有底线的-------------': !state.playList?.length ? '暂无数据~':''}}</p>
		<ElBacktop style="right: 20px;bottom: 90px;" class="!md:right-[50px]" target=".playlist-scroll-wrap" />
	</div>
</template>