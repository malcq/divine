import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { CityImage } from '@models/CityImage';
import media from '@utils/media';
import LazyPicture from '@components/UI/LazyPicture';
import { STATIC_URLS } from '@utils/constants';


type Props = {
  imagesForCities?: CityImage[];
};

class SimpleSlider extends React.Component<Props> {

  render() {
    const { imagesForCities } = this.props;

    return (
      <StyledContainer>
        {imagesForCities && imagesForCities.map((item, index) => {
          return (
            <StyledItem key={index}>
              <Link
                href={item.page_link.appUrl}
                as={item.page_link.browserUrl}
                passHref
              >
                <a>
                  <LazyPicture
                    src={item.url}
                    alt={item.alt}
                    className="main-cities__image"
                    previewSrc={`${STATIC_URLS.IMAGES}/cities/default_bg_img.jpg`}
                    isOverlay={true}
                  />
                  <h3 className="main-cities__title">{item.title}</h3>
                </a>
              </Link>
            </StyledItem>)
        })}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  margin: 0 0px 48px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 24px;
`;

const StyledItem = styled.div`
  position: relative;
  width: 100%; 
  
  .main-cities {
    &__image {

      ${media.desktop} {
        width: 100%;
        height: 100%;
        display: block;
      }
      width: 140px;
      height: 140px;
      display: block;
      object-fit: cover;
      border-radius: 6px;
    }

    &__title {
      position: absolute;
      bottom: 12px;
      left: 12px;
      max-width: 116px;
      font-size: 19px;
      color: ${props => props.theme.colorValues.white};
      font-weight: ${props => props.theme.fontWeightValues.medium};
    }
  }
`;
export default SimpleSlider;