<script setup>
import { ElCarousel, ElCarouselItem, ElImage } from 'element-plus';
import { useAttrs, onMounted, ref } from 'vue';
defineOptions({
    name: 'Banner'
})
// const bannerHeight = ref('460px')
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
// onMounted(() => {
//     bannerHeight.value = `${window.innerHeight * 0.6}px`
//     window.addEventListener('resize', () => {
//         bannerHeight.value = `${window.innerHeight * 0.6}px`
//     })
// })
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
        <el-carousel v-bind="{...attrs, height: 'auto'}">
            <el-carousel-item v-for="item in props.banner" :style="{height: (item.height|| 350) + 'px'}" :key="item.img">
                <a :href="item.url" target="_blank" rel="noopener noreferrer">
                    <el-image :class="`${props.imgClass} h-[100%]`" :src="item.img" :fit="item.fit ||'cover'" :alt="item.img"></el-image>
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>