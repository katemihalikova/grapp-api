import * as request from "request";
import {Url} from "url";

export class StatusCodeError extends Error {
  constructor(response: request.RequestResponse) {
    super(`Request to ${(response.request as Url).href} returned status code ${response.statusCode}.`);
  }
}
