<script setup>
import { defineProps, onMounted, ref, defineOptions } from 'vue'
import { ElRow, ElCol, ElCard, ElImage, ElText, ElSkeleton, ElSkeletonItem, ElInfiniteScroll, ElBacktop } from 'element-plus'
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
	cateId: id || '',
	currentPage: 1,
	totalCount: 0,
	hasMore: true
});
const getData = async (currentPage = state.value.currentPage) => {
	loading.value = true
	let res = await fetch(`${baseApiUrl}/music?type=${type}&offset=${currentPage}`)
	let { data } = await res.json()
	state.value = {
		...state.value,
		playList: currentPage > 1 ? [...state.value.playList, ...data.result] : data.result || [],
		currentPage,
		hasMore: !!data?.hasNextPage || !!data.result?.length,
	}
	loading.value = state.value.hasMore
	pageLoading.value = false
}
const onView = (row) => {
    window.location.href = `/music/${type}/playlist?id=${row.id}`;
}
onMounted(() => {
	pageLoading.value = true
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
	<div class="px-4 h-[100%] playlist-scroll-wrap overflow-hidden overflow-y-auto" v-infinite-scroll="() => getData(++state.currentPage)">
		<ElRow :gutter="16">
			<ElCol :span="12" class="text-left" :xs="{span: 8}" :sm="{span: 6}" :md="{span: 4}" :lg="{span: 3}" :xl="{span: 2}" v-for="item in (pageLoading ? 24 : state.playList)" :key="item">
				<ElSkeleton :loading="pageLoading" animated>
				<template #template>
					<ElSkeletonItem variant="image" style="width: 100%; height: 180px;margin-bottom: 10px;" />
					<el-skeleton-item variant="text" style="width: 100%" />
					<el-skeleton-item variant="text" style="width: 60%" />
				</template>
				<template #default>
					<ElCard class="text-left md:height-[230]" @click="onView(item)" :body-style="{padding: 0}" style="width: 100%;">
						<ElImage :src="item.cover_img_url||item.img_url" style="width: 100%;min-height: 120px;" lazy></ElImage>
						<ElText line-clamp="2" style="padding: 0 10px;">{{ item.title }}</ElText>
					</ElCard>
				</template>
				</ElSkeleton>
			</ElCol>
		</ElRow>
		<p v-if="loading">加载中...</p>
		<p v-if="!state.hasMore">-------------我是有底线的-------------</p>
		<ElBacktop style="right: 50px;bottom: 120px;" target=".playlist-scroll-wrap" />
	</div>
</template>