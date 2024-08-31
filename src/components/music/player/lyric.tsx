import { useEffect, useState } from "react"
import { Carousel, Typography } from 'antd'
import { StorageEmitter } from '@/utils';
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
        lyric: ''
    })
    const getData = () => {
        let data:any = window.localStorage.getItem('playData')
        try {
            data = JSON.parse(data)
        } catch (error) {
            data = {}
        }
        setState({
            ...state,
            ...data,
        })
    }
    useEffect(() => {
        getData()
    }, [])
    StorageEmitter.on('play', () => {
        getData()
    })
    return (
        <div className={`leading-60px h-[60px] overflow-hidden ${props.className}`}>
            <Carousel dotPosition="left" easing={'ease-in-out'} dots={false} autoplay arrows={false} infinite={false}>
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