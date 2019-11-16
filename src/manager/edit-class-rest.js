import AjaxHelper from "./ajax-helper.js";

export default class API {
    static searchClass(className, callback) {
        AjaxHelper.ajax({
            url: `/user/class/?search=${className}`,
            type: "get",
            async: true,
            success: callback
        });
    }
    static saveClass(classId, className, callback) {
        AjaxHelper.ajax({
            url: `/user/class/${classId}/`,
            type: "put",
            data: className,
            async: true,
            success: callback
        });
    }
    static deleteClass(classId, callback) {
        AjaxHelper.ajax({
            url: `/user/class/${classId}/`,
            type: "delete",
            async: true,
            success: callback
        });
    }
    static getClassMembers(classId, limit, offset, callback) {
        AjaxHelper.ajax({
            url: `/user/studentInClass/${classId}/`,
            type: "get",
            data: {
                my_class: classId,
                limit: limit,
                offset: offset
            },
            async: true,
            success: callback
        });
    }
}