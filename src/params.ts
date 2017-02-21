export type Token = string;

export enum Carrier {
  Foreign = 1,
  AHD, // Rail system
  ARR, // ARRIVA vlaky
  AWT, // Advanced World Transport
  ČD, // České dráhy
  DLB, // Die Länderbahn
  GWTR, // GW Train Regio
  JHMD, // Jindřichohradecké místní dráhy
  KŽC, // KŽC Doprava
  LE, // LEO Express
  LOGR, // Lokálka Group
  MBMR, // MBM Rail
  MTR, // METRANS Rail
  RCAS, // Railway Capital
  RJ, // Regiojet
  SZD, // Slezské zemské dráhy
};

// http://public.rfx.cz/cd/S/SR71%20-%20%c8%edseln%edk%20%fa%e8tuj%edc%edch%20jednotek/
export type CarrierCode = Carrier | string;

export enum Delay {
  Ahead = 1,
  Between0and5,
  Between6and15,
  Between16and30,
  Between31and60,
  Over60,
  Unknown,
}
export const DelayMinMaxOff = -99999;

export enum KindOfTrain {
  EC = 1,
  IC,
  SC,
  EN,
  Ex,
  LE,
  RJ,
  Rx,
  R,
  Sp,
  AEx,
  TLX,
  Os,
  TL,
};

export enum SearchTextType {
  ExactMatch = 1,
  PartialMatch,
};

export type FilterParams = {
  CarrierCode?: CarrierCode[],
  PublicKindOfTrain?: KindOfTrain[],
  Delay?: Delay[],
  DelayMin?: number,
  DelayMax?: number,
  SearchByTrainNumber?: boolean,
  SearchByTrainName?: boolean,
  SearchTextType?: SearchTextType,
  SearchPhrase?: string,
  //// nezdokumentováno:
  // FreightKindOfTrain?: string[],
  // TrainNoChange?: number,
  // TrainOutOfOrder?: boolean,
  // TrainRunning?: boolean,
  // SearchExtraTrain?: boolean,
  // SearchByTRID?: boolean,
  // SearchByVehicleNumber?: boolean,
};
