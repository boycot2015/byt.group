
import { Button, Table, Flex, Typography, Image, Skeleton, ConfigProvider } from 'antd';
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
const playList = (props:any) => {
	let { id, type = '', keyword } = props;
	const tableRef = useRef<any>(null);
	const [loading, setLoading] = useState(false);
    const getParams = new URLSearchParams(window.location.search.split('?')[1]);
    id = id || getParams.get('id');
    keyword = keyword || getParams.get('keyword');
	const [searchType, setSearchType] = useState(getParams.get('searchType') || '0');
	const [state, setState] = useState<{
		totalCount: number;
        info: InfoProp;
		songs: SongProp[];
		hasMore?: boolean;
		currentPage?: number;
		pageSize?: number;
		columns: any[];
	}>({
		totalCount: 0,
		currentPage: 1,
		pageSize: 20,
        info: {},
		songs: [],
		hasMore: true,
		columns: [
			{title: () => <span>歌曲名({0})</span>, dataIndex: 'title', align: 'left'},
			{title:'歌手', dataIndex: 'artist', align: 'left'},
			{title:'专辑', dataIndex: 'album', align: 'left'},
			{title:'操作', dataIndex: 'operate', align: 'left', render: (text:string, record:any) => [
				<Button size='small' key={'play'} className='mr-2'>播放<span className='i-carbon-play-filled-alt text-md'></span></Button>,
				<Button size='small' key={'link'} onClick={() => {
					record.source_url && window.open(record.source_url, '_blank')
				}}>外链<span className='i-carbon-link text-md'></span></Button>
			]},
		]
	});
	const getMusicList = async () => {
		let res = await fetch(`${baseApiUrl}/music?type=${type}`)
		let { data } = await res.json()
		let detail = await fetch(`${baseApiUrl}/music/detail?id=${id||data.result[0]?.id}&type=${type}`)
		let songsRes = await detail.json()
		setState({
			...state,
			info: songsRes.data.info || {},
			totalCount: data.total,
			songs: songsRes.data.tracks || [],
			columns: [
				{title: () => <span>歌曲名({songsRes.data?.tracks?.length || 0})</span>, dataIndex: 'title', align: 'left'},
				...state.columns.slice(1)
			]
			// .filter((el, index, self) => self.findIndex((item) => item.dataIndex === el.dataIndex) === index)
		})
		setLoading(false)
		
	}
	const getSearchData = async ({page = state.currentPage, size = state.pageSize, searchType = '0'} = {} as {page?:number, searchType?:number|string, size?:number}) => {
		setLoading(true)
		tableRef.current?.scrollTo({ top: 0, left: 0 })
		let res = await fetch(`${baseApiUrl}/music?type=${type}`)
		let { data } = await res.json()
		let detail = await fetch(`${baseApiUrl}/music/search?keyword=${keyword}&size=${size}&page=${page||state.currentPage}&type=${type}&searchType=${searchType}`)
		let songsRes = await detail.json()
		setState({
			...state,
			currentPage: page || 1,
			pageSize: size || 1,
			hasMore: !!songsRes.data.hasNextPage,
			totalCount: songsRes.data.total,
			songs: songsRes.data.result || [],
			columns: [
				{title: () => <span>歌曲名({songsRes.data?.tracks?.length || 0})</span>, dataIndex: 'title', align: 'left'},
				...state.columns.slice(1)
			]
			// .filter((el, index, self) => self.findIndex((item) => item.dataIndex === el.dataIndex) === index)
		})
		setLoading(false)
		
	}
    const onPlay = () => {

    }
	const toggleSearchType = () => {
		setSearchType(searchType=='1'?'0':'1')
		getSearchData({ page: 1, searchType: searchType=='1'?'0':'1' })
    }
	useEffect(() => {
		setLoading(true)
		keyword ? getSearchData(): getMusicList()
	}, [id, type, keyword])
	return <ConfigProvider locale={zhCN}>
			{<div className="cover mb-5">
				{!keyword?<div>
					{!loading?<Flex justify="flex-start" align="flex-start">
						<Image
							alt="avatar"
							className='avatar'
							style={{ width: 200, height: 200 }}
							src={state.info?.cover_img_url||''}
						/>
						<Flex vertical align="flex-start" justify="flex-start" style={{ padding: '0 32px' }}>
							<Typography.Title level={2} className='text-left'>
							{state.info?.title || '歌单'}
							</Typography.Title>
							<Flex justify="space-around">
								<Button type='primary' className='mr-2' onClick={onPlay}><span className='i-carbon-play-filled text-xl'></span>播放全部</Button>
								<Button type='default' onClick={() => { state.info.source_url && window.open(state.info.source_url, '_blank') }}>外链<span className='i-carbon-link text-md'></span></Button>
							</Flex>
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
				</div>:<div className="flex justify-end">
					<Button className='mr-2' onClick={toggleSearchType} type={searchType=='0'?'primary':'default'}>歌曲</Button>
					<Button  onClick={toggleSearchType} type={searchType=='1'?'primary':'default'}>歌单</Button>
				</div>}
			</div>}
			<Table
			loading={loading}
			rowKey={'id'}
			ref={tableRef}
			key={'playlist'}
			scroll={keyword?{ x: 'auto', y: 'calc(100vh - 390px)' }:{}}
			pagination={keyword?{
				total: state.totalCount,
				current: state.currentPage || 1,
				pageSize: state.pageSize || 20,
				onChange: (page, size) => { getSearchData({page, size}) }
			}:undefined}
			dataSource={state.songs}
			columns={state.columns}
			/>
	</ConfigProvider>
}
export default playList;
