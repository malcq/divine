import React from 'react';
import { useRouter, NextRouter } from 'next/router';

import HeaderWidget from '../HeaderWidget';

import {
  HeaderWidgetState,
  StopWidgetAction,
} from '../../../reducers/journeyPage/widgetReducer';
import {
  PersonItem,
  BahncardItem,
  DepartureTimeItem,
  ChangeoverItem,
  PriceItem,
} from '../../../models/widget';
import { AutocompleteItem, AutocompleteItemTypes } from '../../../models/autocomplete';

import { getStringFromQuery } from '../../../utils/getStringFromQuery';
import { DepartureTypes } from '../../../utils/constants';
import * as routerFactory from '../../../utils/router.util';
import { divideDateIntoTimeAndDate } from '../../../utils/time/divideDateIntoTimeAndDate';

function navigateToJourney(
  router: NextRouter,
  widgetState: HeaderWidgetState,
  direction: 'from' | 'to' | 'swap',
  journey?: AutocompleteItem,
): void {
  const { date, time } = divideDateIntoTimeAndDate(widgetState.selectedDate);
  let originType, destinType, originName, destinName;

  switch (direction) {
    case 'from':
      originType = journey?.place_type;
      destinType = widgetState.selectedJourneyTo?.place_type;
      originName = journey?.title;
      destinName = getStringFromQuery(router.query.destinname);
      break;
    case 'to':
      destinType = journey?.place_type;
      originType = widgetState.selectedJourneyFrom?.place_type;
      destinName = journey?.title;
      originName = getStringFromQuery(router.query.originname);
      break;
    case 'swap':
      destinName = getStringFromQuery(router.query.originname);
      originName = getStringFromQuery(router.query.destinname);
      destinType = widgetState.selectedJourneyFrom?.place_type;
      originType = widgetState.selectedJourneyTo?.place_type;
      break;
    default:
      break;
  }

  const { appUrl, browserUrl } = routerFactory.getJourneysUrl({
    date,
    time,
    destinName: destinName ?? '',
    originName: originName ?? '',
    changeovers: widgetState.selectedChangeover.value,
    direction: widgetState.selectedDeparture,
    price: widgetState.selectedPrice.value,
    person: widgetState.selectedPerson.value,
    passengersTrainCard: widgetState.selectedBahnCard.value,
    zeitFrom: widgetState.selectedDepartureTime.value,
    destinType: destinType ?? AutocompleteItemTypes.unknown,
    originType: originType ?? AutocompleteItemTypes.unknown
  })

  router.push(appUrl, browserUrl, { shallow: true });
}

/**
 * Because search widget has a lot of props,
 * we wrapping it in additional component
 */
type Props = {
  widgetState: HeaderWidgetState,
  isOuterJourneys: boolean,

  dispatch: (action: StopWidgetAction) => void,
}
const JourneyPageWidget: React.FC<Props> = (props) => {
  const router = useRouter();

  const {
    widgetState,
    dispatch,
    isOuterJourneys,
  } = props;

  function setJourneyFrom(journey: AutocompleteItem) {
    dispatch({
      type: 'set_journey_from',
      journey,
    });

    navigateToJourney(router, widgetState, 'from', journey);
  }

  function setJourneyTo(journey: AutocompleteItem) {
    dispatch({
      type: 'set_journey_to',
      journey,
    });
    navigateToJourney(router, widgetState, 'to', journey);
  }

  function setDeparture(departure: DepartureTypes) {
    dispatch({
      type: 'set_departure',
      departure,
    });
  }

  function setDateAndDeparture(departure: DepartureTypes, date: Date) {
    dispatch({
      type: 'set_date_and_departure',
      date,
      departure,
    })
  }

  function setDate(date: Date) {
    dispatch({
      type: 'set_date',
      date,
    })
  }

  function setPersons(person: PersonItem) {
    dispatch({
      type: 'set_persons',
      person,
    })
  }

  function setCard(card: BahncardItem) {
    dispatch({
      type: 'set_card',
      card,
    });
  }

  function onMobileSearchClick() {
    dispatch({
      type: 'set_mobile_search_activation',
      state: true,
    });
  }

  function swapJourneys() {
    dispatch({
      type: 'swap_journeys',
    });
    navigateToJourney(router, widgetState, 'swap');
  }

  function setDepartureTime(departureTime: DepartureTimeItem) {
    dispatch({
      type: 'set_departure_time',
      departureTime,
    });
  }

  function setChangeovers(changeover: ChangeoverItem) {
    dispatch({
      type: 'set_changeover',
      changeover,
    })
  }

  function setPrice(price: PriceItem) {
    dispatch({
      type: 'set_price',
      price,
    });
  }

  return (
    <HeaderWidget
      mobileSearchActivated={widgetState.mobileSearchActivated}
      timepickerTouched={widgetState.timepickerTouched}

      journeyTo={widgetState.selectedJourneyTo}
      setJourneyTo={setJourneyTo}

      journeyFrom={widgetState.selectedJourneyFrom}
      setJourneyFrom={setJourneyFrom}

      setDateAndDeparture={setDateAndDeparture}

      selectedDeparture={widgetState.selectedDeparture}
      setDeparture={setDeparture}

      selectedDate={widgetState.selectedDate}
      setDate={setDate}

      showPersonSelector={isOuterJourneys}
      selectedPersons={widgetState.selectedPerson}
      setPersons={setPersons}

      showCardSelector={isOuterJourneys}
      selectedCard={widgetState.selectedBahnCard}
      setCard={setCard}

      showChangeovers={isOuterJourneys}
      selectedChangeovers={widgetState.selectedChangeover}
      setChangeovers={setChangeovers}

      showPriceFilter={isOuterJourneys}
      selectedPrice={widgetState.selectedPrice}
      setPrice={setPrice}

      showTimeRange={isOuterJourneys}
      selectedTimeRange={widgetState.selectedDepartureTime}
      setTimeRange={setDepartureTime}

      swapDisabled={false}
      swapJourneys={swapJourneys}

      setMobileSearchActivated={onMobileSearchClick}

      errors={widgetState.errors}
      timeError={widgetState.timeError}
    />
  )
};

export default JourneyPageWidget;