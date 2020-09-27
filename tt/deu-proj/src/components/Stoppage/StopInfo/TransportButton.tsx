import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { TransportsTypes } from '../../../models/transports';
import { Icon } from '../../UI/Icon';
import { STATIC_URLS, TRANSPORT_INFO, SCHEMA_URL, BASE_URL } from '@utils/constants';
import { colors } from '../../../theme/default/constants';
import LogosSprite from '@components/UI/LogosSprite';

type TransportButtonProps = {
  type: TransportsTypes,
  isSelected: boolean,
  className?: string,
  setTransportSelection: (
    transport: TransportsTypes,
    state: boolean,
    cb?: () => void
  ) => void;
  moveLeft?: () => void 
};


const TransportButton: React.FC<TransportButtonProps> = forwardRef((props, ref: any) => {
  const {
    type,
    setTransportSelection,
    isSelected,
    className,
    moveLeft
  } = props;

  const {
    baseColor,
    image,
    text,
    sprite
  } = TRANSPORT_INFO[type] ?? TRANSPORT_INFO.default;
  return (
    <StyledContainer
      className={className}
      ref={ref}
      onClick={() => setTransportSelection(type, isSelected, moveLeft)}
      selected={isSelected}
      baseColor={baseColor}
    >    
      <meta itemProp="url" content={BASE_URL}/>
      {
        (type === 'ubahn') ?
          <div className="transport-button__wrapper-image">
            <LogosSprite 
              sprite={sprite}
            />
          </div> :
          <LogosSprite 
            sprite={sprite}
          />
      }
      <span className="transport-button__text">
        {text}
      </span>
      {isSelected &&
        <Icon
          className="transport-button__remove-button"
          height={16}
          width={16}
          srcUrl={`${STATIC_URLS.SVG}/remove-transport.svg`}
          color={colors.primary}
        />}
    </StyledContainer>
  )
});

type StyledContainerProps = {
  selected: boolean,
  baseColor: string,
};

const StyledContainer = styled.button<StyledContainerProps>`
  background-color: ${props => props.theme.colorValues.white};
  display: flex;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  padding: 5px 4px 5px 8px;
  color: ${props => props.theme.colorValues.black};

  
  ${props => props.selected
    ? css`
          border: 1px solid ${props => props.theme.colorValues.primary};
          background-color: ${props => props.theme.colorValues.primary}0F;
          color: ${props => props.theme.colorValues.primary};
        `
    : css`
          border: 1px solid ${props => props.theme.colorValues.lightestgrey};
          color: ${props => props.theme.colorValues.grey};
        `
  };
  .transport-button {
    &__text {
      padding: 0 8px;
      white-space: nowrap;
    }
    &__image {
      width: 20px;
      height: 20px;
    }
    &__wrapper-image {
      border-radius: 2px;
      width: 20px;
      height: 20px;
      background-color: ${props => props.baseColor};
    }

    &__remove-button {
      margin-right: 4px;
    }
  }
`;

export default TransportButton;