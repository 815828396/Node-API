
/**
 * @name 兼职管理
 */
import fetch from '../../public/javascripts/until/fetch'
import ErrorCode from '../../public/javascripts/errorCode/status'
class ConsturPart {
    constructor () {
        this.as = 12312
    }
    /**
     * 获取所有兼职信息
     */
    async getPart (request, response) {
        let { name } = request.query
        try {
            let { res } = await fetch.get('/part/selA?sex=0')
            response.send({ 
                code: 0,
                message: '查询成功',
                result: res
            })
            return
        } catch (err) {
            // 捕获fetch.get 方法抛出异常
            // 将http状态信息返回
            let _httpInfo = JSON.parse(err.message)
            response.send({
                code: 'ERROR_DATA',
                message: '数据错误',
                _httpInfo
            })
            return
        }
    }
    /**
     * 添加兼职信息
    */
}

export default new ConsturPart()