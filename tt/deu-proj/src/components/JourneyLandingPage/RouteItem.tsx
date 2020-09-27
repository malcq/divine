import React from 'react';
import styled from 'styled-components';

import { useTranslation } from '../../../i18n';

import { Icon } from '../UI/Icon';

import { STATIC_URLS, SCHEMA_URL } from '../../utils/constants';

type Props = {
  nameFrom: string,
  nameTo: string,
  type: string,
};

const RouteItem: React.FC<Props> = (props) => {
  const { t } = useTranslation('journeypage');
  return (
    <ItemBox
      itemProp="subTrip"
      itemScope
      itemType={`${SCHEMA_URL}/Trip`}
    >
      <span>
        {`${props.type} ${t('journey-landing__from')}`}
      </span>
      <span>
        <span
          itemProp="itinerary"
          itemScope
          itemType={`${SCHEMA_URL}/City`}
        >
          <meta itemProp="name" content={props.nameFrom} />
          {props.nameFrom}
        </span>
        <span className="route-list-item__separator">
          {t('journey-landing__to')}
        </span>
        <span
          itemProp="itinerary"
          itemScope
          itemType={`${SCHEMA_URL}/City`}
        >
          <meta itemProp="name" content={props.nameTo} />
          {props.nameTo}
        </span>
      </span>
      <Icon
        className="route-list-item__arrow"
        srcUrl={`${STATIC_URLS.SVG}/keyboard_arrow_left.svg`}
        width={5}
        height={8}
      />
    </ItemBox>
  )
};

const ItemBox = styled.p`
  cursor: pointer;
  ${props => props.theme.typography.fnText};
  ${props => props.theme.typography.fnBody};
  color: ${props => props.theme.colorValues.grey};
  text-overflow: ellipsis;
  overflow: hidden;

  & > span:first-child {
    color: ${props => props.theme.colorValues.lightgrey};
    padding-right: 5px;
  };

  .route-list-item {

    &__separator {
      padding: 0 5px;
    }
    
    &__arrow {
      transform: rotate(180deg);
      opacity: 0.3;
      margin-left: 6px;
    }
  }
`;

export default RouteItem;