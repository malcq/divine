import React from 'react';
import styled from 'styled-components';

import JourneyInputs from '../../Common/Desktop/JourneyInputs';
import Selects from '../../Common/Desktop/Selects';

import { DepartureTypes } from '@utils/constants';
import media from '@utils/media';
import { AutocompleteItem } from '@models/autocomplete';
import {
  PersonItem,
  BahncardItem,
  DepartureTimeItem,
  ChangeoverItem,
  PriceItem,
  HeaderWidgetErrors,
} from '@models/widget';

type Props = {
  selectedDate: Date,
  setDate: (date: Date) => void,

  selectedDeparture: DepartureTypes,
  setDeparture: (departure: DepartureTypes) => void,

  selectedJourneyFrom?: AutocompleteItem,
  setJourneyFrom?: (journey: AutocompleteItem) => void,

  selectedJourneyTo?: AutocompleteItem,
  setJourneyTo?: (journey: AutocompleteItem) => void,

  showPersonSelector?: boolean,
  selectedPersons?: PersonItem,
  setPersons?: (person: PersonItem) => void,

  showCardSelector?: boolean,
  selectedCard?: BahncardItem,
  setCard?: (card: BahncardItem) => void,

  showTimeRange?: boolean,
  selectedTimeRange?: DepartureTimeItem, 
  setTimeRange?: (departure: DepartureTimeItem) => void,

  showChangeovers?: boolean,
  selectedChangeovers?: ChangeoverItem,
  setChangeovers?: (changeover: ChangeoverItem) => void,

  showPriceFilter?: boolean,
  selectedPrice?: PriceItem,
  setPrice?: (price: PriceItem) => void,

  swapDisabled?: boolean,
  swapJourneys?: () => void,

  errors?: HeaderWidgetErrors,
  timeError?: boolean,
}
const DesktopHeaderWidget: React.FC<Props> = (props) => {
  const {
    showPersonSelector,
    showCardSelector
  } = props;

  const showSelects: boolean = React.useMemo(() => {
    const shouldShowSelect =
      showPersonSelector ||
      showCardSelector;
    return !!shouldShowSelect;
  }, [showCardSelector, showPersonSelector]);

  return (
    <>
      <JourneyInputs
        selectedDate={props.selectedDate}
        setDate={props.setDate}

        selectedDeparture={props.selectedDeparture}
        setDeparture={props.setDeparture}

        selectedJourneyFrom={props.selectedJourneyFrom}
        setJourneyFrom={props.setJourneyFrom}

        selectedJourneyTo={props.selectedJourneyTo}
        setJourneyTo={props.setJourneyTo}

        swapJourneys={props.swapJourneys}
        disableSwap={props.swapDisabled}

        errors={props.errors}
        isHeaderWidget={true}

        timeError={props.timeError}
      />

      {showSelects && (
        <SelectContainer>
          <Selects
            showPersonSelector={props.showPersonSelector}
            selectedPerson={props.selectedPersons}
            setPerson={props.setPersons}
  
            showCardSelector={props.showCardSelector}
            selectedBahnCard={props.selectedCard}
            setBahnCard={props.setCard}
  
            showChangeovers={props.showChangeovers}
            selectedChangeovers={props.selectedChangeovers}
            setChangeovers={props.setChangeovers}
      
            showPriceFilter={props.showPriceFilter}
            selectedPrice={props.selectedPrice}
            setPrice={props.setPrice}
      
            showTimeRange={props.showTimeRange}
            selectedTimeRange={props.selectedTimeRange}
            setTimeRange={props.setTimeRange}
          />
        </SelectContainer>
      )}
    </>
  );
}

const SelectContainer = styled.div`
  margin-bottom: 12px;
  ${media.desktop} {
    padding-left: 11px;
  }
  ${media.ld} {
    padding-left: 0;
  }
`;

DesktopHeaderWidget.defaultProps = {
  swapDisabled: true,
}

export default DesktopHeaderWidget;