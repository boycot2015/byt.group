type Menu = {
    title:string
    type?: string
    micro?: boolean,
    hideInMenu?: boolean,
    active?: string
    subTitle?: string
    path: string
    url?: string
    icon: string
}
type Props = { 
    websiteName: string
    themeColor: string
    bgUrl: string
    lyricPosition: string
    themeModel: string
    menus: Menu[],
    footer: {
        copyright: string,
        beian?: string,
        url?: string,
        email?: string
    }
}
const config: Props = {
    websiteName: 'web-group',
    themeColor: '#1890ff',
    bgUrl: '',
    lyricPosition: 'top', // top, bottom
    themeModel: 'light', // light, dark
    menus: [
        {
            title: '音乐',
            active: '/music',
            path: '/music',
            url: '',
            icon: 'i-carbon-music'
        },
        {
            title: '新闻',
            path: '/news',
            url: '',
            icon: 'i-carbon-book'
        },
        {
            title: '影视',
            path: '/movie',
            url: '',
            icon: 'i-carbon-video-player'
        },
        {
            title: '壁纸',
            path: '/wallpaper',
            url: '',
            icon: 'i-carbon-image'
        },
        {
            title: '数码',
            path: '/digital',
            url: '',
            icon: 'i-carbon-box'
        },
        {
            title: '导航',
            type: 'ione',
            micro: true,
            active: '/micro',
            subTitle: '网站导航',
            path: '/micro/ione',
            url: 'https://www.jspoo.com/',
            icon: 'i-carbon-link'
        },
        {
            title: '网站',
            type: 'links',
            micro: true,
            hideInMenu: true,
            active: '/micro',
            subTitle: '网址大全',
            path: '/micro/links',
            url: 'https://webstack.iotheme.cn/',
            icon: 'i-carbon-link'
        }
    ],
    footer: {
        copyright: 'Copyright @2024 Designed by boycot',
        beian: '粤ICP备18002072号',
        url: 'https://beian.com',
        email: 'boycot2017@163.com'
    }
}
export default config