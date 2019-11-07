import $ from "jquery";
import "jquery.cookie";


export default class AjaxHelper {
    /**
     * config 包含如下内容
     * @param {string} url 
     * @param {string} type 
     * @param {Object|null|undefined} data 
     * @param {boolean|null|undefined} async 
     * @param {Function|null|undefined} success 
     * @param {Function|null|undefined} error 
     */
    static ajax(config) {
        let ajaxObject = {
            type: config.type,
            url: config.url,
            /**
             * @param {Object} data
             * @param {string} textStatus
             * @param {jqXHR} jqXHR
             */
            success: function (data, textStatus, jqXHR) {
                if (typeof config.success === "function") {
                    config.success(data, textStatus, jqXHR);
                }
            },
            /**
             * @param {jqXHR} jqXHR
             * @param {string} textStatus
             * @param {string} errorThrown
             */
            error: function (jqXHR, textStatus, errorThrown) {
                if (typeof config.error === "function") {
                    config.error(jqXHR, textStatus, errorThrown);
                } else {
                    console.log("操作失败！");
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            },
            dataType: "json",
            async: config.async || false
        };

        if (config.data) {
            ajaxObject.data = config.data;
        }

        const token = "JWT " + $.cookie("token");
        ajaxObject.headers = {
            Authorization: token
        };

        $.ajax(ajaxObject);
    }
}