import React from 'react';
import styled, { css } from 'styled-components';

import { PillButton } from '../Button';
import { Icon } from '../Icon';


type ButtonColorType = 'default' | 'primary' | 'disabled';

interface Props {
  img: string,
  title: string,
  line?: string,
  type: ButtonColorType,
  className?: string,
  onClick?: () => void,
};

const Button: React.FC<Props> = (props) => {
  console.log(props.type, 'typr @@@@')
  const lineTitle = props.line &&
    <span className="stop-button__line">
      {props.line}
    </span>

  return (
    <StyledButton
      onClick={props.onClick}
      colorType={props.type}
      className={props.className}
    >
      <Icon
        srcUrl={props.img}
        width={20}
        height={20}
        className="stop-button__img"
      />
      <div className="stop-button__title">
        {props.title}
        {
          lineTitle
        }
      </div>
        {props.children}
    </StyledButton>
  )
}

type StyleProps = {
  readonly colorType: ButtonColorType,
  readonly isVisibility?: boolean,
};

const StyledButton = styled(PillButton)<StyleProps>`
  padding: 7px 16px 7px 14px;
  min-width: 100px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  align-items: center;
  position: relative;
  overflow: hidden;
  /* margin-right: 8px; */
  ${props => {
        switch (props.colorType) {
          case 'primary': 
            return css`
              color: ${props.theme.colorValues.white};
              background-color: ${props.theme.colorValues.primary}; 
              border-color: ${props.theme.colorValues.primary};
            `;
          case 'disabled':
            return css`
              color: ${props.theme.colorValues.greyCircle};
              background-color: ${props.theme.colorValues.white}; 
              border-color: ${props.theme.colorValues.greyCircle};
              :before {
                content: '';
              }
              :hover {
                cursor: not-allowed;
              }
              :active {
                background-color: inherit;
              }
            `;
          default: 
            return css `
            color: ${props => props.theme.colorValues.grey};
            background-color: ${props.theme.colorValues.white}
            `
        }
      }}
 
  &:last-child {
    margin-right: 0;
  }
  .stop-button {
    &__title {
      margin-left: 10px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      ${props => props.theme.typography.fnBody};
      ${props => props.theme.typography.fnMedium};
    }
    &__line {
      text-transform: uppercase;
      padding-left: 5px;
      white-space: nowrap;
    }
    &__img {
      ${props => {
        switch (props.colorType) {
          case 'primary': 
            return css`
              background-color: ${props.theme.colorValues.white}; 
            `;
          case 'disabled':
            return css`
              background-color: ${props.theme.colorValues.greyCircle};
            `;
          default: 
            return css `
              background-color: ${props.theme.colorValues.primary};
            `;
        }
      }}
    }
  }
`;

export default Button;
