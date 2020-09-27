import { getStringFromQuery } from "@utils/getStringFromQuery";
import isEqual from 'date-fns/isEqual';
import isAfter from 'date-fns/isAfter';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import { getNewDate } from "./getNewDate";

export function getTimeValidStatus(date: Date): boolean;
export function getTimeValidStatus(date: string | string[], time?: string | string[]): boolean;
export function getTimeValidStatus(date: Date | string | string[], time?: string | string[]): boolean {
  const compareDates = (date: Date, nowDate: Date) => isAfter(date, nowDate) || isEqual(date, nowDate);
  const strNewDate = format(getNewDate(), 'dd.MM.yyyy HH:mm');
  const nowDate = parse(strNewDate, 'dd.MM.yyyy HH:mm', getNewDate());

  if (date && typeof date !== 'string' && !Array.isArray(date)) {
    return compareDates(date, nowDate);
  }

  const dateStr = getStringFromQuery(date);
  const timeStr = getStringFromQuery(time);

  let dateFromDays: Date;
  let dateFromDaysAndTime: Date;

  if (timeStr && dateStr) {
    dateFromDays = parse(dateStr, 'dd.MM.yyyy', getNewDate());
    dateFromDaysAndTime = parse(timeStr, 'HH:mm', dateFromDays);
    return compareDates(dateFromDaysAndTime, nowDate)
  }

  if (!timeStr && dateStr) {
    const strTime = format(getNewDate(), 'HH:mm');
    dateFromDays = parse(`${dateStr} ${strTime}`, 'dd.MM.yyyy HH:mm', getNewDate());
    return compareDates(dateFromDays, nowDate);
  };

  if (!dateStr && timeStr) {
    dateFromDaysAndTime = parse(timeStr, 'HH:mm', getNewDate());
    return compareDates(dateFromDaysAndTime, nowDate);
  };

  return true;
};