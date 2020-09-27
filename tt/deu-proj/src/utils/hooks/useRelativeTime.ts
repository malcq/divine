import {useEffect, useState} from 'react';
import { getRelativeTime } from '@utils/time/getRelativeTime';
import { getNewDate } from '@utils/time/getNewDate';

type Options = {
  nowDate: Date,
  nearestTime: string,
  selectedDate?: Date
}

export const useRelativeTime = (opt: Options) => {
  const {fullTime, isAfter, time} = getRelativeTime(opt.nowDate, opt.nearestTime, 'Europe/Berlin', opt.selectedDate);
  const [isAfterState, setIsAfter] = useState(isAfter);
  const [fullTimeState, setFullTime] = useState(fullTime);
  const [timeState, setTime] = useState(time);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const {fullTime, isAfter, time} = getRelativeTime(getNewDate(), opt.nearestTime, 'Europe/Berlin', opt.selectedDate);
      setIsAfter(() => isAfter);
      setFullTime(() => fullTime);
      setTime(() => time);
    }, 60000)
    return () => {
      clearInterval(intervalId);
    }
  }, [])

  return {
    isAfter: isAfterState,
    fullTime: fullTimeState,
    time: timeState
  }
}