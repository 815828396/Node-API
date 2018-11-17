/**
 * @name 用户信息管理
 * @method 查询用户详情信息
 * @method 根据用户ID，查询单个用户信息
 * @method 添加用户详情信息
 * @method 删除用户信息
 */
import fs from 'fs'
import fetch from '../../public/javascripts/until/fetch'
import { validateUrlData } from '../../public/javascripts/until/common'
// model 层用户信息
import ModelUser from '../../model/m_user/BaseUser'
import { formateDate, writeErrorLog } from '../../public/javascripts/until/common'
class Info {
    constructor () {
        this.selUserInfo = this.selUserInfo.bind(this)
    }
    /**
     * 查询用户详情信息 - 存在筛选条件
     */
    async selUserInfo (request, response) {
        let { 
            name = '',
            sex = '',
            birth = '',
            idnumb = '',
            county = '',
            address = ''
        } = request.query

        try {
            let stime = Date.now();
            let { code, res } = await fetch.get('/userinfo/selA', request.query);
            let _res_result = [];
        
            if (code === 1) {
                response.send({
                    code: 5000,
                    _http: 'INVALID_DATA',
                    message: '数据参数可能存在问题'
                })
            }

            // 将服务端获取的用户信息变为可读性 传给客户端
            res.forEach(function(user) {
                // 服务端未更改数据
                let model = new ModelUser( user );
                // 调用初始化服务端数据 转化成客户端可读数据
                let modelObj = model.initDataFromServer();
                _res_result.push( Object.assign(model, modelObj) );
            }, this);
            console.log(`----------------------`);
            console.log(`当前所有用户查询耗时:${Date.now() - stime}ms`);
            console.log(`----------------------`);

            response.send({
                code: 0,
                message: '查询成功',
                result: _res_result
            })
        } catch (error) {
            console.log(error.message);
            // 读取错误文件
            response.send(error.message);
        }
    }

    /**
     * 根据登陆ID查询个人详情信息
     */
    async selUserInfoById (request, response) {
        let { noid = '' } = request.query;
        if (validateUrlData({noid})) {
            response.send({
                code: 5000,
                _http: 'INVALID_DATA',
                message: '数据参数为空'
            })
            return;
        }

        try {
            let { code, res } = await fetch.get('/userinfo/selInfo', { noid });
            if (code === '1') {
                response.send({
                    code: 1,
                    _http: 'ERROR_DATA',
                    message: '用户还未填写信息'
                });
                return;
            }
            let model = new ModelUser( res.userInfoModel );
            let modelObj = model.initDataFromServer();
            let c = Object.assign(model, modelObj);
            let result = Object.assign(res, { userInfoModel: c });
            response.send({
                code,
                result
            });
            return;
        } catch (error) {
            // console.log(writeErrorLog)
            writeErrorLog('constur_info', fs, error);
            let _httpInfo = JSON.parse(error.message);
            let { httpCode } = JSON.parse(error.message);
            // 此处应该读取500页面,或者404页面
            // fs.readFile('./apiErrorLogs/constur_info.txt', (error, data) => {
            //     response.write(data);
            //     response.end();
            //     return;
            // })

            response.send({
                _http: 'ERROR_DATA',
                message: '抱歉!不存在当前查询用户'
            })
            // response.send({
            //     code: 'ERROR_DATA',
            //     message: '数据错误',
            //     _httpInfo
            // })
        }
    }

    /**
     * 添加用户详情信息
     */
    async addUserInfo (request, response) {
        let {
            // name = '',
            sex = '',
            // address = '',
            state = '',
            birth = '',
            // county = ''
        } = request.body;
        if (validateUrlData( request.body )) {
            response.send({
                code: 5000,
                _http: 'INVALID_DATA',
                message: '数据参数为空'
            })
        }
        // 人物信息mdoel层
        let model = new ModelUser({ sex, state, birth });
        model.initDataFromClient();
        console.log(model);
        try {
            // let { code, res } = await fetch.post();
            if (code === 1) {
                response.send({
                    code: '',
                    message: '添加失败,用户信息填写有误'
                })
            }
        } catch (error) {
            // con sole.log(error);
            // let { _httpInfo } = JSON.parse(error.message);
            response.send({
                _http: 'ERROR_DATA',
                message: '抱歉!发生未知错误',
                // _httpInfo
            });
            return;
        }
        response.send({
            code: 1,
            message: '添加用户信息,还没有完成'
        })
    }

    /**
     * 删除用户信息通过ID
     */
    async deleteUserInfo (request, response) {
        let {
            userID
        } = request.body;
        
        try {
            let { code, res } = await fetch.post('');
            // 返回信息失败，
            if (code === 1) {
                response.send({
                    code: '10000',
                    message: '数据接口错误'
                });
            }
        } catch (error) {
            response.send({
                code: 'ERROR_DATA',
                message: '数据错误'
            });
        }
        response.send({
            msg: '功能还没有完善'
        })
        
    }

}

export default new Info()