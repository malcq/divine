import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import dynamic from 'next/dynamic';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from 'i18n';

import { DepartureTypes } from '@utils/constants';
import media from '@utils/media';

import DatePickerInput from '../DatePickerInput';

import { STATIC_URLS } from '@utils/constants';
import { useAutocompleteBehaviour } from '../../../hooks';

import { AutocompleteItem } from '@models/autocomplete';
import { HeaderWidgetErrors } from '@models/widget';


const AutocompleteList = dynamic(() => import('../../../../UI/autocompleteDesktop/AutocompleteList'));
interface JourneyInputsProps extends WithTranslation {
  selectedJourneyFrom?: AutocompleteItem,
  selectedJourneyTo?: AutocompleteItem,
  selectedDate: Date,
  selectedDeparture: DepartureTypes,
  disableSwap?: boolean,
  disableJourneyTo?: boolean,

  setJourneyFrom?: (item: AutocompleteItem) => void,
  setJourneyTo?: (item: AutocompleteItem) => void,
  swapJourneys?: () => void,
  setDate: (departure: Date) => void,
  setDeparture: (departure: DepartureTypes) => void,

  errors?: HeaderWidgetErrors,
  isHeaderWidget?: boolean;

  timeError?: boolean;

  setRefs?: (fromRef: React.RefObject<HTMLElement>, toRef: React.RefObject<HTMLElement>) => void
}

