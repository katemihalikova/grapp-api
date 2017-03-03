import Axios from "axios";

import {baseUrl} from "./baseUrl";
import {Token} from "./params";
import {NetworkResponse} from "./responses";

export function getNetwork(token: Token): Promise<NetworkResponse> {
  return Axios.get(`${baseUrl}get/network/all/${token}`)
    .then(response => response.data);
}
