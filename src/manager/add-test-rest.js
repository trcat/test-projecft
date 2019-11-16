import AjaxHelper from "./ajax-helper.js";

export default class API {
    static createTest(data, callback) {
        AjaxHelper.ajax({
            url: "/paper/paperLibs/",
            type: "post",
            data: JSON.stringify(data),
            async: true,
            success: callback,
            contentType: "application/json;charset=utf-8"
        });
    }
}