const JourneyInputs: React.FC<JourneyInputsProps> = (props) => {
  const {
    t,
    selectedJourneyFrom,
    selectedJourneyTo,
    setJourneyFrom,
    setJourneyTo,
    swapJourneys,
    disableJourneyTo,
    isHeaderWidget,
  } = props;

  const autocompleteRefFrom = React.useRef<HTMLDivElement>(null);
  const searchFromInputRef = React.useRef<HTMLInputElement>(null);

  const autocompleteRefTo = React.useRef<HTMLDivElement>(null);
  const searchToInputRef = React.useRef<HTMLInputElement>(null);

  const [swappedFields, setSwappedFields] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (searchFromInputRef.current && searchToInputRef.current && props.setRefs) {
      props.setRefs(searchFromInputRef, searchToInputRef)
    }
  }, []);
  
  const {
    autocompleteOpened: autocompleteFromOpened,
    searchValue: searchFromValue,
    setAutocompleteOpened: setAutocompleteFromOpened,
    setSearchValue: setSearchFromValue,
  } = useAutocompleteBehaviour(
    autocompleteRefFrom,
    searchFromInputRef,
    {
      initialSearchValue: selectedJourneyFrom?.title ?? '',
    },
    selectedJourneyFrom,
  );

  const {
    autocompleteOpened: autocompleteToOpened,
    searchValue: searchToValue,
    setAutocompleteOpened: setAutocompleteToOpened,
    setSearchValue: setSearchToValue,
    placeholderIsOpen: placeholderToIsOpen,
    setPlaceholderIsOpen: setPlaceholderToIsOpen,
  } = useAutocompleteBehaviour(
    autocompleteRefTo,
    searchToInputRef,
    {
      initialSearchValue: selectedJourneyTo?.title ?? '',
    },
    selectedJourneyTo,
  );

  function toggleSwitch() {
    if (props.disableSwap) { return; }
    swapJourneys?.()
    setSwappedFields(prevState => !prevState);
  }

  function onFromInputFocus() {
    searchFromInputRef?.current?.select();
    setAutocompleteFromOpened(true);
  }

  function onToInputFocus() {
    searchToInputRef?.current?.select();
    setAutocompleteToOpened(true);
  }

  function onChangeStopInputFrom(e: React.ChangeEvent<HTMLInputElement>): void {
    const { target: { value } } = e;
    setSearchFromValue(value);
  }

  function onChangeStopInputTo(e: React.ChangeEvent<HTMLInputElement>): void {
    const { target: { value } } = e;
    setSearchToValue(value);
  }

  function onStopSelectFrom(item: AutocompleteItem) {
    setJourneyFrom?.(item);
    setAutocompleteFromOpened(false);
  }

  function onStopSelectTo(item: AutocompleteItem) {
    setJourneyTo?.(item);
    setAutocompleteToOpened(false);
  }

  function focusInput(type: 'from' | 'to') {
    if (type === 'from') {
      return autocompleteRefFrom.current?.focus();
    }
    return autocompleteRefTo.current?.focus();
  }

  function togglePlaceholder() {
    setPlaceholderToIsOpen(true);
  }

  useEffect(() => {
    if (placeholderToIsOpen) {
      onToInputFocus()
    }
  }, [placeholderToIsOpen]);

  const isOpenToValue = isHeaderWidget && !placeholderToIsOpen && !searchToValue;
  const placeholderTo = isOpenToValue ? t('placeholder') : t('destination__journey-placeholder');

  return (
    <StyledContainer>
      <JourneyStops
        className="journey-stops__stops"
        switchRotated={swappedFields}
        swapDisabled={props.disableSwap}
        disabledTo={disableJourneyTo}
        errorFromInput={props.errors?.from}
        errorToInput={props.errors?.to}
        isOpenToValue={isOpenToValue}
      >
        <div className="journey-stops__wrapper">
          <div className="journey-stops__from">
            <span className="journey-stops__stop-icon-from" />

            <label className="journey-stops__label">{t(`destination__from`)}</label>
            <input
              className="journey-stops__stop-input-from"
              placeholder={t(`destination__journey-placeholder`)}
              value={searchFromValue}
              onChange={onChangeStopInputFrom}
              onFocus={onFromInputFocus}
              ref={searchFromInputRef}
            />

            <div className="journey-stops__half-circle journey-stops__half-circle--right" />

          </div>
          {autocompleteFromOpened && (
            <div
              ref={autocompleteRefFrom}
              className="journey-stops__autocomplete-wrapper"
            >
              <AutocompleteList
                query={searchFromValue}
                onPlaceSelect={onStopSelectFrom}
                suggestionsWidth={448}
              />
            </div>
          )}
        </div>
        <button
          className="journey-stops__switch-button"
          onClick={toggleSwitch}
        >
          <span className="journey-stops--up-down-icon" />
        </button>
        <div className="journey-stops__wrapper">
          <div className="journey-stops__to">
            <span className="journey-stops__stop-icon-to" />

            <label className="journey-stops__label journey-stops__label--to">{t(`destination__to`)}</label>
            <input
              className="journey-stops__stop-input-from journey-stops__stop-input-from--placeholder"
              placeholder={placeholderTo}
              value={searchToValue}
              onChange={onChangeStopInputTo}
              onClick={togglePlaceholder}
              ref={searchToInputRef}
              onFocus={onToInputFocus}
            />

            <div className="journey-stops__half-circle journey-stops__half-circle--left" />
          </div>
          {autocompleteToOpened && (
            <div
              className="journey-stops__autocomplete-wrapper"
              ref={autocompleteRefTo}
            >
              <AutocompleteList
                query={searchToValue}
                onPlaceSelect={onStopSelectTo}
                suggestionsWidth={448}
              />
            </div>
          )}
        </div>

      </JourneyStops>
      <JourneyDates className="journey-tab__date">
        <DatePickerInput
          selectedDate={props.selectedDate}
          selectedDeparture={props.selectedDeparture}
          onDateChange={props.setDate}
          setDeparture={props.setDeparture}
          timeError={props.timeError}
        />
      </JourneyDates>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  margin-bottom: 15px;
  ${media.desktop} {
    padding: 0 11px;
  }

  ${media.ld} {
    padding: 0;
  }

  ${props => props.theme.typography.fnTitle2};
  ${props => props.theme.typography.fnText};
`;

type JourneyStopsProps = {
  switchRotated?: boolean,
  swapDisabled?: boolean,
  disabledTo?: boolean,
  errorFromInput?: boolean,
  errorToInput?: boolean,
  isOpenToValue?: boolean;
}
const JourneyStops = styled.div<JourneyStopsProps>`
  min-width: 60%;
  margin-right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-grow: 1;

  .autocomplete {
    &-enter {
      opacity: 0;
      transition: 0;
      transform: scale(0.2);
      transform-origin: top;
    }

    &-enter-done {
      opacity: 1;
      transition: 0;
      transform: scale(1);
      transform-origin: top;
    }

  }

  .journey-stops {
    &__wrapper {
      position: relative;
      height: 100%;
      flex: auto;
      width: calc(50% - 11px);
    }

    &__stop-input-from {
      line-height: 24px;
      z-index: ${props => props.theme.zIndex.widgetInput};
      min-width: 0px;
      padding: 0;
      cursor: pointer;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 52%;

      ${media.custom(960)} {
        max-width: 60%;
      }

      &--placeholder {
        ${props => props.isOpenToValue
    && css`
          ::placeholder {
            color: ${props => props.theme.colorValues.primary};
            opacity: 1;
          }`
  }
      }
    }

    &__from,
    &__to {
      position: relative;
      flex: auto;
      display: flex;
      align-items: center;
      height: 100%;
      overflow: hidden;

      &:focus-within {
        &::before {
          border: 2px solid ${props => props.theme.colorValues.primary};
        }
        .journey-stops__half-circle {
          border: 2px solid ${props => props.theme.colorValues.primary};
        }
      }

      &::before {
        border-radius: 8px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        content: "";
        border: 1px solid ${props => props.theme.colorValues.lightestgrey};
      }
    }

    &__to {
      ${props => props.disabledTo
    ? css`
            pointer-events: none;
          `
    : null
  };

        &:focus-within {
          &::before,
          .journey-stops__half-circle {
            ${props => props.disabledTo
    ? css`
                border-width: 1px;
                border-color: ${props => props.theme.colorValues.lightestgrey};
              `
    : null
  };
        }
      }

      ${props => props.errorToInput
    ? css`
          &::before {
            border: 2px solid ${props => props.theme.colorValues.primary};
          }
          .journey-stops__half-circle {
            border: 2px solid ${props => props.theme.colorValues.primary};
          }
        `
    : null
  };
    }

    &__from {
      ${props => props.errorFromInput
    ? css`
          &::before {
            border: 2px solid ${props => props.theme.colorValues.primary};
          }
          .journey-stops__half-circle {
            border: 2px solid ${props => props.theme.colorValues.primary};
          }
        `
    : null
  };
    }

    &__half-circle {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 36px;
      height: 36px;
      border-radius: 100%;

      background-color: white;
      border: 1px solid ${props => props.theme.colorValues.lightestgrey};

      &--right {
        right: -22px;
      }
      
      &--left {
        left: -22px;
      }
    }

    &--up-down-icon {
      width: 14px;
      height: 18px;
      background: url(${STATIC_URLS.SVG}/widget/arrow-up-down.svg) no-repeat 50% 50%;
    }

    &__stop-icon-from {
      background: url(${STATIC_URLS.SVG}/widget/circle-icon.svg) no-repeat 50% 50%;
      margin: 0 15px;
      flex-shrink: 0;
      width: 12px;
      height: 12px;
      -moz-transform: translateY(-1px);
    }

    &__label {
      margin-right: 4px;
      color: ${props => props.theme.colorValues.lightgrey};

      &--to {
        ${props => props.isOpenToValue
    ? css`
              color: ${props => props.theme.colorValues.primary};
              display: none;
            `
    : null
  }
      }
    }

    &__stop-icon-to {
      background: url(${STATIC_URLS.SVG}/widget/square-icon.svg) no-repeat 50% 50%;
      margin: 0 15px 0 24px;
      flex-shrink: 0;
      width: 12px;
      height: 12px;
      -moz-transform: translateY(-1px);
    }

    &__switch-button {
      margin: 0 -14px;
      width: 36px;
      height: 36px;
      border-radius: 100%;
      position: relative;
      z-index: 10;
      opacity: ${props => props.swapDisabled ? '30%' : '100%'};
      cursor: ${props => props.swapDisabled ? 'not-allowed' : 'pointer'};
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.1s;
      transform: ${props => props.switchRotated ? 'rotate(270deg)' : 'rotate(90deg)'}
    }

    &__autocomplete-wrapper {
      position: absolute;
      top: 64px;
      z-index: 1;
    }
  }
`;

const JourneyDates = styled.div`
  flex: 0 1 327px;
  position: relative;
  height: 56px;
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  border-radius: 8px;
  ${props => props.theme.typography.fnTitle2};
  ${props => props.theme.typography.fnText};
`;

JourneyInputs.defaultProps = {
  disableSwap: false,
  isHeaderWidget: false,
}

export default withTranslation('search-widget')(JourneyInputs);