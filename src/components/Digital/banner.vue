<script setup>
import { ElCarousel, ElCarouselItem } from 'element-plus';
import { useAttrs } from 'vue';
defineOptions({
    name: 'Banner'
})
const attrs = useAttrs()
const props = defineProps({
    banner: {
        type: Array,
        default: () => [],
    }
})
</script>
<template>
    <div>
        <el-carousel v-bind="{height: '460px', ...attrs}">
            <el-carousel-item v-for="item in props.banner" :key="item.img">
                <a :href="item.url" target="_blank" rel="noopener noreferrer">
                    <img height="100%" :class="props.imgClass" :src="item.img" fit="full" :alt="item.img">
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>