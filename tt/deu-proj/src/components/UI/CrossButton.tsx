import React from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import media from '../../utils/media';


type Props = {
  top?: number,
  left?: number,
  right?: number,
  bottom?: number,
  onClick?: () => void
};

const CrossButton: React.FC<Props> = (props) => {
  
  return (
    <ButtonWrapper 
      top={props.top}
      left={props.left}
      bottom={props.bottom}
      right={props.right}
      onClick={props.onClick}
    />
      
  )
};

type StylesProps = {
  top?: number,
  left?: number,
  right?: number,
  bottom?: number,
};

const ButtonWrapper = styled.div<StylesProps>`
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background-color: ${props => props.theme.colorValues.white};
  z-index: 10;
  border: .5px solid rgba(0, 0, 0, 0.06);
  
  ${props => css`
    top: ${props.top ?? 0}px;
    left: ${props.left ?? 0}px;
    right: ${props.right ?? 0}px;
    bottom: ${props.bottom ?? 0}px;
  `}

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 16.5px;
    left: 8.5px;
    transform: rotate(45deg);
    width: 18px;
    height: 2px;
    background-color: ${props => props.theme.colorValues.primary};
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 16.5px;
    right: 8.5px;
    transform: rotate(-45deg);
    width: 18px;
    height: 2px;
    background-color: ${props => props.theme.colorValues.primary};
  }
  ${media.desktop} {
    display: none;
  }
`;

export default CrossButton;