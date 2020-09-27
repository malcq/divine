import { convertTimeDateStringsToDate } from './time/convertTimeDateStringsToDate';
import {
  createAutocompleteItem,
  getDepartureByQueryString,
  getOptionByQueryString,
} from './factories';

import { WidgetInitialProps } from "../models/widget";
import { AutocompleteItemTypes } from "../models/autocomplete";
import { DepartureTypes } from "./constants";
import { getStringFromQuery } from './getStringFromQuery';
import format from 'date-fns/format';


type getWidgetInitialPropsOptions = {
  time?: string | string[],
  date?: string | string[],
  departure?: string | string[],
  stopFrom: {
    title: string,
    state?: string,
    city?: string,
    place_type?: AutocompleteItemTypes,
    stop_id?: string
    short_title?: string;
  },
  stopTo?: {
    title: string,
    state?: string,
    city?: string,
    place_type?: AutocompleteItemTypes,
    stop_id?: string,
  },

  price?: string | string[],
  changeover?: string | string[],
  departureTime?: string | string[],
  person?: string | string[],
  card?: string | string[],
  transportSelected?: string | string[],
};
export function getWidgetInitialProps(
  options: getWidgetInitialPropsOptions
): WidgetInitialProps {
  const {
    departure = DepartureTypes.from,
    stopFrom,
    stopTo,

    time,
    date,

    price,
    card,
    changeover,
    departureTime,
    person,
    transportSelected,
  } = options;

  const initialDate = convertTimeDateStringsToDate(
    getStringFromQuery(date),
    getStringFromQuery(time),
  );
  const initialDeparture = getDepartureByQueryString(
    getStringFromQuery(departure),
  )
  const initialStopFrom = createAutocompleteItem({
    title: stopFrom.title,
    city: stopFrom.city,
    stateName: stopFrom.state,
    placeType: stopFrom.place_type ?? AutocompleteItemTypes.unknown,
    stopId: stopFrom.stop_id,
    short_title: stopFrom.short_title
  });

  const result: WidgetInitialProps = {
    date: format(initialDate, 'MM dd yyyy HH:mm'),
    departure: initialDeparture,
    stopFrom: initialStopFrom,
  }

  if (stopTo) {
    result.stopTo = createAutocompleteItem({
      title: stopTo.title,
      city: stopTo.city,
      stateName: stopTo.state,
      placeType: stopTo.place_type ?? AutocompleteItemTypes.unknown,
      stopId: stopTo.stop_id
    })
  }

  if (price) {
    result.price = getOptionByQueryString(
      'price',
      getStringFromQuery(price),
    );
  }

  if (card) {
    result.card = getOptionByQueryString(
      'card',
      getStringFromQuery(card),
    );
  }

  if (changeover) {
    result.changeover = getOptionByQueryString(
      'changeover',
      getStringFromQuery(changeover),
    );
  }

  if (person) {
    result.person = getOptionByQueryString(
      'person',
      getStringFromQuery(person),
    );
  }

  if (departureTime) {
    result.departureTime = getOptionByQueryString(
      'departureTime',
      getStringFromQuery(departureTime),
    );
  }
  if (transportSelected) {
    const strTransport = getStringFromQuery(transportSelected) ?? '';
    const arrTransport = strTransport.split(',');

    result.transportSelected = {
      bus: arrTransport.length < 2 ? arrTransport.includes('bus') : false,
      train: arrTransport.length < 2 ? arrTransport.includes('train') : false,
    }
  }

  return result;
};
