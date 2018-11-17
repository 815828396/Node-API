/**
 * @name 登陆注册管理
 * @method 登陆 { login }
 * @method 注册 { register }
 * @method 修改密码 { updUserPwd }
 * @method MD5密码加密 { cryptoPassword }
 * @method 生成随机盐值 { randomSalt }
 */
import fetch from '../../public/javascripts/until/fetch'
import { validateUrlData } from '../../public/javascripts/until/common'
import operateImg from '../../public/javascripts/until/classImg'
import crypto from 'crypto'
import ErrorCode from '../../public/javascripts/errorCode/status'
class User {
    constructor () {
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.updUserPwd = this.updUserPwd.bind(this)
    }
    /**
     * 用户登陆接口 ok
     * 还没有做盐值检测
     */
    async login (request, response) {
        let { tel = '', pwd = '' } = request.query
        // 校验参数中存在空值
        if (validateUrlData( {tel, pwd} )) {
            response.send({
                code: 5000,
                _http: 'INVALID_DATA',
                message: '数据参数为空'
            })
            return;
        }
        try {
            let { code, res } = await fetch.get('/user/checklogin', { tel, pwd });
            if ( code === 1 ) { // 用户登录失败
                response.send({
                    code: 1000,
                    _http: 'LOGIN_FAIL',
                    message: '登陆失败'
                })
                return;
            }

            // 用户登录成功操作
            // response.cookie('yx_token', 'asljdlkasjdkancsnnska', {maxAge:10*1000, path:'/', httpOnly:true, secure: true})
            response.send({
                code: 0,
                message: '登陆成功',
                result : res
            });
            request.session.isLogin = true
            return;
        } catch (error) {
            console.log(error)
        }
    }
    /**
     * 用户注册接口 ok
     */
    async register (request, response) {
        let { name, tel = '', pwd = '' } = request.body; // 获取注册参数信息 name tel pwd
        let randomSalt = this.randomSalt(); // 获取生成的盐值
        let { $md5, salt } = this.cryptoPassword( pwd, randomSalt );
        // 校验参数中存在空值
        if (validateUrlData( {tel, pwd, name} )) {
            response.send({
                code: 5000,
                _http: 'INVALID_DATA',
                message: '数据参数为空'
            })
            return;
        }
        try {
            let { code, res } = await fetch.post('/user/add', { tel, name: $md5, pwd: salt }) // 测试 name 参数作为当前盐值
            if ( code === 1 ) {
                response.send({
                    code: 1001,
                    _http: 'EXITS_USER',
                    message: '注册失败,用户可能已经存在'
                })
                return
            }
            response.send({
                code: 0,
                message: '注册成功',
                result: res
            })
        } catch (error) {
            console.log(error)
        }
0     }
    /**
     * 修改普通用户密码 ok
     */
    async updUserPwd (request, response) {
        let { noid, pwd, oldpwd } = request.body;
        if ( validateUrlData({ noid, pwd, oldpwd }) ) {
            response.send({
                code: 5000,
                _http: 'INVALID_DATA',
                message: '数据参数为空'
            })
            return;
        }
        
        // 重新进行MD5密码加密
        let randomSalt = this.randomSalt();
        let { $md5, salt } = this.cryptoPassword(pwd, randomSalt);
        try {
            let { code, res } = await fetch.post('/user/updPwd', { noid, pwd: salt, oldpwd });
            if ( code === 1 ) {
                response.send({
                    code: 1002,
                    _http: 'ERROR_DATA',
                    message: '旧密码不匹配'
                })
                return;
            }
            response.send({
                code: 0,
                message: '修改密码成功'
            })
        } catch (error) {
            console.log(error)
        }
    }
    /**
     * MD5密码加密 + 随机算法,返回密码和当前盐值存入数据库中
     * 加密方式： 
     *  1. 生成随机盐值
     *  2. 拼接在铭文密码后面
     *  3. md5加密
     * @param {String} pwd 
     * @param {String} salt 随机盐值
     * @return { Object } md5($password, $salt), salt
     */
    cryptoPassword ( pwd, salt ) {
        let md5 = crypto.createHash('md5');
        let $md5 = md5.update( pwd + salt ).digest('hex');
        return { $md5, salt };
    }
    /**
     * 生成随机盐值 5个大小写字母
     */
    randomSalt () {
        let i = 0;
        let res = [];
        for ( ; i < 5; i++ ) {
            let _randomCase = Math.ceil( Math.random() * 2 ) // 随机产生成 1： 大写 2：小写
            let _random = String.fromCharCode( Math.ceil( Math.random() * 25 ) + 65 );
            if ( _randomCase === 1 ) _random = _random.toLowerCase()
            res.push( _random )
        }
        return res.join('');
    }
}

export default new User()