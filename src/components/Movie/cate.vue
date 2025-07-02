<script setup name="Category">
import { ElTabs, ElTabPane, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { ref, nextTick, reactive, useAttrs, onMounted } from 'vue';
import { baseApiUrl } from '@/api/index.ts';

const state = reactive({
  cates: []
});
const attrs = useAttrs()
const emits = defineEmits(['change'])
const props = defineProps({
    keyword: {
        type: String,
        default: '',
    }
})
const activeCate = ref('2');
const activeSecondCate = ref('13');
const getCateData = () => {
  const covert = (item) => {
    return {
      title: item.name,
      id: item.id,
    };
  }
  fetch(`${baseApiUrl}/movie/cate?type=cms`)
    .then((res) => res.json())
    .then((res) => {
        state.cates = state.cates.concat(res.data?.filter(_ =>!_.pId).map(el => ({...covert(el), children: res.data?.filter(val => val.pId === el.id).map(covert)})).sort((a, b) => b.sort - a.sort) || []);
        onTabClick({paneName: activeCate.value || 0, refresh: true })
    });
};
onMounted(() => {
    let params = new URLSearchParams(location.search);
    activeCate.value = params.get('pcate') || '2';
    activeSecondCate.value = params.get('cate') || '13';
    getCateData();
})
/**
 * 第01集$https://v11.tlkqc.com/wjv11/202502/21/rFr7JSz81A83/video/index.m3u8#第02集$https://v10.tlkqc.com/wjv10/202502/22/Ej5bYTSTua82/video/index.m3u8#第03集$https://v12.tlkqc.com/wjv12/202502/28/0ZvVzSgsdy84/video/index.m3u8#第04集$https://v5.tlkqc.com/wjv5/202503/01/h2xhvTtCmX77/video/index.m3u8#第05集$https://v12.tlkqc.com/wjv12/202503/07/JcZwS975R684/video/index.m3u8#第06集$https://v11.tlkqc.com/wjv11/202503/08/60MgNJvk3s83/video/index.m3u8#第07集$https://v9.tlkqc.com/wjv9/202503/14/UdT0RLpuVg81/video/index.m3u8#第08集$https://v5.tlkqc.com/wjv5/202503/15/KVims5mK0577/video/index.m3u8#第09集$https://v11.tlkqc.com/wjv11/202503/21/dyYrjzg6B983/video/index.m3u8#第10集$https://v10.tlkqc.com/wjv10/202503/22/mcGEeU35Vw82/video/index.m3u8#第11集$https://v6.tlkqc.com/wjv6/202503/28/0YmHmVjvAG78/video/index.m3u8#第12集$https://v5.tlkqc.com/wjv5/202503/29/kgCVQDNN8L77/video/index.m3u8#第13集$https://v12.tlkqc.com/wjv12/202504/09/2KMKCiUsY784/video/index.m3u8#第14集$https://v12.tlkqc.com/wjv12/202504/05/yw2JN0Pyid84/video/index.m3u8#第15集$https://v10.tlkqc.com/wjv10/202504/11/zSZ7XY9qby82/video/index.m3u8$$$1$https://mycj-m3u8.hmrvideo.com/play/c6c6ff0eeb3d4a6185d6665cbe2e62cb.m3u8#2$https://mycj-m3u8.hmrvideo.com/play/7c71691becd54730859d4f54a4c77573.m3u8#3$https://mycj-m3u8.hmrvideo.com/play/5d4d3407593249b683f50d1444e9922c.m3u8#4$https://mycj-m3u8.hmrvideo.com/play/4d7c108b9dcb4791885a7f4d365ebea5.m3u8#5$https://mycj-m3u8.hmrvideo.com/play/ecbf83f7cbe048d384b90a450511bd29.m3u8#6$https://mycj-m3u8.hmrvideo.com/play/988121d58a6b4ed893c3db2e98d5c2f8.m3u8#7$https://mycj-m3u8.hmrvideo.com/play/824f2d652ed541f28979c01d8e58c78d.m3u8#8$https://mycj-m3u8.hmrvideo.com/play/74cffd69a8414f2e86f94c622a175701.m3u8#9$https://mycj-m3u8.hmrvideo.com/play/67c2ca7e1fd943d3a5405e7e3c423110.m3u8#10$https://mycj-m3u8.hmrvideo.com/play/340dcd474ff44858adbbddc36cf1484f.m3u8#11$https://mycj-m3u8.hmrvideo.com/play/7dbe468a1175492e911213795ed2adcf.m3u8#12$https://mycj-m3u8.hmrvideo.com/play/640a7462dc694284a9213b91d995a859.m3u8#13$https://mycj-m3u8.hmrvideo.com/play/fed349fa4dd54e64b856ba517e2043e7.m3u8#14$https://mycj-m3u8.hmrvideo.com/play/caa242ee1611488c96adb75230d3d107.m3u8#15$https://mycj-m3u8.hmrvideo.com/play/0015c2812edc40da9b6279b0ed70b277.m3u8
 */
const onTabClick = (val) => {
    let child = state.cates.find(v => v.id == val.paneName) || {};
    child = child.children ? child.children[0] || val : val;
    onChildTabClick({ ...child, refresh: val.refresh, paneName: (val.refresh ? activeSecondCate.value : (child.id || val.paneName || 0)).toString(), pId: activeCate.value });
}
const onChildTabClick = (val) => {
    // if (val.paneName == activeSecondCate.value) return;
    activeSecondCate.value = val.paneName;
    nextTick(() => {
        // console.log(val.paneName, activeCate.value, 'onChildTabClick');
        // if (!!val.paneName)
        //     window.location.href = '/movie?cate=' + val.paneName + '&type=' + (val.pId || activeCate.value)
        // else window.location.href = '/movie'
        emits('change', {id: val.paneName || '', type: activeCate.value, pId: activeCate.value, offset: val.refresh ? null : 1});
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
            <ElTabPane v-for="item in state.cates" :disabled="attrs.disabled || !!(props.keyword && item.type == 'apple')" :label="item.title" :name="item.id+''" :key="item.id">
                <ElTabs class="flex-1" v-model="activeSecondCate" v-if="item.children" @tab-click="onChildTabClick">
                    <ElTabPane v-for="child in item.children" :key="child.id" :label="child.title" :name="child.id+''">
                    </ElTabPane>
                </ElTabs>
            </ElTabPane>
        </ElTabs>
    </div>
</template>