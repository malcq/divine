import qs from 'query-string';
import {
  AppPages,
  QueryTransportsTypes,
  STOP_LANDING_LIMIT,
} from './constants';
import { AutocompleteItemTypes } from '@models/autocomplete';
import { RouterFactoryResult } from '@models/appSettings';
import { getRelevantTime } from './time/getRelevantTime';

/**
 * PREHARDCODED CONSTANT URLS
 */

export const HOME_URL: RouterFactoryResult = {
  appUrl: `/${AppPages.home}`,
  browserUrl: `/${AppPages.home}`
};

export const JOURNEYS_URL: RouterFactoryResult = {
  appUrl: `/${AppPages.journeys}`,
  browserUrl: `/${AppPages.journeys}`
};

export const TEST_URL: RouterFactoryResult = {
  appUrl: `/${AppPages.test}`,
  browserUrl: `/${AppPages.test}`,
}

export const IMPRINT_URL: RouterFactoryResult = {
  appUrl: `/${AppPages.imprint}`,
  browserUrl: `/${AppPages.imprint}`,
}

export const PRIVACY_URL: RouterFactoryResult = {
  appUrl: `/${AppPages.privacy}`,
  browserUrl: `/${AppPages.privacy}`,
}

export const PHOTO_CREDITS_URL: RouterFactoryResult = {
  appUrl: `/${AppPages.photoCredits}`,
  browserUrl: `/${AppPages.photoCredits}`,
}

/**
 * URL FACTORY FUNCTIONS
 */

type getStopUrlOptions = {
  city: string,
  state: string,
  stop: string,
  date?: string,
  time?: string,
  direction?: string,
  transports?: string,
  lines?: string,
}
export const getStopUrl = (options: getStopUrlOptions): RouterFactoryResult => {
  const {
    city,
    state,
    stop,
    date,
    time,
    direction,
    transports,
    lines,
  } = options;

  const { dateParam, timeParam } = getRelevantTime({
    date,
    time
  });

  const appUrlQuery = qs.stringify({
    city,
    state,
    stop,
    date: dateParam,
    time: timeParam,
    direction,
    transports,
    lines,
  }, { arrayFormat: 'comma' });

  const browserUrlQuery = qs.stringify({
    date: dateParam,
    time: timeParam,
    direction,
    transports,
    lines,
  }, { arrayFormat: 'comma' });

  return {
    appUrl: `/${AppPages.stop}?${appUrlQuery}`,
    browserUrl: `/haltestelle/${state}/${city}/${stop}?${browserUrlQuery}`,
  }
};

type getJourneysUrlOptions = {
  transports?: QueryTransportsTypes,
  date: string,
  time?: string,
  originName: string,
  originType: AutocompleteItemTypes,
  destinName: string,
  destinType: AutocompleteItemTypes,
  journeys?: string,
  passengersTrainCard?: string, // e.g. "kaernten_card,db_bahncard_25_2_klasse"
  person?: string,
  changeovers?: string,
  price?: string,
  zeitFrom?: string,
  direction?: string,
  transport_type?: string | string[]
}
export const getJourneysUrl = (options: getJourneysUrlOptions): RouterFactoryResult => {
  const {
    transports,
    date,
    originName,
    destinName,
    journeys = 'a', // "a" is used to maintain continuity with the old format
    passengersTrainCard = '',
    person = '1',
    // changeovers,
    // price,
    // zeitFrom,
    time,
    direction,
    originType,
    destinType,
    transport_type = ''
  } = options;

  const { dateParam, timeParam } = getRelevantTime({
    date,
    time
  });

  const appUrlQuery = qs.stringify({
    transports,
    date: dateParam,
    originname: originName,
    destinname: destinName,
    origin_type: originType,
    destination_type: destinType,
    journeys,
    passengers_train_card: passengersTrainCard,
    person,
    // changeovers,
    // price,
    // zeit_from: zeitFrom,
    time: timeParam,
    direction,
    transport_type,
  }, { arrayFormat: 'comma' });

  const browserUrlQuery = qs.stringify({
    transport_type,
    transports,
    date: dateParam,
    originname: originName,
    origin_type: originType,
    destinname: destinName,
    destination_type: destinType,
    passengers_train_card: passengersTrainCard,
    person,
    // changeovers,
    // price,
    // zeit_from: zeitFrom,
    time: timeParam,
    direction,
  }, { arrayFormat: 'comma' });

  return {
    appUrl: `/${AppPages.journeys}?${appUrlQuery}`,
    browserUrl: `/reise/${journeys}?${browserUrlQuery}`,
  }
};

