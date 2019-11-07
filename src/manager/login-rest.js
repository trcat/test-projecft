import AjaxHelper from "./ajax-helper.js";

class RESTLoginData {
    /**
     * @param {string} password 
     * @param {string=} id
     * @param {string=} email
     */
    constructor(password, id, email) {
        this.password = password;
        this.id = typeof id === "string" ? id : null;
        this.email = typeof email === "string" ? email : null;
    }
}


/**
* 将登录数据传唤为后端预期数据格式
* @param {string} password 
* @param {string|null|undefined} id
* @param {string=} email
* @return {RESTLoginData}
*/
const _transLoginConfig = function (password, id, email) {
   return new RESTLoginData(password, id, email);
};

/**
 * @param {{password:string, id:string|undefined, email:string|undefined}} data 
 * @param {Function} callback 
 */
const _login = function (data, callback) {
    const ajaxObject = {
        url: "/auth/",
        tyle: "post",
        data: data,
        async: true,
        success: callback
    };
    AjaxHelper.ajax(ajaxObject);
};


export default class API {
    static loginByAccount(account, password, callback) {
        const data = _transLoginConfig(password, account);
        console.log(data);
        _login(data, callback);
    }
    
    static loginByEmail(email, password, callback) {
        const data = _transLoginConfig(password, null, email);
        console.log(data);
        _login(data, callback);
    }
}