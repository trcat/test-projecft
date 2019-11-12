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
            data: data,
            async: true,
            success: callback
        });
    }
    static dispatchTest(data, callback) {
        AjaxHelper.ajax({
            url: "/paper/papers/",
            type: "post",
            data: data,
            async: true,
            success: callback
        });
    }
    static getQuestionsById(id, callback) {
        AjaxHelper.ajax({
            url: `/paper/papers/${id}/`,
            type: "get",
            async: true,
            success: callback
        });
    }
}