import { Token } from "./params";
import { Callback, StationInfoResponse } from "./responses";
export declare function getStationInfo(token: Token, stationId: number, cb: Callback<StationInfoResponse>): void;
