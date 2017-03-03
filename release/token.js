"use strict";
var axios_1 = require("axios");
var cheerio = require("cheerio");
var baseUrl_1 = require("./baseUrl");
function loadToken() {
    return axios_1["default"].get(baseUrl_1.baseUrl)
        .then(function (response) { return response.data; })
        .then(function (html) {
        var $ = cheerio.load(html);
        return $("#token").val();
    });
}
exports.loadToken = loadToken;
//# sourceMappingURL=token.js.map