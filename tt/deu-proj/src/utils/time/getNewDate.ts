import { utcToZonedTime } from 'date-fns-tz';

export const getNewDate = () => {
  const date = new Date().toISOString();
  return utcToZonedTime(date, 'Europe/Berlin');
};