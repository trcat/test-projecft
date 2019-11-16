import AjaxHelper from "./ajax-helper.js";

export default class API {
    static loginOut(id, callback) {
        AjaxHelper.ajax({
            url: `/user/loginOut/${id}/`,
            type: "delete",
            async: true,
            success: callback
        });
    }
}