import format from 'date-fns/format';

/**
 * Function will divide Date into timecode and date string
 * eg. new Date() might be divided like: { time: 03: 33, date: 04.03.2020 }
 * @param date Date
 */
export function divideDateIntoTimeAndDate(date: Date): { time: string, date: string } {
  const time = format(date, 'HH:mm');
  const dateStr = format(date, 'dd.MM.yyyy');

  return {
    date: dateStr,
    time,
  }
}