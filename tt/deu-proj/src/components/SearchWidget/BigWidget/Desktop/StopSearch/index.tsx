import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { WithTranslation } from 'next-i18next';

import { ButtonSizes, SearchButton } from '../../../../UI/Button';

import { withTranslation } from 'i18n';

import { AutocompleteItem } from '@models/autocomplete';
import { DepartureTypes, STATIC_URLS } from '@utils/constants';
import { SubmitStopData } from '@models/widget';

import DatePickerInput from '../../../Common/Desktop/DatePickerInput';

import { useAutocompleteBehaviour } from '../../../hooks';


const AutocompleteList = dynamic(() => import('../../../../UI/autocompleteDesktop/AutocompleteList'))

interface Props extends WithTranslation {
  selectedDate: Date,
  selectedStop?: AutocompleteItem,
  selectedDeparture: DepartureTypes,

  onSearch?: (ev: SubmitStopData) => void,
  setDate: (departure: Date) => void,
  setDeparture: (departure: DepartureTypes) => void,
  setStop?: (stop: AutocompleteItem) => void,
}
const StopSearch: React.FC<Props> = (props) => {
  const autocompleteRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const {
    t,
    selectedStop,
  } = props;

  const {
    autocompleteOpened,
    searchValue,
    setAutocompleteOpened,
    setSearchValue,
  } = useAutocompleteBehaviour(
    autocompleteRef,
    searchInputRef,
    {
      initialSearchValue: selectedStop?.title ?? '',
    },
    selectedStop,
  )

  const onChangeStopInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { target: { value } } = e;
    setSearchValue(value)
  }

  function onInputFocus(event: React.FocusEvent<HTMLInputElement>) {
    setAutocompleteOpened(true);
    event.target.select();
  }

  const onStopSelect = (item: AutocompleteItem) => {
    props?.setStop?.(item);
    setAutocompleteOpened(false)
  }

  const onSubmitSearch = () => {
    if (!props.onSearch) { return; }

    if (
      !props.selectedDate ||
      !props.selectedDeparture ||
      !props.selectedStop
    ) { 
      if (!props.selectedStop && searchInputRef.current) {
        return searchInputRef.current.focus()
      }
      return; 
    }
    props.onSearch({
      date: props.selectedDate,
      departure: props.selectedDeparture,
      stop: props.selectedStop,
    })
  }

  return (
    <StyledContainer>
      <InputStopContainer from={t(`destination__from`)}>
        <div
          className="stop-tab__input stop-tab__stop-wrapper-input"
        >
          <span className="stop-tab__stop-icon" />
          <input
            className="stop-tab__stop-input"
            placeholder={t(`destination__stop-placeholder`)}
            onChange={onChangeStopInput}
            value={searchValue}
            onFocus={onInputFocus}
            ref={searchInputRef}
          />
          {autocompleteOpened && (
            <div
              className="stop-tab__autocomplete-wrapper"
              ref={autocompleteRef}>
              <AutocompleteList
                query={searchValue}
                onPlaceSelect={onStopSelect}
                suggestionsWidth={564}
                filterAutocompleteType="stops-only"
              />
            </div>
          )
          }
        </div>
        <div className="stop-tab__input stop-tab__date-input">
          <DatePickerInput
            selectedDate={props.selectedDate}
            onDateChange={props.setDate}
            selectedDeparture={props.selectedDeparture}
            setDeparture={props.setDeparture}
          />
        </div>
      </InputStopContainer>
      <SearchButton
        className="stop-tab__button"
        size={ButtonSizes.large}
        icon={<span className="stop-tab__button__icon" />}
        title={t(`button__search`)}
        onClick={onSubmitSearch}
      />
    </StyledContainer>
  )
};

type StopInputProps = {
  from?: () => string,
}
const InputStopContainer = styled.div<StopInputProps>`
  width: 100%;
  display: flex;

  .stop-tab {
    &__stop-wrapper-input {
      margin-right: 20px;
      flex: auto;
      display: flex;
      align-items: center;
      min-width: 60%;
      flex-shrink: 0;
    }

    &__stop-icon {
      margin: 0 15px 0 14px;
      flex-shrink: 0;
      background: url(${STATIC_URLS.SVG}/widget/circle-icon.svg) no-repeat 50% 50%;
      width: 12px;
      height: 12px;
      -moz-transform: translateY(-1px);
    }

    &__input {
      position: relative;
      height: 56px;
      border: 1px solid ${props => props.theme.colorValues.lightestgrey};
      border-radius: 8px;
      ${props => props.theme.typography.fnTitle2};
      ${props => props.theme.typography.fnText};

      &.stop-tab__stop-wrapper-input:focus-within {
        border: 2px solid ${props => props.theme.colorValues.primary};
      }
    }

    &__stop-input {
      flex-grow: 1;
      padding: 16px 10px 16px 0;
      margin-right: 20px;
      cursor: pointer;
      background: transparent;
    }

    &__autocomplete-wrapper {
      z-index: 2;
      position: absolute;
      bottom: -8px;
      transform: translateY(100%);
    }

    &__date-input {
      flex: 0 1 327px;
    }
  }
`;

const StyledContainer = styled.div`
  padding: 52px 22.5px 92px;
  display: flex;

  .stop-tab {
    &__button {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
      width: 280px;

      &__icon {
        background: url(${STATIC_URLS.SVG}/widget/search-icon.svg) no-repeat 50% 50%;
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
    }
  }
`;


export default withTranslation('search-widget')(StopSearch);
