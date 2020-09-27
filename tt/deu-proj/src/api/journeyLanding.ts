import axios from './axios';
import queryString from 'query-string';
import format from 'date-fns/format';

import {
  JourneyLandingResponse,
  JourneyLandingExtended,
  JourneyLandingArrivalStop
} from '../models/journeyLanding';
import { getJourneysUrl } from '../utils/router.util';
import { getNewDate } from '@utils/time/getNewDate';

type Options = {
  name: string | string[],
  userAgent?: string | string[]
};

export const getJourneyLandingData = async (
  options: Options
): Promise<JourneyLandingExtended> => {
  const response = await axios.get('api/reise-landing', {
    params: {
      name: options.name
    },
    paramsSerializer: function (params) {
      return queryString.stringify(params, { arrayFormat: 'comma' })
    },
    headers: {
      'x-user-agent': options.userAgent
    }
  });

  const data: JourneyLandingResponse = response.data;

  return {
    ...data,
    bus_available_route: routesFiltering(data, 'bus'),
    train_available_route: routesFiltering(data, 'train')
  }
};


/**
 * filtering available routes by transport types 'bus' or 'train' 
 * @param data response data
 * @param type bus or train
 */
const routesFiltering = (
  data: JourneyLandingResponse,
  type: 'bus' | 'train'
): JourneyLandingArrivalStop[] => {
  return data.available_route.filter((item) => item.transport_type.includes(type))
    .map((item): JourneyLandingArrivalStop => {
      const { appUrl, browserUrl } = getJourneysUrl({
        date: format(getNewDate(), 'dd.MM.yyyy'),
        destinName: data.arrival_info.title,
        destinType: data.arrival_info.type,
        originName: item.title,
        originType: item.type,
        transport_type: type
      });
      return {
        ...item,
        appUrl,
        browserUrl
      }
    })
}