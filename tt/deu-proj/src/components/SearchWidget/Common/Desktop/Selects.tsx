import React from 'react';
import styled from 'styled-components';

import PillSelectDesktop from '../../../UI/PillSelectDesktop';

import {
  bahnCards,
  personList,
  changeoverOptions,
  departureOptions,
  pricesOptions,
} from '../../options';
import {
  PersonItem,
  BahncardItem,
  DepartureTimeItem,
  ChangeoverItem,
  PriceItem,
} from '../../../../models/widget';
  
interface SelectsProps {
  showPersonSelector?: boolean,
  selectedPerson?: PersonItem,
  setPerson?: (item: PersonItem) => void,
  
  showCardSelector?: boolean,
  selectedBahnCard?: BahncardItem,
  setBahnCard?: (item: BahncardItem) => void,

  showTimeRange?: boolean,
  selectedTimeRange?: DepartureTimeItem, 
  setTimeRange?: (timeRandge: DepartureTimeItem) => void,

  showChangeovers?: boolean,
  selectedChangeovers?: ChangeoverItem,
  setChangeovers?: (changeover: ChangeoverItem) => void,

  showPriceFilter?: boolean,
  selectedPrice?: PriceItem,
  setPrice?: (price: PriceItem) => void,
}
const Selects: React.FC<SelectsProps> = (props) => {
  const {
    showPersonSelector,
    selectedPerson,
    setPerson,
    
    showCardSelector,
    selectedBahnCard,
    setBahnCard,

    showChangeovers,
    selectedChangeovers,
    setChangeovers,

    showPriceFilter,
    selectedPrice,
    setPrice,

    showTimeRange,
    selectedTimeRange,
    setTimeRange,
  } = props;

  return (
    <StyledContainer>
      {showPersonSelector && selectedPerson && setPerson && (
        <PillSelectDesktop
          dropdownWidth={160}
          title={selectedPerson.title}
          values={personList}
          onSelect={setPerson}
        />
      )}
      {showCardSelector && selectedBahnCard && setBahnCard && (
        <PillSelectDesktop
          dropdownWidth={360}
          title={selectedBahnCard.title}
          values={bahnCards}
          onSelect={setBahnCard}
        />
      )}
      {showChangeovers && selectedChangeovers && setChangeovers && (
        <PillSelectDesktop
          dropdownWidth={200}
          popoverHeight={98}
          title={selectedChangeovers.title}
          values={changeoverOptions}
          onSelect={setChangeovers}
        />
      )}

      {showTimeRange && selectedTimeRange && setTimeRange && (
        <PillSelectDesktop
          dropdownWidth={160}
          popoverHeight={98}
          title={selectedTimeRange.title}
          values={departureOptions}
          onSelect={setTimeRange}
        />
      )}

      {showPriceFilter && selectedPrice && setPrice && (
        <PillSelectDesktop
          dropdownWidth={160}
          popoverHeight={160}
          title={selectedPrice.title}
          values={pricesOptions}
          onSelect={setPrice}
        />
      )}

    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  height: 32px;
  display: flex;

  & > div {
    margin-right: 4px;
  }

  & > div:last-child {
    margin-right: 0;
  }
`;

export default Selects