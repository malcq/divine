import React from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from 'i18n';

import { AutocompleteItem } from '@models/autocomplete';
import { DepartureTypes, STATIC_URLS } from '@utils/constants';
import { SubmitStopData, PersonItem, BahncardItem, SubmitJourneyData } from '@models/widget';
import { SearchButton, ButtonSizes } from '../../../../UI/Button';
import JourneyInputs from '../../../Common/Desktop/JourneyInputs';
import Selects from '../../../Common/Desktop/Selects';

interface Props extends WithTranslation {
  timepickerTouched: boolean,
  selectedDate: Date,
  selectedPerson: PersonItem,
  selectedBahnCard: BahncardItem,
  selectedDeparture: DepartureTypes,
  selectedJourneyFrom?: AutocompleteItem,
  selectedJourneyTo?: AutocompleteItem,
  disableSwap?: boolean,
  disableJourneyTo?: boolean,
  transport_type?: string,

  setJourneyFrom?: (item: AutocompleteItem) => void,
  setJourneyTo?: (item: AutocompleteItem) => void,
  swapJourneys?: () => void,
  onSearchJourney: (ev: SubmitJourneyData) => void,
  onSearch?: (ev: SubmitStopData) => void,
  setDate: (departure: Date) => void,
  setDeparture: (departure: DepartureTypes) => void,
  setStop?: (stop: AutocompleteItem) => void,
  setPerson: (item: PersonItem) => void,
  setBahnCard: (item: BahncardItem) => void,
}

type State = {
}

class JourneySearch extends React.Component<Props, State> {
  onSubmitSearch = () => {
    const {
      selectedJourneyFrom,
      selectedJourneyTo,
      selectedPerson,
      transport_type = '',
    } = this.props;

    if (!selectedJourneyFrom || !selectedJourneyTo) { 
      if (!selectedJourneyFrom && this.fromInputRef) {
        return this.fromInputRef.current?.focus()
      } 
      if (!selectedJourneyTo && this.toInputRef) {
        return this.toInputRef.current?.focus()
      } 
      return;
    }
    this.props.onSearchJourney({
      bahncard: this.props.selectedBahnCard,
      date: this.props.selectedDate,
      departure: this.props.selectedDeparture,
      fromStop: selectedJourneyFrom,
      toStop: selectedJourneyTo,
      persons: this.props.selectedPerson,
      transport_type,
    });
  };
  fromInputRef = React.createRef<HTMLElement>();
  toInputRef = React.createRef<HTMLElement>();
  
  setRefs = (fromRef:React.RefObject<HTMLElement>, toRef: React.RefObject<HTMLElement>) => {
    this.fromInputRef = fromRef;
    this.toInputRef = toRef
  };

  render() {
    const {
      t,
      selectedJourneyFrom,
      selectedJourneyTo,
      swapJourneys,
      setJourneyFrom,
      setJourneyTo,
      selectedDate,
      selectedDeparture,
      selectedBahnCard,
      selectedPerson,
      setDate,
      setDeparture,
      setPerson,
      setBahnCard,
      disableSwap,
      disableJourneyTo,
      transport_type,
    } = this.props;

    const isNotBus = !(transport_type === 'bus');
    return (
      <StyledContainer>
        <JourneyInputs
          selectedJourneyFrom={selectedJourneyFrom}
          selectedJourneyTo={selectedJourneyTo}
          swapJourneys={swapJourneys}
          setJourneyFrom={setJourneyFrom}
          setJourneyTo={setJourneyTo}
          selectedDeparture={selectedDeparture}
          selectedDate={selectedDate}
          setDeparture={setDeparture}
          setDate={setDate}
          disableSwap={disableSwap}
          disableJourneyTo={disableJourneyTo}
          setRefs={this.setRefs}
        />

        <Selects
          showCardSelector={isNotBus}
          selectedBahnCard={selectedBahnCard}
          setBahnCard={setBahnCard}

          showPersonSelector
          selectedPerson={selectedPerson}
          setPerson={setPerson}
        />

        <SearchButton
          className="jorney-tab__button"
          size={ButtonSizes.large}
          icon={<span className="jorney-tab__button__icon" />}
          title={t(`button__search`)}
          onClick={this.onSubmitSearch}
        />
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  padding: 52px 22.5px 45px;

  .jorney-tab {
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

JourneyInputs.defaultProps = {
  disableSwap: false,
}

export default withTranslation('search-widget')(JourneySearch);
