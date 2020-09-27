import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import { SubmitStopData, PersonItem, BahncardItem, SubmitJourneyData } from '../../../../models/widget';
import { AutocompleteItem } from '../../../../models/autocomplete';
import { SearchWidgetSections, DepartureTypes } from '../../../../utils/constants';
import SearchTypeSelect from './SearchTypeSelect';


const JourneySearch = dynamic(
  () => import('./JourneyInputs'),
  {
    loading: () => <JoyrneySearchLoading />
  }
  );
const StopSearch = dynamic(
  () => import('./StopSearch'),
  {
    loading: () => <JoyrneySearchLoading />
  }
  );

type Props = {
  section: SearchWidgetSections,
  selectedDate: Date,
  selectedPerson: PersonItem,
  selectedBahnCard: BahncardItem,
  selectedStop?: AutocompleteItem,
  selectedDeparture: DepartureTypes,
  timepickerTouched: boolean,
  selectedJourneyFrom?: AutocompleteItem,
  selectedJourneyTo?: AutocompleteItem,

  setPerson: (item: PersonItem) => void,
  setBahnCard: (item: BahncardItem) => void,
  setDate: (departure: Date) => void,
  setDeparture: (departure: DepartureTypes) => void,
  setSearchTab?: (tab: SearchWidgetSections) => void,
  setStop?: (stop: AutocompleteItem) => void,
  swapJourneys?: () => void,
  setJourneyFrom?: (item: AutocompleteItem) => void,
  setJourneyTo?: (item: AutocompleteItem) => void,

  onStopSearch?: (ev: SubmitStopData) => void,
  onSearchJourney: (ev: SubmitJourneyData) => void,
}

const DesktopSearchWidget: React.FC<Props> = (props) => {
  const {
    section
  } = props;

  return (
    <StyledContainer>
      <SearchTypeSelect
        selectedTab={props.section}
        onSetSearchType={props.setSearchTab}
      />

      {section === SearchWidgetSections.stops &&
        <StopSearch
          onSearch={props.onStopSearch}
          selectedDate={props.selectedDate}
          selectedDeparture={props.selectedDeparture}
          selectedStop={props.selectedStop}
          setStop={props.setStop}
          setDate={props.setDate}
          setDeparture={props.setDeparture}
        />
      }

      {section === SearchWidgetSections.journey &&
        <JourneySearch
          timepickerTouched={props.timepickerTouched}
          selectedPerson={props.selectedPerson}
          swapJourneys={props.swapJourneys}
          setJourneyFrom={props.setJourneyFrom}
          setJourneyTo={props.setJourneyTo}
          selectedJourneyFrom={props.selectedJourneyFrom}
          selectedJourneyTo={props.selectedJourneyTo}
          onSearchJourney={props.onSearchJourney}
          setDate={props.setDate}
          setDeparture={props.setDeparture}
          selectedDeparture={props.selectedDeparture}
          selectedDate={props.selectedDate}
          setStop={props.setStop}
          selectedBahnCard={props.selectedBahnCard}
          setPerson={props.setPerson}
          setBahnCard={props.setBahnCard}
        />
      }
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  border-radius: 8px;
`;

const JoyrneySearchLoading = styled.div`
  height: 200px;
  width: 100;
`;

export default DesktopSearchWidget;