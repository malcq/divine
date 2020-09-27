import React from 'react';
import ReactDatepicker, { registerLocale } from 'react-datepicker';
import styled from 'styled-components';
import addDays from 'date-fns/addDays';
import de from 'date-fns/locale/de';
import "react-datepicker/dist/react-datepicker.css";
import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';

import { STATIC_URLS } from '../../../utils/constants';
import media from '@utils/media';
import { getNewDate } from '@utils/time/getNewDate';

registerLocale('de', de)


enum PickerHotkeys {
  today,
  tomorrow,
  day_after_tomorrow,
}

interface Props extends WithTranslation {
  value: Date,
  onChange: (date: Date) => void,
  minDate?: Date,
}
const Datepicker: React.FC<Props> = (props) => {
  function onHotkeyPress(hotkey: PickerHotkeys) {
    let newDate = getNewDate();
    switch (hotkey) {
      case PickerHotkeys.tomorrow:
        newDate = addDays(newDate, 1);
        break;
      case PickerHotkeys.day_after_tomorrow:
        newDate = addDays(newDate, 2)
        break;
      case PickerHotkeys.today:
      default:
        break;
    }

    props.onChange(newDate);
  }

  return (
    <StyledContainer>
      <div className="datepicker-lg__hotkeys">
        <button
          className="datepicker-lg__hotkey"
          onClick={() => onHotkeyPress(PickerHotkeys.today)}
        >
          {props.t(`timepicker__now`)}
        </button>
        <button
          className="datepicker-lg__hotkey"
          onClick={() => onHotkeyPress(PickerHotkeys.tomorrow)}
        >
          {props.t(`timepicker__tomorrow`)}
        </button>
        <button
          onClick={() => onHotkeyPress(PickerHotkeys.day_after_tomorrow)}
          className="datepicker-lg__hotkey"
        >
          {props.t(`timepicker__day-after-tomorrow`)}
        </button>
      </div>
      <ReactDatepicker
        onChange={props.onChange}
        selected={props.value}
        monthsShown={2}
        minDate={props.minDate}
        locale="de"
        formatWeekDay={(dayOfWeekLabel) => dayOfWeekLabel.substring(0, 1)}
        dateFormatCalendar="MMMM"
        inline={true}
        showDisabledMonthNavigation={true}
      />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  width: 690px;
  border-radius: 8px;

 ${media.custom(810)} {
   width: 722px
 }
  .datepicker-lg {
    &__hotkeys {
      height: 64px;
      width: 100%;
      background-color: ${props => props.theme.colorValues.white};
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 16px;
    }

    &__hotkey {
      border-radius: 30px;
      padding: 5px 15px;
      border: 1px solid ${props => props.theme.colorValues.lightestgrey};
      margin-right: 4px;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      letter-spacing: 0.25px;
    }

    &__hotkey:last-child {
      margin-right: 0;
    }
  }

  .react-datepicker {
    vertical-align: top;
    border: none;
    border-top: 1px solid ${props => props.theme.colorValues.lightestgrey};
    border-radius: 0;
    padding: 12px 32px 24px 32px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    &__navigation {
      top: 145px;
      width: 36px;
      height: 36px;
      border-radius: 100%;
      background-color: ${props => props.theme.colorValues.white};
      box-shadow: ${props => props.theme.colorValues.lightestgrey} 0 2px 6px 0;
      margin: 0;
      background-image: url("${STATIC_URLS.SVG}/keyboard_arrow_left.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 8px 12px;
      border: none;

      &--previous {
        left: -12px;
        
        ${media.custom(810)} {
          left: -18px;
        }
      }

      &--next {
        right: -12px;
        transform: rotate(180deg);

        ${media.custom(810)} {
          right: -18px;
        }
      }
    }

    &__month-container {
      margin-right: 38px;

      ${media.custom(810)} {
        margin-right: 42px;
      }
      &:last-child {
        margin-right: 0;
      }
    }

    &__header {
      background-color: ${props => props.theme.colorValues.white};
      border: none;
      padding-top: 12px;
    }

    &__current-month,
    &__day {
      ${props => props.theme.typography.fnTitle2};
    }

    &__current-month {
      ${props => props.theme.typography.fnMedium};
      margin-bottom: 16px;
      color: ${props => props.theme.colorValues.grey};
    }

    &__month {
      margin: 0;
    }

    &__week {
      cursor: unset;
    }

    &__day-name {
      width: 42px;
      height: 24px;
      margin: 0;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
      
      ${media.custom(810)} {
        width: 44px;
      }
    }

    &__day {
      width: 42px;
      height: 42px;
      margin: 2px 0;
      border-radius: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      ${props => props.theme.typography.fnText};
      color: rgba(0,0,0,0.86);

      ${media.custom(810)} {
        width: 44px;
        height: 44px;

      }

      &:hover {
        border: 1px solid ${props => props.theme.colorValues.primary};
        background-color: transparent;
      }

      &--selected {
        color: ${props => props.theme.colorValues.white};
        border: 1px solid ${props => props.theme.colorValues.primary};
        background-color: ${props => props.theme.colorValues.primary};

        &:hover {
          background-color: ${props => props.theme.colorValues.primary};
        }
      }

    }

    &__day--disabled,
    &__month-text--disabled,
    &__quarter-text--disabled {
      color: rgba(0, 0, 0, 0.32);
      cursor: not-allowed;
      &:hover {
        border: none;
      }
    }

    &__day--outside-month {
      visibility: hidden;
    }
  }
`;

export default withTranslation('common')(Datepicker);