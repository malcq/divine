import React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  active?: boolean,
  title: string,
};
const SelectLabel: React.FC<Props> = (props) => {
  return (
    <StyledContainer
      active={props.active}
    >
      <div className="select-label__title">
        {props.title}
      </div>
      <div
        className="select-label__border"
      />
    </StyledContainer>
  )
}

type StyledContainerProps = {
  active?: boolean,
}
const StyledContainer = styled.div<StyledContainerProps>`
  display: inline-block;
  cursor: pointer;
  .select-label {
    &__title {
      margin-bottom: 4px;
      ${props => props.theme.typography.fnBody};
      ${props => props.theme.typography.fnMedium};
      color: ${props => props.active
        ? props.theme.colorValues.primary
        : props.theme.colorValues.lightgrey
      }
    }
  
    &__border {
      width: 100%;
      height: 2px;
      ${props => props.active
        ? css`
          background-color: ${props => props.theme.colorValues.primary};
        `
        : css`
          background-color: transparent;
        `
      };
    }
  }


`;



export default SelectLabel;