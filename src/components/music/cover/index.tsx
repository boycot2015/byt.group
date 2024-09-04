import { Drawer } from "antd";
import { useState } from "react";
import { CustomEvent } from '@/utils';
import 'virtual:uno.css';
const Cover = () => {
    let [state, setState] = useState({
        lyric: '',
        title: '',
        img_url: '',
        currentIndex: 0,
        visible: false,
        currentTime: ''
    })
    CustomEvent.on('showCover', (data:any) => {
        setState({
            ...state,
            visible: true,
            ...data
        })
    })
    return (
        <Drawer
        open={state.visible}
        closeIcon={false}
        title={<div className="text-xl text-center">{state.title}</div>}
        extra={<div onClick={() => {
            setState({
                ...state,
                visible: false
            })
        }}
        className="i-carbon-close text-[30px] cursor-pointer"></div>}
        placement="bottom"
        height={'100vh'}
        className="!backdrop-blur-md">
            {state.lyric}
            {state.img_url}
            <h1>Cover</h1>
        </Drawer>
    );
}
export default Cover