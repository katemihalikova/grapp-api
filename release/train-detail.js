"use strict";
var cheerio = require("cheerio");
var request = require("request");
var baseUrl_1 = require("./baseUrl");
var errors_1 = require("./errors");
function getTrainDetail(token, trainId, cb) {
    request({
        url: baseUrl_1.baseUrl + "OneTrain/MainInfo/" + token,
        qs: { trainId: trainId }
    }, function (error, response, html) {
        if (error) {
            cb(error, null);
            return;
        }
        if (response.statusCode >= 400) {
            cb(new errors_1.StatusCodeError(response), null);
            return;
        }
        var $ = cheerio.load(html, { xmlMode: true });
        var $scheduledArrival = $(".arrivalTT > span");
        var $actualArrival = $(".arrivalReal > span");
        var $scheduledDeparture = $(".departureTT > span");
        var $actualDeparture = $(".departureReal > span");
        var $localDelay = $(".infoTrainDelay");
        var $foreignDelay = $(".details:has(label:first-child)");
        var responseData = {
            Id: trainId,
            Title: $(".infoTrainTop > div > div:nth-child(1) strong").text().trim(),
            CarrierName: $(".infoTrainTop > div > div:nth-child(2)> strong").text().trim(),
            FromStationName: $(".start span").text().trim(),
            ToStationName: $(".end span").text().trim(),
            LastKnownStationName: $(".confirmed span").text().trim(),
            ScheduledArrival: null,
            ActualArrival: null,
            ScheduledDeparture: null,
            ActualDeparture: null,
            Delay: null
        };
        if ($scheduledArrival.length) {
            responseData.ScheduledArrival = $scheduledArrival.text().replace(/[^\d:]/g, "");
        }
        if ($actualArrival.length) {
            responseData.ActualArrival = $actualArrival.text().replace(/[^\d:]/g, "");
        }
        if ($scheduledDeparture.length) {
            responseData.ScheduledDeparture = $scheduledDeparture.text().replace(/[^\d:]/g, "");
        }
        if ($actualDeparture.length) {
            responseData.ActualDeparture = $actualDeparture.text().replace(/[^\d:]/g, "");
        }
        // @TODO Delay
        cb(null, responseData);
    });
}
exports.getTrainDetail = getTrainDetail;
//# sourceMappingURL=train-detail.js.map