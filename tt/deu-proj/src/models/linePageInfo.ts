import { TransportsTypes } from "./transports";
import { AutocompleteItemTypes } from "./autocomplete";

export type StateStopInfo = {
  arr_time: string,
  dep_time: string,
  platform_name: string
}

export interface LineStop {
  stop_name: string,
  current: boolean,
  forward_direction: StateStopInfo,
  back_direction: StateStopInfo,
  city_name?: string,
  state_name?: string,
}

export interface LineStops {
  transfer_provider: TransportsTypes,
  line: string,
  dep_name: string,
  arr_name: string,
  line_stops: LineStop[]
}

type RespErr = { error: true } & { message: string };
type CommonErr = { error: false } | RespErr;

export type LineResponse = {
  transfer_provider: TransportsTypes,
  line: string,
  deeplink: string,
  departure_info: LineStopInfo,
  scheme: LineScheme,
  line_stops: LineStopResponse[],
  color: string,
  text_color: string,
} & CommonErr;

export interface LineStopInfo {
  stop_name: string,
  short_title: string,
  stop_id: string,
  place_type: AutocompleteItemTypes,
  city_name: string,
  state_name: string,
};

export interface LineScheme {
  title: string,
  scheme_name_short: string,
  scheme_name_long: string,
};

export interface LineStopResponse {
  current: boolean,
  stop_name: string,
  short_title: string,
  stop_id: string,
  forward_direction: LineSheduleInfo,
  back_direction: LineSheduleInfo,
  city_name?: string,
  state_name?: string,
};

export interface LineSheduleInfo {
  position: number,
  stop_arrival_date: string,
  platform_name: string
}