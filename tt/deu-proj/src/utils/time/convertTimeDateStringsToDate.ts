import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { getNewDate } from './getNewDate';

export function convertTimeDateStringsToDate(date?: string, time?: string): Date {

  if (!time && date) {
    const curTime = format(getNewDate(), 'HH:mm');

    return parse(`${date} ${curTime}`, 'dd.MM.yyyy HH:mm', getNewDate())
  }

  if (time && !date) {
    return parse(time, 'HH:mm', getNewDate());
  }

  if (time && date) {
    return parse(`${date} ${time}`, 'dd.MM.yyyy HH:mm', getNewDate())
  }

  return getNewDate();
}