import { Token } from "./params";
import { TrainSummaryResponse } from "./responses";
export declare function getTrainSummary(token: Token, trainId: number): Promise<TrainSummaryResponse>;
