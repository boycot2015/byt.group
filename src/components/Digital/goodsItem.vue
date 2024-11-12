<script setup>
import { ElImage, ElTag } from 'element-plus';
defineOptions({
    name: 'Goods'
})
const props = defineProps({
    goods: {
        type: Object,
        default: () => ({}),
    },
})
const types = {
    interestfree: 'primary',
    gift: 'warning',
    bargin: 'danger',
    popnew_product: 'success',
}
const renderPrice = (goods) => {    
    if (Number(goods.price || 0).toString() !== 'NaN')
        return '￥' + Number(goods.price || 0).toFixed(2)
    return goods.price
}
</script>
<template>
    <div class="goods text-center relative" :key="goods.id">
        <a :href="goods.url" target="_blank" rel="noopener noreferrer" class="flex flex-col justify-start items-center decoration-none text-color-[var(--color-primary)] h-[248px]">
            <div>
                <div
                class="img
                mb-[10px]
                h-[120px]
                w-[120px]
                mx-[auto]
                overflow-hidden">
                    <el-image lazy fit="cover" class="w-[100%] h-[100%] transtion-all" :src="goods.img" :title="goods.brief" :alt="goods.brief"></el-image>
                </div>
                <div class="name line-clamp-2 h-[44px] mb-[5px]" v-if="goods.name" :title="goods.name">{{ goods.name }}</div>
            </div>
            <div class="price text-color-red my-[5px] text-[18px]" v-if="goods.price">{{ renderPrice(goods) }}</div>
            <div class="tags mt-[10px] line-clamp-2">
                <template v-if="goods.labels && goods.labels.length">
                    <div v-for="item in goods.labels" :key="item">
                        <el-tag v-show="item.name" :type="types[item.type] || 'danger'" class="mr-[5px]" size="small">{{ item.name }}</el-tag>
                        <el-image v-if="item.img" class="min-w-[40px] h-[20px] rouned-xl !absolute right-[-5px] top-[-10px]" fit="cover" :src="item.img"></el-image>
                    </div>
                </template>
            </div>
        </a>
    </div>
</template>