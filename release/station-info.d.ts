import { Token } from "./params";
import { StationInfoResponse } from "./responses";
export declare function getStationInfo(token: Token, stationId: number): Promise<StationInfoResponse>;
