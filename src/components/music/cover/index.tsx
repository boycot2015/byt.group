import { Drawer, Image } from "antd";
import { useState } from "react";
import { CustomEvent } from '@/utils';
import Lyric from "../player/lyric";
import './style.less'
import type { PlayData } from "@/types";
const Cover = () => {
    let [state, setState] = useState<PlayData>({
        lyric: '',
        title: '',
        artist: '',
        img_url: '',
        playIndex: 0,
        songs: [],
        visible: false,
        currentTime: ''
    })
    const getData = (playData?:PlayData, isNext?:boolean) => {
        let data = { ...state }
        try {
            data = JSON.parse(window.localStorage.getItem('playData') as string) || playData || {};
        } catch (error) {
            console.log(error, 'error');
        } finally {
            data = {...data, ...playData || {}}
        }
		// if (isNext) {
        //     CustomEvent.emit('playNext', data, data.playIndex)
        // }
        setState({
            ...state,
            ...data
        })
    }
    CustomEvent.on('play', getData)
    CustomEvent.on('toggleCover', (data:PlayData) => {
        setState({
            ...state,
            ...data
        })
    })
    return (
        <Drawer
        open={state.visible}
        closeIcon={false}
        rootStyle={{
            height: '100vh',
        }}
        forceRender={true}
        getContainer={() => document.getElementById('.main-scroll-wrap')!}
        zIndex={100}
        title={<div className="text-xl absolute left-0 w-[100%] px-[30px] z-100 text-center">{state.title + '-' + state.artist}</div>}
        extra={<div onClick={() => {
            setState({
                ...state,
                visible: false
            })
            CustomEvent.emit('toggleCover', {visible: false})
        }}
        className="i-carbon-chevron-down absolute z-100 right-[20px] md:right-[20%] top-[30px] md:top-[15px] text-color-[--color-primary] text-[30px] cursor-pointer"></div>}
        placement="bottom"
        height={'100vh'}
        // rgba(255,255,255,.6)
        className={`cover-drawer !overflow-hidden bg-top !bg-cover !bg-no-repeat`} style={{backgroundImage: `url(${state.img_url})`}}>
            <div className="mask absolute top-0 left-0 w-[100%] h-[100%] !backdrop-blur-xl bg-[rgba(255,255,255,.6)]"></div>
            <div className="cover-main relative z-index-99 md:flex md:h-[100%] justify-center md:items-center">
                <div className="img !w-[20%] mr-20 hidden rounded-md overflow-hidden md:block">
                    <Image src={state.img_url} preview={false} className="rounded-md overflow-hidden" />
                </div>
                <div className="lyirc md:w-[40%] w-[100%] !h-[auto] mt-[15px] md:mt-0">
                    <div className="top flex items-center mb-5">
                        <Image src={state.img_url} preview={false} className="md:hidden rounded-md overflow-hidden !w-[70px] !h-[70px] mr-[15px]" />
                        <div className="text-xl flex flex-col justify-center text-left h-[100%]">
                            <p className="mr-4 line-clamp-1">歌名：{state.title}</p>
                            <p className="line-clamp-1">歌手：{state.artist}</p>
                        </div>
                    </div>
                    <Lyric key="player-Lyric-cover" className="!h-[auto] overflow-y-auto" carouselClass="cover-lyric pt-[0px] h-[70vh] md:h-[60vh] overflow-hidden" />
                </div>
            </div>
            {/* <h1 className="text-center">Cover</h1> */}
        </Drawer>
    );
}
export default Cover