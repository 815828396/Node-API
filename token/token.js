/**
 * @name Token 管理类
 */
class Token {
  constructor () {
    this.name = 'tokenFGHJK123HJKas'
  }
  /**
  * 根据用户账号和部分用户信息 + 私钥算法 生成随机token
  * @param {Object} data
  * @return token 信息码
  */
  generageToken ( data ) {
    let token = '目前没有实现随机token 生成';
    console.log(this.name)
    return token;
  }
  /**
  * 根据用户所传的登陆信息以及token 来验证是否匹配
  * @param { Object } info
  * @param { string } token
  * @return { Boolean } 是否通过
  */
  checkToken ( info, token ) {
    let isOk = false;
    return isOk;
  }
}

export default new Token()
