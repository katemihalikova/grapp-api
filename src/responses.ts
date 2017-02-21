export type NetworkResponse = {
  Stations: Station[],
  Paths: Path[],
  Boundary: Path[],
} & CommonResponse;


export type TrainsResponse = {
  QuickMessage: string,
  ReloadPage: boolean,
  Trains: Train[],
} & CommonResponse;

export type TrainSummaryResponse = {
  Id: number,
  Confirmed1: GPS[],
  InPlan1: GPS[],
  Confirmed2: any[],
  InPlan2: any[],
  Stations: Station[],
} & CommonResponse;

export type TrainDetailResponse = {
  Id: number, // @TODO get it from request param, not from response
  Title: string,
  CarrierName: string,
  FromStationName: string,
  ToStationName: string,
} & ( // @TODO make sure that gray local train is covered by this
  {
    ConfirmedStationName: string,
    ScheduledArrival: string,
    ConfirmedArrival: string,
    Delay: number,
  } | {
    ConfirmedStationName: string,
    ScheduledDeparture: string,
    ConfirmedDeparture: string,
    Delay: number,
  } | {
    LastKnownStationName: string,
    Delay: number | null,
  }
);

export type TrainRouteResponse = {
  Id: number, // @TODO get it from request param, not from response
  Title: string,
  CarrierName: string,
  Stations: RouteStation[],
  FromStation: RouteStation,
  ToStation: RouteStation,
  LastKnownStation: RouteStation,
};

export type StationInfoResponse = {
  Id: number, // @TODO get it from request param, not from response
  Name: string,
  TabuleId: number | null, // @TODO check if it is possible to request stationinfo of stations that are not clickable in train route info (and thus have TabuleId). If not, TabuleId can't be null
  Departures: TrainDeparture[],
  Arrivals: TrainArrival[],
};




export type TrainDeparture = {
  Title: string,
  ScheduledDeparture: string,
  ToStationName: string,
  Platform: string | null,
  Track: string | null,
  Delay: number | null,
};

export type TrainArrival = {
  Title: string,
  ScheduledArrival: string,
  FromStationName: string,
  Platform: string | null,
  Track: string | null,
  Delay: number | null,
};




export type RouteStation = {
  Name: string,
  ScheduledArrival: string | null,
  ActualArrival: string | null,
  ScheduledDeparture: string | null,
  ActualDeparture: string | null,
};



export type CommonResponse = {
  CopyrightNotice: string,
  InvokeGUID: string,
};

export type Station = {
  Id: number,
  Name: string,
  GPS: GPS,
  LayerId: number,
  TableInfo: boolean,
};

export type Path = {
  From: GPS,
  To: GPS,
};

export type GPS = [number, number];

export type Train = {
  Id: number,
  Angle: number,
  GPS: GPS,
  Order: number,
  Layer: number,
  Title: string,
  Icon: Icon,
};

export enum Icon {
  "osobni_seda_stojici.png" = 111,
  "osobni_seda.png" = 112,
  "osobni_modra_stojici.png" = 121,
  "osobni_modra.png" = 122,
  "osobni_zelena_stojici.png" = 131,
  "osobni_zelena.png" = 132,
  "osobni_zluta_stojici.png" = 141,
  "osobni_zluta.png" = 142,
  "osobni_oranzova_stojici.png" = 151,
  "osobni_oranzova.png" = 152,
  "osobni_cervena_stojici.png" = 161,
  "osobni_cervena.png" = 162,
  "osobni_hneda_stojici.png" = 171,
  "osobni_hneda.png" = 172,
  "nakladni_seda_stojici.png" = 211,
  "nakladni_seda.png" = 212,
  "nakladni_modra_stojici.png" = 221,
  "nakladni_modra.png" = 222,
  "nakladni_zelena_stojici.png" = 231,
  "nakladni_zelena.png" = 232,
  "nakladni_zluta_stojici.png" = 241,
  "nakladni_zluta.png" = 242,
  "nakladni_oranzova_stojici.png" = 251,
  "nakladni_oranzova.png" = 252,
  "nakladni_cervena_stojici.png" = 261,
  "nakladni_cervena.png" = 262,
  "nakladni_hneda_stojici.png" = 271,
  "nakladni_hneda.png" = 272,
};
