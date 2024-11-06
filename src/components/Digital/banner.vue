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
        default: 'h-[310px] w-[100%]',

     }
})
</script>
<template>
    <div>
        <el-carousel v-bind="{...attrs}">
            <el-carousel-item v-for="item in props.banner" :key="item.img" class="bg-color-white">
                <a :href="item.url" target="_blank" rel="noopener noreferrer">
                    <el-image :class="`${props.imgClass}`" :src="item.img" :fit="item.fit ||'cover'" :alt="item.img"></el-image>
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>