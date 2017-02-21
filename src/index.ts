import * as cheerio from "cheerio";
import * as request from "request";

import {Carrier, CarrierCode, Delay, DelayMinMaxOff, FilterParams, KindOfTrain, SearchTextType, Token} from "./params";
import {NetworkResponse, StationInfoResponse, TrainDetailResponse, TrainRouteResponse, TrainsResponse, TrainSummaryResponse} from "./responses";

const baseUrl = "http://provoz.szdc.cz/grappnv/";

export function loadToken(cb: (error: Error | null, token: Token | null) => void): void {
  request(baseUrl, (error, response, html) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode >= 400) {
      cb(new Error(`Request to XXX returned status code ${response.statusCode}.`), null); // @TODO get requested url from response object
      return;
    }
    let $ = cheerio.load(html);
    cb(null, $("#token").val());
  });
}

export function loadNetwork(token: Token, cb: (error: Error | null, data: NetworkResponse | null) => void): void {
  request({
    url: `${baseUrl}get/network/all/${token}`,
    json: true,
  }, (error, response, json) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode >= 400) {
      cb(new Error(`Request to XXX returned status code ${response.statusCode}.`), null); // @TODO get requested url from response object
      return;
    }
    cb(null, json);
  });
}

declare function loadTrains(token: Token, params: FilterParams, cb: (error: Error | null, data: TrainsResponse | null) => void): void;

export function loadTrainSummary(token: Token, trainId: number, cb: (error: Error | null, data: TrainSummaryResponse | null) => void): void {
  request({
    url: `${baseUrl}get/trains/train/${token}`,
    qs: {trainId},
    json: true,
  }, (error, response, json) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode >= 400) {
      cb(new Error(`Request to XXX returned status code ${response.statusCode}.`), null); // @TODO get requested url from response object
      return;
    }
    cb(null, json);
  });
}

declare function loadTrainDetail(token: Token, trainId: number, cb: (error: Error | null, data: TrainDetailResponse | null) => void): void;

declare function loadTrainRoute(token: Token, trainId: number, cb: (error: Error | null, data: TrainRouteResponse | null) => void): void;

declare function loadStationInfo(token: Token, stationId: number, cb: (error: Error | null, data: StationInfoResponse | null) => void): void;
