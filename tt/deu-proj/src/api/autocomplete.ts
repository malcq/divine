import axios from './axios';
import { getSlug } from '../utils/getSlug';

import {
  AutocompleteItem,
  AutcompleteResponse,
  AutocompleteItemTypes,
} from '../models/autocomplete';

type getAutocompleteListOptions = {
  responseType?: 'all' | 'places-only',
}
export const getAutocompleteList = async (
  query: string,
  options: getAutocompleteListOptions = {},
): Promise<AutocompleteItem[]> => {
  const {
    responseType = 'all',
  } = options;

  const placeType = responseType === 'places-only' ? 'stops_only' : null;

  const response = await axios.get(
    '/api/autovervollstandigen',
    { 
      params: Object.assign({}, 
        {
          query,
        },
        placeType && { place_type: placeType },
      )
    }
  );
  let data: AutcompleteResponse[] = response.data;

  // API returns plain object when query is empty. We should check it.
  if (!Array.isArray(data)) {
    data = [];
  };

  const result: AutocompleteItem[] = data.map((item): AutocompleteItem => {
    const title = item.title ?? item.city_name;

    return {
      ...item,
      title,
      slugs: {
        city_name: getSlug(item.city_name),
        state_name: getSlug(item.state_name),
        title: getSlug(item.short_title),
      }
    }
  });

  return result;
}
