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
const renderPrice = (goods) => {    
    if (Number(goods.price || 0).toString() !== 'NaN')
        return '￥' + Number(goods.price || 0).toFixed(2)
    return goods.price
}
</script>
<template>
    <div class="goods text-center" :key="goods.id">
        <a :href="goods.url" target="_blank" rel="noopener noreferrer" class="decoration-none text-color-[var(--color-primary)]">
            <div
            class="img
            mb-[10px]
            h-[140px]
            w-[140px]
            md:h-[120px]
            md:w-[120px]
            mx-[auto]
            overflow-hidden">
                <el-image lazy fit="cover" class="w-[100%] h-[100%]" :src="goods.img" :title="goods.brief" :alt="goods.brief"></el-image>
            </div>
            <div class="name line-clamp-2 h-[40px] mb-[10px]" :title="goods.name">{{ goods.name }}</div>
            <div class="price text-color-red my-[5px] text-[18px]" v-if="goods.price">{{ renderPrice(goods) }}</div>
        </a>
    </div>
</template>