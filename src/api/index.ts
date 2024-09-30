let baseApiUrl = 'https://api.boycot.top/api'
switch (process.env.NODE_ENV) {
    case 'development':
        // baseApiUrl = 'http://127.0.0.1:8090/api'
}
export {
    baseApiUrl
}