import React from 'react';
import styled from 'styled-components';
import parse from 'date-fns/parse';

import SelectLabel from '../../UI/SelectLabel';

import { reducer, getInitialState } from './reducer';
import { DepartureTypes } from '../../../utils/constants';
import { PillButton, Button, TransparentButton } from '../../UI/Button';

import { withTranslation } from '../../../../i18n';
import { WithTranslation } from 'next-i18next';
import TimeInput from '../../UI/TimeInput';
import { DoneSelectionType } from './models';
import { getNewDate } from '@utils/time/getNewDate';
import Ripple from '@components/UI/Ripple';

interface Props extends WithTranslation {
  onConfirm?: (ev: DoneSelectionType) => void,
  onCancel?: () => void,
  initialDate?: Date,
  initialDeparture?: DepartureTypes,
}
const TimePickerMobile: React.FC<Props> = (props) => {
  const { t } = props;

  const [state, dispatch] = React.useReducer(
    reducer,
    getInitialState({
      date: props.initialDate,
      departure: props.initialDeparture
    }),
  );

  function setDeparture(departure: DepartureTypes) {
    dispatch({
      type: 'set_departure',
      departure,
    })
  }

  function onTimeChange(newTime: string) {
    dispatch({
      type: 'set_time',
      time: newTime,
    })
  }

  function onDateChange(newDate: string) {
    dispatch({
      type: 'set_date',
      date: newDate,
    })
  }

  function onConfirm() {
    const date = parse(`${state.selectedDate} ${state.selectedTime}`, 'yyyy-MM-dd HH:mm', getNewDate());
    const result: DoneSelectionType = {
      departure: state.departure,
      date,
    };

    props?.onConfirm?.(result);
  }

  return (
    <StyledContainer>
      <div className="timepicker__departure">
        <button
          className="timepicker__departure-button"
          onClick={() => setDeparture(DepartureTypes.from)}
        >
          <SelectLabel
            title={t(`timepicker__from`)}
            active={state.departure === DepartureTypes.from}
          />
        </button>
        <button
          className="timepicker__departure-button"
          onClick={() => setDeparture(DepartureTypes.to)}
        >
          <SelectLabel
            title={t(`timepicker__to`)}
            active={state.departure === DepartureTypes.to}
          />
        </button>
      </div>

      <div className="timepicker__time-input">
        <TimeInput
          dateValue={state.selectedDate}
          timeValue={state.selectedTime}
          onDateChange={onDateChange}
          onTimeChange={onTimeChange}
        />
      </div>

      <div className="timepicker__hot-buttons">
        <PillButton
          onClick={() => dispatch({ type: "set_now_time" })}
        >
          {t(`timepicker__now`)}
        </PillButton>
        <PillButton
          onClick={() => dispatch({ type: "set_tomorrow_time" })}
        >
          {t(`timepicker__tomorrow`)}
        </PillButton>
        <PillButton
          onClick={() => dispatch({ type: "set_day_after_tomorrow_time" })}
        >
          {t(`timepicker__day-after-tomorrow`)}
        </PillButton>
      </div>

      <div className="timepicker__done-buttons">
        <Button
          fullWidth
          onClick={onConfirm}
        >
          <Ripple />
          {t(`button__done`)}
        </Button>
        <TransparentButton
          fullWidth
          onClick={props.onCancel}
        >
          {t(`button__abort`)}
        </TransparentButton>
      </div>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  padding-top: 15px;
  width: 311px;
  height: 317px;

  .timepicker {
    &__departure {
      display: flex;
      margin-bottom: 24px;
      justify-content: center;
    }

    &__departure-button {
      display: block;

      &:first-child {
        margin-right: 32px;
      }
    }

    &__hot-buttons {
      margin-top: 16px;
      margin-bottom: 40px;
      text-align: center;

      & > button {
        margin-right: 4px;
      }

      & > button:last-child {
        margin-right: 0;
      }
    }

    &__done-buttons {
      & > button:first-child {
        margin-bottom: 8px;
      }
    }
  }
`;

export default withTranslation('common')(TimePickerMobile);