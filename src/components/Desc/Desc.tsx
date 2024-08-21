import { useState } from 'react';
import { Button, message } from 'antd';
import './desc.less';
const words = [
    `若黯夜终临 吾必立于万万人前 横刀向渊 血染苍穹 ---守夜人·赵空城`,
    `人只有走出来的美丽，没有等出来的辉煌。 ---《美丽人生》`,
    `遇事不决，可问春风。 ---剑来`,
    `岁岁平、岁岁安、岁岁平安 ---陈平安`,
    `死亡并不可怕，可怕的是被人遗忘。`,
    `尽人事，听天命。`,
]
export default function Desc (props: any): JSX.Element|any {
    const [state, setState] = useState({
        code: words[Math.floor(Math.random() * words.length)]
    })
    const onClick = async () => {
        setState({ code: words[Math.floor(Math.random() * words.length)] })
        // message.success('successfully! current directory is：' + code)
    }
    return (<div className='instructions'>
        <p>{state.code}</p>
        <div className='text-right'>
            <Button type='primary' onClick={() => onClick()}>更换名场面</Button>
        </div>
    </div>)
}