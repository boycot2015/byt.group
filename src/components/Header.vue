<script setup>
import { ref } from 'vue';
import { ElButton } from 'element-plus';
import packageJson from '../../package.json';
const btnText = ref(`更新版本`)
const version = ref(packageJson.dependencies.astro);
const onUpdate = () => {
}
</script>
<style lang="less">
    img {
        width: 40px;
        height: 40px;
    }
	.astro-a {
		position: absolute;
		top: -32px;
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
    <img alt="Logo" src="/logo.svg" />
    <div>
        <h1 >
            Welcome to <span class="text-gradient">Astro</span><span><sup>{{ version }}</sup></span>
            <div style="text-align: right;">
                <ElButton type="primary" @click.stop="onUpdate()">{{btnText}}</ElButton>
            </div>
        </h1>
    </div>
</template>