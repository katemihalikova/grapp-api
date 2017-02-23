"use strict";
var request = require("request");
var baseUrl_1 = require("./baseUrl");
var errors_1 = require("./errors");
function getTrainSummary(token, trainId, cb) {
    request({
        url: baseUrl_1.baseUrl + "get/trains/train/" + token,
        qs: { trainId: trainId },
        json: true
    }, function (error, response, json) {
        if (error) {
            cb(error, null);
            return;
        }
        if (response.statusCode >= 400) {
            cb(new errors_1.StatusCodeError(response), null);
            return;
        }
        cb(null, json);
    });
}
exports.getTrainSummary = getTrainSummary;
//# sourceMappingURL=train-summary.js.map