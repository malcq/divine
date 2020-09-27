import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useTranslation, Link } from '../../../i18n';

import TrainShape from '../UI/TransportShape';
import RouteItem from './RouteItem';

import media from '../../utils/media';
import { SCHEMA_URL } from '../../utils/constants';

import { JourneyLandingArrivalStop } from '../../models/journeyLanding';

type Props = {
  routes: JourneyLandingArrivalStop[],
  cityName: string,
  type: 'train' | 'bus',
  airportName?: string,
};

const RouteList: React.FC<Props> = (props) => {

  const { t } = useTranslation('journeypage');

  const tripType = useMemo(() => {
    if (props.type === 'train') return t('journey-landing__train-trip');

    return t('journey-landing__bus-trip')
  }, [props.type])

  const fullName = React.useMemo(() => {
    return props.airportName ? `${props.cityName} ${props.airportName}` : props.cityName;
  }, [props.cityName, props.airportName]);

  return (
    <StyledSrapper
      itemScope
      itemType={`${SCHEMA_URL}/Trip`}
    >
      <TrainShape
        className="journey-route-list__train-shape"
        icon={props.type}
      />
      <h2
        className="journey-route-list__title"
        itemProp="name"
      >
        {`${tripType} ${t('journey-landing__to')} ${fullName}`}
      </h2>
      <ul className="journey-route-list__list-box">
        {props.routes.map((item, index) => {
          const linkTitle = `${tripType} ${t('journey-landing__from')} ${item.title} ${t('journey-landing__to')} ${props.cityName}`;
          return (
            <li
              key={index}
              className="list__item"
            >
              <Link
                href={item.appUrl}
                as={item.browserUrl}
              >
                <a className="list__link" title={linkTitle}>
                  <RouteItem
                    key={index}
                    nameFrom={item.title}
                    nameTo={props.cityName}
                    type={tripType}
                  />
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </StyledSrapper>
  )
};

const StyledSrapper = styled.div`
  padding: 32px 16px;
  
  ${media.desktop} {
    padding: 56px 0px 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .list {
    &__item {
      white-space: nowrap;
      overflow: hidden;
    }

    &__link {
      display: flex;
    }
  }

  .journey-route-list {

    &__title {
      ${props => props.theme.typography.fnRegular};
      ${props => props.theme.typography.fnTitle1};
      color: ${props => props.theme.colorValues.grey};
      margin-bottom: 24px;
      text-align: center;
      margin-top: 12px;
      padding: 0 5px;

      ${media.desktop} {
        margin-bottom: 32px;
        margin-top: 16px;
        padding: 0;
      }
    }

    &__train-shape {
      margin: 0 auto;
    }
    
    &__list-box {
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 8px;

      ${media.desktop} {
        grid-template-columns: repeat(2, 306px);
        grid-column-gap: 104px;
      }
    }
  }
`;

export default RouteList;