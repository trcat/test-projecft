import AjaxHelper from "./ajax-helper.js";

export default class API {
    static submitAnswer(userId, testId, answer, callback) {
        AjaxHelper.ajax({
            url: "/operation/finish/",
            type: "post",
            data: {
                id: testId,
                user_id: userId,
                user_answer: answer
            },
            async: true,
            success: callback
        });
    }
}