import queryString from 'query-string';
import { CancelTokenSource } from 'axios';

import axios from './axios';

import { getFormatedPlatform } from '@utils/getFormatedPlatform';
import getColorsInfo from '@utils/getColorsInfo';

import { TransportsTypes } from '../models/transports';
import { AutocompleteItemTypes } from '../models/autocomplete';
import { JourneyResponse, OuterResponse, InnerResponse } from '../models/journey';
import { LinesColorInfo } from '@models/stop';


export type OptionsType = {
  card: string | string[],
  person: string,
  origin_name: string | string[],
  origin_type: string | string[],
  destination_name: string | string[],
  destination_type: string | string[],
  date?: string | string[],
  transport_type?: string | string[],
  time?: string | string[],
  userAgent?: string | string[]
};

export type AdditionalJourneyInfo = {
  stop_id: string,
  title: string,
  type: AutocompleteItemTypes,
  city_name: string,
  state: string
}

export type ResponeJourney = {
  journeyList: OuterResponse[] | InnerResponse[],
  type: 'inner' | 'outer',
  arrival_info: AdditionalJourneyInfo,
  departure_info: AdditionalJourneyInfo,
  linesColorInfo: LinesColorInfo[],
}

export const getJourneysTable = async (options: OptionsType, cancelSource?: CancelTokenSource | null): Promise<ResponeJourney> => {

  const {
    origin_name,
    origin_type,
    destination_name,
    destination_type,
    date,
    card,
    person,
    transport_type,
    time
  } = options;

  const personsNum = parseInt(person);

  const cardsArr = Array(personsNum).fill(card);
  const passengersStr = queryString.stringify({ 'passengers[][discount]': cardsArr })
  const paramOptions = {
    origin_name,
    origin_type,
    destination_name,
    destination_type,
    provider: transport_type,
    date,
    time
  }

  return axios
    .get(`/api/reise?${passengersStr}`, {
      cancelToken: cancelSource?.token,
      params: paramOptions,
      paramsSerializer: function (params) {
        return queryString.stringify(params, { arrayFormat: 'comma' })
      },
      headers: {
        'x-user-agent': options.userAgent
      }
    })
    .then(res => {
      if (res.data.error) {
        throw new Error(res.data.message)
      }

      const journeyList: OuterResponse[] | InnerResponse[] = res.data.journeys.map((item: JourneyResponse): OuterResponse | InnerResponse => {
        const priceArr: number[] = [];
        /**
         * response data could be as 
         * [{
         * "name": "Price not available",
         * "price_in_cents": "n/a"
         * }]
         * this condition is exist to prevent that result and choose just available prices 
         */
        item.fares.forEach((item) => {
          if ((typeof item.price_in_cents !== "number" || item.price_in_cents === 0)) return;
          priceArr.push(item.price_in_cents)
        });

        const walkArr = item.segments.filter((item) => item.product === TransportsTypes.walk);
        const changeovers = Math.max((item.changeovers - walkArr.length), 0);

        const segments = item.segments.map((elem) => {
          return {
            ...elem,
            arr_platform: getFormatedPlatform(elem.arr_platform),
            dep_platform: getFormatedPlatform(elem.dep_platform)
          }
        });

        if (priceArr.length === 0) {
          return {
            ...item,
            segments,
            changeovers,
            fares: [],
          }
        }
        return {
          ...item,
          segments,
          changeovers,
          main_price: Math.min(...priceArr),
        }
      })

      function getJourneyLineColor<T extends JourneyResponse[]>(item: T): LinesColorInfo[] {
        let result: LinesColorInfo[] = [];
        item.forEach(elem => {
          const colorInfo = getColorsInfo(elem.segments, 'journey');
          result = result.concat(colorInfo);
        });
        return result;
      };

      return {
        journeyList,
        type: res.data.type,
        arrival_info: res.data.arrival_info,
        departure_info: res.data.departure_info,
        linesColorInfo: getJourneyLineColor(journeyList)
      }
    })
}