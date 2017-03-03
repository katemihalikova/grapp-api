import { Token } from "./params";
import { TrainDetailResponse } from "./responses";
export declare function getTrainDetail(token: Token, trainId: number): Promise<TrainDetailResponse>;
