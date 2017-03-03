"use strict";
var axios_1 = require("axios");
var cheerio = require("cheerio");
var baseUrl_1 = require("./baseUrl");
function getStationInfo(token, stationId) {
    return axios_1["default"].get(baseUrl_1.baseUrl + "OneTrain/StationInfo/" + token, {
        params: { stationId: stationId },
        responseType: "text"
    })
        .then(function (response) { return response.data; })
        .then(function (html) {
        var $ = cheerio.load(html, { xmlMode: true });
        var $header = $(".station_header a");
        var $arrivals = $("#stationArrival .strow");
        var $departures = $("#stationDeparture .strow");
        var stationInfoData = {
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
            stationInfoData.Arrivals = arrivals_1;
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
            stationInfoData.Departures = departures_1;
        }
        return stationInfoData;
    });
}
exports.getStationInfo = getStationInfo;
//# sourceMappingURL=station-info.js.map