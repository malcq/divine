import React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  maxHeight: number,
  baseColor: string,
  secondColor?: string,
  topPadding?: number,
  className?: string
};

const RouteLine: React.FC<Props> = (props) => {

  return (
    <StyledWrapper
      className={props.className}
      maxHeight={props.maxHeight}
      baseColor={props.baseColor}
      topPadding={props.topPadding}
      secondColor={props.secondColor}
    >
        <div className="route-line__main-line"/>
    </StyledWrapper>
  )
}
type StylesProps = {
  maxHeight: number,
  baseColor: string,
  topPadding?: number,
  secondColor?: string,
}

const StyledWrapper = styled.div<StylesProps>`
  width: 14px;
  height: ${props => props.maxHeight}px;
  padding-top: ${props => props.topPadding ? props.topPadding : 0}px;
  display: flex;
  justify-content: center;

  .route-line {

    &__main-line {
      width: 4px;
      min-height: 100%;
      height: 100%;
      background-color: ${props => props.baseColor};
      ${props => {
        if(props.secondColor) {
          return css `
            background: repeating-linear-gradient(to bottom, ${props.baseColor}, ${props.baseColor} 7px, ${props.secondColor} 7px, ${props.secondColor} 14px);
          `
        }
        return css`
          background: ${props.baseColor};
        `
        }}
      z-index: 2;
    }
  }
`;

export default RouteLine;