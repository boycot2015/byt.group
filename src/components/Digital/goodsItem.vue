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
    console.log(goods.price, 'price');
    
    if (Number(goods.price || 0).toString() !== 'NaN')
        return '￥' + Number(goods.price || 0).toFixed(2)
    return goods.price
}
</script>
<template>
    <div class="goods text-center" :key="goods.id">
        <a :href="goods.url" target="_blank" rel="noopener noreferrer" class="decoration-none text-color-[var(--color-primary)]">
            <div class="img mb-[10px] md:h-[180px] lg:h-[120px] mx-[auto] overflow-hidden">
                <el-image lazy fit="cover" :src="goods.img" :title="goods.brief" :alt="goods.brief"></el-image>
            </div>
            <div class="name line-clamp-2 h-[40px] mb-[10px]" :title="goods.name">{{ goods.name }}</div>
            <div class="price text-color-red my-[5px] text-[18px]">{{ renderPrice(goods) }}</div>
        </a>
    </div>
</template>