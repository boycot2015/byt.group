import { createSignal, createEffect, For, Show, splitProps } from 'solid-js';
import { baseApiUrl } from '@/api';
import { Dialog, useDialog } from '@ark-ui/solid/dialog'
import { CustomEvent } from '@/utils';
// import { Tabs, DatePicker, parseDate } from '@ark-ui/solid'
 const Wallpaper = (props) => {
     const [state, setState] = createSignal({
        loading: true,
        cateLoading: true,
        pageLoading: true,
        count: 50,
        currentPage: 1,
        type: props.type || 'default',
        id: '',
        cates: [],
        source: [],
        list: [],
        total_count: 0
     });
     createEffect(() => {
        const getSource = async () => {
            let keyword = new URLSearchParams(location.search).get('keyword') || '';
            let res = await fetch(`${baseApiUrl}/wallpaper?source=${props.type}${keyword?('&keyword='+keyword):''}&size=12`).then((res) => res.json()).catch(console.log);
            setState({ ...state(), ...res.data, cateLoading: false, pageLoading: false, loading: false });
            // console.log(state(), res, 'state');
        }
        getSource();
    }, 0)
    const getData = async ({ type, id, page = 1 } = {}) => {
        setState({ ...state(), loading: !!id, cateLoading: !id, type, id, currentPage: page });
        let res = await fetch(`${baseApiUrl}/wallpaper?source=${type||state().type||props.type}${id?('&id='+id):''}&size=12&page=${page || 1}`).then((res) => res.json()).catch(console.log);
        // , list: [...state.list, ...res.data.list].filter((el, index, self) => self.findIndex(val => val.id === el.id) === index)
        setState({ ...state(), ...res.data, loading: false, cateLoading: false });
    }
    const setDialogOpen = (row, index, data) => {
        CustomEvent.emit('imageViewer', { row, index: index(), data })
    }
    return <div class="pb-[20px]">
        <Show when={!state().pageLoading} fallback={<div>加载中...</div>}>
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
            <Show when={!state().loading && !state().cateLoading} fallback={<div>加载中...</div>}>
                <div class="list flex flex-wrap my-2 mx-[-1%] mr-[-2%] pb-5">
                    <For each={state().list.slice(0, state().count || 20) || []}>
                    {(item, index) => <div onClick={() => setDialogOpen(item, index, state().list.slice(0, state().count || 20))} class="rounded-xl w-[48%] sm:w-[31%] cursor-pointer h-[200px] m-[1%] overflow-hidden"><img class={`w-[100%] h-[100%] object-cover transition-all ease-in-out duration-300 hover:scale-120`} title={item.img_title} src={item.img || item.url}alt="" /></div>}
                    </For>
                </div>
                <div class="page mb-[10px] text-center flex justify-around w-[100%] text-color-[var(--color-primary)]">
                    {state().currentPage ?<div class="prev flex cursor-pointer justify-between" onClick={() => getData({id: state().id, type: state().type,page: --state().currentPage})}><div class="i-carbon-arrow-left text-[24px] mr-[10px]"></div>上一页</div>:null}
                    <div class="next flex cursor-pointer justify-between"  onClick={() => getData({id: state().id, type: state().type,page: ++state().currentPage})}>下一页<div class="i-carbon-arrow-right text-[24px] ml-[10px]"></div></div>
                </div>
            </Show>
        </Show>
    </div>;
}
export default Wallpaper;