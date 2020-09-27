import differenceInMinutes from 'date-fns/differenceInMinutes';

export const getDurationTime = (minTime: string, maxTime: string): {
  hour: number,
  minutes: number,
} => {
  const rightTime = new Date(minTime);
  const leftTime = new Date(maxTime);

  const timeDiff = differenceInMinutes(leftTime, rightTime);

  const minutes = timeDiff % 60;
  const hour = (timeDiff - minutes) / 60;

  return {
    hour,
    minutes
  }
};