/// <reference types="request" />
import * as request from "request";
export declare class StatusCodeError extends Error {
    constructor(response: request.RequestResponse);
}
