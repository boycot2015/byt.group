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
                data.movieList?.map((item:any) => <Col key={item.id} span={4}>
                    <a href={'/movie/detail?id=' +item.id}>
                        <Card className='relative' cover={<img height={260} alt={item.nm} src={item.img} />}>
                            <Meta title={item.nm} description={<Text ellipsis={{ tooltip: item.star }}>主演：{item.star}`</Text>} />
                            {item.sc && <div className="score text-color-[orange] text-xl absolute bottom-[100px] right-[10px] z-[100]">{item.sc}</div>}
                        </Card>
                    </a>
                </Col>)
            }
        </Row>
    );
}
export default MovieList;