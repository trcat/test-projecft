import AjaxHelper from "./ajax-helper.js";

export default class API {
    static getTestList(user, callback, limit, offset) {
        let ajaxObj = {
            url: `/operation/finish/?${user.id}`,
            type: "get",
            async: true,
            success: callback
        };

        if (user.identity === "teacher") {
            ajaxObj.url = "/paper/papers/";
            ajaxObj.data = {
                limit: limit,
                offset: offset
            };
        }

        AjaxHelper.ajax(ajaxObj);
    }
    static getTestResult(user, testId, callback, start_time) {
        const ajaxObj = {
            url: `/operation/classScore/`,
            type: "get",
            async: true,
            success: callback,
            data: {
                id: testId,
                start_time: start_time
            }
        };

        if (user.identity === "student") {
            ajaxObj.url = `/operation/getResult/`;
            ajaxObj.data = {
                id: testId,
                user_id: user.id
            };
        }

        AjaxHelper.ajax(ajaxObj);
    }
}