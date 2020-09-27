import { AutocompleteItem } from "../../models/autocomplete";
import { HeaderWidgetErrors } from "../../models/widget";
import { DepartureTypes } from "../../utils/constants";
import { getNewDate } from "@utils/time/getNewDate";

export type HeaderWidgetState = {
  selectedJourneyFrom?: AutocompleteItem,
  selectedJourneyTo?: AutocompleteItem,
  timepickerTouched: boolean,
  selectedDate: Date,
  selectedDeparture: DepartureTypes,
  mobileSearchActivated: boolean,
  errors?: HeaderWidgetErrors,
  timeError?: boolean,
}

export type StopWidgetAction =
  | { type: 'set_journey_from', journey: AutocompleteItem }
  | { type: 'set_journey_to', journey: AutocompleteItem }
  | { type: 'set_mobile_search_activation', state: boolean }
  | { type: 'set_date', date: Date }
  | { type: 'set_departure', departure: DepartureTypes }
  | { type: 'set_date_and_departure', date: Date, departure: DepartureTypes }
  | { type: 'set_widget_errors', errors?: HeaderWidgetErrors }
  | { type: 'set_widget_info', widgetInfo: HeaderWidgetState }
  | { type: 'set_init_from', from: AutocompleteItem }
  | { type: 'set_widget_time_err' }
  | { type: 'clear_errors' }


type GetInitialStateOptions = {
  initialDate?: Date,
  initialJourneyFrom?: AutocompleteItem,
  initialJourneyTo?: AutocompleteItem,
  initialDeparture?: DepartureTypes,
}
export function getInitialState(options: GetInitialStateOptions): HeaderWidgetState {
  const {
    initialDate = getNewDate(),
    initialJourneyFrom,
    initialJourneyTo,
    initialDeparture = DepartureTypes.from,
  } = options;

  return {
    selectedDate: initialDate,
    mobileSearchActivated: false,
    timepickerTouched: false,
    selectedJourneyFrom: initialJourneyFrom,
    selectedJourneyTo: initialJourneyTo,
    selectedDeparture: initialDeparture,
    timeError: false
  }
}

export function reducer(
  state: HeaderWidgetState,
  action: StopWidgetAction,
): HeaderWidgetState {
  switch (action.type) {
    case 'set_date':
      return {
        ...state,
        selectedDate: action.date,
        timepickerTouched: true,
      }
    case 'set_mobile_search_activation':
      return {
        ...state,
        mobileSearchActivated: action.state,
      }
    case 'set_departure':
      return {
        ...state,
        selectedDeparture: action.departure,
      }
    case 'set_date_and_departure':
      return {
        ...state,
        selectedDate: action.date,
        selectedDeparture: action.departure,
        timepickerTouched: true,
      }
    case 'set_journey_from':
      return {
        ...state,
        selectedJourneyFrom: action.journey,
        errors: {
          ...state.errors,
          from: undefined
        },
      }
    case 'set_journey_to':
      return {
        ...state,
        selectedJourneyTo: action.journey,
        errors: {
          ...state.errors,
          to: undefined
        },
      }
    case 'set_widget_errors':
      return {
        ...state,
        errors: action.errors,
      }
    case 'set_widget_info':
      return {
        ...state,
        ...action.widgetInfo,
      }
    case 'set_init_from':
      return {
        ...state,
        selectedJourneyFrom: action.from
      };
    case 'set_widget_time_err':
      return {
        ...state,
        timeError: !state.timeError
      };
    case 'clear_errors':
      return {
        ...state,
        errors: undefined
      }
    default:
      return state;
  }
}