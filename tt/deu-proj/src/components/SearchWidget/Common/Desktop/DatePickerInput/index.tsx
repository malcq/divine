import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { WithTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { CSSTransition } from 'react-transition-group';
import { withTranslation } from 'i18n';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import addMinutes from 'date-fns/addMinutes';
import addHours from 'date-fns/addHours';
import addDays from 'date-fns/addDays';
import setMinutes from 'date-fns/setMinutes';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import deLocale from 'date-fns/locale/de';

import { useOutsideClick } from '@utils/hooks/useOutsideClick';
import { DepartureTypes, ANIMATION_VALUES, STATIC_URLS } from '@utils/constants';
import media from '@utils/media';
import { getTimePickerValue } from '@utils/time/getTimePickerValue';
import { getNewDate } from '@utils/time/getNewDate';

import { getInitialState, reducer, dropdownTypes } from './reducer';

import CustomBar from '../../../../UI/CustomBar';

const Datepicker = dynamic(() => import('../../../../UI/DatepickerDesktop'));
const MIN_DATE = getNewDate();

type TimeItem = {
  date: Date,
  title: string
}

function getTimeList(selectedDate: Date): TimeItem[] {
  let dateForTimeList = getNewDate();
  const inPickerStr = format(selectedDate, 'dd.MM.yyyy');
  const nowStr = format(dateForTimeList, 'dd.MM.yyyy');

  const dateInPicker = parse(inPickerStr, 'dd.MM.yyyy', getNewDate());
  const dateNow = parse(nowStr, 'dd.MM.yyyy', getNewDate());

  if (isAfter(dateInPicker, dateNow)) {
    dateForTimeList = dateInPicker;
  }

  let minutes = dateForTimeList.getMinutes();
  const nextDay = startOfDay(addDays(dateForTimeList, 1));
  if (minutes > 0 && minutes < 30) {
    dateForTimeList = setMinutes(dateForTimeList, 30);
  }
  if (minutes > 30) {
    dateForTimeList = addHours(dateForTimeList, 1);
    dateForTimeList = setMinutes(dateForTimeList, 0);
  };

  const result: TimeItem[] = [];

  while (isBefore(dateForTimeList, nextDay)) {
    const item: TimeItem = {
      date: dateForTimeList,
      title: format(dateForTimeList, 'HH:mm')
    };
    result.push(item);
    dateForTimeList = addMinutes(dateForTimeList, 30);
  }
  return result;
}

const DEPARTURE_LIST: DepartureTypes[] = [
  DepartureTypes.from,
  DepartureTypes.to,
];


interface Props extends WithTranslation {
  selectedDate: Date,
  selectedDeparture: DepartureTypes,
  timeError?: boolean,
  onDateChange: (date: Date) => void,
  setDeparture: (departure: DepartureTypes) => void,
}
const DatePickerInput: React.FC<Props> = (props) => {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());
  const [timeValue, setTimeValue] = React.useState(() => format(props.selectedDate, 'HH:mm'));
  const departureRef = React.useRef<HTMLDivElement>(null);
  const timepickerRef = React.useRef<HTMLDivElement>(null);
  const timeInputRef = React.useRef<HTMLInputElement>(null);
  const datepickerRef = React.useRef<HTMLDivElement>(null);
  const initialize = React.useRef(false)
  const prevTime = React.useRef<string>(format(props.selectedDate, 'HH:mm'));

  React.useEffect(() => {
    setTimeValue(() => format(props.selectedDate, 'HH:mm'))
  }, [props.selectedDate]);

  React.useEffect(() => {
    if (!initialize.current) {
      initialize.current = true;
      return;
    }
    timeInputRef.current?.click()
  }, [props.timeError]);

  function changeDropdown(type: dropdownTypes) {
    dispatch({
      type: "change_dropdown",
      dropdown: type,
    });
  }
  const TIME_LIST = React.useMemo(() => {
    return getTimeList(props.selectedDate);
  }, [props.selectedDate]);

  const onTimeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const time = getTimePickerValue(value);
    if (time) {
      let result = parse(time, 'HH:mm', props.selectedDate);
      if (isBefore(result, getNewDate())) {
        result = getNewDate();
      }
      const resultStr = format(result, 'HH:mm');
      if (resultStr !== prevTime.current) {
        prevTime.current = resultStr;
        return props.onDateChange(result);
      }
    }
    setTimeValue(() => format(props.selectedDate, 'HH:mm'))
  }

  function onDateChange(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const minutes = props.selectedDate.getMinutes();
    const hours = props.selectedDate.getHours();
    const result = parse(`${day}.${month}.${year} ${hours}:${minutes}`, 'dd.MM.yyyy HH:mm', props.selectedDate);
    props.onDateChange(result);

    changeDropdown('none');
  }

  function onTimeChange(date: Date) {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const result = parse(`${hour}:${minutes}`, 'HH:mm', props.selectedDate)
    props.onDateChange(result);
    changeDropdown('none');
  }

  const dropDownBtnHandler = (e: SyntheticEvent<HTMLElement>, type: dropdownTypes) => {
    const elem = e.target as HTMLElement;
    if (e.target === e.currentTarget || elem.tagName === 'SPAN') {
      changeDropdown(type)
    }
  }

  function onDepartureChange(departure: DepartureTypes) {
    props.setDeparture(departure);
    changeDropdown('none');
  }

  useOutsideClick(departureRef, () => {
    if (state.selectedDropdown === 'departure') {
      dispatch({
        type: 'change_dropdown',
        dropdown: 'none',
      })
    }
  });

  useOutsideClick(timepickerRef, () => {
    if (state.selectedDropdown === 'timepicker') {
      dispatch({
        type: 'change_dropdown',
        dropdown: 'none',
      })
    }
  });

  useOutsideClick(datepickerRef, () => {
    if (state.selectedDropdown === 'datepicker') {
      dispatch({
        type: 'change_dropdown',
        dropdown: 'none',
      })
    }
  });

  const departureClass = classNames({
    "timepicker-lg__button": true,
    "timepicker-lg__button--departure": true,
    "timepicker-lg__button--active": state.selectedDropdown === 'departure',
  });

  const timeClass = classNames({
    "timepicker-lg__button": true,
    "timepicker-lg__button--time": true,
  });

  const dateClass = classNames({
    "timepicker-lg__button": true,
    "timepicker-lg__button--date": true,
    "timepicker-lg__button--active": state.selectedDropdown === 'datepicker',
  });

  const departureText = props.selectedDeparture === DepartureTypes.from
    ? props.t(`timepicker__from`)
    : props.t(`timepicker__to`);

  return (
    <StyledContainer
      ref={datepickerRef}
    >
      <button
        className={departureClass}
        onClick={(e) => dropDownBtnHandler(e, 'departure')}
      >
        <span className="timepicker-lg--clock-icon" />
        <span className="timepicker-lg--text-overflow timepicker-lg--text-moz">
          {departureText}
        </span>
        <CSSTransition
          in={state.selectedDropdown === 'departure'}
          unmountOnExit
          timeout={ANIMATION_VALUES.DROPDOWN_ANIMATION.timeout}
          classNames="dropdown-animation"
        >
          <div
            className="timepicker-lg__departure-modal"
            ref={departureRef}
          >
            {DEPARTURE_LIST.map((item, index) => {
              return (
                <DepartureMenuItem
                  key={index}
                  onClick={() => onDepartureChange(item)}
                >
                  {item === DepartureTypes.from
                    ? props.t(`timepicker__from`)
                    : props.t(`timepicker__to`)
                  }
                </DepartureMenuItem>
              )
            })}
          </div>
        </CSSTransition>
      </button>

      <div className="timepicker-lg__separator" />

      <div
        className={timeClass}
        ref={timepickerRef}
      >
        {state.selectedDropdown === "timepicker" &&
          <>
            <div className="timepicker-lg__time-border timepicker-lg__time-border--top" />
            <div className="timepicker-lg__time-border timepicker-lg__time-border--right" />
            <div className="timepicker-lg__time-border timepicker-lg__time-border--bottom" />
            <div className="timepicker-lg__time-border timepicker-lg__time-border--left" />
          </>
        }
        <input
          ref={timeInputRef}
          type="text"
          className="timepicker-lg--text-overflow timepicker-lg__time-area"
          onClick={(e) => dropDownBtnHandler(e, 'timepicker')}
          value={timeValue}
          onBlur={onTimeChangeHandler}
          onChange={(e) => setTimeValue(e.target.value)}

        />
        <CSSTransition
          in={state.selectedDropdown === 'timepicker'}
          unmountOnExit
          timeout={ANIMATION_VALUES.DROPDOWN_ANIMATION.timeout}
          classNames="dropdown-animation"
        >
          <div
            className="timepicker-lg__timepicker-modal"
          >
            <CustomBar
              autoHide={false}
              styles={{width: 120, height: 200}}
            >
              {TIME_LIST.map((item) => {
                return (
                  <TimeMenuItem
                    key={item.title}
                    onClick={() => onTimeChange(item.date)}
                  >
                    {item.title}
                  </TimeMenuItem>
                );
              })}
            </CustomBar>
          </div>
        </CSSTransition>
      </div>

      <div className="timepicker-lg__separator" />

      <div
        className={dateClass}
        onClick={(e) => dropDownBtnHandler(e, 'datepicker')}

      >
        <span className="timepicker-lg--text-overflow">
          {format(props.selectedDate, 'EEEEEE, dd.MM.', {
            locale: deLocale
          })}
        </span>
        <CSSTransition
          in={state.selectedDropdown === 'datepicker'}
          unmountOnExit
          timeout={ANIMATION_VALUES.DROPDOWN_ANIMATION.timeout}
          classNames="datepicker-animation"
        >
          <div className="timepicker-lg__datepicker-modal">
            <Datepicker
              value={props.selectedDate}
              onChange={onDateChange}
              minDate={MIN_DATE}
            />
          </div>
        </CSSTransition>
      </div>

    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  height: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: minmax(40px, 140px) 1px minmax(40px, 64px) 1px minmax(40px, 119px);
  align-items: center;

  .timepicker-lg {

    &--text-overflow {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &__time-area {
      max-width: 50px;
    }
    &--clock-icon {
      background: url(${STATIC_URLS.SVG}/widget/clock-icon.svg?v=2) no-repeat 50% 50%;
      width: 16px;
      height: 16px;
      margin-right: 12px;
      -moz-transform: translateY(-1px);
      display: block;
      flex-shrink: 0;
    }
    &__button {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnTitle2};
      color: ${props => props.theme.colorValues.grey};
      position: relative;
      cursor: pointer;
      user-select: none;

      &--active::before {
          content: "";
          position: absolute;
          top: -1px;
          bottom: -1px;
          border: 2px solid ${props => props.theme.colorValues.primary};
      }

      &--departure {
        display: flex;
        align-items: center;
        padding: 15px 10px 15px 13px;

        & > svg {
          display: block;
          margin-right: 12px;
          flex-shrink: 0;
        }

        &::before {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          right: -2px;
          left: -1px;
        }
      }

      &--time {
        padding: 0 8px 0 7px;
        display: flex;
        align-items: center;
        height: 54px;
      }

      &--date {
        padding: 15px 12px;
        flex-grow: 1;
        text-align: left;

        &::before {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          left: -2px;
          right: -1px;
        }
      }
    }

    &__time-border {
        background-color: ${props => props.theme.colorValues.primary};
        position: absolute;

        &--left {
          height: 100%;
          width: 2px;
          left: -1px;
          top: 0;
        }

        &--top {
          height: 2px;
          width: 100%;
          top: -1px;
          left: 0px;
        }

        &--right {
          height: 100%;
          width: 2px;
          right: -1px;
          top: 0;
        }

        &--bottom {
          height: 2px;
          width: 100%;
          bottom: -1px;
          left: 0;
        }
      }

    &__separator {
      position: relative;
      background-color: ${props => props.theme.colorValues.lightestgrey};
      width: 1px;
      margin: 12px 0;
      height: calc(100% - 24px);
    }

    &__departure-modal,
    &__timepicker-modal {
      position: absolute;
      top: calc(100% + 8px);
      background-color: ${props => props.theme.colorValues.white};
      border-radius: 8px;
      box-shadow: rgba(0,0,0,0.18) 0 1px 3px 0;
      left: 0;
      z-index: 10;
    }

    &__departure-modal {
      width: 160px;
      height: 80px;
      padding: 8px 0;
    }

    &__timepicker-modal {
      width: 120px;
      height: 200px;
    }

    &__datepicker-modal {
      position: absolute;
      top: calc(100% + 8px);
      right: -43px;
      z-index: 10;
      box-shadow: rgba(0,0,0,0.18) 0 1px 3px 0;

      ${media.custom(810)} {
        right: 0;
      }
    }
  }

  .dropdown-animation {
    &-enter,
    &-enter-active {
      transform-origin: top left;
    }

    &-enter {
      transform: scale(0.2);
      opacity: 0;
    }

    &-enter-active {
      opacity: 1;
      transform: scaleY(1);
      transition: ${ANIMATION_VALUES.DROPDOWN_ANIMATION.transition}ms;
    }
  }

  .datepicker-animation {
    &-enter,
    &-enter-active {
      transform-origin: top right;
    }

    &-enter {
      transform: scale(0.2);
      opacity: 0;
    }

    &-enter-active {
      opacity: 1;
      transform: scaleY(1);
      transition: ${ANIMATION_VALUES.DROPDOWN_ANIMATION.transition}ms;
    }
  }

  .simplebar-scrollbar::before {
    background-color: ${props => props.theme.colorValues.primary};  
  }
  .simplebar-scrollbar.simplebar-visible:before {
    opacity: 1;
  }
`;

const DepartureMenuItem = styled.div`
  width: 100%;
  height: 32px;
  padding: 4px 12px;
  text-align: left;
  ${props => props.theme.typography.fnText};
  ${props => props.theme.typography.fnTitle2};
  color: ${props => props.theme.colorValues.grey};

  &:hover {
    background-color: ${props => props.theme.colorValues.zumthor};
  }
`;

const TimeMenuItem = styled(DepartureMenuItem)`
  padding: 4px 20px;
`;

export default withTranslation('common')(DatePickerInput);