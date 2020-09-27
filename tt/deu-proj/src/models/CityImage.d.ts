// real API
  export interface PlacesResponse {
    cities: Place,
    federal_states: Place,
    beautiful_cities: Place,
    europe_stops: Place,
  };

  export interface CityImage {
    url: string,
    alt: string,
    title: string,
    page_link: PlaceLink,
    stop_info: StopPlace,
  };

export interface Place {
  slider: CityImage[],
  stop_list: StopPlace[],
};

export interface PlaceLink {
  appUrl: string,
  browserUrl: string,
}

export interface StopPlace {
  state: string,
  city_name: string,
  title: string,
  stop_id: string,
  type: string
  link: PlaceLink,
}