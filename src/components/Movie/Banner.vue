<script setup>
import { ElSkeleton, ElSkeletonItem, ElCarousel, ElCarouselItem, ElImage, ElLink } from "element-plus";
import { ref, reactive, onMounted, nextTick } from 'vue';
import { baseApiUrl } from '@/api/index.ts';
const ElCarouselRef = ref(null);
const state = reactive({
  data: [],
  offset: 0,
  cate: '13',
  type: 'cms',
  active: 0,
  loading: true,
});
const isMobile = ref(false)
onMounted(() => {
    isMobile.value = window.innerWidth <= 768
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth <= 768
    })
})
const getData = (page = 1) => {
  state.offset = page;
  fetch(`${baseApiUrl}/movie/list?type=${state.type}&limit=5&offset=${state.offset}`, {
    params: state
  })
    .then((res) => res.json())
    .then((res) => {
      state.data = res.data?.movieList.map(el => ({...el, loading: false})) || [];
      state.total = res.data.paging?.total || res.data?.total || 0;
      nextTick(() => {
          state.loading = false;
      });
    });
};
getData()
</script>
<template>
<div class="relative">
    <ElSkeleton animated :loading="state.loading" class="skeleton">
        <template #template>
            <el-skeleton-item variant="image" :style="{height: isMobile?'160px':'400px'}" class="rounded-md" />
        </template>
        <template #default>
        <ElCarousel ref="ElCarouselRef" :height="isMobile?'160px':'400px'" :activeIndex="state.active" @change="(val) => state.active = val">
            <ElCarouselItem v-for="item in state.data" :key="item.nm" :label="isMobile?'':item.nm">
                <a :href="`/movie/detail?type=cms&id=${item.id}`" class="block w-full h-full">
                    <ElImage v-lazy :src="item.videoImg" alt="" fit="cover" class="w-full h-full rounded-md" />
                </a>
            </ElCarouselItem>
        </ElCarousel>
        </template>
    </ElSkeleton>
</div>
</template>
