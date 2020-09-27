import { AutocompleteItem } from '../../models/autocomplete';
import { DepartureTypes, ProviderTypes } from '../../utils/constants';
import {
  PersonItem,
  BahncardItem,
  TransportFilter,
  ButtonTransportTypes,
  ChangeoverItem,
  PriceItem,
  DepartureTimeItem,
  HeaderWidgetErrors,
} from '../../models/widget';

import {
  bahnCards,
  personList,
  changeoverOptions,
  departureOptions,
  pricesOptions,
} from '../../components/SearchWidget/options';
import { getNewDate } from '@utils/time/getNewDate';

export type HeaderWidgetState = {
  selectedJourneyFrom?: AutocompleteItem,
  selectedJourneyTo?: AutocompleteItem,
  timepickerTouched: boolean,
  selectedDate: Date,
  selectedDeparture: DepartureTypes,
  selectedChangeover: ChangeoverItem,
  selectedPrice: PriceItem,
  selectedDepartureTime: DepartureTimeItem,
  mobileSearchActivated: boolean,
  selectedPerson: PersonItem,
  selectedBahnCard: BahncardItem,
  transportFilter: ProviderTypes | null,
  errors?: HeaderWidgetErrors,
  timeError?: boolean,
  availableFilter: string[]
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
  | { type: 'set_transport_filter', filterBy: ProviderTypes | null}
  | { type: 'set_departure_time', departureTime: DepartureTimeItem }
  | { type: 'set_changeover', changeover: ChangeoverItem }
  | { type: 'set_price', price: PriceItem }
  | { type: 'set_widget_errors', errors?: HeaderWidgetErrors }
  | { type: 'set_widget_time_err' }
  | { type: 'set_available_filter_types', types: string[] }
  | { type: 'update_journey_from_&_to', journeyFrom: AutocompleteItem, journeyTo: AutocompleteItem };

type GetInitialStateOptions = {
  initialDate?: Date,
  initialJourneyFrom?: AutocompleteItem,
  initialJourneyTo?: AutocompleteItem,
  initialDeparture?: DepartureTypes,
  initialPerson?: PersonItem,
  initialCard?: BahncardItem,
  initialTransportFilter?: ProviderTypes,
  initialDepartureTime?: DepartureTimeItem,
  initialPrice?: PriceItem,
  initialChangeover?: ChangeoverItem,
  availableFilter?: string[],
};
export function getInitialState(
  options: GetInitialStateOptions = {}
): HeaderWidgetState {
  const {
    initialDate = getNewDate(),
    initialDeparture = DepartureTypes.from,
    initialJourneyFrom,
    initialJourneyTo,
    initialTransportFilter = null,
    initialPerson = personList[0],
    initialCard = bahnCards[0],
    initialChangeover = changeoverOptions[0],
    initialDepartureTime = departureOptions[0],
    initialPrice = pricesOptions[0],
    availableFilter = []
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
    transportFilter: initialTransportFilter,
    selectedChangeover: initialChangeover,
    selectedDepartureTime: initialDepartureTime,
    selectedPrice: initialPrice,
    availableFilter: availableFilter
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
    case 'update_journey_from_&_to':
      return {
        ...state,
        selectedJourneyFrom: action.journeyFrom,
        selectedJourneyTo: action.journeyTo,
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
    case 'set_transport_filter':
      return {
        ...state,
        transportFilter: state.transportFilter === action.filterBy ? null : action.filterBy,
      }
    case 'set_changeover':
      return {
        ...state,
        selectedChangeover: action.changeover,
      };
    case 'set_departure_time':
      return {
        ...state,
        selectedDepartureTime: action.departureTime,
      };
    case 'set_price':
      return {
        ...state,
        selectedPrice: action.price,
      };
    case 'set_widget_errors':
      return {
        ...state,
        errors: action.errors,
      };
    case 'set_widget_time_err':
      return {
        ...state,
        timeError: !state.timeError
      };
      case 'set_available_filter_types':
        return {
          ...state,
          availableFilter: action.types
        }
    default:
      return state;
  }
}
