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
    <div class="goods text-center" :key="goods.id">
        <a :href="goods.url" target="_blank" rel="noopener noreferrer" class="decoration-none text-color-[var(--color-primary)]">
            <div
            class="img
            mb-[10px]
            h-[120px]
            w-[120px]
            mx-[auto]
            overflow-hidden">
                <el-image lazy fit="cover" class="w-[100%] h-[100%]" :src="goods.img" :title="goods.brief" :alt="goods.brief"></el-image>
            </div>
            <div class="h-[80px] w-[100%]">
                <div class="name line-clamp-2 h-[44px] mb-[5px]" v-if="goods.name" :title="goods.name">{{ goods.name }}</div>
                <div class="price text-color-red my-[5px] text-[18px]" v-if="goods.price">{{ renderPrice(goods) }}</div>
            </div>
            <div class="tags mt-[10px] h-[24px] line-clamp-2">
                <template v-if="goods.labels && goods.labels.length">
                    <el-tag v-for="item in goods.labels" v-show="item.name || item.img" :type="types[item.type] || 'danger'" class="mr-[5px] mb-[5px]" :key="item" size="small">
                        {{ item.name }}
                        <el-image v-if="item.img" class="w-[60px] h-[24px]" fit="cover" :src="item.img"></el-image>
                    </el-tag>
                </template>
            </div>
        </a>
    </div>
</template>