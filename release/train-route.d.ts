import { Token } from "./params";
import { Callback, TrainRouteResponse } from "./responses";
export declare function getTrainRoute(token: Token, trainId: number, cb: Callback<TrainRouteResponse>): void;
