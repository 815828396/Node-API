/**
* @FileName 请求拦截器
* @type {Number}
*/
import url from 'url';
import token from '../../../token/token.js';
// HOST 白名单
const URLwhtieLIst = [
  'xieyingwangluo',
  'localhost:3000',
  'localhost:8080'
];
console.log(token);
class Interceptor {
  constructor (app) {
    this.app = app;
  }
  // 初始化拦截入口函数
  _init () {
    this.app.use((req, res, next) => {
      // 获取请求来源 HOST
      let { host } = req.headers;

      // 允许跨域请求
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', this._AccessHeader());
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, OPTIONS');
      if (req.method.toLowerCase() === 'options') {
        res.sendStatus(200);
        return;
      }
      
      // 当前访问 HOST 存在白名单中, 继续请求操作
      if ( URLwhtieLIst.indexOf(host) >= 0 ) {
        next()
        return;
      }

      // 不存在白名单中,直接拒绝访问
      res.send({
        status: 50000,
        code: 'INVALID_HOST',
        message: '抱歉没有权限调用该接口'
      });
    })
  }
  /**
   * Access-Control-Allow-Header 请求头 配置
   * @param  {Array}  [Arg_arr=[]] 自定义允许请求头,数组形式
   * @return {String}              字符串返回形式,
   */
  _AccessHeader ( Arg_arr = [] ) {
    let _options = ['Content-Type', 'Content-Length', 'Accept'];
    return [..._options, ...Arg_arr].join(',');
  }
}
module.exports = Interceptor;
