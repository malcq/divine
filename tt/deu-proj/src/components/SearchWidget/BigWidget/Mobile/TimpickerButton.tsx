import React from 'react';
import styled from 'styled-components';

import { InputButton } from '../../../UI/Button';
import { STATIC_URLS } from '@utils/constants';

type Props = {
  onClick?: () => void,
  title: string,
  className?: string,
}
const TimepickerButton: React.FC<Props> = (props) => {
  return (
    <InputButton
      className={props.className}
      onClick={props.onClick}
      isTimePicker
    >
      <TimeInputContainer>
        <span className="time-input--clock-icon" />
        <div className="time-input__content">
          {props.title}
        </div>
      </TimeInputContainer>
    </InputButton>
  )
};

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;

  .time-input {
    &__content {
      margin-left: 12px;
      ${props => props.theme.typography.fnTitle2};
      ${props => props.theme.typography.fnText};
    }

    &--clock-icon {
      background: url(${STATIC_URLS.SVG}/widget/clock-icon.svg?v=2) no-repeat 50% 50%;
      width: 16px;
      height: 16px;
    }
  }
`;

export default TimepickerButton;