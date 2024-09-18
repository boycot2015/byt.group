
export type InfoProp = {
	cover_img_url?: string
	title?: string
	id?: string
	source_url?: string
}
export type LyricProp = {
    lyric?: string;
    timer?: any;
    currentIndex?: number;
    lyricArr?: string[];
    currentTime?: string;
}
export type SongProp = {
    artist?: string
    artist_id?: string
    album?: string
    album_id?: string
    source?: string
    source_url?: string
    img_url?: string
    playIndex: number
    url?: string
    disabled?: boolean
}

export type ArticleProp = {
	id: string
    title: string
    artist: string
    artist_id: string
    source: string
    source_url: string
    img_url: string
	pic?: string
	src?: string
	img?: string
	hot?: number|string
	owner?: string
    url: string
    disabled: boolean
}

export interface PlayData extends InfoProp, SongProp, LyricProp {
    visible?: boolean
    type?: string
    songs: SongProp[]
}