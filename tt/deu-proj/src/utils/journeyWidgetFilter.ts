import parse from 'date-fns/parse';
import isWithinInterval from 'date-fns/isWithinInterval';

import { PartsOfDay } from "../models/widget";
import { OuterResponse } from '../models/journey';

const PARTS_OF_DAY: {[type in PartsOfDay]: {
  from: string,
  to: string
}} = {
  [PartsOfDay.morning]: {
    from: '04:00',
    to: '11:59'
  },
  [PartsOfDay.lunchTime]: {
    from: '12:00',
    to: '16:59',
  },
  [PartsOfDay.evening]: {
    from: '17:00',
    to: '23:59'
  },
  [PartsOfDay.default]: {
    from: '00:00',
    to: '23:59'
  }
};

export type OptionsType = {
  stops: OuterResponse[],
  changeovers: string,
  price: string,
  dayPart: PartsOfDay,
}
const journeyWidgetFilter = (options: OptionsType): OuterResponse[] => {
  const {
    changeovers,
    dayPart,
    price,
    stops
  } = options;

  let filtered = stops ? stops.slice() : [];

  if (changeovers !== 'all') {
    const numChangeovers = parseInt(changeovers);
    filtered = filtered.filter((item) => item.changeovers === numChangeovers)
  }
  if (price !== 'all') {
    const [min, max] = price.split(',').map((item) => parseInt(item));
    
    filtered = filtered.filter((item) => {
      if (!item.main_price) return false;
      const priceInEuro = item.main_price / 100
      return (priceInEuro >= min && priceInEuro <= max);
    })
  }
  if (dayPart !== 'all') {
    filtered = filtered.filter((item) => {
      const depTime = new Date(item.dep_offset);
      const from = PARTS_OF_DAY[dayPart].from;
      const to = PARTS_OF_DAY[dayPart].to;

      const start = parse(from, 'HH:mm', depTime);
      const end = parse(to, 'HH:mm', depTime)

      return isWithinInterval(depTime, {
        start,
        end
      })
    })
  }
  return filtered
}

export default journeyWidgetFilter;