import { baseApiUrl } from '@/api/index.ts';
import { Card, Row, Col, Typography, Spin, Skeleton, Image, List, Button,
    ConfigProvider
 } from 'antd';
import { useState, useEffect } from 'react';
const { Meta } = Card;
const { Text } = Typography;
import zhCN from 'antd/locale/zh_CN';
const MovieList = (props:any) => {
    // const { data } = props;
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(1);
    const [ids, setIds] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [initLoading, setInitLoading] = useState(true);
    const [data, setData] = useState([]) as any;
    const [list, setList] = useState([]) as any;
    useEffect(() => {
        const getData = async () => {
            const params = new URLSearchParams(window.location.search);
            let res = await fetch(baseApiUrl + '/movie/list?limit=12&type=' + (params.get('type') || 'hot') + '&keyword=' + params.get('keyword') + '&offset=' + offset);
            let data = await res.json();
            setIds(data?.data?.movieIds || []);
            setData(data?.data?.movieList || {});
            setList(data?.data?.movieList || {});
            setInitLoading(false);
            setLoading(false);
        };
        getData();
    }, [])
    const onLoadMore = () => {
        setLoading(true);
        setOffset(offset + 1);
        setList(
            data.concat([...new Array(12)].map(() => ({ loading: true }))),
          );
        const params = new URLSearchParams(window.location.search);
        fetch(baseApiUrl + '/movie/list?type=' + (params.get('type') || 'hot') + '&limit=12&offset=' + (offset + 1) + '&movieIds=' + ids.slice(offset * 12, 12 * (offset + 1)).join(',') + '&keyword=' + params.get('keyword'))

          .then((res) => res.json())
          .then((res) => {      
            setData(data.concat(res.data?.movieList || []));
            setList(data.concat(res.data?.movieList || []));
            setLoading(false);
            setHasMore((res.data?.total > 12 * (offset + 1)) || (res.data?.paging?.total > 12 * (offset + 1)) || ids.slice(offset * 12, 12 * (offset + 1)).length === 12 || false)
            window.dispatchEvent(new Event('resize'));
          });
      };
      const loadMore =
      !initLoading && !loading && hasMore ? (
        <div
          style={{
            textAlign: 'center',
            paddingBottom: 12,
            lineHeight: '32px',
          }}
        >
          <Button type='text' onClick={onLoadMore}>加载更多 <i className="i-carbon-chevron-down"></i></Button>
        </div>
      ) : null;
    return (
        <ConfigProvider locale={zhCN}>
                <List
                className='flex flex-col justify-between w-[100%] h-[100%]'
                loading={initLoading}
                dataSource={list}
                grid={{
                    gutter: 16,
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 8
                }}
                loadMore={loadMore}
                renderItem={(item:any) => (
                    <div className='mb-[16px] px-[8px]'><a href={'/movie/detail?id=' +item.id}>
                        {item.loading || initLoading ? <Skeleton.Image style={{marginBottom: 10, width: '190px', height: '260px'}} active /> : null}
                        <Skeleton title paragraph={{rows: 2, width: '100%'}} loading={item.loading || initLoading} active>
                            <Card className='relative !rounded-[10px] overflow-hidden shadow-lg hover:translate-y-[-3px] transition-all duration-400' cover={<Image preview={false} style={{height: 260, fill: 'cover'}} alt={item.nm} src={item.img} />}>
                                {<Meta title={item.nm} description={item.star?<Text ellipsis={{ tooltip: item.star }}>主演：{item.star}</Text>:null} />}
                                {item.sc ? <div className="score text-color-[orange] text-xl absolute bottom-[102px] left-[0] text-right bg-[rgba(0,0,0,0.5)] w-[100%] px-[5%] right-[0] z-[10]">{item.sc}</div>:null}
                            </Card>
                        </Skeleton>
                    </a></div>
                )}
                ></List>
        </ConfigProvider>
    );
}
export default MovieList;