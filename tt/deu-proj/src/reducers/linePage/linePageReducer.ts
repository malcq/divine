import { AutocompleteItem } from '../../models/autocomplete';
import { DepartureTypes } from '../../utils/constants';
import { getNewDate } from '@utils/time/getNewDate';

export type LineHeaderWidgetState = {
  isLoading: boolean,
  selectedJourneyFrom?: AutocompleteItem,
  selectedJourneyTo?: AutocompleteItem,
  selectedDate: Date,
  selectedDeparture: DepartureTypes,
}

export type LineWidgetAction =
  | { type: 'set_journey_to', journey: AutocompleteItem }
  | { type: 'set_journey_from', journey: AutocompleteItem }
  | { type: 'swap_journeys' }
  | { type: 'set_date', date: Date }
  | { type: 'set_departure', departure: DepartureTypes }
  | { type: 'set_start_loading' }
  | { type: 'set_stop_loading' };

type GetInitialStateOptions = {
  initialDate?: Date,
  initialJourneyFrom?: AutocompleteItem,
  initialJourneyTo?: AutocompleteItem,
  initialDeparture?: DepartureTypes,
};
export function getInitialState(
  options: GetInitialStateOptions = {}
): LineHeaderWidgetState {
  const {
    initialDate = getNewDate(),
    initialDeparture = DepartureTypes.from,
    initialJourneyFrom,
    initialJourneyTo,
  } = options;
  

  return {
    isLoading: false,
    selectedDate: initialDate,
    selectedJourneyFrom: initialJourneyFrom,
    selectedJourneyTo: initialJourneyTo,
    selectedDeparture: initialDeparture,
  };
}

export function reducer(
  state: LineHeaderWidgetState,
  action: LineWidgetAction,
): LineHeaderWidgetState {
  switch (action.type) {
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
    case 'set_departure':
      return {
        ...state,
        selectedDeparture: action.departure,
      };
    case 'set_date':
      return {
        ...state,
        selectedDate: action.date,
      };
    case 'set_start_loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'set_stop_loading':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
