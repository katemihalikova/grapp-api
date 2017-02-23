"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StatusCodeError = (function (_super) {
    __extends(StatusCodeError, _super);
    function StatusCodeError(response) {
        return _super.call(this, "Request to " + response.request.href + " returned status code " + response.statusCode + ".") || this;
    }
    return StatusCodeError;
}(Error));
exports.StatusCodeError = StatusCodeError;
//# sourceMappingURL=errors.js.map