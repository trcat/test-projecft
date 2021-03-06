import AjaxHelper from "./ajax-helper.js";

export default class API {
    static saveProfile(data, callback) {
        AjaxHelper.ajax({
            url: `/user/userInfo/${data.id}/`,
            type: "put",
            data: data,
            async: true,
            success: callback
        });
    }
    static savePassword(data, callback) {
        AjaxHelper.ajax({
            url: `/user/userInfo/${data.id}/`,
            type: "put",
            data: data,
            async: true,
            success: callback
        });
    }
}