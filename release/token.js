"use strict";
var cheerio = require("cheerio");
var request = require("request");
var baseUrl_1 = require("./baseUrl");
var errors_1 = require("./errors");
function loadToken(cb) {
    request({
        url: baseUrl_1.baseUrl
    }, function (error, response, html) {
        if (error) {
            cb(error, null);
            return;
        }
        if (response.statusCode >= 400) {
            cb(new errors_1.StatusCodeError(response), null);
            return;
        }
        var $ = cheerio.load(html);
        cb(null, $("#token").val());
    });
}
exports.loadToken = loadToken;
//# sourceMappingURL=token.js.map