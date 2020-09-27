import React from 'react';
import styled, { css } from 'styled-components';

import { TransportsTypes } from '../../../models/transports';
import { STATIC_URLS, SCHEMA_URL } from '../../../utils/constants';

import { useTranslation } from '../../../../i18n';

import { Icon } from '../../UI/Icon';
import TransportLabel from '../../UI/Labels/TransportLabel';
import media from '../../../utils/media';

type Props = {
  station: string,
  providers: TransportsTypes[],
};

const Station: React.FC<Props> = (props) => {
  const { t } = useTranslation('common')
  return (
    <StyledWrapper>
      <div
        className="station-item__header"
        itemProp="itinerary"
        itemScope
        itemType={`${SCHEMA_URL}/Place`}
      >
        <span className="station-item__title" >
          {t('federal__name-of-stop')}{' '}
          <span
            className="station-item__title--dark"
            itemProp="name"
          >
            {props.station}
          </span>
        </span>
        <Icon
          className="station-item__arrow"
          srcUrl={`${STATIC_URLS.SVG}/keyboard_arrow_left.svg`}
          width={8}
          height={12}
        />
      </div>
      <div className="station-item__transports">
        {(props.providers.length > 0) &&
          props.providers.map((provider, index) => {
            return (
              <TransportLabel
                transport={provider}
                className="station-item__provider"
                key={index}
                boxHeight={16}
                boxWidth={16}
                imgHeight={12}
                imgWidth={12}
              />
            )
          })
        }
      </div>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  padding: 16px;
  border-bottom: .5px solid ${props => props.theme.colorValues.lightestgrey};
  :active {
    background-color: ${props => props.theme.colorValues.aliceBlue};
  }

  .station-item {
    &__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    &__title {
      ${props => props.theme.typography.fnRegular};
      ${props => props.theme.typography.fnTitle2};
      color: ${props => props.theme.colorValues.grey};
      flex-grow: 1;
      margin-bottom: 8px;

      &--dark {
        ${props => props.theme.typography.fnMedium};
      }
    }

    &__transports {
      display: flex;
      align-items: center;
    }

    &__provider {
      margin-right: 4px;
    }

    &__arrow {
      flex-shrink: 0;
      margin-top: 6px;
      margin-left: 16px;
      transform: rotate(180deg)
    }
  }

  ${media.desktop} {
    padding: 20px 16px;
    :active {
      background-color: inherit;
    }
  }

  ${media.ld} {
    padding: 20px 24px;
  }
`;

export default Station;