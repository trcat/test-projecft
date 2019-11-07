import AjaxHelper from "./ajax-helper.js";


export default class API {
    /**
     * @param {string} id 
     * @param {string} email 
     * @param {Function} callback 
     */
    static getModifyPasswordData (id, email, callback) {
        const data = {
            id: id,
            email: email
        };
        const url = `/user/findPwd/${id}/`;
        const ajaxObject = {
            url: url,
            type: "get",
            data: data,
            async: true,
            success: callback
        };
        AjaxHelper.ajax(ajaxObject);
    }
}