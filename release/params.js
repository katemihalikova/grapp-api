"use strict";
var Carrier;
(function (Carrier) {
    Carrier[Carrier["Foreign"] = 1] = "Foreign";
    Carrier[Carrier["AHD"] = 2] = "AHD";
    Carrier[Carrier["ARR"] = 3] = "ARR";
    Carrier[Carrier["AWT"] = 4] = "AWT";
    Carrier[Carrier["\u010CD"] = 5] = "\u010CD";
    Carrier[Carrier["DLB"] = 6] = "DLB";
    Carrier[Carrier["GWTR"] = 7] = "GWTR";
    Carrier[Carrier["JHMD"] = 8] = "JHMD";
    Carrier[Carrier["K\u017DC"] = 9] = "K\u017DC";
    Carrier[Carrier["LE"] = 10] = "LE";
    Carrier[Carrier["LOGR"] = 11] = "LOGR";
    Carrier[Carrier["MBMR"] = 12] = "MBMR";
    Carrier[Carrier["MTR"] = 13] = "MTR";
    Carrier[Carrier["RCAS"] = 14] = "RCAS";
    Carrier[Carrier["RJ"] = 15] = "RJ";
    Carrier[Carrier["SZD"] = 16] = "SZD";
})(Carrier = exports.Carrier || (exports.Carrier = {}));
;
var Delay;
(function (Delay) {
    Delay[Delay["Ahead"] = 1] = "Ahead";
    Delay[Delay["Between0and5"] = 2] = "Between0and5";
    Delay[Delay["Between6and15"] = 3] = "Between6and15";
    Delay[Delay["Between16and30"] = 4] = "Between16and30";
    Delay[Delay["Between31and60"] = 5] = "Between31and60";
    Delay[Delay["Over60"] = 6] = "Over60";
    Delay[Delay["Unknown"] = 7] = "Unknown";
})(Delay = exports.Delay || (exports.Delay = {}));
exports.DelayMinMaxOff = -99999;
var KindOfTrain;
(function (KindOfTrain) {
    KindOfTrain[KindOfTrain["EC"] = 1] = "EC";
    KindOfTrain[KindOfTrain["IC"] = 2] = "IC";
    KindOfTrain[KindOfTrain["SC"] = 3] = "SC";
    KindOfTrain[KindOfTrain["EN"] = 4] = "EN";
    KindOfTrain[KindOfTrain["Ex"] = 5] = "Ex";
    KindOfTrain[KindOfTrain["LE"] = 6] = "LE";
    KindOfTrain[KindOfTrain["RJ"] = 7] = "RJ";
    KindOfTrain[KindOfTrain["Rx"] = 8] = "Rx";
    KindOfTrain[KindOfTrain["R"] = 9] = "R";
    KindOfTrain[KindOfTrain["Sp"] = 10] = "Sp";
    KindOfTrain[KindOfTrain["AEx"] = 11] = "AEx";
    KindOfTrain[KindOfTrain["TLX"] = 12] = "TLX";
    KindOfTrain[KindOfTrain["Os"] = 13] = "Os";
    KindOfTrain[KindOfTrain["TL"] = 14] = "TL";
})(KindOfTrain = exports.KindOfTrain || (exports.KindOfTrain = {}));
;
var SearchTextType;
(function (SearchTextType) {
    SearchTextType[SearchTextType["ExactMatch"] = 1] = "ExactMatch";
    SearchTextType[SearchTextType["PartialMatch"] = 2] = "PartialMatch";
})(SearchTextType = exports.SearchTextType || (exports.SearchTextType = {}));
;
//# sourceMappingURL=params.js.map