<script setup>
import { ref } from 'vue';
import { ElButton, ElLink, ElMessage } from 'element-plus';
import packageJson from '../../package.json';
const btnText = ref(`检查版本更新`)
const version = ref(packageJson.dependencies.astro);
const onUpdate = () => {
	ElMessage.success('已是最新版本！')
}
</script>
<style lang="less">
    img {
        width: 220px;
        height: 220px;
    }
	.astro-a {
		position: absolute;
		top: 22px;
		left: 50%;
		transform: translatex(-50%);
		width: 220px;
		height: auto;
		z-index: -1;
	}
	h1 {
		font-size: 4rem;
		font-weight: 700;
		line-height: 1;
		text-align: center;
		margin-bottom: 1em;
	}
	.text-gradient {
		background-image: var(--accent-gradient);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 400%;
		background-position: 0%;
	}
</style>
<template>
	<div>
		<a href="/" class="astro-a">
			<img alt="Logo" src="/logo.svg" />
		</a>
        <h1>
            <span class="text-gradient">Astro</span><span><sup>{{ version }}</sup></span>
            <div style="text-align: right;">
				<!-- <ElLink type="primary" class="mr-5" href="/docs/astro#/" target="_blank">查看文档</ElLink> -->
                <ElButton type="warning" @click.stop="onUpdate()">{{btnText}}</ElButton>
            </div>
        </h1>
    </div>
</template>