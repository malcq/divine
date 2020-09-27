import axios from './axios';
import queryString from 'query-string';
import { LineResponse, LineStopResponse } from '../models/linePageInfo';
import { LineFaqResponse, LineContentTypes } from '../models/linefaq';
import { getFormatedPlatform } from '@utils/getFormatedPlatform';

type Options = {
  type: string | string[],
  name: string | string[],
  scheme: string | string[],
  date?: string | string[],
  time?: string | string[],
  current_stop?: string | string[],
  userAgent?: string | string[]
}

const getLineData = async (options: Options): Promise<LineResponse> => {
  const response = await axios('/api/linie', {
    params: {
      type: options.type,
      name: options.name,
      scheme: options.scheme,
      date: options.date,
      time: options.time,
      current_stop: options.current_stop
    },
    paramsSerializer: function (params) {
      return queryString.stringify(params, { arrayFormat: 'comma' })
    },
    headers: {
      'x-user-agent': options.userAgent
    }
  });

  const data: LineResponse = response.data;
  if (data.error) {
    throw new Error(data.message)
  }

  let stopList: LineStopResponse[] = [];

  if (data.line_stops) {
    let currentId = '';
    const departureStop = data.departure_info;
    const firstStop = data.line_stops.find((stop) => stop.hasOwnProperty('forward_direction'));
    const currentStop = departureStop || firstStop;
 
    stopList = data.line_stops.map((item) => {
      const backPlatform = getFormatedPlatform(item.back_direction?.platform_name ?? '');
      const forwardPlatform = getFormatedPlatform(item.forward_direction?.platform_name ?? '');

      const isCurrent = item.stop_name === currentStop.stop_name
        && item.city_name === currentStop.city_name
        && item.state_name === currentStop.state_name;

      return {
        ...item,
        back_direction: {
          ...item.back_direction,
          platform_name: backPlatform
        },
        forward_direction: {
          ...item.forward_direction,
          platform_name: forwardPlatform
        },
        current: isCurrent,
      }
    })
      // .filter((item) => item.forward_direction)
      // .sort((a, b) => {
      //   if (a.forward_direction.position > b.forward_direction.position) return 1;
      //   if (a.forward_direction.position === b.forward_direction.position) return 0;
      //   return -1;
      // });
      
    if (!stopList.some(stop => stop.current)) {
      stopList[0].current = true;
    };
  }

  let {scheme_name_long, scheme_name_short} = data.scheme;

  if (scheme_name_long && scheme_name_short && scheme_name_long.startsWith(scheme_name_short)) {
    scheme_name_long = scheme_name_long.replace(scheme_name_short, '');
  };
  return {
    ...data,
    scheme: {
      ...data.scheme,
      scheme_name_long,
      scheme_name_short,
    },
    line_stops: stopList
  }
};

const getLineContent = async (options: Options): Promise<LineFaqResponse> => {
  const resp = await axios.get('/api/inhalt/linie', {
    params: {
      name: options.name,
      scheme: options.scheme,
      type: options.type
    },
    paramsSerializer: function (params) {
      return queryString.stringify(params, { arrayFormat: 'comma' })
    },
    headers: {
      'x-user-agent': options.userAgent
    }
  });

  let data: LineFaqResponse = resp.data.data;
  if (resp.data.error) {
    data = []
  }
  // this contidion for checking shedule, empty or not, if empty then pass it;
  const arr: LineFaqResponse = [];
  data = data.reduce((acc, curr) => {
    if (curr.type === LineContentTypes.operatingHours) {
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

async function getLinePage(options: Options): Promise<[
  LineResponse,
  LineFaqResponse
]> {
  return Promise.all([
    getLineData(options),
    getLineContent(options).catch(() => [])
  ])
}

export default getLinePage;
