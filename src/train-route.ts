import Axios from "axios";
import * as cheerio from "cheerio";

import {baseUrl} from "./baseUrl";
import {Token} from "./params";
import {RouteStation, TrainRouteResponse} from "./responses";

export function getTrainRoute(token: Token, trainId: number): Promise<TrainRouteResponse> {
  return Axios.get(`${baseUrl}OneTrain/RouteInfo/${token}`, {
    params: {trainId},
    responseType: "text",
  })
    .then(response => response.data)
    .then(html => {
      let $ = cheerio.load(html, {xmlMode: true});
      let $stations = $(".route > .row").not(".rowRoute");

      let trainRouteData: TrainRouteResponse = {
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
