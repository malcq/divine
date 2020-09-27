import React from 'react';
import styled from 'styled-components';
import media from '@utils/media';
import WidgetItem from './widgetItem';
import { WeatherInfo } from '@models/weatherwidget';
import Slider from '../UI/Slider';


export type Props = {
  weatherInfo: WeatherInfo[],
}

const WeatherWidget: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      <Slider prevClass='weather-widget__prev' nextClass='weather-widget__next' >
        <div className="weather-widget__line">
        {props.weatherInfo && props.weatherInfo.map((item: WeatherInfo, index: number) => {
          return (
            <WidgetItem
              key={index}
              iconTitle={item.icon}
              maxTemp={item.temp_max}
              minTemp={item.temp_min}
              title={item.day}
              className='weather-widget__item'
            />)
          })}
        </div>
      </Slider>
    </StyledWrapper>
  )
};


const StyledWrapper = styled.div`
  max-width: 656px;
  margin: 0 auto;
  position: relative;
  .weather-widget  {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-x: auto;
    user-select: none;
    ::-webkit-scrollbar {
      display: none;
    }

    &__line {
      display: flex;
    }

    &__item {
      flex: 1 0 132px;
      margin-right: 8px;
      ${media.desktop} {
        margin-right: 24px;
        flex: 1 0 140px;
      }
     
      &:first-child {
        margin-left: 16px;
        ${media.desktop} {
          margin-left: 0;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }

    &__prev {
      left: -88px;
      transform: rotate(180deg);
    }

    &__next {
      right: -67px;
    }
  }
`;

export default WeatherWidget;