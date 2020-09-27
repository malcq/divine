import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import StopSearch from './StopSearch';

import {
  SubmitStopData,
  PersonItem,
  BahncardItem,
  SubmitJourneyData,
  HeaderWidgetErrors,
} from '../../../../models/widget';

import { AutocompleteItem } from '../../../../models/autocomplete';
import { SearchWidgetSections, DepartureTypes } from '../../../../utils/constants';
import SearchTypeSelect from '../Desktop/SearchTypeSelect';


const JourneySearch = dynamic(
  () => import('./JourneySearch'),
  {
    loading: () => <JourneySearchLoading />
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

  setPerson: (ev: PersonItem) => void,
  setBahnCard: (ev: BahncardItem) => void,
  setDateAndDeparture?: (departure: DepartureTypes, date: Date) => void,
  setSearchTab?: (tab: SearchWidgetSections) => void,
  setStop?: (stop: AutocompleteItem) => void,
  swapJourneys?: () => void,
  setJourneyFrom?: (item: AutocompleteItem) => void,
  setJourneyTo?: (item: AutocompleteItem) => void,

  onStopSearch?: (ev: SubmitStopData) => void,
  onSearchJourney: (ev: SubmitJourneyData) => void,
};
const MobileSearchWidget: React.FC<Props> = (props) => {
  const {
    section
  } = props;

  const [hiddenSelect, setHiddenSelect] = React.useState(false);
  const [headerWidgetErr, setHeaderWidgetErr] = React.useState<HeaderWidgetErrors>({
    from: false,
    to: false
  });

  const setWidgetErr = (opt: HeaderWidgetErrors) => {
    setHeaderWidgetErr({
      from: opt.from,
      to: opt.to
    })
  };

  React.useEffect(() => {
    setWidgetErr({
      from: false,
      to: false,
    })
  }, [props.section])

  return (
    <StyledContainer>
      <div className="widget__control-buttons">
        <SearchTypeSelect
          selectedTab={props.section}
          onSetSearchType={props.setSearchTab}
        />
      </div>
      {section === SearchWidgetSections.stops &&
        <StopSearch
          onSearch={props.onStopSearch}
          selectedDate={props.selectedDate}
          selectedDeparture={props.selectedDeparture}
          selectedStop={props.selectedStop}
          setDateAndDeparture={props.setDateAndDeparture}
          setStop={props.setStop}
          timepickerTouched={props.timepickerTouched}
          setWidgetErr={setWidgetErr}
          errors={headerWidgetErr}
        />
      }
      {section === SearchWidgetSections.journey &&
        <JourneySearch
          selectedDate={props.selectedDate}
          timepickerTouched={props.timepickerTouched}
          selectedBahnCard={props.selectedBahnCard}
          selectedPerson={props.selectedPerson}
          setBahnCard={props.setBahnCard}
          setPerson={props.setPerson}
          selectedDeparture={props.selectedDeparture}
          setDateAndDeparture={props.setDateAndDeparture}
          swapJourneys={props.swapJourneys}
          setJourneyFrom={props.setJourneyFrom}
          setJourneyTo={props.setJourneyTo}
          selectedJourneyFrom={props.selectedJourneyFrom}
          selectedJourneyTo={props.selectedJourneyTo}
          onSearchJourney={props.onSearchJourney}
          setWidgetErr={setWidgetErr}
          errors={headerWidgetErr}
        />
      }
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: 0 8px;

  .widget {

    &__control-buttons {
      width: 100%;
      margin: 24px 0;
      position: relative;
      height: 42px;

      & > div {
        transform: translate(-50%, 0);
      }
    }
  }
`;

const JourneySearchLoading = styled.div`
  width: 100%;
  height: 319px;
`;

export default MobileSearchWidget;