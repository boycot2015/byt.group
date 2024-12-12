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
            icon: 'music'
        },
        {
            title: '新闻',
            path: '/news',
            url: '',
            icon: 'book'
        },
        {
            title: '电影',
            path: '/movie',
            url: '',
            icon: 'music'
        },
        {
            title: '壁纸',
            path: '/wallpaper',
            url: '',
            icon: 'image'
        },
        {
            title: '数码',
            path: '/digital',
            url: '',
            icon: 'box'
        },
        {
            title: '导航',
            type: 'ione',
            micro: true,
            active: '/micro',
            subTitle: '网站导航',
            path: '/micro/ione',
            url: 'https://www.jspoo.com/',
            icon: 'link'
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
            icon: 'link'
        }
    ],
}