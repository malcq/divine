import React from 'react';

import { useTranslation } from '../../../../i18n';
import { PointsOfInterests } from '../../../models/stopfaq';
import { getCityAndStop } from './commonParts';

export const PointsOfInterestTitle:React.FC<PointsOfInterests> = (props) => {
  const {
    city_name: cityName,
    stop_name: stopName,
  } = props;

  const { t } = useTranslation('faqcontent')
  const {
    city,
    cityLink,
    stop
  } = getCityAndStop(cityName, stopName);

  return (
    <>
      {t('points_of_interests.title')} {stop} in {cityLink}?
    </>
  );
 
};

export const PointsOfInterestAnswer:React.FC<PointsOfInterests> = (props) => {
  const {
    city_name: cityName,
    stop_name: stopName,
    points_of_interest
  } = props;

  const { t } = useTranslation('faqcontent')
  const {
    city,
    cityLink,
    stop
  } = getCityAndStop(cityName, stopName);

  const sightOption = React.useMemo(() => {
    const sights = points_of_interest.length 
    ? <span>{points_of_interest.join(', ')}</span> : 'N/A';

    return {
      count: points_of_interest.length,
      sights
    }
  }, [points_of_interest])

  return (
    <>
      {t('points_of_interests.answer.first_part')} {stop} in {cityLink}{` `}
      {t('points_of_interests.answer.last_part', { sight: sightOption.count })}: {sightOption.sights}
    </>
  );
};