<script setup>
import { ElTabs, ElTabPane, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { ref, nextTick, useAttrs } from 'vue';
defineOptions({
    name: 'Category'
})
const attrs = useAttrs()
const emits = defineEmits(['change'])
const activeCate = ref('xiaomi');
const activeSecondCate = ref(1);
const props = defineProps({
    cates: {
        type: Array,
        default: () => [],
    },
    keyword: {
        type: String,
        default: '',
    }
})
const onTabClick = (val) => {
    if (val.paneName === activeCate.value) return;
    nextTick(() => {
        emits('change', activeCate.value)
    })
}
</script>
<style lang="less">
.el-tabs__nav-next, .el-tabs__nav-prev{
    font-size: 18px;
    line-height: 46px;
}
.el-tab-pane {
    .el-tabs__nav-next, .el-tabs__nav-prev{
        line-height: 40px;
    }
}
</style>
<template>
    <div>
        <el-tabs v-model="activeCate" @tab-click="onTabClick">
            <el-tab-pane v-for="item in cates" :disabled="attrs.disabled || !!(props.keyword && item.type == 'apple')" :label="item.title" :name="item.type" :key="item.type">
                <el-tabs class="flex-1" v-model="activeSecondCate" v-if="item.children" :before-leave="() => false">
                    <el-tab-pane v-for="child in item.children" :key="child.id" :label="child.title" :name="child.id">
                        <template #label v-if="child.children && child.children.length">
                            <span>
                                <el-dropdown>
                                    <span class="outline-none">
                                        {{child.title}}
                                    </span>
                                    <template #dropdown>
                                    <el-dropdown-menu class="max-h-[300px] overflow-y-auto">
                                        <el-dropdown-item v-for="val in child.children" :key="val.id"><a :href="val.url" target="_blank" rel="noopener noreferrer" class="decoration-none text-color-[#333] hover:text-color-[var(--color-primary)]">{{val.title}}</a></el-dropdown-item>
                                    </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </span>
                        </template>
                        <template v-else #label>
                            <a :href="child.url" target="_blank" rel="noopener noreferrer" class="decoration-none text-color-[#333] hover:text-color-[var(--color-primary)]">{{child.title}}</a>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>