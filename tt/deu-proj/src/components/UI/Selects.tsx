import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import { STATIC_URLS } from '@utils/constants';

type Props = {
  className?: string,
  onChange: (item: any) => void,
  value: any,
  selectClassName?: string,
}
const Select: React.FC<Props> = (props) => {
  function onChange(ev: ChangeEvent<HTMLSelectElement>) {
    props.onChange(ev.target.value);
  }

  return (
    <StyledContainer className={props.className}>
      <SimpleSelect
        onChange={onChange}
        value={props.value}
        className={props.selectClassName}
      >
        {props.children}
      </SimpleSelect>
      <div className="fancy-select__icon">
        <span className="fancy-select--caret" />
      </div>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  position: relative;
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  ${props => props.theme.typography.fnText};
  ${props => props.theme.typography.fnBody};
  color: ${props => props.theme.colorValues.black};
  height: 32px;

  .fancy-select {
    &__icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
      display: inline-block;

      & > svg {
        display: block;
      }
    }
    &--caret {
      display: block;
      width: 8px;
      height: 4px;
      background: url(${STATIC_URLS.SVG}/widget/arrow-dropdown.svg) no-repeat 50% 50%;
    }
  }
`;

const SimpleSelect = styled.select`
  border-radius: 16px;
  padding: 5px 10px;
  border: none;
  -webkit-appearance: none;
  color: ${props => props.theme.colorValues.grey};

  :active {
    background-color: ${props => props.theme.colorValues.aliceBlue};
  }
`;

export default Select;