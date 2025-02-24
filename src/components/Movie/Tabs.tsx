import { Tabs } from 'antd'
import { useState, useEffect } from 'react'
// let cates = {
//     hot: '热映',
//     comming: '即将上映',
//     expceted: '最期待',
//     class: '经典'
// };
let cates = [
    {
        key: 'hot',
        label: '热映',
    },
    {
        key: 'coming',
        label: '即将上映',
    },
    {
        key: 'expected',
        label: '最期待',
    },
    {
        key: 'class',
        label: '经典',
    },
]
export default () => {
    const [active, setActive] = useState('hot')
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setActive(params.get('type') || 'hot')
    }, [])
    const onChange = (key:string) => {
        // window.location.replace(`/movie?type=${key}`)
        let link = document.createElement('a')
        link.href = `/movie?type=${key}`
        document.body.appendChild(link)
        link.click()
        setTimeout(() => {
            document.body.removeChild(link)
        }, 100);
    }
    return (
        <Tabs activeKey={active} defaultActiveKey="hot" items={cates} onChange={onChange}>
        </Tabs>
    )
}