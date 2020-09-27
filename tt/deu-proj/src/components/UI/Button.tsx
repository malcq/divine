import React  from 'react';
import styled, { css } from 'styled-components';
import media from '@utils/media';
import Ripple from './Ripple';

export enum InputButtonStates {
  active = 'active',
}

export enum ButtonSizes {
  large = 'large',
  small = 'small',
  default = 'default',
}

type ButtonProps = {
  size?: ButtonSizes;
  fullWidth?: boolean;
}
export const Button = styled.button<ButtonProps>`
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  border-radius: 28px;
  background-color: ${props => props.theme.colorValues.primary};
  text-transform: uppercase;
  color: ${props => props.theme.colorValues.white};
  ${props => props.theme.typography.fnMedium};
  ${props => props.theme.typography.fnLabel};

  ${props => {
    const size = props.size ?? ButtonSizes.default;
    if (size === ButtonSizes.large) {
      return css`
        padding: 18px;
        height: 56px;
      `;
    } else if (size === ButtonSizes.default) {
      return css`
        padding: 15px;
        height: 46px;
      `;
    } else if (size === ButtonSizes.small) {
      return css`
        padding: 8px 16px;
        height: 36px;
        ${props => props.theme.typography.fnBody};
      `;
    }
  }};

  width: ${props => props.fullWidth ? '100%' : null};

  :active {
    transition: 0.4s;
    background-color: ${props => props.theme.colorValues.primaryHover};
    box-shadow: 0 1px 2px 0 rgba(66,133,244,0.5), 0 1px 3px 1px rgba(66,133,244,0.3);
  }

  ${media.desktop} {
    :hover {
      transition: 0.4s;
      background-color: ${props => props.theme.colorValues.primaryHover};
      box-shadow: 0 1px 2px 0 rgba(66,133,244,0.5), 0 1px 3px 1px rgba(66,133,244,0.3);
    }
  }
`;

type SearchButtonProps = {
  size?: ButtonSizes;
  fullWidth?: boolean;
  icon?: any;
  title?: any;
  className?: string;
  onClick?: () => void;
}
export const SearchButton: React.FC<SearchButtonProps> = ({
  icon,
  title,
  className,
  size,
  fullWidth,
  onClick
}) => {
  return (
    <SearchButtonStyle
      size={size}
      fullWidth={fullWidth}
      className={className}
      onClick={onClick}
    >
      <Ripple />
      {icon}
      {title}
    </SearchButtonStyle>
  )
}


const SearchButtonStyle = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform: translateZ(0);
  overflow: hidden;
`;

type TransparentButtonProps = {
  fullWidth?: boolean;
}
export const TransparentButton = styled.button<TransparentButtonProps>`
  border-radius: 28px;
  text-transform: uppercase;
  color: ${props => props.theme.colorValues.primary};
  ${props => props.theme.typography.fnMedium};
  ${props => props.theme.typography.fnLabel};
  width: ${props => props.fullWidth ? '100%' : null};
  padding: 15px;

  :active {
    transition: 0.4s;
    color: ${props => props.theme.colorValues.primaryHover};
  }

  ${media.desktop} {
    :hover {
      transition: 0.4s;
      color: ${props => props.theme.colorValues.primaryHover};
    }
  }
`;


export const PillButton = styled.button`
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  padding: 5px 15px;
  border-radius: 30px;
  ${props => props.theme.typography.fnText};
  ${props => props.theme.typography.fnBody};
  color: ${props => props.theme.colorValues.grey};
  letter-spacing: 0.25px;
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};

  :active {
    transition: 0.4s;
    background-color: ${props => props.theme.colorValues.lightestgrey};
  }
`;

type InputButtonProps = {
  state?: InputButtonStates,
  isTimePicker?: boolean,
}
export const InputButton = styled.button<InputButtonProps>`
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  ${props => props.isTimePicker && css `border: 1px solid ${props => props.theme.colorValues.lightestgrey};`};
  
  :active {
    background-color: ${props => props.theme.colorValues.aliceBlue};
  }
`;
