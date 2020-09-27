import { WeatherInfo } from "./weatherwidget";
import { AutocompleteItemTypes } from "./autocomplete";

export interface JourneyLandingCommon {
  arrival_info: JourrneyLandingStopInfo,
  train_journey_text: JourneyText,
  bus_journey_text: JourneyText,
  weather: WeatherInfo[]
};

export interface JourneyLandingResponse extends JourneyLandingCommon {
  available_route: JoutrneyLandingRouteItem[],
};

export interface JourneyLandingExtended extends JourneyLandingCommon {
  train_available_route: JourneyLandingArrivalStop[],
  bus_available_route: JourneyLandingArrivalStop[]
}

export interface JourrneyLandingStopInfo {
  stop_id: string,
  title: string,
  type: AutocompleteItemTypes,
  city_name: string,
  state: string,
};

export interface JourneyText {
  city_name: string,
  price: number,
}

export interface JourneyLandingArrivalStop extends JourrneyLandingStopInfo {
  appUrl: string,
  browserUrl: string,
}

export interface JoutrneyLandingRouteItem extends JourrneyLandingStopInfo {
  transport_type: string[]
};