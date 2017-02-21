"use strict";
var cheerio = require("cheerio");
var request = require("request");
var baseUrl = "http://provoz.szdc.cz/grappnv/";
function loadToken(cb) {
    request(baseUrl, function (error, response, html) {
        if (error) {
            cb(error, null);
            return;
        }
        if (response.statusCode >= 400) {
            cb(new Error("Request to XXX returned status code " + response.statusCode + "."), null); // @TODO get requested url from response object
            return;
        }
        var $ = cheerio.load(html);
        cb(null, $("#token").val());
    });
}
exports.loadToken = loadToken;
function loadNetwork(token, cb) {
    request({
        url: baseUrl + "get/network/all/" + token,
        json: true
    }, function (error, response, json) {
        if (error) {
            cb(error, null);
            return;
        }
        if (response.statusCode >= 400) {
            cb(new Error("Request to XXX returned status code " + response.statusCode + "."), null); // @TODO get requested url from response object
            return;
        }
        cb(null, json);
    });
}
exports.loadNetwork = loadNetwork;
function loadTrainSummary(token, trainId, cb) {
    request({
        url: baseUrl + "get/trains/train/" + token,
        qs: { trainId: trainId },
        json: true
    }, function (error, response, json) {
        if (error) {
            cb(error, null);
            return;
        }
        if (response.statusCode >= 400) {
            cb(new Error("Request to XXX returned status code " + response.statusCode + "."), null); // @TODO get requested url from response object
            return;
        }
        cb(null, json);
    });
}
exports.loadTrainSummary = loadTrainSummary;
//# sourceMappingURL=index.js.map