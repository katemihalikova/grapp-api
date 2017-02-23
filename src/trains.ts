import * as cheerio from "cheerio";
import * as request from "request";

import {baseUrl} from "./baseUrl";
import {StatusCodeError} from "./errors";
import {Carrier, CarrierCode, Delay, DelayMinMaxOff, FilterParams, KindOfTrain, SearchTextType, Token} from "./params";
import {Callback, TrainsResponse} from "./responses";

// @TODO make sure that all strings that contain spaces in data from grapp are trimmed
declare function getTrains(token: Token, params: FilterParams, cb: Callback<TrainsResponse>): void;
