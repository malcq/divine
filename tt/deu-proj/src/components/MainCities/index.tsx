import React from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from '../../../i18n';

import media from '../../utils/media';
import { DeviceTypes } from '../../utils/constants';

import { CityImage, StopPlace } from '../../models/CityImage';

import StationsList from './StationsList';
import CarouselCitiesDesktop from './CarouserlCitiesDesktop';
import CarouselCitiesMobile from './CarouselCitiesMobile';

import { SettingsContext } from '../../contexts/Settings';

interface MainCitiesProps extends WithTranslation {
  imagesForCities?: CityImage[],
  stationsList?: StopPlace[],
  moreButton?: boolean,
  title: string,
  subtitle: string,
  buttonTitle?: string,
  stationText?: string,
}
const PlacesInfo: React.FC<MainCitiesProps> = ({
  t,
  imagesForCities,
  stationsList,
  moreButton,
  title,
  subtitle,
  buttonTitle,
  stationText
}) => {
  const { deviceInfo } = React.useContext(SettingsContext);

  return (
    <StyledContainer>
      <header className="cities__header">
        <h2 className="cities__title">
          <span>{title}</span>
        </h2>
        <h3 className="cities__subtitle">{subtitle}</h3>
      </header>
      {
        (deviceInfo.type === DeviceTypes.mobile) ? (<CarouselCitiesMobile imagesForCities={imagesForCities} />)
          : (<CarouselCitiesDesktop imagesForCities={imagesForCities} />)
      }

      <StationsList 
      stationsList={stationsList} 
      moreButton={moreButton} 
      buttonTitle={buttonTitle} 
      stationText={stationText}
      />

    </StyledContainer>
  );
}

const StyledContainer = styled.section`
  padding: 32px 0;

  ${media.desktop} {
    padding: 56px 0;
  }

  .cities {
    &__header {
      padding: 0 16px;
      ${media.desktop} {
        display: flex;
        align-items: flex-start;
        padding: 0;
      }
    }

    &__title {
      margin-bottom: 12px;
      ${props => props.theme.typography.fnRegular};
      ${props => props.theme.typography.fnTitle1};
      color: ${props => props.theme.colorValues.grey};

      ${media.desktop} {
        width: 50%;
        margin-right: 12px;
        margin-bottom: 48px;

      }
    }

    &__title > span {
      display: block;
      ${media.desktop} {
        max-width: 468px;
      }
    }

    &__subtitle {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
      margin-bottom: 24px;

      ${media.desktop} {
        width: 50%;
        max-width: 343px;
        margin-bottom: 36px;
      }
    }
  }
`;

export default withTranslation('homepage')(PlacesInfo);
