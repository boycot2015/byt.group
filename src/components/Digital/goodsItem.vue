<script setup>
import { ElImage, ElLink } from 'element-plus';
defineOptions({
    name: 'Goods'
})
const props = defineProps({
    goods: {
        type: Object,
        default: () => ({}),
    },
})
</script>
<template>
    <div class="goods text-center" :key="goods.id">
        <a :href="goods.url" target="_blank" rel="noopener noreferrer" class="decoration-none text-color-[var(--color-primary)]">
            <div class="img mb-[10px] mx-[auto]">
                <el-image fit="cover" :src="goods.img" :title="goods.brief" :alt="goods.brief"></el-image>
            </div>
            <div class="name line-clamp-2 h-[40px] mb-[10px]" :title="goods.name">{{ goods.name }}</div>
            <div class="price text-color-red my-[5px] text-[18px]">￥{{ Number(goods.price || 0).toFixed(2) }}</div>
        </a>
    </div>
</template>