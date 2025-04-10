<script setup>
import { ElSkeleton, ElSkeletonItem, ElCarousel, ElCarouselItem, ElImage, ElLink } from "element-plus";
import { ref, reactive, onMounted } from 'vue';
import { baseApiUrl } from '@/api/index.ts';
const ElCarouselRef = ref(null);
const state = reactive({
  data: [],
  offset: 0,
  cate: '13',
  type: 'cms',
  active: 0,
  loading: false,
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
      state.loading = false;
    });
};
getData()
</script>
<template>
<div class="relative">
    <ElSkeleton animated :loading="state.loading" class="skeleton">
        <template #template>
        <el-skeleton-item variant="image" class="h-[200px] rounded-md md:h-[300px] " />
        </template>
        <template #default>
        <ElCarousel ref="ElCarouselRef" :height="isMobile?'160px':'400px'" :activeIndex="state.active" @change="(val) => state.active = val">
            <ElCarouselItem v-for="item in state.data" :key="item.nm" :label="isMobile?'':item.nm">
                <a :href="`/movie/detail?type=cms&id=${item.id}`">
                    <ElImage :src="item.videoImg" alt="" fit="fill" class="w-full rounded-md" />
                </a>
            </ElCarouselItem>
        </ElCarousel>
        <!-- <div class="text absolute hidden md:block z-9999 bottom-0 text-white right-10" v-if="state.data?.length">
            <a :href="`/movie/detail?id=${item.id}`" v-for="(item, index) in state.data" :key="item" @mouseover="ElCarouselRef.setActiveItem(index)" class="flex text-left mb-2 text-shadow-[#ccc] text-white cursor-pointer" :class="{'!text-[var(--color-primary)]': state.active == index}">
                <ElLink type="primary" class="mr-2 text-md">{{index+1}}</ElLink>
                <span class="mr-2">{{ item.nm }}</span>
                <span>{{ item.status }}</span>
            </a>
        </div> -->
        </template>
    </ElSkeleton>
</div>
</template>
