import Axios from "axios";
import * as cheerio from "cheerio";

import {baseUrl} from "./baseUrl";
import {Carrier, CarrierCode, Delay, DelayMinMaxOff, FilterParams, KindOfTrain, SearchTextType, Token} from "./params";
import {TrainsResponse} from "./responses";

// @TODO make sure that all strings that contain spaces in data from grapp are trimmed
declare function getTrains(token: Token, params: FilterParams): Promise<TrainsResponse>;
