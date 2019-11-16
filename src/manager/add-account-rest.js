import AjaxHelper from "./ajax-helper.js";

export default class API {
    static getClassOptions(callback) {
        AjaxHelper.ajax({
            url: "/user/class/",
            type: "get",
            async: true,
            success: callback
        });
    }
    static createAccount(data, callback) {
        console.log(data);
        AjaxHelper.ajax({
            url: "/user/userInfo/",
            type: "post",
            data: data,
            async: true,
            success: callback
        });
    }
}