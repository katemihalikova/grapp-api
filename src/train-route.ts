import * as cheerio from "cheerio";
import * as request from "request";

import {baseUrl} from "./baseUrl";
import {StatusCodeError} from "./errors";
import {Token} from "./params";
import {Callback, RouteStation, TrainRouteResponse} from "./responses";

export function getTrainRoute(token: Token, trainId: number, cb: Callback<TrainRouteResponse>): void {
  request({
    url: `${baseUrl}OneTrain/RouteInfo/${token}`,
    qs: {trainId},
  }, (error, response, html) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode >= 400) {
      cb(new StatusCodeError(response), null);
      return;
    }

    let $ = cheerio.load(html, {xmlMode: true});
    let $stations = $(".route > .row").not(".rowRoute");

    let responseData: TrainRouteResponse = {
      Id: trainId,
      Title: $(".routeInfo > div > div:nth-child(1) strong").text().trim(),
      CarrierName: $(".routeInfo > div > div:nth-child(2)> strong").text().trim(),
      Stations: [],
      FromStationName: $(".stations > div:nth-child(1)").clone().children().remove().end().text().trim(),
      ToStationName: $(".stations > div:nth-child(2)").clone().children().remove().end().text().trim(),
      LastKnownStation: {} as any,
    };

    $stations.each((_, station) => {
      let $header = $("> div:nth-child(1)", station);
      let $headerLink = $("a", $header);
      let $arrival = $("> div:nth-child(2)", station);
      let $actualArrival = $(".calculatedTime, .realTime", $arrival);
      let $departure = $("> div:nth-child(3)", station);
      let $actualdeparture = $(".calculatedTime, .realTime", $departure);

      let stationData: RouteStation = {
        Id: $headerLink.length ? +($headerLink.attr("onclick").match(/InfoStation\((\d+)\)/) as RegExpMatchArray)[1] : null,
        Name: $header.text().trim(),
        ScheduledArrival: null,
        ActualArrival: null,
        ScheduledDeparture: null,
        ActualDeparture: null,
      };

      if (stationData.Name.indexOf("->") === 0) {
        stationData.Name = stationData.Name.replace("->", "").trim();
        responseData.LastKnownStation = stationData;
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

      responseData.Stations.push(stationData);
    });

    cb(null, responseData);
  });
}
