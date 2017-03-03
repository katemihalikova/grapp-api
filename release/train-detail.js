"use strict";
var axios_1 = require("axios");
var cheerio = require("cheerio");
var baseUrl_1 = require("./baseUrl");
function getTrainDetail(token, trainId) {
    return axios_1["default"].get(baseUrl_1.baseUrl + "OneTrain/MainInfo/" + token, {
        params: { trainId: trainId },
        responseType: "text"
    })
        .then(function (response) { return response.data; })
        .then(function (html) {
        var $ = cheerio.load(html, { xmlMode: true });
        var $scheduledArrival = $(".arrivalTT > span");
        var $actualArrival = $(".arrivalReal > span");
        var $scheduledDeparture = $(".departureTT > span");
        var $actualDeparture = $(".departureReal > span");
        var $localDelay = $(".infoTrainDelay");
        var $foreignDelay = $(".details:has(label:first-child)");
        var trainDetailData = {
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
            trainDetailData.ScheduledArrival = $scheduledArrival.text().replace(/[^\d:]/g, "");
        }
        if ($actualArrival.length) {
            trainDetailData.ActualArrival = $actualArrival.text().replace(/[^\d:]/g, "");
        }
        if ($scheduledDeparture.length) {
            trainDetailData.ScheduledDeparture = $scheduledDeparture.text().replace(/[^\d:]/g, "");
        }
        if ($actualDeparture.length) {
            trainDetailData.ActualDeparture = $actualDeparture.text().replace(/[^\d:]/g, "");
        }
        // @TODO Delay
        return trainDetailData;
    });
}
exports.getTrainDetail = getTrainDetail;
//# sourceMappingURL=train-detail.js.map