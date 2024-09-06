import { useEffect, useState, useReducer, useRef } from "react"
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
type State = {
    lyric?: string;
    currentIndex: number
    lyircArr: string[]
    currentTime: string
  };
const lyric = (props:any) => {
    let carouselRef = useRef<any>()
    const [state, dispatch] = useReducer(reducer, {
        lyric: '',
        lyircArr: [],
        currentIndex: 0,
        currentTime: ''
    });
    function reducer(state: State, action: any): State {
        switch (action.type) {
          case 'setData':
            let lyircArr = action.data?.lyric.trim()?.split('\n').filter((_:any) =>_ && _.split(']')[1]) || []
            if (action.data.audio) {
                let timeArr = lyircArr.map((el:any) => el.split(']')[0].split('[')[1].split('.')[0])
                timeArr = [...timeArr]
                let min = parseInt(action.data.audio.currentTime / 60 + '')
                let sec = parseInt((action.data.audio.currentTime % 60).toFixed(3))
                let currentTime = (min < 10 ? ('0' + min) : min) +':'+ (sec < 10 ? ('0' + sec) : sec)
                if (timeArr.indexOf(currentTime) > - 1 && timeArr.indexOf(currentTime) >= state.currentIndex) {
                    // console.log(state.currentTime, currentTime, timeArr, 'state.currentIndex');
                    carouselRef.current?.goTo(timeArr.indexOf(currentTime))
                }
                return { ...state, ...action.data, lyircArr, currentTime, currentIndex: timeArr.indexOf(currentTime) };
            }
            return { ...state, ...action.data, lyircArr };
          default:
            throw new Error();
        }
      }
    const getData = (playData?:any) => {
        let data:any = window.localStorage.getItem('playData') || {}
        try {
            data = JSON.parse(data)
        } catch (error) {
            console.log(error, 'getPlayData');
        } finally {
            data = { ...data, ...playData || {} }
        }
        dispatch({
            type: 'setData',
            data: {
                ...data,
            }
        })
        CustomEvent.on('playing', (audio:any) => playing(audio, {
            ...state,
            ...playData || {},
            ...data,
        }))
    }
    const playing = (audio:any, playData?:any) => {
        dispatch({
            type: 'setData',
            data: {
                audio,
                ...playData || {}
            }
        })
    }
    useEffect(() => {
        getData()
        const onPlay = (playData?:any) => {
            // count = 5
            getData(playData)
        }
        CustomEvent.on('play', onPlay)
    }, [])
    return (
        <div className={`leading-60px h-[60px] overflow-hidden ${props.className}`}>
            <Carousel dotPosition="left" ref={carouselRef} autoplaySpeed={2000} speed={500} easing={'ease-in-out'} dots={false} autoplay={false} arrows={false} infinite={false} {...props} className={props.carouselClass||''}>
            {state.lyircArr.map((item:any, index:number) => {
                    return <div key={item} className="pl-2 text-left">
                        <Text style={contentStyle}>{item.split(']')[1]}</Text>
                    </div>
                })}
            </Carousel>
        </div>
    )
}
export default lyric;