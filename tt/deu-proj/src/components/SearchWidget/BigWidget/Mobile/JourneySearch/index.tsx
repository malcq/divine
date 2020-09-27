import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { WithTranslation } from 'next-i18next';

import StopInputs from '../../../Common/Mobile/StopInputs';
import { MobileSelect } from '../../../Common/Mobile/Selects';
import TimepickerButton from '../TimpickerButton';
import { withTranslation } from 'i18n';

import { personList, bahnCards } from '../../../options';
import { PersonItem, BahncardItem, SubmitJourneyData, HeaderWidgetErrors } from '@models/widget';
import { ButtonSizes, SearchButton } from '../../../../UI/Button';
import TimePickerMobile from '../../../../Modals/TimePickerMobile';
import { DepartureTypes, STATIC_URLS } from '@utils/constants';
import { DoneSelectionType } from '../../../../Modals/TimePickerMobile/models';
import { AutocompleteItem } from '@models/autocomplete';
import PlacesAutocompleteMobile from '../../../../Modals/PlacesAutocompleteMobile';

interface Props extends WithTranslation {
  timepickerTouched: boolean,
  selectedDate: Date,
  selectedPerson: PersonItem,
  selectedBahnCard: BahncardItem,
  selectedDeparture: DepartureTypes,
  selectedJourneyFrom?: AutocompleteItem,
  selectedJourneyTo?: AutocompleteItem,
  transport_type?: string,

  swapDisabled?: boolean,
  journeyToDisabled?: boolean,

  setPerson: (item: PersonItem) => void,
  setBahnCard: (item: BahncardItem) => void,
  setDateAndDeparture?: (departure: DepartureTypes, date: Date) => void,
  setJourneyFrom?: (item: AutocompleteItem) => void,
  setJourneyTo?: (item: AutocompleteItem) => void,
  swapJourneys?: () => void,
  onSearchJourney: (ev: SubmitJourneyData) => void,
  setWidgetErr?: (opt: HeaderWidgetErrors) => void,

  errors?: HeaderWidgetErrors,
}

type State = {
  timePickerModalOpen: boolean,
  autocompleteModalOpen: boolean,
  type?: 'to' | 'from';
}
class JourneySearch extends React.Component<Props, State> {
  private selectedAutocompleteType: string | null = null;

  state: State = {
    timePickerModalOpen: false,
    autocompleteModalOpen: false,
  }

  onTimepickerModalToggle = () => {
    this.setState(prevState => ({
      timePickerModalOpen: !prevState.timePickerModalOpen,
    }));
  }

  onAutocompleteToggle = (input?: 'to' | 'from') => {
    if (input === 'to' && this.props.journeyToDisabled) { return; }

    if (this.props.setWidgetErr) {
      this.props.setWidgetErr({
        from: false,
        to: false,
      })
    }
    this.setState((prevState) => {
      const newState = !prevState.autocompleteModalOpen;
      if (input) {
        this.selectedAutocompleteType = input;
      }
      return {
        autocompleteModalOpen: newState,
        type: input
      }
    })
  };

  onPersonChange = (item: PersonItem) => {
    this.props.setPerson(item);
  }

  onBahncardChange = (item: BahncardItem) => {
    this.props.setBahnCard(item);
  }

  onAutocompleteChange = (item: AutocompleteItem) => {
    if (this.selectedAutocompleteType === 'from') {
      this.props?.setJourneyFrom?.(item);
    } else if (this.selectedAutocompleteType === 'to') {
      this.props?.setJourneyTo?.(item);
    }

    this.selectedAutocompleteType = null;
    this.setState({
      autocompleteModalOpen: false,
    });
  }

  onTimpickerChange = (ev: DoneSelectionType) => {
    this.setState({
      timePickerModalOpen: false,
    });
    this.props?.setDateAndDeparture?.(
      ev.departure,
      ev.date,
    )
  }

