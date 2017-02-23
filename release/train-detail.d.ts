import { Token } from "./params";
import { Callback, TrainDetailResponse } from "./responses";
export declare function getTrainDetail(token: Token, trainId: number, cb: Callback<TrainDetailResponse>): void;
