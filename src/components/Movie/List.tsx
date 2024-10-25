import { baseApiUrl } from '@/api/index.ts';
import { Card, Row, Col, Typography, Spin } from 'antd';
import { useState, useEffect } from 'react';
const { Meta } = Card;
const { Text } = Typography;
const MovieList = (props:any) => {
    // const { data } = props;
    const [data, setState] = useState({}) as any;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            const params = new URLSearchParams(window.location.search);
            let res = await fetch(baseApiUrl + '/movie/list?type=' + (params.get('type') || 'hot'));
            let data = await res.json();
            setState(data?.data || {});
        };
        getData();
        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [])
    return (
        <Spin spinning={loading}>
            <Row gutter={16}>
                {
                    data.movieList?.map((item:any) => <Col key={item.id} span={24}  xs={{span: 12}} sm={{span: 8}} md={{span: 6}} lg={{span: 6}} xl={{span: 4}} xxl={{span: 3}} className="mb-[16px]">
                        <a href={'/movie/detail?id=' +item.id}>
                            <Card className='relative' cover={<img style={{maxHeight: 260, minHeight: 220}} alt={item.nm} src={item.img} />}>
                                <Meta title={item.nm} description={<Text ellipsis={{ tooltip: item.star }}>主演：{item.star}`</Text>} />
                                {item.sc ? <div className="score text-color-[orange] text-xl absolute bottom-[95px] left-[0] text-right bg-[rgba(0,0,0,0.5)] w-[100%] px-[5%] right-[0] z-[100]">{item.sc}</div>:null}
                            </Card>
                        </a>
                    </Col>)
                }
            </Row>
        </Spin>
    );
}
export default MovieList;