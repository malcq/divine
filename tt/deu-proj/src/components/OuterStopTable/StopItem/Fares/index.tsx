import React, { useState, useContext, useMemo, ReactElement } from 'react';
import styled from 'styled-components';

import media from '@utils/media';
import { ProviderTypes } from '@utils/constants';
import fareLinkConverter from '@utils/fareLinkConverter';

import Slider from '@components/UI/Slider';
import { Fare } from '@models/journey';

import FareItem from './FareItem';

type FaresProps = {
  fares: Fare[],
  deepLink: string,
  provider: ProviderTypes,
  topTitle?: string
}

const Fares: React.FC<FaresProps> = (props) => {
  const { fares } = props;
  
  return (
    <Container>
       <Slider prevClass='fares-widget__prev' nextClass='fares-widget__next' >
         
        <div className="fares-widget__line">
        {
          fares.map((fareItem: Fare, index: number): ReactElement => {
            const {
              name,
              comfort_class: comfortClass,
              price_in_cents: priceInCents,
            } = fareItem;

            const link = fareLinkConverter(
              props.provider,
              props.deepLink,
              comfortClass
            )
            return (
              <FareItem
                key={index}
                name={name}
                className="fares-widget__item"
                comfortClass={comfortClass}
                priceInCents={priceInCents}
                link={link}
                topTitle={props.topTitle}
              />
            );
          })
        }
        </div>
      </Slider>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 0 12px 0;
  padding-left: 8px;
  ${media.desktop} {
    padding-left: 0;
  }
  .fares-widget {
    &__line {
      display: flex;
      &:after {
        content: ' ';
        padding: 6px;
      }
    }

    &__item {
      margin-left: 8px;
      flex: 1 0 140px;
      max-width: 140px;
    }

    &__item:last-child {
      margin-left: 12px;
      &:after {
        content: '';
        width: 10px;
      }
    }

    &__prev {
      left: -17px;
      top: 50%;
      transform: translateY(-50%) rotate(180deg);
    }

    &__next {
      right: -17px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const StyledButton = styled.button`
  display: none;

  ${media.custom(960)} {
    display: flex;
    position: absolute;
    border-radius: 100%;
    top: calc(50% - 18px);
    border: 0.5px solid rgba(0,0,0,0.06);
    background-color: ${props => props.theme.colorValues.white};
    box-shadow: 0 2px 6px ${props => props.theme.colorValues.lightestgrey};
    height: 36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;

    :hover {
      box-shadow: 0 2px 10px ${props => props.theme.colorValues.lightestgrey};
    }
  }
`;

export default Fares;