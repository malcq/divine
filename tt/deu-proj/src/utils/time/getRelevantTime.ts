import { getNewDate } from "./getNewDate";
import parse from 'date-fns/parse';
import isAfter from 'date-fns/isAfter';
import format from 'date-fns/format';

export const getRelevantTime = (opt: {
  date?: string,
  time?: string 
}) => {
  let timeParam = opt.time;
  let dateParam = opt.date;

  if (timeParam && dateParam) {
    const dateNow = getNewDate();
    const dateFromQuery = parse(`${dateParam} ${timeParam}`, 'dd.MM.yyyy HH:mm', dateNow);
    if (!isAfter(dateFromQuery, dateNow)) {
      timeParam = format(dateNow, 'HH:mm');
      dateParam = format(dateNow, 'dd.MM.yyyy');
    }
  }

  return {
    timeParam,
    dateParam
  }
}