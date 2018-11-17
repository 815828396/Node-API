/**
 * 用户信息基础类
 */
import UserProperty from './UserProperty'
export default class BaseUser extends UserProperty {
    constructor ({ noid, user_id, name, tel, pwd, sex, birth, address, qq, state }) {
        super()
        this.noid = noid        // UUID
        this.user_id = user_id  // 用户ID
        this.name = name;       // 用户昵称
        // this.tel = tel;         // 用户电话，主要作为登陆号
        // this.pwd = pwd;         // 用户密码，MD5加盐密码
        this.sex = sex;         // 用户性别
        this.birth = birth      // 生日 格式 1996-12-15 20:20
        // this.idnumb = idnumb    // 身份证号
        // this.county = county    // 城市区域
        this.address = address  // 现地址
        // this.height = height    // 身高
        // this.weight = weight    // 体重
        this.qq = qq            // qq
        // this.email = email      // 邮箱
        // this.info = info        // 自我评价
        this.state = state      // 状态
    }

    /**
     * 初始化所有信息数据,变成可读性数据 
     * java -> node -> 客户端
     */
    initDataFromServer ( ARG_server ) {
        return {
            sex: this.getsex,
            state: this.getstate,
            birth: this.getbirth
        }
    }

    /**
     * 变更客户端传入的数据,变成存入数据库数据 
     * 客户端 -> node -> 数据库
     */
    initDataFromClient ( ARG_client ) {
        // let { sex, state, birth } = ARG_client;
        this.setsex = this.sex;
        this.setstate = this.state;
        this.setbirth = this.birth;
    }
}