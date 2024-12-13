export default {
    websiteName: 'web-group',
    themeColor: '#1890ff',
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
            title: '电影',
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
}