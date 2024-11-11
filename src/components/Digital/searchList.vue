<script setup>
import { ElRow, ElCol, ElCard, ElTag,
    ElCheckbox, ElCheckboxGroup, ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
import GoodsItem from './goodsItem.vue';
import { ref, nextTick, onMounted } from 'vue';
const tags = ref([])
const { data } = defineProps({
    data: {
        type: Object,
        default() {
            return {}
        }
    }
})
</script>
<template>
    <div>
        <div class="flex items-center line-clamp-1 mb-[10px] text-color-[#333]" v-if="data.classes">
            <span>分类：</span>
            <el-tag class="mr-[10px]" type="primary" v-for="cls in data.classes || []" :key="cls.name">{{ cls.name }}</el-tag>
        </div>
        <el-checkbox-group class="tags text-left mb-[10px]" v-model="tags">
            <el-checkbox v-for="tag in data.tags" :value="tag.value" :key="tag.name">{{ tag.name }}</el-checkbox>
        </el-checkbox-group>
        <el-row :gutter="15" class="flex-1 mt-[0px]" v-if="data.list && data.list.length">
            <el-col
            v-for="goods in data.list.slice(0, 12) || []" :key="goods.id"
            :span="12"
            :xs="{span:12}"
            :sm="{span:8}"
            :md="{span:6}"
            :lg="{span:4}"
            :xl="{span:3}"
            class="mb-[var(--gap)]"
            >
            <el-card body-class="!px-[15px]" class="!rounded-md overflow-hidden shadow-lg hover:translate-y-[-3px]">
                <GoodsItem :goods="goods"/>
            </el-card>
        </el-col>
        </el-row>
    </div>
</template>