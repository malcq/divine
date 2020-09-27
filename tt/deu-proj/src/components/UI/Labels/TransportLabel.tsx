import React from 'react';
import styled, { css } from 'styled-components';

import { TransportsTypes } from '@models/transports';

import { TRANSPORT_INFO, SCHEMA_URL, BASE_URL } from '@utils/constants';
import media from '@utils/media';
import LogoSprite from '@components/UI/LogosSprite';

const DEFAULT_IMAGE = {
  url: undefined,
  alt: 'N/A transport'
}
const SQUARED_TYPES = ['ubahn'];
const CUSTOM_SIZE_TYPES = ['nwb']

type Props = {
  transport: TransportsTypes,
  className?: string,
  isBig?: boolean,
  boxHeight?: number,
  boxWidth?: number,
  imgWidth?: number,
  imgHeight?: number,
}

const TransportLabel: React.FC<Props> = (props) => {
  const {
    boxWidth = 20,
    boxHeight = 20,
    imgWidth = 16,
    imgHeight = 16,
    transport
  } = props;
  const {
    baseColor,
    image,
    text,
    sprite
  } = TRANSPORT_INFO[transport] ?? TRANSPORT_INFO.default;
  const labelSquared = SQUARED_TYPES.includes(props.transport);
  const isCustomSize = CUSTOM_SIZE_TYPES.includes(props.transport);
  return (
    <StyledContainer
      isBig={props.isBig}
      isCustom={isCustomSize}
      className={props.className}
      style={{
        backgroundColor: baseColor,
        borderRadius: labelSquared ? '2px' : '100%',
      }}
      boxHeight={boxWidth}
      boxWidth={boxHeight}
      imgWidth={imgWidth}
      imgHeight={imgHeight}
      itemProp="provider"
      itemScope
      itemType={`${SCHEMA_URL}/Organization`}
    >
      <meta itemProp="name" content={text} />
      <meta itemProp="logo" content={`${BASE_URL}${image.url}`} />
      <LogoSprite
        sprite={sprite}
        width={16}
        height={16}
      />
    </StyledContainer>
  );
};

type StylesProps = {
  isBig?: boolean,
  boxHeight: number,
  boxWidth: number,
  imgHeight: number,
  imgWidth: number,
  isCustom: boolean,
}

const StyledContainer = styled.div<StylesProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => !props.isCustom && css`
    width: ${props.boxWidth}px;
    height: ${props.boxHeight}px;
  `}
  
  flex-shrink: 0;
  
  & > img {
    ${props => !props.isCustom && css`
      width: ${props.imgWidth}px;
      height: ${props.imgHeight}px;
  `}
   
    display: block;
  }

  ${props => props.isBig && css`

    ${media.desktop} {
      
      width: 28px;
      height: 28px;

      & > img {
        width: 23px;
        height: 23px;
      }
    }
  `}

`

export default TransportLabel;