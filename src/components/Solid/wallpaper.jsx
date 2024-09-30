import { createSignal, createEffect, For, Show } from 'solid-js';
import { baseApiUrl } from '@/api'
 const Hello = (props) => {
     const [state, setState] = createSignal({
        loading: true,
        cateLoading: true,
        pageLoading: true,
        count: 50,
        currentPage: 1,
        type: props.type || 'birdpaper',
        id: '',
        cates: [],
        source: [],
        list: [],
        total_count: 0
     });
     createEffect(() => {
        const getSource = async () => {
            let keyword = new URLSearchParams(location.search).get('keyword') || '';
            let res = await fetch(`${baseApiUrl}/wallpaper?source=${props.type}${keyword?('&keyword='+keyword):''}&size=50`).then((res) => res.json()).catch(console.log);
            setState({ ...state(), ...res.data, cateLoading: false, pageLoading: false, loading: false });
            // console.log(state(), res, 'state');
        }
        getSource();
    }, 0)
    const getData = async ({ type, id } = {}) => {
        console.log(state(), type, id, 'state');
        setState({ ...state(), loading: !!id, cateLoading: !id, type, id });
        let res = await fetch(`${baseApiUrl}/wallpaper?source=${type||state().type||props.type}${id?('&id='+id):''}&size=50`).then((res) => res.json()).catch(console.log);
        setState({ ...state(), ...res.data, loading: false, cateLoading: false });
    }
    return <Show when={!state().pageLoading} fallback={<div>Loading...</div>}>
        <div class="nav flex flex-wrap">
            <For each={state().source.sort((a, b) => a.sort - b.sort ) || []}>
            {(item) => <div onClick={() => getData({type: item.value})}
            class={`my-2 mr-5 cursor-pointer ${item.value == state().type?'text-color-[var(--color-primary)]':''}`}>{item.label}</div>}
            </For>
        </div>
        <Show when={!state().cateLoading}>
            <div class="cate flex flex-wrap">
                <For each={state().cates || []}>
                {(item) => <div onClick={() => getData({id: item.id, type: state().type})}
                class={`my-1 mr-2 cursor-pointer ${item.id == state().id?'text-color-[var(--color-primary)]':''}`}>{item.name}</div>}
                </For>
            </div>
        </Show>
        <Show when={!state().loading && !state().cateLoading} fallback={<div>Loading...</div>}>
            <div class="list flex flex-wrap my-2 pb-5">
                <For each={state().list.slice(0, state().count || 20) || []}>
                {(item) => <img class={`w-[50%] sm:w-[33.33%] md:w-[25%] xl:w-[20%]`} title={item.img_title} src={item.img || item.url}alt="" />}
                </For>
            </div>
        </Show>
    </Show>;
}
export default Hello;