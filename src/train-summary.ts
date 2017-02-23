import * as request from "request";

import {baseUrl} from "./baseUrl";
import {StatusCodeError} from "./errors";
import {Token} from "./params";
import {Callback, TrainSummaryResponse} from "./responses";

export function getTrainSummary(token: Token, trainId: number, cb: Callback<TrainSummaryResponse >): void {
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
      cb(new StatusCodeError(response), null);
      return;
    }
    cb(null, json);
  });
}
