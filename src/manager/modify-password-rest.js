import AjaxHelper from "./ajax-helper.js";

export default class API {
    /**
     * @param {string} data 
     * @param {Function} callback 
     */
    static modifyPassword(data, callback) {
        const url = `/user/resetPwd/?token=${data}`;
        const ajaxObject = {
            url: url,
            type: "get",
            success: callback,
            async: true
        }
        AjaxHelper.ajax(ajaxObject);
    }
}