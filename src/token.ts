import * as cheerio from "cheerio";
import * as request from "request";

import {baseUrl} from "./baseUrl";
import {StatusCodeError} from "./errors";
import {Token} from "./params";
import {Callback} from "./responses";

export function loadToken(cb: Callback<Token>): void {
  request({
    url: baseUrl,
  }, (error, response, html) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode >= 400) {
      cb(new StatusCodeError(response), null);
      return;
    }
    let $ = cheerio.load(html);
    cb(null, $("#token").val());
  });
}