  onJourneySearch = () => {
    const {
      selectedBahnCard,
      selectedDate,
      selectedDeparture,
      selectedJourneyFrom,
      selectedJourneyTo,
      selectedPerson,
      transport_type = '',
    } = this.props;

    if (!selectedJourneyFrom || !selectedJourneyTo) {
      if (this.props.setWidgetErr) {
        this.props.setWidgetErr({
          from: !selectedJourneyFrom,
          to: !selectedJourneyTo
      })
    }
    return;
  }

    this.props.onSearchJourney({
    bahncard: selectedBahnCard,
    date: selectedDate,
    fromStop: selectedJourneyFrom,
    toStop: selectedJourneyTo,
    persons: selectedPerson,
    departure: selectedDeparture,
    transport_type,
  });
  }

render() {
  const {
    selectedDate,
    selectedPerson,
    selectedBahnCard,
    selectedDeparture,
    timepickerTouched,
    t,
  } = this.props;

  const {
    timePickerModalOpen,
    autocompleteModalOpen,
  } = this.state;

  const timepickerButtonText = timepickerTouched
    ? format(selectedDate, 'dd.MM.yyyy HH:mm')
    : t(`time__now`);

  const isNotBus = !(this.props.transport_type === 'bus');
  return (
    <StyledContainer>
      <StopInputs
        onFromClick={() => this.onAutocompleteToggle('from')}
        onToClick={() => this.onAutocompleteToggle('to')}
        onSwapClick={() => this.props?.swapJourneys?.()}
        fromInputTitle={this.props?.selectedJourneyFrom?.title}
        toInputTitle={this.props?.selectedJourneyTo?.title}
        swapDisabled={this.props.swapDisabled}
        errors={this.props.errors}
      />
      <TimepickerButton
        title={timepickerButtonText}
        onClick={this.onTimepickerModalToggle}
        className="timepicker-button"
      />
      <div className="journey-search-form__selects">
        <MobileSelect
          onChange={this.onPersonChange}
          options={personList}
          value={selectedPerson}
          className="journey-search-form__select journey-search-form__select--person"
          selectClassName="journey-search-form__select-input journey-search-form__select-input--person"
        />

        {isNotBus && (<MobileSelect
          options={bahnCards}
          onChange={this.onBahncardChange}
          value={selectedBahnCard}
          className="journey-search-form__select journey-search-form__select--card"
          selectClassName="journey-search-form__select-input journey-search-form__select-input--card"
        />)
        }
      </div>

      <SearchButton
        fullWidth
        size={ButtonSizes.large}
        icon={<span className="button-icon" />}
        title={t(`button__search`)}
        onClick={this.onJourneySearch}
      />

      {/* Modals goes there */}
      <TimePickerMobile
        isOpen={timePickerModalOpen}
        onClose={this.onTimepickerModalToggle}
        onConfirm={this.onTimpickerChange}
        initialDate={selectedDate}
        initialDeparture={selectedDeparture}
      />

      <PlacesAutocompleteMobile
        isOpen={autocompleteModalOpen && this.state.type === 'to'}
        onClose={this.onAutocompleteToggle}
        onPlaceSelect={this.onAutocompleteChange}
      />
      <PlacesAutocompleteMobile
        isOpen={autocompleteModalOpen && this.state.type === 'from'}
        onClose={this.onAutocompleteToggle}
        onPlaceSelect={this.onAutocompleteChange}
      />
    </StyledContainer>
  );

}
}


const StyledContainer = styled.div`
  .timepicker-button {
    margin-top: 16px;
    margin-bottom: 14px;

    :active {
      background-color: ${props => props.theme.colorValues.aliceBlue};
    }
  }

  .button-icon {
    background: url(${STATIC_URLS.SVG}/widget/search-icon.svg) no-repeat 50% 50%;
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  .journey-search-form {
    &__selects {
      margin-bottom: 25px;
      & > div {
        margin-right: 4px;
        :active {
          background-color: ${props => props.theme.colorValues.aliceBlue};
          .journey-search-form__select-input {
           background-color: ${props => props.theme.colorValues.aliceBlue};
           width: 100%;
          }
        }
      }

      & > div:last-child {
        margin-right: 0;
      }
    }

    &__select {
      &--person {
        width: 97px;
      }

      &--card {
        width: 140px;
      }
    }

    &__select-input {
      width: calc(100% - 10px);
    }
  }
`;

export default withTranslation('search-widget')(JourneySearch);
