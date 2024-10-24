import { baseApiUrl } from '@/api/index.ts';
import { Card, Row, Col, Typography, Button } from 'antd';
import { useState } from 'react';
const { Meta } = Card;
const { Text } = Typography;
const MovieList = (props:any) => {
    const { data } = props;
    return (
        <Row gutter={16}>
            {
                data.movieList?.map((item:any) => <Col key={item.id} span={24}  xs={{span: 12}} sm={{span: 8}} md={{span: 6}} lg={{span: 4}} xl={{span: 3}} xxl={{span: 3}}>
                    <a href={'/movie/detail?id=' +item.id}>
                        <Card className='relative' cover={<img style={{maxHeight: 260, minHeight: 220}} alt={item.nm} src={item.img} />}>
                            <Meta title={item.nm} description={<Text ellipsis={{ tooltip: item.star }}>主演：{item.star}`</Text>} />
                            {item.sc ? <div className="score text-color-[orange] text-xl absolute bottom-[95px] left-[0] text-right bg-[rgba(0,0,0,0.5)] w-[90%] px-[5.1%] right-[0] z-[100]">{item.sc}</div>:null}
                        </Card>
                    </a>
                </Col>)
            }
        </Row>
    );
}
export default MovieList;