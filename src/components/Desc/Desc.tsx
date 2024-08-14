import { useState } from 'react';
import { Button } from 'antd';
import './desc.less'
export default function Desc (props: any): JSX.Element|any {
    const [state, setState] = useState({
        code: 'src/pages'
    })
    const onClick = () => {
        setState({ code: state.code === 'src/pages' ? 'src/views' : 'src/pages' })
    }
    return (<div className='instructions'>
        To get started, open the directory <code>{state.code}</code> in your project.<br />
        <strong>Code Challenge:</strong> Tweak the "Welcome to Astro" message above.
        <Button type='primary' onClick={() => onClick()}>click me to change directory</Button>
    </div>)
}