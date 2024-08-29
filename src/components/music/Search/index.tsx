import { Input } from 'antd';
import { useState } from 'react';
import type { GetProps } from 'antd';
const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;
const SearchComponent = (props:any) => {
    const getParams = new URLSearchParams(window.location.search.split('?')[1])
    const [keyword, setKeyword] = useState(getParams.get('keyword') as string || '')
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        if (info?.source ==='clear') {
            setKeyword('');
            window.location.href = `/music/${props.type||'netease'}`
            return
        }
        if (!value) return;
        window.location.href = `/music/${props.type||'netease'}/search?keyword=${value}`
    };
    return (
        <div className={props.className}>
            <Search
            placeholder="请输入关键词"
            size="large"
            allowClear
            value={keyword}
            onChange={(e) => {
                setKeyword(e.target.value);
            }}
            onSearch={onSearch}
            />
        </div>
    );
}
export default SearchComponent;