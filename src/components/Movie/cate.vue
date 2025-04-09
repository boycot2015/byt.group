<script setup>
import { ElTabs, ElTabPane, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { ref, nextTick, useAttrs, onMounted } from 'vue';
defineOptions({
    name: 'Category'
})
const attrs = useAttrs()
const emits = defineEmits(['change'])
const props = defineProps({
    cates: {
        type: Array,
        default: () => [],
    },
    active: {
        type: String,
        default: '0',
    },
    keyword: {
        type: String,
        default: '',
    }
})
const activeCate = ref(props.active || '0');
const activeSecondCate = ref('7');
onMounted(() => {
    let params = new URLSearchParams(location.search);
    if (params.get('type')) {
        activeCate.value = params.get('type');
    }
    if (params.get('cate')) {
        activeSecondCate.value = params.get('cate');
    }
})
const onTabClick = (val) => {
    if (val.paneName == activeCate.value) return;
        let child = props.cates.find(v => v.id == val.paneName) || {};
        child = child.children ? child.children[0] || val : val;
        onChildTabClick({ ...child, paneName: child.id || val.paneName || 0, pId: val.paneName });
}
const onChildTabClick = (val) => {
    // if (val.paneName == activeSecondCate.value) return;
    activeSecondCate.value = val.paneName;
    nextTick(() => {
        // console.log(val.paneName, activeCate.value, 'onChildTabClick');
        // if (!!val.paneName)
        //     window.location.href = '/movie?cate=' + val.paneName + '&type=' + (val.pId || activeCate.value)
        // else window.location.href = '/movie'
        emits('change', {id: val.paneName || '', type: activeCate.value});
        // window.location.replace('/movie?cate=' + val.paneName + '&type=' + (val.pId || activeCate.value))
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
        <ElTabs v-model="activeCate" @tab-click="onTabClick">
            <ElTabPane v-for="item in props.cates" :disabled="attrs.disabled || !!(props.keyword && item.type == 'apple')" :label="item.title" :name="item.id" :key="item.id">
                <ElTabs class="flex-1" v-model="activeSecondCate" v-if="item.children" @tab-click="onChildTabClick">
                    <ElTabPane v-for="child in item.children" :key="child.id" :label="child.title" :name="child.id">
                    </ElTabPane>
                </ElTabs>
            </ElTabPane>
        </ElTabs>
    </div>
</template>