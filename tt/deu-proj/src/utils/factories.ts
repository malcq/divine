import {
  AutocompleteItem,
  AutocompleteItemTypes,
} from "../models/autocomplete";

import { getSlug } from './getSlug';
import { DepartureTypes } from "./constants";

import * as widgetOptions from '../components/SearchWidget/options';
import { SelectItem } from "../models/widget";

type createAutocompleteItemOptions = {
  stateName?: string,
  title: string,
  city?: string,
  stopId?: string,
  placeType?: AutocompleteItemTypes,
  short_title?: string;
}
/**
 * Use it if you need to create autocomplete from another data
 * eg. to create object for default selection in header widget
 */
export function createAutocompleteItem(options: createAutocompleteItemOptions): AutocompleteItem {
  const {
    title,
    city = '',
    stateName = '',
    stopId = undefined,
    placeType = AutocompleteItemTypes.unknown,
    short_title
  } = options;

  return {
    city_name: city,
    place_type: placeType,
    state_name: stateName,
    title,
    stop_id: stopId,
    slugs: {
      city_name: getSlug(city),
      state_name: getSlug(stateName),
      title: getSlug(short_title || title),
    }
  }
}

export function getDepartureByQueryString(str?: string): DepartureTypes {
  if (str === DepartureTypes.to) {
    return DepartureTypes.to;
  }

  return DepartureTypes.from;
}

type OptionsType =
  | 'card'
  | 'price'
  | 'person'
  | 'changeover'
  | 'departureTime';

export function getOptionByQueryString(type: OptionsType, str?: string,): SelectItem | undefined {
  let options: SelectItem[] = [];

  switch (type) {
    case 'price':
        options = widgetOptions.pricesOptions;
      break;
    case 'changeover':
      options = widgetOptions.changeoverOptions;
      break;
    case 'departureTime':
      options = widgetOptions.departureOptions;
      break;
    case 'person':
      options = widgetOptions.personList;
      break;
    case 'card':
      options = widgetOptions.bahnCards;
      break;
    default:
      break;
  }

  return options.find((item) => {
    return item.value === str;
  });
}