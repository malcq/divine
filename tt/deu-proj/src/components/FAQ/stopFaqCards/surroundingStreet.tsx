import React from 'react';

import { useTranslation } from '../../../../i18n';

import { SurroundingStreet } from '../../../models/stopfaq';
import { getCityAndStop } from './commonParts';

export const SurroundingStreetTitle:React.FC<SurroundingStreet> = (props) => {
  const {
    city_name: cityName,
    stop_name: stopName,
  } = props;

  const { t } = useTranslation('faqcontent');
  const {
    cityLink,
    stop
  } = getCityAndStop(cityName, stopName);

  return (
    <>
      {t('surrounding_street.title')} {stop} in {cityLink}?
    </>
  );
};

export const SurroundingStreetAnswer:React.FC<SurroundingStreet> = (props) => {
  const {
    streets
  } = props;

  return (
    <span>
      {streets.join(', ')}
    </span>
  );
};