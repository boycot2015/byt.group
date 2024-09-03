import { useEffect, useState, createRef } from "react"
import { Carousel, Typography } from 'antd'
import { CustomEvent } from '@/utils';
const { Text } = Typography;
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '60px',
    color: 'var(--el-color-text)',
    lineHeight: '60px',
    textAlign: 'left',
    background: 'var(--el-color-bg)',
};
const lyric = (props:any) => {
    let [state, setState] = useState({
        lyric: '',
        autoplaySpeed: 0,
        currentIndex: 0,
        currentTime: ''
    })
    let carouselRef = createRef<any>()
    const getData = (playData?:any) => {
        let data:any = window.localStorage.getItem('playData')
        try {
            data = JSON.parse(data)
        } catch (error) {
            data = {}
        }
        setState({
            ...state,
            ...playData || {},
            ...data,
        })
    }
    useEffect(() => {
        getData()
    }, [])
    const onPlay = (playData:any) => {
        getData(playData)
        CustomEvent.on('playing', (audio:any) => {
            let lyricArr = state.lyric?.split('\n').filter((_:any) =>_).map((el:any) => el.split(']')[0].split('[')[1].split('.')[0])
            let min = parseInt(audio.currentTime / 60 + '')
            let sec = parseInt((audio.currentTime % 60).toFixed(2))
            let currentTime = (min < 10 ? ('0' + min) : min) +':'+ (sec < 10 ? ('0' + sec) : sec)
            setState({
                ...state,
                ...playData || {},
                autoplaySpeed: (++state.autoplaySpeed * 100),
                currentTime,
            })
            if (lyricArr.includes(currentTime)) {
                setState({
                    ...state,
                    ...playData || {},
                    autoplaySpeed: 0,
                    currentIndex: lyricArr.indexOf(currentTime),
                    currentTime,
                })
                carouselRef.current?.goTo(lyricArr.indexOf(currentTime), true)
            }
        })
    }
    CustomEvent.on('play', onPlay)
    return (
        <div className={`leading-60px h-[60px] overflow-hidden ${props.className}`}>
            {state.lyric}
            <Carousel dotPosition="left" ref={carouselRef} speed={state.autoplaySpeed || 500} easing={'ease-in-out'} dots={false} autoplay arrows={false} infinite={false}>
            {state.lyric && state.lyric.split('\n').filter((_:any) =>_).map((item:any, index:number) => {
                    return item.split(']')[1] ? <div key={item} className="pl-2 text-left">
                        <Text ellipsis={{ tooltip: item.split(']')[1] }} style={contentStyle}>{item.split(']')[1]}</Text>
                    </div> : <div key={item} className="pl-2 text-left">
                        <Text ellipsis={{ tooltip: item }} style={contentStyle}>{item}</Text>
                    </div>
                })}
            </Carousel>
        </div>
    )
}
export default lyric;