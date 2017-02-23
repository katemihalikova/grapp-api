import * as cheerio from "cheerio";
import * as request from "request";

import {baseUrl} from "./baseUrl";
import {StatusCodeError} from "./errors";
import {Token} from "./params";
import {Callback, TrainDetailResponse} from "./responses";

export function getTrainDetail(token: Token, trainId: number, cb: Callback<TrainDetailResponse>): void {
  request({
    url: `${baseUrl}OneTrain/MainInfo/${token}`,
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
    let $scheduledArrival = $(".arrivalTT > span");
    let $actualArrival = $(".arrivalReal > span");
    let $scheduledDeparture = $(".departureTT > span");
    let $actualDeparture = $(".departureReal > span");
    let $localDelay = $(".infoTrainDelay");
    let $foreignDelay = $(".details:has(label:first-child)");

    let responseData: TrainDetailResponse = {
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
