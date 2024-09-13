import { Drawer, Image } from "antd";
import { useState } from "react";
import { CustomEvent } from '@/utils';
import Lyric from "../player/lyric";
// import 'virtual:uno.css';
import './style.less'
const Cover = () => {
    let [state, setState] = useState({
        lyric: '',
        title: '',
        artist: '',
        img_url: '',
        playIndex: 0,
        visible: false,
        currentTime: ''
    })
    const getData = (playData?:any, isNext?:boolean) => {
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
    CustomEvent.on('toggleCover', (data:any) => {
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
        title={<div className="text-xl text-center">{state.title + '-' + state.artist}</div>}
        extra={<div onClick={() => {
            setState({
                ...state,
                visible: false
            })
            CustomEvent.emit('toggleCover', {visible: false})
        }}
        className="i-carbon-close text-[30px] cursor-pointer"></div>}
        placement="bottom"
        height={'100vh'}
        className={`cover-drawer !overflow-hidden !backdrop-blur-md !bg-[rgba(255,255,255,.6)]`}>
            <div className="cover-main flex h-full justify-center items-center">
                <div className="img !w-[20%] mr-20 hidden md:block">
                    <Image src={state.img_url} />
                </div>
                <div className="lyirc md:w-[40%] w-full">
                    <div className="text-xl text-left flex flex-col md:flex-row mb-5">
                        <span className="mr-4">歌名：{state.title}</span>
                        <span>歌手：{state.artist}</span>
                    </div>
                    <Lyric key="player-Lyric-cover" className="!h-[auto] overflow-y-auto" carouselClass="cover-lyric pt-[0px] h-[70vh] md:h-[450px] overflow-hidden" />
                </div>
            </div>
            {/* <h1 className="text-center">Cover</h1> */}
        </Drawer>
    );
}
export default Cover