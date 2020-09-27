import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI/Icon';
import { STATIC_URLS } from '@utils/constants';
import Ripple from '@components/UI/Ripple';

type Props = {
  title: string;
  className?: string;
  onClickHandler: () => void;
}

const SearchBarButton: React.FC<Props> = (props) => {
  return (
    <StyledButton
      onClick={props.onClickHandler}
      className={props.className}
    >
      <Icon
        srcUrl={`${STATIC_URLS.SVG}/loupe.svg`}
        height={14}
        width={14}
      />
      <p>{props.title}</p>
    </StyledButton>
  )
};

const StyledButton = styled.button`
  position: relative;
  overflow: hidden;
  width: calc(100% - 32px);
  height: 44px;
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  border-radius: 28px;
  ${props => props.theme.stickShadow};
  display: flex;
  align-items: center;

  :active {
    background-color: ${props => props.theme.colorValues.aliceBlue};
  }

  & > span {
    margin: 0 12px 0 19px;
  }

  & > p {
    ${props => props.theme.typography.fnText};
    ${props => props.theme.typography.fnCaption3};
    color: ${props => props.theme.colorValues.lightgrey};
  }
`;

export default SearchBarButton;