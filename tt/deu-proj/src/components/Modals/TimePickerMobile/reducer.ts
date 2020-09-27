import { DepartureTypes } from "../../../utils/constants";

import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import { getNewDate } from "@utils/time/getNewDate";

export type State = {
  departure: DepartureTypes,
  selectedDate: string,
  selectedTime: string,
}

export type ReducerAction =
  | { type: 'set_departure', departure: DepartureTypes }
  | { type: 'set_date', date: string }
  | { type: 'set_time', time: string }
  | { type: 'set_now_time' }
  | { type: 'set_tomorrow_time' }
  | { type: 'set_day_after_tomorrow_time' };

export type getInitialStateOptions = {
  date?: Date,
  departure?: DepartureTypes,
}
export function getInitialState(options?: getInitialStateOptions): State {
  const {
    date = getNewDate(),
    departure = DepartureTypes.from,
  } = options ?? {};

  const selectedDate: string = format(date, 'yyyy-MM-dd');
  const selectedTime: string = format(date, 'HH:mm');

  return {
    departure,
    selectedDate,
    selectedTime,
  }
};

export const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case 'set_departure':
      return {
        ...state,
        departure: action.departure,
      };
    case 'set_date':
      return {
        ...state,
        selectedDate: action.date,
      }
    case 'set_time':
      return {
        ...state,
        selectedTime: action.time,
      }
    case 'set_now_time':
      const nowDate = getNewDate()

      return {
        ...state,
        selectedDate: format(nowDate, 'yyyy-MM-dd'),
        selectedTime: format(nowDate, 'HH:mm'),
      }
    case 'set_tomorrow_time':
      
      const tomorrowDate = addDays(getNewDate(), 1);

      return {
        ...state,
        selectedDate: format(tomorrowDate, 'yyyy-MM-dd'),
        selectedTime: format(tomorrowDate, 'HH:mm'),
      }
    case 'set_day_after_tomorrow_time':
      const newDate = addDays(getNewDate(), 2);

      return {
        ...state,
        selectedDate: format(newDate, 'yyyy-MM-dd'),
        selectedTime: format(newDate, 'HH:mm'),
      }
    default:
      return state;
  }
};
