import { TransportsTypes } from "@models/transports";

export const FilterOrder: {[key in TransportsTypes]: number} = {
  [TransportsTypes.intercityExpress]: 1,
  [TransportsTypes.intercity]: 2,
  [TransportsTypes.euroCity]: 3,
  [TransportsTypes.regionTraffic]: 4,
  [TransportsTypes.sBahn]: 5,
  [TransportsTypes.uBahn]: 6,
  [TransportsTypes.tram]: 7,
  [TransportsTypes.bus]: 8,
  [TransportsTypes.taxi]: 9,
  [TransportsTypes.interRegio]: 10,
  [TransportsTypes.longDistanceTraffic]: 11,
  [TransportsTypes.nordWestBahn]: 12,
  [TransportsTypes.ferry]: 13,
  [TransportsTypes.walk]: 14,
}