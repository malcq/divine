import { TransportsTypes } from "./transports";

export interface StationType {
  station_name: string,
  available_provider: TransportsTypes[]
}

export interface FederalType {
  main_title: string,
  stop_list: StationType[]
}