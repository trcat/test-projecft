import AjaxHelper from "./ajax-helper.js";

export default class API {
    static getTestList(callback) {
        //[TODO] 待后端补充接口后完善
        AjaxHelper.ajax({
            url: "/paper/getReady/",
            type: "get",
            async: true,
            success: callback
        });
    }
}