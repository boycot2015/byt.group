<template>
  <div>
      <Cate :cates="state.cates" @change="onTabClick"/>
      <div v-loading="state.loading">
        <ElRow :gutter="20">
            <ElCol class="mb-4" v-for="item in state.data" :key="item.id" :xs="12" :sm="8" :md="6" :lg="4">
              <ElCard shadow="hover" class="card" body-style="padding: 0 0 10px 0">
                <ElSkeleton animation :loading="item.loading" class="skeleton">
                  <template #template>
                    <el-skeleton-item variant="image" style="width: 100%; height: 180px" />
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
                        <el-skeleton-item variant="text" style="margin-right: 16px;width: 30%" />
                        <el-skeleton-item variant="text" />
                      </div>
                    </div>
                  </template>
                  <template #default>
                    <a :href="`/movie/detail?id=${item.id}&type=${state.type}`" class="w-full" style="text-decoration:none">
                        <ElImage :src="item.img" style="width: 100%;" class="sm:h-[280px] md:h-[320px] lg:h-[270px]" />
                        <div class="mt-2 px-2 w-full relative">
                          <ElText truncated>{{ item.nm }}</ElText>
                          <ElText class="absolute w-full bg-[rgba(0,0,0,.5)] !text-color-white !text-[18px] !p-1 left-0 top-[-45px] text-right">{{item.sc}}</ElText>
                          <div class="flex w-full">
                            <ElText truncated>导演：{{ item.dir || '--' }}</ElText>
                            <ElText truncated>演员：{{item.star || '--'}}</ElText>
                          </div>
                        </div>
                    </a>
                  </template>
                </ElSkeleton>
              </ElCard>
            </ElCol>
            <ElCol>
		          <div v-if="!state.data?.length" class="min-h-[calc(100vh-260px)]">
                <ElEmpty description="暂无资源～" />
                </div>
            </ElCol>
        </ElRow>
        <div class="flex justify-between mb-2">
          <span></span>
          <ElPagination layout="total, prev, pager, next" :page-size="12" :total="state.total" @current-change="(val) => {
            state.loading = true
            getData(val)
          }"/>
        </div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ElRow, ElCol, ElCard,
    ElImage, ElSkeleton, ElEmpty, ElInfiniteScroll,
    ElSkeletonItem, ElLink, ElLoading, ElText, ElPagination } from 'element-plus';
import { baseApiUrl } from '@/api/index.ts';
import Cate from './cate.vue';

const vLoading = ElLoading.directive;
const state = reactive({
  keyword: '',
  offset: 0,
  cate: '0',
  type: 'maoyan',
  data: [...new Array(12)].map(() => ({ loading: true })),
  ids: [],
  total: 0,
  cates: [{ id: '0', title: '热门' }],
  loading: false,
  hasMore: false,
});
const params = new URLSearchParams(window.location.search);
const getData = (page = 1) => {
  state.offset = page;
  state.keyword = params.get('keyword') || ''
  if (state.keyword) {
    state.type = 'cms'
    state.cate = ''
  }
  // &movieIds=${state.ids.slice(offset * 12, 12 * offset).join(',')}&keyword=${params.get('keyword')}
  fetch(`${baseApiUrl}/movie/list?type=${state.type}&cate=${state.cate}&limit=12&offset=${state.offset}&keyword=${params.get('keyword') || ''}&movieIds=${state.ids.slice(state.offset * 12, 12 * state.offset).join(',')}`)
    .then((res) => res.json())
    .then((res) => {
      state.data = res.data?.movieList.map(el => ({...el, loading: false})) || [];
      state.ids = res.data?.movieIds || [];
      state.total = res.data.paging?.total || res.data?.total || 0;
      state.loading = false;
      state.hasMore = (res.data?.total > 12 * state.offset) || (res.data?.paging?.total > 12 * state.offset) || state.ids.slice(state.offset * 12, 12 * state.offset).length === 12 || false;
      window.dispatchEvent(new Event('resize'));
    });
};
const getCateData = () => {
  const covert = (item) => {
    return {
      title: item.name,
      id: item.id,
    };
  }
  fetch(`${baseApiUrl}/movie/cate?type=cms`)
    .then((res) => res.json())
    .then((res) => {
      state.cates = state.cates.concat(res.data?.filter(_ =>!_.pId).map(el => ({...covert(el), children: res.data?.filter(val => val.pId === el.id).map(covert)})).sort((a, b) => b.sort - a.sort) || []);
    });
};
const onTabClick = ({ id }) => {
  state.cate = id;
  state.type = id == '0' ? 'maoyan' : 'cms';
  state.offset = 1;
  state.loading = true;
  getData();
};
getCateData();
getData();
</script>