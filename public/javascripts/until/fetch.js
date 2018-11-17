/**
 * @name fetch 
 * @desc 封装fetch 
*/
let request = require('request')
let qs = require('querystring')
let http = require('http')
let fetch = {}

let ENV_url = 'http://192.168.1.100:8080/yxpart/api/v1'
// get 请求
fetch.get = async (path, data) => {
    if (data)  path = `${path}?${qs.stringify(data)}`
    try {
        let result = await _http({
            path,
            data
        })
        return result;
    } catch ( error ) {
        if ( error ) throw new Error(error)
    }
}
// post 请求
fetch.post = async (path, data ={}) => {
    try {
        let result = await _http({
            path,
            data,
            method: 'post'
        })
        return result
    } catch (error) {
        if ( error ) throw new Error(error);
    }
}

/**
 * @name http 处理封装
 * @param {String} path
 * @param {String} method
 */
function _http ({ path, data = {}, method }) {
    // const __url = 'http://www.xieyingwangluo.com/yxpart/api/v1'; // www url
    let __url = 'http://192.168.1.100:8080/yxpart/api/v1'; // dev url
    let __headers = {
        url: __url + path,
        method: method || 'get',
        headers: {
            'Content-Type' : 'application/json; charset=utf-8'
        }
    };
    if ( method && method.toUpperCase() === 'POST' ) {
        // 设置 method: post 请求头方式
        __headers.headers = {
            'Content-Type' : 'application/x-www-form-urlencode; charset=utf-8'
        };
        __headers.qs = data;
    }
    return new Promise (( resolve, reject ) => {
        request(__headers, async ( err, result, body ) => {
            if ( err ) {
                // 处理请求超时错误信息，将服务器状态码进行处理
                let { errno }  = err;
                let rejectJSON = {
                    code: 0,
                    errno,
                    message: '服务器请求超时,请检查网络后,刷新重试!'
                };
                reject(JSON.stringify(rejectJSON));
            } else {
                let { statusCode: __code, body: __body } = result;
                if ( __code !== 200 ) {
                    let { message: httpMsg, status: httpCode, path } = JSON.parse(__body)
                    reject( JSON.stringify( { httpCode, httpMsg} ) );
                    return;
                }
                resolve(JSON.parse(body))
            }
        })
    })
}

module.exports = fetch