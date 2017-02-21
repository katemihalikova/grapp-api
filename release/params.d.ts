export declare type Token = string;
export declare enum Carrier {
    Foreign = 1,
    AHD = 2,
    ARR = 3,
    AWT = 4,
    ČD = 5,
    DLB = 6,
    GWTR = 7,
    JHMD = 8,
    KŽC = 9,
    LE = 10,
    LOGR = 11,
    MBMR = 12,
    MTR = 13,
    RCAS = 14,
    RJ = 15,
    SZD = 16,
}
export declare type CarrierCode = Carrier | string;
export declare enum Delay {
    Ahead = 1,
    Between0and5 = 2,
    Between6and15 = 3,
    Between16and30 = 4,
    Between31and60 = 5,
    Over60 = 6,
    Unknown = 7,
}
export declare const DelayMinMaxOff = -99999;
export declare enum KindOfTrain {
    EC = 1,
    IC = 2,
    SC = 3,
    EN = 4,
    Ex = 5,
    LE = 6,
    RJ = 7,
    Rx = 8,
    R = 9,
    Sp = 10,
    AEx = 11,
    TLX = 12,
    Os = 13,
    TL = 14,
}
export declare enum SearchTextType {
    ExactMatch = 1,
    PartialMatch = 2,
}
export declare type FilterParams = {
    CarrierCode?: CarrierCode[];
    PublicKindOfTrain?: KindOfTrain[];
    Delay?: Delay[];
    DelayMin?: number;
    DelayMax?: number;
    SearchByTrainNumber?: boolean;
    SearchByTrainName?: boolean;
    SearchTextType?: SearchTextType;
    SearchPhrase?: string;
};
