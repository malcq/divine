import { TransportsTypes } from "./transports";
import { RouterFactoryResult } from './appSettings';

export enum FacilitiesTypes {
  wc = 'toilets',
  elevator = 'elevator',
  wheelchair = 'stepfree_access',
  dbInformation = 'db_information',
  mobileService = 'mobile_service',
  travelCenter = 'travel_center',
  dbLounge = 'db_lounge',
  luggageLockers = 'luggage_lockers',
  mobilityService = 'mobility_service',
  lostProperty = 'lost_property',
  central3S = 'central_3s',
  parkingSpaces = 'parking_spaces',
  bicycleParking = 'parking_spaces_for_bicycles',
  localTransport = 'local_transport',
  taxi = 'taxis',
  carHire = 'car_hire',
  travelItems = 'travel_items',
  wifi = 'wifi',
  bahnhofsmission = 'bahnhofsmission',
}

export interface TransportInfo {
  line: string, // (e.g. "U2")
  transport: TransportsTypes // (e.g. "u-bahn")
  scheme: string,
  color?: string,
  text_color?: string
}

export type ProviderLink = {
  title: string,
  url: string,
}

export interface FacilitiesItem {
  type: FacilitiesTypes,
  available: boolean,
}
export interface TransportsItem {
  type: TransportsTypes,
}
export interface TransportLineItem {
  type: string,
  provider: TransportsTypes
}

export interface StopPageInfo {
  city_name: string,
  title: string,
  link_to_search_provider: ProviderLink,
  available_facilities: FacilitiesItem[],
  transports: TransportsItem[],
  lines: TransportLineItem[]
}

// Interfaces created by real data
export interface IntermediateStopResponse {
  city_name: string,
  platform_name: string, // e.g. "Geis 1"
  stop_arrival_date: string,
  stop_title: string,
  short_title: string,
  state_name: string,
  stop_url: RouterFactoryResult,
};

export interface IntermediateResponseStopInfo {
  stop_title: string,
  city_name: string,
  state_name: string,
  appUrl: string,
  browserUrl: string,
}

export interface WarningResponse {
  timecode: string[],
  description: string | undefined,
  delayed: boolean
}

export interface StopResponse {
  nearest_trip_time: string,
  transport_info: TransportInfo,
  stop_title: string,
  intermediate_stop_list: IntermediateStopResponse[],
  platform_name: string,
  stop_id: string,
  warning_info: WarningResponse,
  stop_time_periods: number[],
  route_back: string,
}

export interface StopListResponse {
  stop_title: string,
  transports: StopResponse[],
  available_line_filter: LinesItemResponse[],
  available_transports_filter: TransportsTypes[],
  linesColorInfo: LinesColorInfo[]
}

export interface LinesItemResponse {
  transport: TransportsTypes,
  line: string
}

export interface StopInfoResponse {
  stop_id: string,
  stop_name: string,
  city: string,
  state: string,
  country: string,
  link_to_search_provider: string,
  short_title: string,
  available_facilities: AvailableFacilities[],
  scheme_info?: SchemeInfo[], 
  scheme_name_short?: string,
  scheme_name_long?: string,
}

export interface SchemeInfo {
  name_long: string,
  name_short: string,
  tier: string,
}

export interface StopAdditionalInfo {
  geo: number[],
  address: string,
  url: string
}

export interface AvailableFacilities {
    title: string,
    description: string
    available: boolean,
    name: FacilitiesTypes
}

export interface ResponseFacilities {
  [key: string]: {
    title: string,
    description: string
  }
}

export interface LinesColorInfo {
  text_color: string,
  color: string,
  line: string,
  transport: TransportsTypes
}