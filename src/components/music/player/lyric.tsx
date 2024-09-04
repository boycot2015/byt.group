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
    currentTime: string
  };
const lyric = (props:any) => {
    // let [state, setState] = useState({
    //     lyric: '',
    //     currentIndex: 0,
    //     currentTime: ''
    // })
    const [state, dispatch] = useReducer(reducer, {
            lyric: '',
            currentIndex: 0,
            currentTime: ''
        });
    function reducer(state: State, action: any): State {
        switch (action.type) {
          case 'setData':
            return { ...state, ...action.data };
          case 'setLyric':
            return { ...state, ...action.data };
          default:
            throw new Error();
        }
      }
    let carouselRef = useRef<any>()
    const getData = (playData?:any) => {
        let data:any = window.localStorage.getItem('playData')
        try {
            data = JSON.parse(data)
        } catch (error) {
            data = {}
        }
        dispatch({
            type: 'setData',
            data: {
                ...playData || {},
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
        let lyricArr = playData.lyric?.split('\n').filter((_:any) =>_).map((el:any) => el.split(']')[0].split('[')[1].split('.')[0])
        let min = parseInt(audio.currentTime / 60 + '')
        let sec = parseInt((audio.currentTime % 60).toFixed(3))
        let currentTime = (min < 10 ? ('0' + min) : min) +':'+ (sec < 10 ? ('0' + sec) : sec)
        dispatch({
            type: 'setData',
            data: {
                ...playData || {},
                currentIndex: lyricArr.indexOf(currentTime),
                currentTime,
            }
        })
        if (lyricArr.includes(currentTime)) {
            carouselRef.current?.goTo(lyricArr.indexOf(currentTime) || state.currentIndex)
        }
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
            <Carousel dotPosition="left" ref={carouselRef} autoplaySpeed={2000} speed={500} easing={'ease-in-out'} dots={false} autoplay={false} arrows={false} infinite={false}>
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