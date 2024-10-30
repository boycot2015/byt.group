
import { Table, Flex, Typography, Image, Skeleton, ConfigProvider } from 'antd';
import type { TableColumnType } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { baseApiUrl } from '@/api/index';
import zhCN from 'antd/locale/zh_CN';
import type { ArticleProp } from '@/types';

const newsDetailList = (props:any) => {
	let { type = '', title = '' } = props;
	const tableRef = useRef<any>(null);
	const [loading, setLoading] = useState(false);
    const getParams = new URLSearchParams(window.location.search.split('?')[1]);
    type = type || getParams.get('type');
    title = title || getParams.get('title');
	const [state, setState] = useState<{
		totalCount: number;
		list: ArticleProp[];
		hasMore?: boolean;
		currentPage?: number;
		pageSize?: number;
	}>({
		totalCount: 0,
		currentPage: 1,
		pageSize: 20,
		list: [],
		hasMore: true
	});
	const columns:TableColumnType[] = [
		{title:'图片', dataIndex: 'img', width: 80, render: (text:string, record:any) => <Image key={text} className='!w-[auto] !h-[40px] bg-[grey]' src={record.pic || record.src || record.img}></Image>, align: 'left'},
		{title: () => <span>{state.list[0]?.owner||state.list[0]?.artist?'作者':'热度'}</span>, dataIndex: 'owner', width: 80, render: (text:string, record:any, index) => <Typography.Paragraph key={text||index} ellipsis={{ tooltip: text || record.artist || record.hot, rows: 2 }}>{text || record.hot || '--'}</Typography.Paragraph>, align: 'left'},
		{title: '标题', dataIndex: 'title', width: 160, render: (text:string, record:any) => <Typography.Paragraph key={text} ellipsis={{ tooltip: text, rows: 2 }}><Typography.Link  target='_blank' href={record.mobileUrl || record.url}>{text || '--'}</Typography.Link></Typography.Paragraph>, align: 'left'},
		{title: '详情', dataIndex: 'desc', width: 300, render: (text:string, record:any) => <Typography.Paragraph key={text} ellipsis={{ tooltip: text, rows: 2 }}>{text || '--'}</Typography.Paragraph>, align: 'left'},
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
			scroll={{ x: '1000px', y: 'calc(100vh - 350px)'}}
			dataSource={state.list}
			columns={columns}
			/>
	</ConfigProvider>
}
export default newsDetailList;
