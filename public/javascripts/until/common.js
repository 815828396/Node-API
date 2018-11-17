/**
 * 校验指定对象中是否存在空值
 */
export const validateUrlData = ( obj ) => {
    if ( !obj || !Object.prototype.toString.call( obj ).match('Object') ) {
        throw new Error('参数 obj 错误,确保是一个对象')
    }
    for ( let i in obj ) {
        if ( obj[i] === '' ) {
            return true
        }
    }
    return false
}
// 格式化时间
// @params _date       : 被转化时间
// @params connectLine : 连接符号 YYYY-mm-dd
// @params datetime    : 时间类型
//          --- datetime YYYY-mm-dd hh:mm  默认
//          --- date YYYY-mm-dd
//          --- time hh:mm
export const formateDate = (_date, {type: dt = 'datetime', connectLine: cl = '-'} = {}) => {
    let date = null
    let ret = null
  
    if ( typeof _date === 'string' ) { // 判断是否为字符串类型
      date = new Date(Date.parse(_date))
    } else if ( typeof _date === 'object' ) {
      date = _date
    }
  
    let _y = date.getFullYear()
    let _m = repairLength(date.getMonth() + 1)
    let _d = repairLength(date.getDate())
    let _h = repairLength(date.getHours())
    let _mi = repairLength(date.getMinutes())
  
    switch (dt) {
      case 'datetime':
        ret = `${_y}${cl}${_m}${cl}${_d} ${_h}:${_mi}`
        break;
      case 'date':
        ret = `${_y}${cl}${_m}${cl}${_d}`
        break;
      case 'time':
        ret = `${_h}:${_m}`
        break;
    }
    return ret
}
// 日期补0
function repairLength (num, limit = 10) {
    return ( num >= limit )
        ? ( '' + num )
        : ( '0' + num )
}
/**
 * 将错误信息写入到 apiErrorLogs 文件
 */
export const writeErrorLog = (_fileName, fs, error) => {
    const _path = './apiErrorLogs/';
    const path = _path + _fileName;
    let timestep = formateDate(new Date());
    fs.createWriteStream(`${path}.txt`)
        .write(`[${timestep}]:${error.message}`, 'UTF8')
}