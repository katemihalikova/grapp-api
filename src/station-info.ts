import Axios from "axios";
import * as cheerio from "cheerio";

import {baseUrl} from "./baseUrl";
import {Token} from "./params";
import {StationInfoResponse, TrainArrival, TrainDeparture} from "./responses";

export function getStationInfo(token: Token, stationId: number): Promise<StationInfoResponse> {
  return Axios.get(`${baseUrl}OneTrain/StationInfo/${token}`, {
    params: {stationId},
    responseType: "text",
  })
    .then(response => response.data)
    .then(html => {
      let $ = cheerio.load(html, {xmlMode: true});
      let $header = $(".station_header a");
      let $arrivals = $("#stationArrival .strow");
      let $departures = $("#stationDeparture .strow");

      let stationInfoData: StationInfoResponse = {
        Id: stationId,
        Name: $header.text().trim(),
        TabuleId: +($header.attr("href").match(/id=(\d+)/) as RegExpMatchArray)[1],
        Arrivals: null,
        Departures: null,
      };

      if ($arrivals.children().length) {
        let arrivals: TrainArrival[] = [];
        $arrivals.each((_, train) => {
          let platformTrack = $("> div:first-child", train).clone().children().remove().end().text().trim().match(/nást. (.*) \/ kolej (.*)/) as RegExpMatchArray;
          let $delay = $(".stationInfoDelay", train);
          arrivals.push({
            Title: $(".kindOfTrainNor", train).text().trim(),
            ScheduledArrival: $("> div:nth-child(1) b", train).text().trim(),
            FromStationName: $("> div:nth-child(2) b", train).text().trim(),
            Platform: platformTrack[1] === "-" ? null : platformTrack[1],
            Track: platformTrack[2] === "-" ? null : platformTrack[2],
            Delay: $delay.length ? +$delay.text().replace(/zpožd[eě]ní/, "").trim() : null,
          });
        });
        stationInfoData.Arrivals = arrivals;
      }
      if ($departures.children().length) {
        let departures: TrainDeparture[] = [];
        $departures.each((_, train) => {
          let platformTrack = $("> div:first-child", train).clone().children().remove().end().text().trim().match(/nást. (.*) \/ kolej (.*)/) as RegExpMatchArray;
          let $delay = $(".stationInfoDelay", train);
          departures.push({
            Title: $(".kindOfTrainNor", train).text().trim(),
            ScheduledDeparture: $("> div:nth-child(1) b", train).text().trim(),
            ToStationName: $("> div:nth-child(2) b", train).text().trim(),
            Platform: platformTrack[1] === "-" ? null : platformTrack[1],
            Track: platformTrack[2] === "-" ? null : platformTrack[2],
            Delay: $delay.length ? +$delay.text().replace(/zpožd[eě]ní/, "").trim() : null,
          });
        });
        stationInfoData.Departures = departures;
      }

      return stationInfoData;
    });
}
