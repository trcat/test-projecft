import AjaxHelper from "./ajax-helper.js";

export default class API {
    static getTestList(limit, offset, callback) {
        AjaxHelper.ajax({
            url: "/paper/paperLibs/",
            type: "get",
            data: {
                limit: limit,
                offset: offset
            },
            async: true,
            success: callback
        });
    }
    static deleteTest(id, callback) {
        AjaxHelper.ajax({
            url: `/paper/paperLibs/${id}/`,
            type: "delete",
            async: true,
            success: callback
        });
    }
    static saveTest(data, callback) {
        AjaxHelper.ajax({
            url: `/paper/paperLibs/${data.id}/`,
            type: 'put',
            data: JSON.stringify(data),
            async: true,
            success: callback,
            contentType: "application/json;charset=utf-8"
        });
    }
    static dispatchTest(data, callback) {
        AjaxHelper.ajax({
            url: "/paper/papers/",
            type: "post",
            data: JSON.stringify(data),
            async: true,
            success: callback,
            contentType: "application/json;charset=utf-8"
        });
    }
    static getQuestionsById(id, callback) {
        AjaxHelper.ajax({
            url: `/paper/paperLibs/${id}/`,
            type: "get",
            async: true,
            success: callback
        });
    }
}