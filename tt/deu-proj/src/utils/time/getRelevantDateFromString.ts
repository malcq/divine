import { getNewDate } from "./getNewDate"
import parse from 'date-fns/parse';


export const getRelevantDateFromString = (options: {
  date?: string,
  time?: string
}): Date => {

  if (options.date && options.time) {
    return parse(`${options.date} ${options.time}`, 'dd.MM.yyyy HH:mm', getNewDate());
  }
  if (options.date) {
    return parse(options.date, 'dd.MM.yyyy', getNewDate())
  }
  if (options.time) {
    return parse(options.time, 'HH:mm', getNewDate());
  }
  return getNewDate()
};
