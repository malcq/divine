import { PlacesResponse, PlaceLink } from '../models/CityImage';
import axios from './axios';
import { STATIC_URLS } from '../utils/constants';
import { getJourneyLandingUrl, getFederalUrl } from '../utils/router.util';

type Keys = keyof PlacesResponse;

export const getPlaces = async (userAgent?: string | string[]): Promise<PlacesResponse> => {
  const response = await axios.get('/api/home', {
    headers: {
      'x-user-agent': userAgent
    }
  });
  const data: PlacesResponse = response.data;

  for (let key in data) {
    let strKey = key as Keys;

    // going through slider here
    data[strKey].slider = data[strKey].slider.map((elem) => {
      let pageLink: PlaceLink = { appUrl: '#', browserUrl: '#' }
      if (strKey === 'beautiful_cities') {
        const { appUrl, browserUrl } = getJourneyLandingUrl({ name: elem.stop_info.title })
        pageLink = {
          appUrl,
          browserUrl,
        };
      } else {
        const { appUrl, browserUrl } = getFederalUrl({ title: elem.stop_info.title, type: elem.stop_info.type });
        pageLink = {
          appUrl,
          browserUrl,
        };
      }

      return {
        ...elem,
        url: `${STATIC_URLS.IMAGES}/cities/fahrplan-haltestellen-und-stationen-${elem.url}.jpg`,
        alt: elem.title,
        page_link: pageLink,
      }
    });

    // create URL's for Places list links
    if (strKey === 'beautiful_cities') {
      data[strKey].stop_list = data[strKey].stop_list.map(item => {
        const { appUrl, browserUrl } = getJourneyLandingUrl({ name: item.title });
        return {
          ...item,
          link: {
            appUrl,
            browserUrl
          }
        }
      })
    } else {
      data[strKey].stop_list = data[strKey].stop_list.map(item => {
        const { appUrl, browserUrl } = getFederalUrl({
          title: item.title,
          type: item.type
        });
        return {
          ...item,
          link: {
            appUrl,
            browserUrl
          }
        }
      })
    }
  }
  return data;
};