"use strict";
var axios_1 = require("axios");
var cheerio = require("cheerio");
var baseUrl_1 = require("./baseUrl");
function getTrainRoute(token, trainId) {
    return axios_1["default"].get(baseUrl_1.baseUrl + "OneTrain/RouteInfo/" + token, {
        params: { trainId: trainId },
        responseType: "text"
    })
        .then(function (response) { return response.data; })
        .then(function (html) {
        var $ = cheerio.load(html, { xmlMode: true });
        var $stations = $(".route > .row").not(".rowRoute");
        var trainRouteData = {
            Id: trainId,
            Title: $(".routeInfo > div > div:nth-child(1) strong").text().trim(),
            CarrierName: $(".routeInfo > div > div:nth-child(2)> strong").text().trim(),
            Stations: [],
            FromStationName: $(".stations > div:nth-child(1)").clone().children().remove().end().text().trim(),
            ToStationName: $(".stations > div:nth-child(2)").clone().children().remove().end().text().trim(),
            LastKnownStation: {}
        };
        $stations.each(function (_, station) {
            var $header = $("> div:nth-child(1)", station);
            var $headerLink = $("a", $header);
            var $arrival = $("> div:nth-child(2)", station);
            var $actualArrival = $(".calculatedTime, .realTime", $arrival);
            var $departure = $("> div:nth-child(3)", station);
            var $actualdeparture = $(".calculatedTime, .realTime", $departure);
            var stationData = {
                Id: $headerLink.length ? +$headerLink.attr("onclick").match(/InfoStation\((\d+)\)/)[1] : null,
                Name: $header.text().trim(),
                ScheduledArrival: null,
                ActualArrival: null,
                ScheduledDeparture: null,
                ActualDeparture: null
            };
            if (stationData.Name.indexOf("->") === 0) {
                stationData.Name = stationData.Name.replace("->", "").trim();
                trainRouteData.LastKnownStation = stationData;
            }
            if ($arrival.children().length) {
                stationData.ScheduledArrival = $(".timeTT", $arrival).text().replace(/[^\d:]/g, "");
                if ($actualArrival.length) {
                    stationData.ActualArrival = $actualArrival.text().replace(/[^\d:]/g, "");
                }
            }
            if ($departure.children().length) {
                stationData.ScheduledDeparture = $(".timeTT", $departure).text().replace(/[^\d:]/g, "");
                if ($actualdeparture.length) {
                    stationData.ActualDeparture = $actualdeparture.text().replace(/[^\d:]/g, "");
                }
            }
            trainRouteData.Stations.push(stationData);
        });
        return trainRouteData;
    });
}
exports.getTrainRoute = getTrainRoute;
//# sourceMappingURL=train-route.js.map