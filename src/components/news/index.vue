<script setup>
import { onMounted, ref } from 'vue'
import { ElRow, ElCol, ElCard, 
	ElImage, ElText, ElIcon, ElSkeleton, ElTooltip,
	ElSkeletonItem, ElInfiniteScroll, ElBacktop, ElScrollbar } from 'element-plus'
import { baseApiUrl } from '@/api/index'
defineOptions({
	directives: {
		'infinite-scroll': ElInfiniteScroll
	}
})
const props = defineProps({ id: [String, Number], type: [String] })
const { id } = props
const loading = ref(true);
const pageLoading = ref(true);
const state = ref({
	dataList: [],
	cateId: id || '',
	currentPage: 1,
	totalCount: 0,
	hasMore: true
});
const getData = async (currentPage = state.value.currentPage) => {
	loading.value = true
	let cateRes = await fetch(`${baseApiUrl}/hots/cate`)
	let { data: names } = await cateRes.json()	
	let res = await Promise.all(names.map(async (item) => await fetch(`${baseApiUrl}/hots?name=${item.name}`)))
	let data = await Promise.all(res.map(el => el.json()))
	state.value = {
		...state.value,
		dataList: data.map((el, index) => ({list: el.data ? el.data : null, ...names[index]})).filter((el) => el.list) || [],
		currentPage,
		hasMore: !!data?.hasNextPage || !!data.result?.length,
	}
	loading.value = state.value.hasMore
	pageLoading.value = false
}
const onView = (row) => {
    window.location.href = `/news/${row.name}?title=${row.title + '·' + row.subTitle}`;
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
	}
}
</style>
<template>
	<div class="px-0 h-[100%]">
		<ElRow :gutter="16">
			<ElCol :span="24" class="text-left" :xs="{span: 24}" :sm="{span: 12}" :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}" :xxl="{span: 3}" v-for="(item, index) in (pageLoading ? 8 : state.dataList)" :key="index">
				<el-skeleton :loading="pageLoading" animated>
				<template #template>
					<el-skeleton-item variant="button" style="width: 80%;margin-bottom: 10px;margin-right: 5%;" />
					<el-skeleton-item variant="button" style="width: 15%;margin-bottom: 10px;" />
					<div class="flex" v-for="item in 5" :key="item">
						<el-skeleton-item variant="image" style="width: 80px;height: 40px;margin-right: 20px;margin-bottom: 10px;" />
						<el-skeleton animated>
							<template #template>
								<el-skeleton-item variant="text" style="width: 100%" />
								<el-skeleton-item variant="text" style="width: 60%" />
							</template>
						</el-skeleton>
					</div>
				</template>
				<template #default>
					<ElCard class="text-left hover:translate-y-[-3px] transition-all duration-400" :header="item.title" :body-style="{padding: '10px 0 10px 10px'}" style="width: 100%;">
						<template #header>
							<h3 class="p-0 m-0">
								{{ item.title }} · {{ item.subTitle }}
								<ElTooltip content="查看更多" placement="top">
									<ElIcon @click="onView(item)" class="float-right cursor-pointer"><span class="i-carbon-chevron-right"></span></ElIcon>
								</ElTooltip>
							</h3>
						</template>
						<el-scrollbar style="height:240px" class="overflow-hidden overflow-y-auto">
							<a :href="list.url" class="flex items-center no-underline mb-1" v-for="(list, index) in item.list" :key="list.url" target="_blank">
								<!-- <ElIcon class="icon" size="24" color="var(--el-color-primary)" v-if="index < 3 && !(list.pic||list.img_ur)"><span :class="{'i-carbon-fire text-color-[red]': index === 0, 'i-carbon-badge text-color-[orange]': index === 1, 'i-carbon-bookmark-filled': index === 2}"></span></ElIcon> -->
								<ElImage v-if="(list.pic||list.img_url)" :src="list.pic||list.img_url" class="w-[60px] h-[42px]" :alt="item.title" fit="cover" lazy></ElImage>
								<span v-else>{{ index + 1 }}.</span>
								<span class="flex flex-1 justify-between">
									<ElText line-clamp="2" :title="list.title" class="flex-3 hover:text-color-[var(--el-color-primary)]" style="padding-left: 10px;"><span>{{ list.title }}</span></ElText>
									<ElText line-clamp="2" :title="list.title" class="flex-2 text-right hover:text-color-[var(--el-color-primary)]" style="padding: 0 10px;"><span></span><span v-if="list.url?.includes('xueqiu')">{{ list.desc }}</span></ElText>
								</span>
							</a>
						</el-scrollbar>
					</ElCard>
				</template>
				</el-skeleton>
			</ElCol>
		</ElRow>
		<!-- <ElBacktop style="right: 50px;bottom: 120px;" target=".main-scroll-wrap" /> -->
	</div>
</template>