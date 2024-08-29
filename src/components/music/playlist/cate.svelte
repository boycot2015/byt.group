<script lang="ts">
	import { KTabs, KSkeletonButton } from '@ikun-ui/core';
    import { onMount } from 'svelte';
    import { baseApiUrl } from '@/api/index';
	export let value: string | number = '';
    interface KTabsNavItem {
        // Whether tab is disabled
        disabled?: boolean;
        label: string;
        value?: string;
        uid: string | number;
        // Whether tab is closeable
        closeable?: boolean;
    }
    let cateList:KTabsNavItem[] = [];
    let loading: boolean = true;
	const getMusicData = async () => {
		let res = await fetch(`${baseApiUrl}/music/cate`)
		let { data } = await res.json()
		cateList = data.map((el:any) => ({
            label: el.title + '音乐',
            uid: el.type
        }))
        if (!value) cateList[0].uid;
        loading = false;
	}
    onMount(() => {
        getMusicData()
    })
	const handleClick = (e:any) => {
		value = e.detail.uid;
        // console.log(value, 'value');
        const getParams = new URLSearchParams(window.location.search.split('?')[1]);
        let keyword = getParams.get('keyword');
        let url = `/music/${e.detail.uid}`
        if (keyword) url = `/music/${e.detail.uid}/search?keyword=${keyword}`
        window.location.href = url
	};
</script>
{ #if loading}
    <div class="flex leading-32px mt-2 mb-6 ml-4">
        { #each '123456' as item}
        <KSkeletonButton cls="mr-10" key={item} loading={true}></KSkeletonButton>
        {/each}
    </div>
{ :else }
    <KTabs navOptions={cateList} type='card' on:click={handleClick} {value}></KTabs>
{/if}