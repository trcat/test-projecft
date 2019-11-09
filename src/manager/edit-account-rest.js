import AjaxHelper from "./ajax-helper.js";

export default class API {
    static searchUser(id, callback) {
        AjaxHelper.ajax({
            url: `/user/userInfo/${id}/`,
            type: "get",
            async: true,
            success: callback
        });
    }
    static deleteProfile(id, callback) {
        AjaxHelper.ajax({
            url: `/user/userInfo/${id}/`,
            type: "delete",
            async: true,
            success: callback
        });
    }
}