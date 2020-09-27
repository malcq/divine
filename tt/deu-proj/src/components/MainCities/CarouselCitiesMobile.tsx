import React from 'react';
import styled from 'styled-components';

import { CityImage } from '../../models/CityImage';
import CarouselItem from '../UI/CarouselItem';

type Props = {
  imagesForCities?: CityImage[];
};

const CarouselCitiesMobile: React.FC<Props> = ({ imagesForCities }) => {
  return (
    <StyledContainer>
      <ScrollContainer>
        {
          imagesForCities && imagesForCities.map((item, index) => {
            return (
              <CarouselItem
                url={item.url}
                alt={item.alt}
                title={item.title}
                pageLink={item.page_link}
                key={index}
              />
            )
          })
        }
      </ScrollContainer>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  margin-bottom: 24px;
`;

const ScrollContainer = styled.div`
  padding: 0 8px;
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
`;


export default CarouselCitiesMobile;
