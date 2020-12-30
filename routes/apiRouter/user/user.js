
/**
* @name 相关用户路由
*/

import consturUser from '../../../constructor/c_user/constur_user.js'
import consturInfo from '../../../constructor/c_user/constur_info.js'
import Token from '../../../token/token';
var redis = require('redis');
const redisClient = redis.createClient(6379, 'localhost');

var express = require('express');
var router = express.Router();
// 查询兼职
router.get('/selA', consturUser.login);
// 用户注册
router.post('/add', consturUser.register);
// 修改用户密码
router.post('/updPwd', consturUser.updUserPwd);
// 查询用户详情信息 - 筛选条件
router.get('/selUserInfo', consturInfo.selUserInfo);
// 根据 ID 查询当前用户详情信息
router.get('/selUserInfoById', consturInfo.selUserInfoById);
// 添加用户信息
router.post('/addUserInfo', consturInfo.addUserInfo);
// 删除用户信息,根据ID
router.post('/deleteUser', consturInfo.deleteUserInfo);

// Api-admin: 用户登录-
router.post('/login', consturUser.checkLogin)

// 无数据库调用接口Redis  设置readis缓存值
router.get('/setRedisData', function (request, response, next) {
  redisClient.set('redisData', '这是第一次设置redis数据');
  redisClient.set('arrList', JSON.stringify([1,23,4]));
  response.send({
    code: 1,
    message: '获取新闻列表成功',
    redis,
    result: [{a: 1, b: 2}, {c: 3, d: 4}]
  })
})
// 获取redis  缓存
router.get('/getRedisData', function (request, response, next) {
  redisClient.get('arrList', (err, value) => {
    console.log(value);
    if (!value) value = '没有缓存到 key: redisData 的值，需要查询数据库';
    response.send({
      code: 1,
      message: '获取新闻列表成功',
      value,
      result: [{a: 1, b: 2}, {c: 3, d: 4}]
    });
  });
})
// 路由中间件测试 检测token 是否存在
function routerMiddleFn ( req, res, next ) {
  // 服务端设置cookie
  res.cookie('haha', 'name1=value1&name2=value2', {maxAge:10*1000, path:'/', httpOnly:true});
  res.end()
  // next()
}

module.exports = router
