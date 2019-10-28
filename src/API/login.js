import $ from "jquery";

class RESTLoginData {
    /**
     * @param {string} id 
     * @param {string} password 
     */
    constructor(id, password) {
        this.id = id;
        this.password = password;
    }
}

/**
* 将登录数据传唤为后端预期数据格式
* @param {string} account 
* @param {string} password 
* @return {RESTLoginData}
*/
const _transLoginConfig = function (account, password) {
   return new RESTLoginData(account, password);
};



export default class API {
    /**
     * 登录时呼叫的 API
     * @param {string} account 
     * @param {string} password 
     * @param {function} callback 在 success or error 中执行的 callback
     */
    static login(account, password, callback) {
        const data = _transLoginConfig(account, password);

        $.ajax({
            type: "post",
            data: data,
            url: "/auth/",
            success: function (data) {
                callback(data);
            },
            error: function () {
                return {
                    success: false,
                    message: "没有与后端对接成功！请联系管理员"
                };
            },
            dataType: "json",
            async: true,
        });
    }
}