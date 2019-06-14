/**
 * wx_api 用户信息管理
 * @author xing
 */
import I_User from '../../interface/wx/user_interface/user_interface';

const wx_url: String = 'https://api.weixin.qq.com/';

class Use {
  wx_api_login: String
  wx_api_userInfo: String
  wx_api_access_token: String

  constructor() {
    this.wx_api_login = 'sns/jscode2session';
    this.wx_api_userInfo = 'wxa/getpaidunionid';
    this.wx_api_access_token = 'cgi-bin/token';
  }


}