type getLineUrlOptions = {
  scheme: string,
  type: string,
  line: string,
  current_stop?: string,
  time?: string,
  date?: string,
  direction?: string,
  showSight?: boolean
}
export const getLineUrl = (options: getLineUrlOptions): RouterFactoryResult => {
  const {
    scheme,
    type,
    line,
    direction,
    current_stop,
    time,
    date,
    showSight
  } = options;

  const { dateParam, timeParam } = getRelevantTime({
    date,
    time
  });

  let queryLine = `${type}-${line}`;
  const lineArr = line.split(' ');
  if (lineArr.length > 1) {
    queryLine = `${lineArr[0]}-${lineArr[1]}`
  };

  const appUrlQuery = qs.stringify({
    scheme,
    type,
    line,
    direction,
    time: timeParam,
    date: dateParam,
    current_stop,
    show_sight: showSight
  }, { arrayFormat: 'comma' });

  const browserUrlQuery = qs.stringify({
    direction,
    time: timeParam,
    date: dateParam,
    current_stop
  }, { arrayFormat: 'comma' });

  return {
    appUrl: `/${AppPages.line}?${appUrlQuery}`,
    browserUrl: `/${AppPages.line}/${scheme}/${queryLine}?${browserUrlQuery}`,
  }
};

type getFederalyUrlOptions = {
  title: string,
  type: string,
  limit?: string,
  page?: string,
};

export const getFederalUrl = (
  options: getFederalyUrlOptions): RouterFactoryResult => {
  const {
    title,
    type,
    limit = STOP_LANDING_LIMIT,
    page = 1,
  } = options;

  const appUrlQuery = qs.stringify({
    type,
    title,
    limit,
    page
  }, { arrayFormat: 'comma' });

  return {
    appUrl: `/${AppPages.federal}?${appUrlQuery}`,
    browserUrl: `/${type}/${title}`
  }
};

type JourneyLandinUrlOptions = {
  name: string,
}

export const getJourneyLandingUrl = (
  options: JourneyLandinUrlOptions): RouterFactoryResult => {
  const {
    name
  } = options;

  const appUrlQuery = qs.stringify({
    name
  }, { arrayFormat: 'comma' });

  const browserUrlQuery = qs.stringify({
  }, { arrayFormat: 'comma' });

  return {
    appUrl: `/${AppPages.journeysLanding}?${appUrlQuery}`,
    browserUrl: `/reise/place/${name}?${browserUrlQuery}`
  }
};

type FlightLandinUrlOptions = {
  name: string,
  airport: string,
}

export const getFlightLandingUrl = (
  options: FlightLandinUrlOptions): RouterFactoryResult => {
  const {
    name,
    airport
  } = options;

  const appUrlQuery = qs.stringify({
    name,
    airport
  }, { arrayFormat: 'comma' });

  const browserUrlQuery = qs.stringify({
  }, { arrayFormat: 'comma' });

  return {
    appUrl: `/${AppPages.flightLanding}?${appUrlQuery}`,
    browserUrl: `/reise/flughafen/${name}/${airport}?${browserUrlQuery}`
  }
}

export const splitQueryParam = (param: string): string[] => {
  return param.split(',')
}

