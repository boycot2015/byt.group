<script setup>
import { ElTabs, ElTabPane, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { ref, nextTick } from 'vue';
defineOptions({
    name: 'Category'
})
const emits = defineEmits(['change'])
const activeCate = ref('xiaomi');
const activeSecondCate = ref(1);
const props = defineProps({
    cates: {
        type: Array,
        default: () => [],
    },
})
const onTabClick = () => {
    nextTick(() => {
        emits('change', activeCate.value)
    })
}
</script>
<template>
    <div>
        <el-tabs v-model="activeCate" @tab-click="onTabClick">
            <el-tab-pane v-for="item in cates" :label="item.title" :name="item.type" :key="item.type">
                <div class="flex items-center">
                    <!-- <span class="mr-[20px] text-color-[#333] w-[100px]">分类：</span> -->
                    <el-tabs class="flex-1" v-model="activeSecondCate" v-if="item.children" :before-leave="() => false">
                        <el-tab-pane v-for="child in item.children" :key="child.id" :label="child.title" :name="child.id">
                            <template #label v-if="child.children && child.children.length">
                                <span>
                                    <el-dropdown>
                                        <span class="outline-none">
                                            {{child.title}}
                                        </span>
                                        <template #dropdown>
                                        <el-dropdown-menu class="h-[200px] overflow-y-auto">
                                            <el-dropdown-item v-for="val in child.children" :key="val.id"><a :href="val.url" target="_blank" rel="noopener noreferrer" class="decoration-none text-color-[#333] hover:text-color-[var(--color-primary)]">{{val.title}}</a></el-dropdown-item>
                                        </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </span>
                            </template>
                            <template class="outline-none" v-else #label>
                                <a :href="child.url" target="_blank" rel="noopener noreferrer" class="decoration-none text-color-[#333] hover:text-color-[var(--color-primary)]">{{child.title}}</a>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>