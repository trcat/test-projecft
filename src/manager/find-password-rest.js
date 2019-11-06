import AjaxHelper from "./ajax-helper.js";


export default class API {
    static getModifyPasswordData (id, email, callback) {
        const data = {
            id: id,
            email: email
        };
        const url = `/user/findPwd/${id}/`;
        AjaxHelper.ajax(url, "get", data, callback);
    }
}