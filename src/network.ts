import * as request from "request";

import {baseUrl} from "./baseUrl";
import {StatusCodeError} from "./errors";
import {Token} from "./params";
import {Callback, NetworkResponse} from "./responses";

export function getNetwork(token: Token, cb: Callback<NetworkResponse>): void {
  request({
    url: `${baseUrl}get/network/all/${token}`,
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
