import queryString from 'query-string';
import { CancelTokenSource } from 'axios';

import axios from './axios';
import { facilities } from '../utils/facilities';
import { StopListResponse, StopInfoResponse, StopAdditionalInfo, StopResponse, LinesColorInfo, SchemeInfo, IntermediateStopResponse } from '../models/stop';
import { FaqResponse, ContentTypes } from '../models/stopfaq';
import { getStringFromQuery } from '../utils/getStringFromQuery';
import { getRelativeTime } from '@utils/time/getRelativeTime';
import { getFormatedPlatform } from '@utils/getFormatedPlatform';
import { getStopUrl } from '@utils/router.util';
import { getSlug } from '@utils/getSlug';
import getColorsInfo from '@utils/getColorsInfo';
import { getNewDate } from '@utils/time/getNewDate';
import { getRelevantDateFromString } from '@utils/time/getRelevantDateFromString';
import { FilterOrder } from '@utils/transportFilterOrder';

export interface RequiredOptions {
  name: string | string[],
  city: string | string[],
  userAgent?: string | string[],
  cancelSource?: CancelTokenSource | null,
};

export interface AllAvailableOptions extends RequiredOptions {
  state?: string | string[],
  country?: string | string[],
  date?: string | string[],
  time?: string | string[],
  dir?: string | string[],
  lines?: string | string[],
  transports?: string | string[],
};

export interface StopInfoOptions extends RequiredOptions {
  state?: string | string[],
  country?: string | string[],
  cancelSource?: CancelTokenSource | null,
}

export async function getStopInfo(options: StopInfoOptions): Promise<{
  stopInfo: StopInfoResponse,
  additionalInfo: StopAdditionalInfo
}> {
  const paramOptions = {
    name: options.name,
    city: options.city,
    state: options.state,
    country: options.country,
  }
  const res = await axios
    .get('/api/haltestelle/info', {
      cancelToken: options.cancelSource?.token,
      params: paramOptions,
      headers: {
        'x-user-agent': options.userAgent
      }
    });
  if (res.data.error) {
    throw new Error(res.data.message);
  }
  // return obj with facilities which have a field "title" 
  const availableFacilities = Object.keys(res.data.available_facilities)
    .reduce((acc, curr) => {
      if (res.data.available_facilities[curr].title) {
        return {
          ...acc,
          [curr]: res.data.available_facilities[curr]
        }
      }
      return {
        ...acc
      }
    }, {});

  const parsedSchemeInfo = res.data.scheme_info.map(({ name_long, name_short, tier }: SchemeInfo) => {

    if (name_long && name_short && name_long.startsWith(name_short)) {
      name_long = name_long.replace(name_short, '');
    };

    return {
      tier,
      name_long,
      name_short,
    }
  });


  return {
    stopInfo: {
      stop_id: res.data.stop_id,
      stop_name: res.data.stop_name,
      short_title: res.data.short_title,
      city: res.data.city,
      state: res.data.state,
      country: res.data.country,
      link_to_search_provider: res.data.link_to_search_provider,
      available_facilities: facilities(availableFacilities),
      scheme_info: parsedSchemeInfo,
    },
    additionalInfo: {
      geo: res.data.available_facilities.geo,
      address: res.data.available_facilities.address,
      url: res.data.available_facilities.url
    }
  }
}

