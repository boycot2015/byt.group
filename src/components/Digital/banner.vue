<script setup>
import { ElCarousel, ElCarouselItem, ElImage } from 'element-plus';
import { useAttrs, onMounted, ref } from 'vue';
defineOptions({
    name: 'Banner'
})
const isMobile = ref(false)
const attrs = useAttrs()
const props = defineProps({
    banner: {
        type: Array,
        default: () => [],
    },
    imgClass: {
        type: String,
        default: 'w-[100%] fit-cover md:fit-[auto]',

     }
})
onMounted(() => {
    isMobile.value = window.innerWidth < 768
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768
    })
})
</script>
<style lang="less" scoped>
@media screen and (max-width: 768px) {
    :deep(.el-carousel__container) {
        height: 160px;
    }
    :deep(.el-carousel__indicator .el-carousel__button) {
        width: 10px;
    }
}
</style>

<template>
    <div>
        <el-carousel v-bind="{...attrs, height: isMobile ? '120px':'auto'}">
            <el-carousel-item v-for="item in props.banner" :style="{height: !isMobile ? (item.height|| 350) + 'px' : ''}" :key="item.img" class="rounded-md">
                <a :href="item.url" target="_blank" rel="noopener noreferrer">
                    <el-image :class="`${props.imgClass} h-[100%]`" :src="item.img" :fit="!isMobile ? item.fit || 'cover' : 'cover'" :alt="item.img"></el-image>
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>