import { LineStopResponse } from "../models/linePageInfo";

type LineItemOptions = {
  time: string | null,
  isEdge: boolean,
  isCurrent: boolean,
  platformName: string,
};

function isBefore(
  i: number,
  arr: LineStopResponse[],
  isReverse: boolean
): boolean {
  let stopIndex = 0;
  if (arr[0].current) return false;

  arr.forEach((item, index) => {
    if (item.current) {
      return stopIndex = index;
    }
  });
  if (isReverse) {
    return i > stopIndex
  }
  return i < stopIndex
};


function lineItemPropMaker(
  arr: LineStopResponse[],
  ind: number,
  isReverse: boolean,
  item: LineStopResponse,
  firstPos: number,
  lastPos: number,
): LineItemOptions {
  const result: LineItemOptions = {
    isCurrent: false,
    isEdge: false,
    platformName: '',
    time: null,
  };

  result.isEdge = ind === firstPos || ind === lastPos;
  result.isCurrent = !result.isEdge && item.current;

  if (isReverse) {
    result.platformName = item.back_direction?.platform_name ?? '';

    result.time = isBefore(ind, arr, true) ? null
      : item.back_direction?.stop_arrival_date ?
        item.back_direction.stop_arrival_date : '-';
  } else {
    result.platformName = item.forward_direction?.platform_name ?? '-';

    result.time = isBefore(ind, arr, false) ? null
      : item.forward_direction?.stop_arrival_date;
  }

  return result;
};

export default lineItemPropMaker;