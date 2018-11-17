
/**
 * @name 相关用户路由
 */
import consturUser from '../../../constructor/c_user/constur_user.js'
import consturInfo from '../../../constructor/c_user/constur_info.js'
import Token from '../../../token/token'
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
// 更具 ID 查询当前用户详情信息
router.get('/selUserInfoById', consturInfo.selUserInfoById);
// 添加用户信息
router.post('/addUserInfo', consturInfo.addUserInfo);
// 删除用户信息,根据ID
router.post('/deleteUser', consturInfo.deleteUserInfo);

// 无数据库调用接口
router.get('/nodatabase', function (request, response, next) {
    response.send({
        code: 1,
        message: '获取新闻列表成功',
        result: [{a: 1, b: 2}, {c: 3, d: 4}]
    })

})
// 路由中间件测试 检测token 是否存在
function routerMiddleFn ( req, res, next ) {
    // 服务端设置cookie
    res.cookie('haha', 'name1=value1&name2=value2', {maxAge:10*1000, path:'/', httpOnly:true});
    res.end()
    // next()
}

module.exports = router