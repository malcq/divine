import axios from './axios';
import queryString from 'query-string';
import { StopLandingResponse, AvailableScheme } from '../models/stopLanding';
import { STOP_LANDING_LIMIT } from '../utils/constants';
import { getStopUrl } from '../utils/router.util';
import { getSlug } from '../utils/getSlug';


type StopLandingOptions = {
  type: string | string[],
  name: string | string[],
  limit?: string | string[],
  page?: string | string[],
  userAgent?: string | string[]
}

const getStopLandingData = async (
  options: StopLandingOptions
): Promise<StopLandingResponse> => {
  const {
    limit = STOP_LANDING_LIMIT,
  } = options;

  const response = await axios.get('/api/haltestelle-landing', {
    params: {
      type: options.type,
      name: options.name,
      page: options.page,
      limit
    },
    paramsSerializer: function (params) {
      return queryString.stringify(params, { arrayFormat: 'comma' })
    },
    headers: {
      'x-user-agent': options.userAgent
    }
  });

  const data: StopLandingResponse = response.data

  const stopList = data.stop_list.map((item) => {
    const { appUrl, browserUrl } = getStopUrl({
      city: getSlug(item.departure_info.city_name),
      state: getSlug(item.departure_info.state),
      stop: getSlug(item.departure_info.short_title),
    });
    return {
      ...item,
      url: {
        appUrl,
        browserUrl
      }
    }
  })
  let schemes: AvailableScheme[] = [];

  if (data.available_schemes) {
    schemes = data.available_schemes.map((item): AvailableScheme => {
      let long_name = item.scheme_name_long;
      const short_name = item.scheme_name_short;

      if (long_name && short_name && long_name.startsWith(short_name)) {
        long_name = long_name.replace(short_name, '');
      };
      return {
        scheme_name_long: long_name,
        scheme_name_short: short_name,
      }
    })
  }

  return {
    ...data,
    stop_list: stopList,
    available_schemes: schemes
  };
}

export default getStopLandingData;