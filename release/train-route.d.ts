import { Token } from "./params";
import { TrainRouteResponse } from "./responses";
export declare function getTrainRoute(token: Token, trainId: number): Promise<TrainRouteResponse>;
