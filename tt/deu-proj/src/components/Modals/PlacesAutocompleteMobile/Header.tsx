import React from 'react';
import styled from 'styled-components';
import KeyboardArrowRight from '../../UI/icons/KeyboardArrowRight';

type Props = {
  value: string;
  onInputChange: (value: string) => void;
  onBackPress?: () => void,
  placeholder?: string,
}
const Header: React.FC<Props> = (props) => {
  
  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    return props.onInputChange(value);
  }


  return (
    <StyledContainer>
      <StyledInputContainer>
        <button
          className="search-input__back-button"
          onClick={props.onBackPress}
        >
          <KeyboardArrowRight />
        </button>
        <input
          value={props.value}
          onChange={onInputChange}
          className="search-input__search-input"
          autoFocus
        />
      </StyledInputContainer>
    </StyledContainer>
  )
}

Header.defaultProps = {
  onBackPress: () => null,
};

const StyledContainer = styled.div`
  padding: 8px;
  box-shadow: ${props => props.theme.colorValues.lightestgrey} 0 2px 6px 0;
`;

const StyledInputContainer = styled.div`
  height: 56px;
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  display: flex;
  align-items: center;
  border-radius: 8px;

  .search-input {
    &__back-button {
      height: 100%;
      padding: 16px 14px 16px 18px;

      & > svg { display: block; }
    }
  
    &__search-input {
      padding: 15px 10px 15px 4px;
      background-color: transparent;
      width: 100%;
      ${props => props.theme.typography.fnTitle2};
    }
  }
`;

export default Header;