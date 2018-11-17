import url from 'url'
function interceptorRoute ( app ) {
    app.use(( req, res, next ) => {
        // 获取请求来源的域名 www.xieyingwangluo.com
        let { host } = req.headers;
        // 允许跨域请求
        console.log(host.indexOf('localhost') >= 0)
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST');
        // dev : localhost
        // pro : xieyingwangluo
        // 有权调用接口
        if ( host.indexOf( 'xieyingwangluo' ) >= 0 || host.indexOf('localhost') >= 0 ) {
            next()
            return;
        }
        // 如果非xieyignwangluo.com 请求接口，返回无权调用数据
        res.send({
            status: 50000,
            code: 'INVALID_API',
            message: '抱歉没有权限调用该接口'
        });
    })
}
module.exports = interceptorRoute