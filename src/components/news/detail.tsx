
import { Table, Flex, Typography, Image, Skeleton, ConfigProvider } from 'antd';
import type { TableColumnType } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { baseApiUrl } from '@/api/index';
import zhCN from 'antd/locale/zh_CN';
type InfoProp = {
	cover_img_url?: string
	title?: string
	id?: string
	source_url?: string
}
type SongProp = {
	id: string
    title: string
    artist: string
    artist_id: string
    album: string
    album_id: string
    source: string
    source_url: string
    img_url: string
    url: string
    disabled: boolean
}
const newsDetailList = (props:any) => {
	let { type = '', title = '' } = props;
	const tableRef = useRef<any>(null);
	const [loading, setLoading] = useState(false);
    const getParams = new URLSearchParams(window.location.search.split('?')[1]);
    type = type || getParams.get('type');
    title = title || getParams.get('title');
	const [state, setState] = useState<{
		totalCount: number;
        info: InfoProp;
		list: SongProp[];
		hasMore?: boolean;
		currentPage?: number;
		pageSize?: number;
	}>({
		totalCount: 0,
		currentPage: 1,
		pageSize: 20,
        info: {},
		list: [],
		hasMore: true
	});
	const columns:TableColumnType[] = [
		{title:'图片', dataIndex: 'album', width: '80px', render: (text:string, record:any) => <Image className='!w-[80px] bg-[grey]' src={record.pic || record.src || record.img}></Image>, align: 'left'},
		{title:'作者', dataIndex: 'owner', width: '120px', render: (text:string, record:any) => text || '--', align: 'left'},
		{title: '标题', dataIndex: 'title', width: '180px', render: (text:string, record:any) => <a href={record.mobileUrl || record.url} target='_blank'>{text}</a>, align: 'left'},
		{title: '详情', dataIndex: 'desc', render: (text:string, record:any) => text || '--', align: 'left'},
	]
	const getListData = async () => {
		let res = await fetch(`${baseApiUrl}/hots?name=${type}`)
		let { data } = await res.json()
		setState({
			...state,
			totalCount: data.total || 0,
			list: data || []
		})
		setLoading(false)
		
	}
	useEffect(() => {
		setLoading(true)
		getListData()
	}, [type])
	return <ConfigProvider locale={zhCN}>
			{<div className="cover mb-5">
				{<div>
					{!loading?<Flex justify="flex-start" align="flex-start">
						<Flex vertical align="flex-start" justify="flex-start" style={{ padding: '0 32px' }}>
							<Typography.Title level={2} className='text-left'>
							{title || '标题'}
							</Typography.Title>
						</Flex>
					</Flex>:<Flex justify="flex-start" align="flex-start">
						<Skeleton.Image active={true}></Skeleton.Image>
						<Flex vertical align="flex-start" justify="flex-start" style={{ padding: '0 32px' }}>
							<Skeleton paragraph={false} />
							<Flex justify="space-around">
								<Skeleton.Button style={{marginRight: 10}} /><Skeleton.Button style={{marginRight: 10}} /><Skeleton.Button />
							</Flex>
						</Flex>
					</Flex>}
				</div>}
			</div>}
			<Table
			loading={loading}
			rowKey={'id'}
			ref={tableRef}
			key={'playlist'}
			scroll={{ x: 'auto', y: 'calc(100vh - 390px)'}}
			dataSource={state.list}
			columns={columns}
			/>
	</ConfigProvider>
}
export default newsDetailList;
