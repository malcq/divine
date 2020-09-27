import { AutocompleteItem } from "./autocomplete";
import { DepartureTypes } from "../utils/constants";

export enum PartsOfDay {
  morning = 'morning',
  lunchTime = 'lunchtime',
  evening = 'evening',
  default = 'all'
};

export interface WidgetInitialProps {
  date: string,
  departure: DepartureTypes,

  stopFrom: AutocompleteItem,
  stopTo?: AutocompleteItem,
  person?: PersonItem,
  card?: BahncardItem,
  price?: PriceItem,
  changeover?: ChangeoverItem,
  departureTime?: DepartureTimeItem,
  transportSelected?: TransportFilter
};

export interface SubmitStopData {
  departure: DepartureTypes,
  date: Date,
  stop: AutocompleteItem,
}

export interface SubmitJourneyData {
  fromStop: AutocompleteItem,
  toStop: AutocompleteItem,
  date: Date,
  persons: PersonItem,
  bahncard: BahncardItem,
  departure: DepartureTypes,
  transport_type: ButtonTransportTypes | string,
}

export interface SelectItem {
  title: string,
  value: string,
  selected?: boolean,
  disabled?: boolean,
}

export interface PersonItem extends SelectItem {}

export interface BahncardItem extends SelectItem {}

export interface ChangeoverItem extends SelectItem {}

export interface DepartureTimeItem extends SelectItem {}

export interface PriceItem extends SelectItem {}

export type ButtonTransportTypes = 'bus' | 'train';
export interface TransportFilter {
  bus: boolean,
  train: boolean,
}

export interface HeaderWidgetErrors {
  to?: boolean,
  from?: boolean,
}