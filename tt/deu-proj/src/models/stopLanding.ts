import { TransportsTypes } from "./transports"

export interface StopLandingResponse {
  place_info: StopLandingPlace,
  stop_list: StopLandingList[],
  pagination: ServiceInfo,
  available_schemes: AvailableScheme[],
  service_companies?: ServiceCompanies[]
}

export interface StopLandingPlace {
  stop_id: string,
  title: string,
  short_title: string,
  type: string,
  city_name: string,
  state: string,
  country_name: string
}

export interface StopLandingList {
  departure_info: StopLandingPlace,
  available_provider: TransportsTypes[],
  scheme: string,
  url: StopLandingLinks
}

export interface ServiceInfo {
  totalDocs: number,
  limit: number,
  totalPages: number,
  page: number,
  pagingCounter: number,
  hasPrevPage: boolean,
  hasNextPage: boolean,
  prevPage: number | null,
  nextPage: number | null,
}

export interface StopLandingLinks {
  appUrl: string,
  browserUrl: string,
}

export interface AvailableScheme {
  scheme_name_short: string,
  scheme_name_long: string
}

export interface ServiceCompanies {
  scheme: AvailableScheme,
  sub_schemes: AvailableScheme[]
}