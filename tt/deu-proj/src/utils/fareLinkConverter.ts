import qs from 'query-string';
import { ProviderTypes } from './constants';

export default (
  provider: ProviderTypes,
  link: string,
  classNum?: number,
): string => {
  if ((provider === ProviderTypes.flixbus) || (provider === ProviderTypes.unknown)) return link;

  const parsed = qs.parseUrl(link);
  const result = {
    ...parsed.query,
    K: `${classNum}` ?? '2',
  };
  return qs.stringifyUrl({ url: parsed.url, query: result })
}