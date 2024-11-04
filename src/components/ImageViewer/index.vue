<script setup>
import { useAttrs, onMounted, ref } from 'vue';
import { ElImageViewer } from 'element-plus';
import { CustomEvent } from '@/utils';
const attrs = useAttrs();
const props = ref({
    show: false
});
onMounted(() => {
    CustomEvent.on('imageViewer', ({row, data, index}) => {
        props.value.show = true
        props.value['url-list'] = data?.map((item) => item.url);
        props.value['initial-index'] = index || 0;
        props.value['teleported'] = true
    });
});
</script>
<template>
    <div>
        <ElImageViewer v-if="props.show" v-bind="{...props,...attrs}" @close="props.show = false"></ElImageViewer>
    </div>
</template>