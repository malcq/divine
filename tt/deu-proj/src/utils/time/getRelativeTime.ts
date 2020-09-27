import { utcToZonedTime } from 'date-fns-tz';
import isAfter from 'date-fns/isAfter';
import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import addDays from 'date-fns/addDays';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { getNewDate } from './getNewDate';


type TimeZoneTypes =
  | 'Europe/Berlin'
  | 'Europe/Moscow'
  | 'Europe/Lisbon';


export type RelativeTime = {
  isAfter: boolean | 'N/A',
  time: number | 'N/A',
  fullTime: string | 'N/A',
  isAfterSelected?: boolean | 'N/A'
}
/**
 * 
 * @param date in 'Europe/Berlin' time zone
 * @param time date should be like 08:35
 * @param timeZone 
 */
export const getRelativeTime = (
  date: Date,
  time: string,
  timeZone: TimeZoneTypes,
  selectedDate?: Date,
): RelativeTime => {

  let dateForNearestTime = getNewDate()


  const dateInTimeZone = date;
  const dateSelected = selectedDate ?? date;
  const dayDiff = differenceInCalendarDays(dateSelected, dateInTimeZone);

  if (dayDiff > 0) dateForNearestTime = dateSelected;

  const timeDiff = (date: Date, inTimeZone: Date) => {
    const nearestTime = parse(time, 'HH:mm', date);
    const diff = differenceInMinutes(nearestTime, inTimeZone);
    return {
      diff,
      nearestTime
    }
  };

  const timeEndPoint = parse('23:00', 'HH:mm', getNewDate());
  const isAfterEvening = isAfter(dateSelected, timeEndPoint);

  let { diff, nearestTime } = timeDiff(dateForNearestTime, dateInTimeZone);

  if (isAfterEvening && diff < 0) {
    dateForNearestTime = addDays(dateForNearestTime, 1);
    const { diff: newDiff, nearestTime: newNearTime } = timeDiff(dateForNearestTime, dateInTimeZone);
    diff = newDiff;
    nearestTime = newNearTime;
  }

  const { diff: selectedDiff } = timeDiff(dateForNearestTime, dateSelected);

  if (!isValid(nearestTime)) {

    return {
      isAfter: 'N/A',
      time: 'N/A',
      fullTime: 'N/A',
      isAfterSelected: 'N/A'
    }
  }
  return {
    isAfter: diff >= 0,
    time: Math.abs(diff),
    fullTime: time,
    isAfterSelected: selectedDiff >= 0
  }
};