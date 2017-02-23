"use strict";
var cheerio = require("cheerio");
var request = require("request");
var baseUrl_1 = require("./baseUrl");
var errors_1 = require("./errors");
function getStationInfo(token, stationId, cb) {
    request({
        url: baseUrl_1.baseUrl + "OneTrain/StationInfo/" + token,
        qs: { stationId: stationId }
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
        var $header = $(".station_header a");
        var $arrivals = $("#stationArrival .strow");
        var $departures = $("#stationDeparture .strow");
        var responseData = {
            Id: stationId,
            Name: $header.text().trim(),
            TabuleId: +$header.attr("href").match(/id=(\d+)/)[1],
            Arrivals: null,
            Departures: null
        };
        if ($arrivals.children().length) {
            var arrivals_1 = [];
            $arrivals.each(function (_, train) {
                var platformTrack = $("> div:first-child", train).clone().children().remove().end().text().trim().match(/nást. (.*) \/ kolej (.*)/);
                var $delay = $(".stationInfoDelay", train);
                arrivals_1.push({
                    Title: $(".kindOfTrainNor", train).text().trim(),
                    ScheduledArrival: $("> div:nth-child(1) b", train).text().trim(),
                    FromStationName: $("> div:nth-child(2) b", train).text().trim(),
                    Platform: platformTrack[1] === "-" ? null : platformTrack[1],
                    Track: platformTrack[2] === "-" ? null : platformTrack[2],
                    Delay: $delay.length ? +$delay.text().replace(/zpožd[eě]ní/, "").trim() : null
                });
            });
            responseData.Arrivals = arrivals_1;
        }
        if ($departures.children().length) {
            var departures_1 = [];
            $departures.each(function (_, train) {
                var platformTrack = $("> div:first-child", train).clone().children().remove().end().text().trim().match(/nást. (.*) \/ kolej (.*)/);
                var $delay = $(".stationInfoDelay", train);
                departures_1.push({
                    Title: $(".kindOfTrainNor", train).text().trim(),
                    ScheduledDeparture: $("> div:nth-child(1) b", train).text().trim(),
                    ToStationName: $("> div:nth-child(2) b", train).text().trim(),
                    Platform: platformTrack[1] === "-" ? null : platformTrack[1],
                    Track: platformTrack[2] === "-" ? null : platformTrack[2],
                    Delay: $delay.length ? +$delay.text().replace(/zpožd[eě]ní/, "").trim() : null
                });
            });
            responseData.Departures = departures_1;
        }
        cb(null, responseData);
    });
}
exports.getStationInfo = getStationInfo;
//# sourceMappingURL=station-info.js.map