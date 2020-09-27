export enum AutocompleteItemTypes {
  place = 'stop',
  city = 'city',
  unknown = 'unknown',
}

export interface AutcompleteResponse {
  stop_id: string,
  city_name: string,
  state_name: string,
  short_title: string,
  title: string,
  place_type: AutocompleteItemTypes,
}

export interface AutocompleteItem {
  stop_id?: string,
  city_name: string,
  state_name: string,
  title: string,
  place_type: AutocompleteItemTypes,
  slugs: {
    title: string,
    city_name: string,
    state_name: string,
  }
}
