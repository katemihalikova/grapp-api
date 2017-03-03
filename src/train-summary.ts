import Axios from "axios";

import {baseUrl} from "./baseUrl";
import {Token} from "./params";
import {TrainSummaryResponse} from "./responses";

export function getTrainSummary(token: Token, trainId: number): Promise<TrainSummaryResponse> {
  return Axios.get(`${baseUrl}get/trains/train/${token}`, {
    params: {trainId},
  })
    .then(response => response.data);
}
