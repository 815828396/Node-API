"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// console.log(I_Path);
// interface I_User {
//   wx_api_login: String;
//   wx_api_userInfo: String;
//   wx_api_access_token: String;
// }
var Use = /** @class */ (function () {
    function Use(login, userInfo, access_token) {
        this.wx_api_login = login;
        this.wx_api_userInfo = userInfo;
        this.wx_api_access_token = access_token;
    }
    return Use;
}());
