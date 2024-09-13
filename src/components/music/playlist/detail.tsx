
import { Button, Table, Flex, Typography, Image, message,
	Skeleton, ConfigProvider, Modal } from 'antd';
import type { TableColumnType } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { baseApiUrl } from '@/api/index';
import zhCN from 'antd/locale/zh_CN';
import { CustomEvent } from '@/utils';
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
const playListDetail = (props:any) => {
	let { id, type = '', keyword, simple } = props;	
	const tableRef = useRef<any>(null);
	const [loading, setLoading] = useState(false);
	let requestTimes = 0;
    const getParams = new URLSearchParams(window.location.search.split('?')[1]);
    id = id || getParams.get('id');
    keyword = keyword || getParams.get('keyword');
	const [searchType, setSearchType] = useState('0');
	const [state, setState] = useState<{
		totalCount: number;
        info: InfoProp;
		type: string;
		songs: SongProp[];
		hasMore?: boolean;
		currentPage?: number;
		playIndex: number;
		pageSize?: number;
	}>({
		totalCount: 0,
		currentPage: 1,
		pageSize: 20,
        info: {},
		type: '',
		songs: [],
		playIndex: 0,
		hasMore: true
	});
	const columns:TableColumnType[] = [
		{title:'封面', dataIndex: 'img_url', hidden: false, width: '70px', render: (text:string, record:any) => <Image src={text} className='!w-[40px]' onClick={(e) => e.stopPropagation()} />, align: 'left'},
		{title: () => <span>{searchType == '0' ?'歌曲':'歌单'}名({state.totalCount || state.songs?.length || 0})</span>, width: '180px', dataIndex: 'title', align: 'left'},
		{title: () => <span>{searchType == '0' ?'歌手':'作者'}</span>, dataIndex: 'artist', width: '160px', render: (text:string, record:any) => record.artist || record.author, align: 'left'},
		{title:'专辑', dataIndex: 'album', hidden: false, width: '220px', render: (text:string, record:any) => text || '--', align: 'left'},
		{title:'操作', dataIndex: 'operate', align: 'left', width: '200px', render: (text:string, record:any, index: number) => [
			<Button onClick={() => {
				searchType == '0' && onPlay(record, index)
				searchType == '1' && (window.location.href = `/music/${type}/playlist?id=${record.id}`)
			}} size='small' key={'play'} className='mr-2'>{searchType == '0' ? <span className='i-carbon-play-filled-alt text-md'></span>:<span className='i-carbon-view text-md'></span>}{searchType == '0'?'播放':'详情'}</Button>,
			<Button size='small' key={'link'} onClick={() => {
				record.source_url && window.open(record.source_url, '_blank')
			}}><span className='i-carbon-link text-md'></span>外链</Button>
		]},
	]
	const getMusicList = async () => {
		let res = await fetch(`${baseApiUrl}/music?type=${type}`)
		let { data } = await res.json()
		id = id || data.result[0]?.id
		if (simple) {
			let playData = {}
			try {
				playData = JSON.parse(window.localStorage.getItem('playData') as string) || {};
			} catch (error) {
				console.log(error, 'error');
			} finally {
				playData = {...playData || {}}
			}
			setState({
				...state,
				...playData
			})
			setLoading(false)
			return
		}
		// if (id.includes('kg')){
		// 	// const target_url = `https://m.kugou.com/plist/list/${id}?json=true`;
  		// 	// window.open(target_url, '_blank');
		// 	// let detail = await fetch(target_url, {redirect: 'manual', headers: { Referer: 'https://www.kugou.com/' } })
		// 	// 	fetch('/302', { redirect: 'manual' }).then(async res => {
		// 	// 		console.log("Fetch Basic Res:", res)
		// 	// 		console.log("Fetch JSON Res:", await res.json())
		// 	// 	  }).catch(err => {
		// 	// 		console.log("Fetch Error:", err)
		// 	// 	  })
		// 	// 	let songsRes = await detail.json()
		// 	// console.log(detail, 'songsRes');
		// 	setLoading(false)
		// 	return
		// }
		let detail = await fetch(`${baseApiUrl}/music/detail?id=${id}&type=${type}`)
		let songsRes = await detail.json()
		setState({
			...state,
			info: songsRes.data.info || {},
			totalCount: data.total,
			songs: songsRes.data.tracks.map((el:any) => ({...el, type})) || []
		})
		setLoading(false)
		
	}
	const getSearchData = async ({page = state.currentPage, size = state.pageSize, searchType = '0' } = {} as {page?:number, searchType?:string, size?:number}) => {
		setLoading(true)
		setSearchType(searchType)
		tableRef.current?.scrollTo({ top: 0, left: 0 })
		let detail = await fetch(`${baseApiUrl}/music/search?keyword=${keyword}&size=${size}&page=${page||state.currentPage}&type=${type}&searchType=${searchType}`)
		let songsRes = await detail.json()
		setState({
			...state,
			currentPage: page || 1,
			pageSize: size || 1,
			hasMore: !!songsRes.data.hasNextPage,
			totalCount: songsRes.data.total,
			songs: songsRes.data.result.map((el:any) => ({...el, type})) || [],
			// .filter((el, index, self) => self.findIndex((item) => item.dataIndex === el.dataIndex) === index)
		})
		setLoading(false)
		
	}
    const onPlay = async (item?:any, index?:number) => {
		if (!item) {
			Modal.confirm({
				title:'提示',
				content:'此操作会替换播放列表, 确定继续?',
				onOk: () => {
					onPlay(state.songs[0], 0);
				}
			})
			return
		}
		item = item || state.songs[index||0] || {}
		try {
			let playData = {
				...item,
				type,
				songs: (state.songs.length ? state.songs : item.songs) || [],
				playIndex: index || 0
			}
			setTimeout(() => {
				requestTimes = 0;
			}, 200);
			if (!item.id || requestTimes) return
			requestTimes++
			let lyricData = await fetch(`${baseApiUrl}/music/lyric?id=${item.id}&type=${type||item.type}`);
			let urlDta = await fetch(`${baseApiUrl}/music/url?id=${item.id}&type=${type||item.type}`);
			let lyricRes = await lyricData.json();
			let urlRes = await urlDta.json();
			playData = { ...playData, ...lyricRes.data, type: type || item.type, url: urlRes.data?.url || urlRes.data };
			if(!urlRes.data && !urlRes.data?.url) {
				message.info('获取歌曲失败，无法播放此歌曲~');
			}
			window.localStorage.setItem('playData', JSON.stringify(playData))
			CustomEvent.emit('play', playData)
		} catch (error) {
			console.log(error, item, index, 'isNext');
		}
    }
	const toggleSearchType = (searchType:any) => {
		getSearchData({ page: 1, searchType })
    }
	useEffect(() => {
		setLoading(true)
		keyword ? getSearchData(): getMusicList()
	}, [id, type, keyword])
	// CustomEvent.on('playNext', onPlay)
	return <ConfigProvider locale={zhCN}>
			{!simple && <div className="cover mb-5">
				{!keyword?<div>
					{!loading?<Flex justify="flex-start" align="flex-start">
						<Image
							alt="avatar"
							className='avatar !w-[120px] !h-[120px] md:!w-[200px] md:!h-[200px]'
							src={state.info?.cover_img_url||''}
						/>
						<Flex vertical align="flex-start" justify="flex-start" style={{ padding: '0 32px' }}>
							<Typography.Title level={2} className='text-left !text-xl lg:text-xxl'>
							{state.info?.title || '歌单'}
							</Typography.Title>
							<Flex justify="space-around">
								<Button type='primary' className='mr-2' disabled={state.songs && !state.songs.length} onClick={() =>onPlay()}><span className='i-carbon-play-filled text-xl'></span>播放全部</Button>
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
					{keyword && <Button type='primary' className='mr-2' onClick={() =>onPlay()}><span className='i-carbon-play-filled text-xl'></span>播放全部</Button>}
					<Button className='mr-2' onClick={() => toggleSearchType('0')} type={searchType=='0'?'primary':'default'}>歌曲</Button>
					<Button  onClick={() => toggleSearchType('1')} type={searchType=='1'?'primary':'default'}>歌单</Button>
				</div>}
			</div>}
			<Table
			loading={loading}
			rowKey={'id'}
			ref={tableRef}
			key={'playlist'}
			rowClassName={(record, index) => {
				return index == state.playIndex ? '!text-color-[var(--el-color-primary)]' : ''
			}}
			className={`${simple && '!w-[100%] !md:w-[850px]'}`}
			onRow={(record, index) => {
				return {
					onClick: (event) => {
						if (document.body.offsetWidth > 768) return
						event.preventDefault();event.stopPropagation();event.nativeEvent.stopImmediatePropagation();
						searchType == '0' && onPlay(record, index)
						searchType == '1' && (window.location.href = `/music/${type}/playlist?id=${record.id}`)
					}, // 点击行
					onDoubleClick: (event) => {
						event.preventDefault();event.stopPropagation();event.nativeEvent.stopImmediatePropagation();
						searchType == '0' && onPlay(record, index)
						searchType == '1' && (window.location.href = `/music/${type}/playlist?id=${record.id}`)
					},
					onContextMenu: (event) => {},
					onMouseEnter: (event) => {}, // 鼠标移入行
					onMouseLeave: (event) => {},
				};
			}}
			scroll={keyword?{ x: 800, y: 'calc(100vh - 400px)' }:{ x: 800, y: simple? 400 : '' }}
			pagination={keyword?{
				total: state.totalCount,
				pageSizeOptions: ['10', '20'],
				current: state.currentPage || 1,
				pageSize: state.pageSize || 20,
				onChange: (page, size) => { getSearchData({page, size, searchType}) }
			}:{ position: ['bottomCenter'] }}
			dataSource={state.songs}
			columns={columns}
			/>
	</ConfigProvider>
}
export default playListDetail;
