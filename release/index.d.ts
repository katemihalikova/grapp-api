import { Token } from "./params";
import { NetworkResponse, TrainSummaryResponse } from "./responses";
export declare function loadToken(cb: (error: Error | null, token: Token | null) => void): void;
export declare function loadNetwork(token: Token, cb: (error: Error | null, data: NetworkResponse | null) => void): void;
export declare function loadTrainSummary(token: Token, trainId: number, cb: (error: Error | null, data: TrainSummaryResponse | null) => void): void;
