import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { CityImage } from '../../models/CityImage';
import media from '../../utils/media';

import { STATIC_URLS } from '@utils/constants';

import LazyPicture from './LazyPicture';


type Props = {
  url: string;
  alt: string;
  title: string;
  pageLink: {
    appUrl: string,
    browserUrl: string,
  };
}
const CarouselItem: React.FC<Props> = ({ url, alt, title, pageLink }) => (
  <StyledContainer>
    <Link
      href={pageLink.appUrl}
      as={pageLink.browserUrl}
      passHref
    >
      <a>
        <LazyPicture
          src={url}
          alt={alt}
          className="carousel__image"
          previewSrc={`${STATIC_URLS.IMAGES}/cities/default_bg_img.jpg`}
          isOverlay={true}
        />
        <h3 className="carousel__title">{title}</h3>
      </a>
    </Link>
  </StyledContainer>
)

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  padding-right: 8px;

  ${media.desktop} {
    padding: 0 12px;
  }

  .carousel {
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
      user-drag: none;

      border-radius: 6px;
    }

    &__title {
      position: absolute;
      bottom: 12px;
      left: 12px;

      ${media.desktop} {
        left: 24px;
      }

      max-width: 116px;

      font-size: 19px;
      color: ${props => props.theme.colorValues.white};
      font-weight: ${props => props.theme.fontWeightValues.medium};
    }
  }
`;

export default CarouselItem;
