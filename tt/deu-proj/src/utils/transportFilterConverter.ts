import { TransportFilter } from '../models/widget';

export default (filter: TransportFilter): string[] => {
  return Object.entries(filter)
    .reduce((acc: string[], item) => {
      if (item[1]) {
        return [
          ...acc,
          item[0]
        ]
      }
      return acc
    }, []);
} 