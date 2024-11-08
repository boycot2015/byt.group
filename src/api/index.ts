let baseApiUrl = 'https://api.boycot.top/api'
switch (process.env.NODE_ENV) {
    case 'development':
        // http://192.168.15.28:8090
        // baseApiUrl = 'http://127.0.0.1:8090/api'
        baseApiUrl = 'http://192.168.15.28:8090/api'
}
export {
    baseApiUrl
}