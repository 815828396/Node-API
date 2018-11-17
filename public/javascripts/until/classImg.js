import fs from 'fs';
import request from 'request';
/**
 * 图片操作类
 */
class operateImg {

    /**
     * 保存图片
     * @param {*} path 
     */
    saveImg ( path = '' ) {
        return new Promise((resolve, reject) => {
            let data = ''
            // 读取本地文件内容
            fs.createReadStream('./1.jpg')
                .setEncoding('utf-8')
                .on('data', chunk => {
                    data += chunk
                })
                .on('end', () => {
                    // console.log('asd:' + data)
                    resolve(data)
                    // return data
                })
    
        })
    }
}

export default new operateImg()