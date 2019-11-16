import AjaxHelper from "./ajax-helper.js";

export default class API {
    static submitAnswer(userId, testId, answer, callback) {
        const data = {
            'id': testId,
            'user_id': userId,
            'user_answer': answer
        };
        AjaxHelper.ajax({
            url: "/operation/finish/",
            type: "post",
            data: JSON.stringify(data),
            async: true,
            success: callback,
            contentType: "application/json;charset=utf-8"
        });
    }
}