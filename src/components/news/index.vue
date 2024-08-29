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
	let res = await Promise.all([
		fetch(`${baseApiUrl}/hots?type=toutiao&offset=${currentPage}`),
		fetch(`${baseApiUrl}/hots?type=juejin&offset=${currentPage}`),
		fetch(`${baseApiUrl}/hots?type=weibo&offset=${currentPage}`),
		fetch(`${baseApiUrl}/hots?type=zhihu&offset=${currentPage}`),
		fetch(`${baseApiUrl}/hots?type=lol&offset=${currentPage}`),
	])
	let data = await Promise.all(res.map(el => el.json()))
	
	state.value = {
		...state.value,
		playList: data.map(el => el.data) || [],
		currentPage,
		hasMore: !!data?.hasNextPage || !!data.result?.length,
	}
	console.log(state.value, 'data');
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
			<ElCol :span="12" class="text-left" :xs="{span: 8}" :sm="{span: 6}" :md="{span: 4}" :lg="{span: 4}" :xl="{span: 4}" v-for="item in (pageLoading ? 24 : state.playList)" :key="item">
				<ElSkeleton :loading="pageLoading" animated>
				<template #template>
					<ElSkeletonItem variant="image" style="width: 100%; height: 180px;margin-bottom: 10px;" />
					<el-skeleton-item variant="text" style="width: 100%" />
					<el-skeleton-item variant="text" style="width: 60%" />
				</template>
				<template #default>
					<ElCard class="text-left md:height-[230]" title="1232" :body-style="{padding: 0}" style="width: 100%;" v-for="list in item" :key="list.url">
						<span @click="onView(list)">
							<ElImage :src="list.pic||list.img_url" style="width: 100%;min-height: 120px;" lazy></ElImage>
							<ElText line-clamp="2" style="padding: 0 10px;">{{ list.title }}</ElText>
						</span>
					</ElCard>
				</template>
				</ElSkeleton>
			</ElCol>
		</ElRow>
		<ElBacktop style="right: 50px;bottom: 120px;" target=".playlist-scroll-wrap" />
	</div>
</template>