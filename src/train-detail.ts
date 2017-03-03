import Axios from "axios";
import * as cheerio from "cheerio";

import {baseUrl} from "./baseUrl";
import {Token} from "./params";
import {TrainDetailResponse} from "./responses";

export function getTrainDetail(token: Token, trainId: number): Promise<TrainDetailResponse> {
  return Axios.get(`${baseUrl}OneTrain/MainInfo/${token}`, {
    params: {trainId},
    responseType: "text",
  })
    .then(response => response.data)
    .then(html => {
      let $ = cheerio.load(html, {xmlMode: true});
      let $scheduledArrival = $(".arrivalTT > span");
      let $actualArrival = $(".arrivalReal > span");
      let $scheduledDeparture = $(".departureTT > span");
      let $actualDeparture = $(".departureReal > span");
      let $localDelay = $(".infoTrainDelay");
      let $foreignDelay = $(".details:has(label:first-child)");

      let trainDetailData: TrainDetailResponse = {
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
        Delay: null,
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