export async function getStopTable(options: AllAvailableOptions): Promise<StopListResponse> {
  const paramOprions = {
    name: options.name,
    city: options.city,
    state: options.state,
    country: options.country,
    date: options.date,
    time: options.time,
    dir: options.dir,
    lines: options.lines,
    transports: options.transports,
  }
  const res = await axios.get('/api/haltestelle',
    {
      cancelToken: options.cancelSource?.token,
      params: paramOprions,
      paramsSerializer: function (params) {
        return queryString.stringify(params, { arrayFormat: 'comma' })
      },
      headers: {
        'x-user-agent': options.userAgent
      }
    },
  );

  if (res.data.error) {
    console.log('stop table error', res.data.message)
    throw new Error(res.data.message);
  }
  const data: StopListResponse = res.data;
  let resTransports: StopResponse[] = data.transports;
  const date = getStringFromQuery(options.date);
  const time = getStringFromQuery(options.time);

  const selectedDate = getRelevantDateFromString({
    date,
    time
  });
  resTransports = data.transports
    .filter((item) => {
      const { isAfterSelected } = getRelativeTime(getNewDate(), item.nearest_trip_time, 'Europe/Berlin', selectedDate);
      return isAfterSelected
    })


  resTransports = resTransports.map((item) => {
    const platform = getFormatedPlatform(item.platform_name);
    const intermediateList = item.intermediate_stop_list.map((elem: IntermediateStopResponse) => {
      let preparedAppUrl = '', preparedBrowserUrl = '', intermediatePlatform = '';

      if (
        options.state && elem.city_name && elem.short_title
      ) {
        const { appUrl, browserUrl } = getStopUrl({
          stop: getSlug(getStringFromQuery(elem.short_title) ?? ''),
          city: getSlug(getStringFromQuery(elem.city_name) ?? ''),
          state: getSlug(getStringFromQuery(options.state) ?? ''),
          time: getStringFromQuery(options.time),
          date,
        });

        preparedAppUrl = appUrl;
        preparedBrowserUrl = browserUrl;
      }


      if (elem.platform_name) {
        intermediatePlatform = getFormatedPlatform(elem.platform_name);
      };
      return {
        ...elem,
        platform_name: intermediatePlatform,
        stop_url: {
          appUrl: preparedAppUrl,
          browserUrl: preparedBrowserUrl
        }
      }
    })
    return {
      ...item,
      platform_name: platform,
      intermediate_stop_list: intermediateList
    }
  });
  const linesColorInfo = getColorsInfo(resTransports, 'stop');

  const {
    available_line_filter: lineFilter,
    available_transports_filter: transportFilter,
  } = data;
  const sortedTransportFilter = transportFilter.filter(item => {
    const isInTransports = resTransports.findIndex((elem) => elem.transport_info.transport === item);
    return item && (isInTransports !== -1);
  })
    .sort((a, b) => {
      return (a in FilterOrder) && (b in FilterOrder)
        ? (FilterOrder[a] - FilterOrder[b])
        : 1
    })

  const sortedLineFilter = lineFilter.filter((item) => {
    const isInTransports = resTransports.findIndex(elem => {
      return elem.transport_info.line === item.line
        && elem.transport_info.transport === item.transport;
    });
    return item.line && item.transport && isInTransports !== -1;
  })

  return {
    stop_title: res.data.stop_title,
    transports: resTransports,
    available_line_filter: sortedLineFilter,
    available_transports_filter: sortedTransportFilter,
    linesColorInfo
  }
}

export const getFaq = async (
  options: {
    name: string | string[],
    city: string | string[],
    userAgent?: string | string[],
    cancelSource?: CancelTokenSource | null
  }
): Promise<FaqResponse> => {
  const resp = await axios.get('/api/inhalt/haltestelle', {
    cancelToken: options.cancelSource?.token,
    params: {
      stop_title: options.name,
      city: options.city
    },
    paramsSerializer: function (params) {
      return queryString.stringify(params, { arrayFormat: 'comma' })
    },
    headers: {
      'x-user-agent': options?.userAgent
    }
  });
  let data: FaqResponse = resp.data.data
  if (resp.data.error) {
    return []
  }
  // this contidion for checking shedule, empty or not, if empty then pass it; 
  const arr: FaqResponse = [];
  data = data.reduce((acc, curr) => {
    if (curr.type === ContentTypes.operatingHours) {
      let isEmpty = true;

      curr.schedule.forEach((item) => {
        if (isEmpty && Object.values(item.hours).length > 0) {
          isEmpty = false;
          return;
        }
      });
      if (isEmpty) return acc;
    }
    return [...acc, curr];
  }, arr);

  return data;
}
export async function getStopPage(options: AllAvailableOptions): Promise<[
  {
    stopInfo: StopInfoResponse,
    additionalInfo: StopAdditionalInfo
  },
  StopListResponse,
  FaqResponse
]> {
  return Promise.all(
    [
      getStopInfo({
        name: options.name,
        city: options.city,
        state: options.state,
        country: options.country,
        userAgent: options.userAgent,
        cancelSource: options.cancelSource
      }),
      getStopTable(options),
      getFaq({
        name: options.name,
        city: options.city,
        userAgent: options.userAgent,
        cancelSource: options.cancelSource
      }).catch(() => [])
    ]
  )
};