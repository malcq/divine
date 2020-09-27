import React, { useMemo, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useTranslation } from '../../../i18n';
import media from '../../utils/media';
import { SettingsContext } from '../../contexts/Settings';

import { WeatherInfo } from '../../models/weatherwidget';
import { JOURNEY_CITY_IMG, STATIC_URLS, DeviceTypes } from '../../utils/constants';

import WeatherWidget from '../WeatherWidget';

type Props = {
  weatherInfo: WeatherInfo[],
  cityName: string,
  airportName?: string,
  type?: 'flight'
};

const SubHeader: React.FC<Props> = (props) => {
  const { t } = useTranslation('journeypage');
  const { deviceInfo } = React.useContext(SettingsContext);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isTitleCompressed, setIsCompressed] = useState(false);

  // should be added another condition for the flight trip page
  // when Back-grounds will be available 
  const bgUrl = useMemo(() => {
    if (props.type === 'flight') {
      // temp mobile bg till all backgrounds will be provide
      if (deviceInfo.type === DeviceTypes.mobile) {
        return `${STATIC_URLS.JOURNEY_AIRPORTS}/berlin-tegel.jpg`
      }
      return JOURNEY_CITY_IMG['Berlin'].url;
    }
    return JOURNEY_CITY_IMG[props.cityName]?.url ?? JOURNEY_CITY_IMG['Berlin'].url
  }, [props.cityName, deviceInfo]);

  const title = useMemo(() => {
    if (props.type === 'flight') {
      return {
        subTitle: t('journey-landing__airport-trip'),
        main: t('journey-landing__airport-trip-title', {
          city_name: props.cityName,
          airport_name: props.airportName
        }),
      }
    }
    return {
      subTitle: t('journey-landing__city-trip'),
      main: t('journey-landing__city-trip-title', {
        city_name: props.cityName
      }),
    }
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    const height = titleRef.current.offsetHeight;
    setIsCompressed(() => height > 98);
  })

  return (
    <StyledWrapper
      isCompressed={isTitleCompressed}
      imgUrl={bgUrl}
    >
      <div className="journey-landing__title-box">
        <h1 className="journey-landing__title" ref={titleRef}>
          <span className="journey-landing__sub-title">
            {title.subTitle}
          </span>
          {title.main}
        </h1>
      </div>
      {(props.weatherInfo.length > 0) &&
        <WeatherWidget
          weatherInfo={props.weatherInfo}
        />}
    </StyledWrapper>
  )
};

type StylesProps = {
  isCompressed: boolean,
  imgUrl: string
}

const StyledWrapper = styled.div<StylesProps>`
  width: 100%;
  min-height: 500px;
  position: relative;
  background-image: url(${props => props.imgUrl});
  background-size: cover;
  background-position: bottom;
  padding-top: ${props => props.isCompressed ? 215 : 250}px;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);

    ${media.desktop} {
      border-radius: 8px;
    }
  }

  ${media.desktop} {
    border-radius: 8px;
  }

  .journey-landing {
    &__title-box {
      margin: 0 auto 78px;
      padding-left: 10px;
      padding-right: 10px;
      text-align: center;
      position: relative;
      z-index: 10;
      color: ${props => props.theme.colorValues.white};

      ${media.desktop} {
        padding-left: 40px;
        padding-right: 40px;
        margin-bottom: 106px;
      }
    }
    &__sub-title {
      display: block;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      padding-bottom: 8px;
    }

    &__title {
      font-size: 30px;
      line-height: 34px;
      ${props => props.theme.typography.fnRegular};

      ${media.desktop} {
        ${props => props.theme.typography.fnTitle1};
      }
    }
  }
`;

export default SubHeader;