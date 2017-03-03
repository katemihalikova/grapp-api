"use strict";
var axios_1 = require("axios");
var baseUrl_1 = require("./baseUrl");
function getTrainSummary(token, trainId) {
    return axios_1["default"].get(baseUrl_1.baseUrl + "get/trains/train/" + token, {
        params: { trainId: trainId }
    })
        .then(function (response) { return response.data; });
}
exports.getTrainSummary = getTrainSummary;
//# sourceMappingURL=train-summary.js.map