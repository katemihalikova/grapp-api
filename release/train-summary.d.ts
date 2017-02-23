import { Token } from "./params";
import { Callback, TrainSummaryResponse } from "./responses";
export declare function getTrainSummary(token: Token, trainId: number, cb: Callback<TrainSummaryResponse>): void;
