"use strict";
var axios_1 = require("axios");
var baseUrl_1 = require("./baseUrl");
function getNetwork(token) {
    return axios_1["default"].get(baseUrl_1.baseUrl + "get/network/all/" + token)
        .then(function (response) { return response.data; });
}
exports.getNetwork = getNetwork;
//# sourceMappingURL=network.js.map