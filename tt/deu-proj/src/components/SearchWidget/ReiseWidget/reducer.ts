import {
  bahnCards,
  personList,
} from '../options';
import { AutocompleteItem } from '../../../models/autocomplete';
import { DepartureTypes } from '../../../utils/constants';
import {
  PersonItem,
  BahncardItem,
  ButtonTransportTypes,
  DepartureTimeItem,
  ChangeoverItem,
  PriceItem,
} from '../../../models/widget';
import { getNewDate } from '@utils/time/getNewDate';

export type HeaderWidgetState = {
  selectedJourneyFrom?: AutocompleteItem,
  selectedJourneyTo?: AutocompleteItem,
  timepickerTouched: boolean,
  selectedDate: Date,
  selectedDeparture: DepartureTypes,
  mobileSearchActivated: boolean,
  selectedPerson: PersonItem,
  selectedBahnCard: BahncardItem,
}

export type StopWidgetAction =
  | { type: 'set_mobile_search_activation', state: boolean }
  | { type: 'set_journey_to', journey: AutocompleteItem }
  | { type: 'set_journey_from', journey: AutocompleteItem }
  | { type: 'swap_journeys' }
  | { type: 'set_date_and_departure', date: Date, departure: DepartureTypes }
  | { type: 'set_date', date: Date }
  | { type: 'set_departure', departure: DepartureTypes }
  | { type: 'set_persons', person: PersonItem }
  | { type: 'set_card', card: BahncardItem }
  | { type: 'set_transport_filter', filterBy: ButtonTransportTypes }
  | { type: 'set_departure_time', departureTime: DepartureTimeItem }
  | { type: 'set_changeover', changeover: ChangeoverItem }
  | { type: 'set_price', price: PriceItem };

type GetInitialStateOptions = {
  initialDate?: Date,
  initialJourneyFrom?: AutocompleteItem,
  initialJourneyTo?: AutocompleteItem,
  initialDeparture?: DepartureTypes,
  initialPerson?: PersonItem,
  initialCard?: BahncardItem,
};
export function getInitialState(
  options: GetInitialStateOptions = {}
): HeaderWidgetState {
  const {
    initialDate = getNewDate(),
    initialDeparture = DepartureTypes.from,
    initialJourneyFrom,
    initialJourneyTo,
    initialPerson = personList[0],
    initialCard = bahnCards[0],
  } = options;
  

  return {
    mobileSearchActivated: false,
    selectedDate: initialDate,
    timepickerTouched: false,
    selectedJourneyFrom: initialJourneyFrom,
    selectedJourneyTo: initialJourneyTo,
    selectedDeparture: initialDeparture,
    selectedBahnCard: initialCard,
    selectedPerson: initialPerson,
  };
}

export function reducer(
  state: HeaderWidgetState,
  action: StopWidgetAction,
): HeaderWidgetState {
  switch (action.type) {
    case 'set_mobile_search_activation':
      return {
        ...state,
        mobileSearchActivated: action.state,
      }
    case 'swap_journeys':
      return {
        ...state,
        selectedJourneyFrom: state.selectedJourneyTo,
        selectedJourneyTo: state.selectedJourneyFrom,
      }
    case 'set_journey_from':
      return {
        ...state,
        selectedJourneyFrom: action.journey,
      };
    case 'set_journey_to':
      return {
        ...state,
        selectedJourneyTo: action.journey,
      };
    case 'set_date_and_departure':
      return {
        ...state,
        selectedDate: action.date,
        selectedDeparture: action.departure,
        timepickerTouched: true,
      };
    case 'set_departure':
      return {
        ...state,
        selectedDeparture: action.departure,
      };
    case 'set_date':
      return {
        ...state,
        selectedDate: action.date,
        timepickerTouched: true,
      }
    case 'set_card':
      return {
        ...state,
        selectedBahnCard: action.card,
      };
    case 'set_persons':
      return {
        ...state,
        selectedPerson: action.person,
      };
    default:
      return state;
  }
}
