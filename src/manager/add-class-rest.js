import AjaxHelper from './ajax-helper.js';

export default class API {
    static createClass(className, callback) {
        const data = {
            id: null,
            class_name: className
        };

        AjaxHelper.ajax({
            url: "/user/class/",
            type: "post",
            data: data,
            async: true,
            success: callback
        });
    }
}