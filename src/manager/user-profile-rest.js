import AjaxHelper from "./ajax-helper.js";

export default class API {
    saveProfile(data, callback) {
        AjaxHelper.ajax({
            url: "/user/userInfo/",
            type: "post",
            data: data,
            async: true,
            success: callback
        });
    }
    savePassword(data, callback) {
        AjaxHelper.ajax({
            url: "/user/userInfo/",
            type: "post",
            data: data,
            async: true,
            success: callback
        });
    }
}