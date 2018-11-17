/**
 * 用户信息读取,设置属性
 */
export default class UserProperty {
    /**
     * 获取 sex 属性
     */
    get getsex () {
        return this.modeifySex(this.sex, 'server');
    }
    /**
     * 获取 state 属性
     */
    get getstate () {
        return this.modeifyState(this.state, 'server');
    }
    /**
     * 获取 birth 属性
     */
    get getbirth () {
        return this.modeifyBirth(this.birth, 'server');
    }

    /**
     * 设置 state 属性
     */
    set setstate (state) {
        this.state = this.modeifyState(state, 'client');
    }
    /**
     * 设置 birth 属性
     * 传入服务端
     */
    set setbirth (birth) {
        console.log('setbirth日期：' + birth)
        this.birth = this.modeifyBirth(birth, 'client');
    }
    /**
     * 设置 sex 属性
     */
    set setsex (sex) {
        this.sex = this.modeifySex(sex, 'client');
    }
    /**
     * 更改 sex 数值的改变
     * 0: 男
     * 1: 女
     * 2: 不限
     * 3: 未填写
     */
    modeifySex (sex, from) {
        let ret = '';
        if ( from === 'server' ) {
            // 服务端转变成客户端数据
            switch ( String(sex) ) {
                case '0' : 
                    ret = '男'
                    break;
                case '1' : 
                    ret = '女'
                    break;
                case '2' : 
                    ret = '不限'
                    break;
                case '3' : 
                    ret = '未填写'
                    break;
            }
        } else if ( from === 'client' ) {
            // 客户端端转变成服务端数据
            switch ( sex ) {
                case '男' : 
                    ret = '0'
                    break;
                case '女' : 
                    ret = '1'
                    break;
                case '不限' : 
                    ret = '2'
                    break;
                case '未填写' : 
                    ret = '3'
                    break;
            }
        }
        return ret
    }
    /**
     * 更改 state 数值的变化
     * 0 已审核
     * 1 未审核
     */
    modeifyState (state, from) {
        let ret = '';
        if (from === 'server') {
            switch ( String(state) ) {
                case '0':
                    ret = '已审核';
                    break;
                case '1':
                    ret = '未审核';
                    break;
            }
        } else if (from === 'client') {
            switch ( state ) {
                case '已审核':
                    ret = '1';
                    break;
                case '未审核':
                    ret = '1';
                    break;
            }
        }
        return ret;
    }
    /**
     * 更改 birth 属性
     * line : 默认格式 -
     */
    modeifyBirth(birth, from, line = '-') {
        let ret = '';
        if (from === 'server') {
            let year = birth.substr(0, 4);
            let month = birth.substr(4, 2)
            let day = birth.substr(6, 2)
            ret = `${year}${line}${month}${line}${day}`;
        } else if (from === 'client') {
            // 客户端数据传入服务端的日期最好转为时间戳
            // 转化成 unix时间戳 10位 精确到秒
            if (birth === '') return ret;
            let datetime = new Date(birth);
            let timestep = Date.parse(datetime) / 1000;
            ret = timestep;
        }
        return ret;
    }
}