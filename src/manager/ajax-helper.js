import $ from "jquery";
import "jquery.cookie";


export default class AjaxHelper {
    /**
     * @param {string} url 
     * @param {string} type 
     * @param {Object|null|undefined} data 
     * @param {boolean|null|undefined} async 
     * @param {Function|null|undefined} success 
     * @param {Function|null|undefined} error 
     */
    static ajax(url, type, data, async, success, error) {
        let ajaxObject = {
            type: type,
            url: url,
            /**
             * @param {Object} data
             * @param {string} textStatus
             * @param {jqXHR} jqXHR
             */
            success: function (data, textStatus, jqXHR) {
                if (typeof success === "function") {
                    success(data, textStatus, jqXHR);
                }
            },
            /**
             * @param {jqXHR} jqXHR
             * @param {string} textStatus
             * @param {string} errorThrown
             */
            error: function (jqXHR, textStatus, errorThrown) {
                if (typeof error === "function") {
                    error(jqXHR, textStatus, errorThrown);
                } else {
                    console.log("操作失败！");
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            },
            dataType: "json",
            async: async || false
        };

        if (data) {
            ajaxObject.data = data;
        }

        const token = "JWT " + $.cookie("token");
        ajaxObject.headers = {
            Authorization: token
        };

        $.ajax(ajaxObject);
    }
}