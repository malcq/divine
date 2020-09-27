import React from 'react';
import styled from 'styled-components';

import media from '@utils/media';
import { STATIC_URLS } from '@utils/constants';

type Props = {
  iconTitle: string,
  title: string,
  maxTemp: number,
  minTemp: number,
  className?: string,
};

const WidgetItem: React.FC<Props> = (props) => {

  return (
    <StyledWrapper className={props.className}>
      <img
        src={`${STATIC_URLS.WEATHER_ICONS}/${props.iconTitle}.png`}
        className="weather-widget-item__icon"
        alt="Weather Icon"
        draggable={false}
      />
      <div className="weather-widget-item__info">
        <div className="weather-widget-item__title">
          {props.title}
        </div>
        <div className="weather-widget-item__text">
          {`${props.maxTemp}º/${props.minTemp}º`}
        </div>
      </div>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
    width: 132px;
    height: 44px;
    display: flex;

    &:first-child {
     /*  margin-left: 16px; */
    };

    ${media.desktop} {
      width: 140px;
      margin-left: 0;
    }
    .weather-widget-item {
      &__icon {
        width: 40px;
        height: 40px;
        margin-right: 12px;
      }

      &__title {
        ${props => props.theme.typography.fnText};
        ${props => props.theme.typography.fnBody};
        
      }

      &__text {
        ${props => props.theme.typography.fnMedium};
        ${props => props.theme.typography.fnTitle2};
      }

      &__text, 
      &__title {
        color: ${props => props.theme.colorValues.white};
      }
    }
 
`;

export default WidgetItem;