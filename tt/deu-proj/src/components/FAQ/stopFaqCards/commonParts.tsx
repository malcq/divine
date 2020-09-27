import React, { ReactElement } from 'react';
import { Link } from '../../../../i18n';
import { getFederalUrl } from '../../../utils/router.util';

export type Output = {
  title: ReactElement | null,
  answer: ReactElement | null
}

export const getCityAndStop = (cityName: string, stopName: string): {
  city: ReactElement,
  stop: ReactElement,
  cityLink: ReactElement
} => {
  const { appUrl, browserUrl } = getFederalUrl({
    type: 'city',
    title: cityName
  })
  const stop = <span>{stopName}</span>;
  const city = <span>{cityName}</span>;
  const cityLink = (
    <Link href={appUrl} as={browserUrl}>
      <a>
        {cityName}
      </a>
    </Link>
  );
  return {
    city,
    stop,
    cityLink
  }
};