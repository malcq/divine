import React from 'react';
import styled from 'styled-components';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import { getNewDate } from '@utils/time/getNewDate';


type Props = {
  dateValue: string,  // eg. 2020-01-28
  timeValue: string, // eg. 18:35
  onDateChange: (value: string) => void,
  onTimeChange: (value: string) => void,
};
const TimeInput: React.FC<Props> = (props) => {
  function onTimeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nowDate = getNewDate();
    const nowDateMinutes = format(nowDate, 'HH:mm');

    const selectedTime = parse(`${props.dateValue} ${event.target.value}`, 'yyyy-MM-dd HH:mm', nowDate)
    if (isAfter(selectedTime, nowDate)) {
      return props.onTimeChange(event.target.value);
    }
    return props.onTimeChange(nowDateMinutes)
  }
  
  function onDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nowDate = getNewDate();
    const nowDateStr = format(nowDate, 'yyyy-MM-dd');
    const selectedDate = parse(event.target.value, 'yyyy-MM-dd', nowDate);

    if (isAfter(selectedDate, nowDate)) {
      return props.onDateChange(event.target.value);
    }
    props.onDateChange(nowDateStr);
  }

  return (
    <StyledContainer>
      <input
        type="date"
        value={props.dateValue}
        onChange={onDateChange}
      />
      <input
        type="time"
        value={props.timeValue}
        onChange={onTimeChange}
      />
    </StyledContainer>
  )
};

const StyledContainer = styled.div`
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  border-radius: 8px;

  padding: 12px;

  & > input {
    display: inline-block;
    ${props => props.theme.typography.fnRegular};
    font-size: 24px;
    letter-spacing: -0.44px;
    line-height: 28px;
    -webkit-appearance: none;
    background-color: white;

    width: unset;
    text-align: center;

    &::-webkit-date-and-time-value {
      margin: 0;
    }

    &::-webkit-calendar-picker-indicator,
    &::-webkit-inner-spin-button,
    &::-webkit-clear-button {
      display: none;
    }
  }

  & > input:first-child {
    border-right: 1px solid;
    border-right-color: ${props => props.theme.colorValues.lightestgrey};
  }
  & > input:last-child {
    padding-left: 12px;
  }
`;

export default TimeInput;