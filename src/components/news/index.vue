<script setup>
import { onMounted, ref, defineOptions } from 'vue'
import { ElRow, ElCol, ElCard, 
	ElImage, ElText, ElIcon, ElSkeleton, ElTooltip,
	ElSkeletonItem, ElInfiniteScroll, ElBacktop } from 'element-plus'
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
	playList: [],
	cateId: id || '',
	currentPage: 1,
	totalCount: 0,
	hasMore: true
});
const getData = async (currentPage = state.value.currentPage) => {
	// tieba、36kr、baidu、toutiao、juejin、netease、lol、weibo、zhihu
	// let names = ['tieba', '36kr', 'baidu', 'toutiao', 'juejin', 'netease', 'lol', 'weibo', 'zhihu']
	// let names = ['贴吧', '36kr', '百度', '头条', '掘金', '网易', '英雄联盟', '微博', '知乎']
	loading.value = true
	let cateRes = await fetch(`${baseApiUrl}/hots/cate`)
	let { data: names } = await cateRes.json()	
	let res = await Promise.all(names.map(async item => await fetch(`${baseApiUrl}/hots?name=${item.name}`)))
	let data = await Promise.all(res.map(el => el.json()))
	state.value = {
		...state.value,
		playList: data.map((el, index) => ({list: el.data ? el.data.slice(0, 5) : null, ...names[index]})).filter(el => el.list) || [],
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
			<ElCol :span="24" class="text-left" :xs="{span: 24}" :sm="{span: 12}" :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}" :xxl="{span: 3}" v-for="item in (pageLoading ? 24 : state.playList)" :key="item">
				<el-skeleton :loading="pageLoading" animated>
				<template #template>
					<el-skeleton-item variant="button" style="width: 80%;margin-bottom: 10px;margin-right: 5%;" />
					<el-skeleton-item variant="button" style="width: 15%;margin-bottom: 10px;" />
					<div class="flex" v-for="item in 5" :key="item">
						<el-skeleton-item variant="image" style="width: 60px;height: 40px;margin-right: 20px;margin-bottom: 10px;" />
						<el-skeleton animated>
							<template #template>
								<el-skeleton-item variant="text" style="width: 100%" />
								<el-skeleton-item variant="text" style="width: 60%" />
							</template>
						</el-skeleton>
					</div>
				</template>
				<template #default>
					<ElCard class="text-left" :header="item.title" :body-style="{padding: 5}" style="width: 100%;">
						<template #header>
							<h3 class="p-0 m-0">
								{{ item.title }} · {{ item.subTitle }}
								<ElTooltip content="查看更多" placement="top">
									<ElIcon @click="onView(item)" class="float-right cursor-pointer"><span class="i-carbon-arrow-right"></span></ElIcon>
								</ElTooltip>
							</h3>
						</template>
						<div class="overflow-hidden overflow-y-auto h-[240px]">
							<a :href="list.url" class="flex items-center no-underline mb-1" v-for="(list, index) in item.list" :key="list.url" target="_blank">
								<ElIcon class="icon" size="24" color="var(--el-color-primary)" v-if="index < 3 && !(list.pic||list.img_ur)"><span :class="{'i-carbon-fire text-color-[red]': index === 0, 'i-carbon-badge text-color-[orange]': index === 1, 'i-carbon-bookmark-filled': index === 2}"></span></ElIcon>
								<ElImage v-if="(list.pic||list.img_url)" :src="list.pic||list.img_url" class="w-[60px] h-[42px]" :alt="item.title" lazy></ElImage>
								<span v-else-if="index >= 3">{{ index + 1 }}.</span>
								<ElText line-clamp="2" class="flex-1 hover:text-color-[var(--el-color-primary)]" :class="{'w-[100%]': index >= 3 && !(list.pic||list.img_url), 'w-[80%]': index < 3 && !(list.pic||list.img_url), 'w-[62%]': (list.pic||list.img_url)}"  style="padding: 0 10px;">{{ list.title }}</ElText>
							</a>
						</div>
					</ElCard>
				</template>
				</el-skeleton>
			</ElCol>
		</ElRow>
		<ElBacktop style="right: 50px;bottom: 120px;" target=".main-scroll-wrap" />
	</div>
</template>