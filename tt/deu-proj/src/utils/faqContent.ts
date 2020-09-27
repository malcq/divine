import differenceInMinutes from 'date-fns/differenceInMinutes'
import parse from 'date-fns/parse';
import addDays from 'date-fns/addDays'

import {
  FaqResponse,
  NumberOfLines,
  LinesOperating,
  ContentTypes,
  LinesPerTransport,
  ContentResponse
} from "../models/stopfaq";
import { StopListResponse, StopInfoResponse } from "../models/stop";
import { LineResponse } from "../models/linePageInfo";
import {
  LineFaqResponse,
  TravelDuration,
  LineContentTypes,
  LineContentResponse
} from "../models/linefaq";
import { getNewDate } from './time/getNewDate';

/**
 *numberOfLines = '3',
  pointsOfInterests = '4',
  surroundingStreets = '5',
  linesOperating = '6',
  operatingHours = '7',
 */
const STOP_CONTENT_ORDER: { [key in ContentTypes]: number } = {
  [ContentTypes.numberOfLines]: 1,        // 3 
  [ContentTypes.pointsOfInterests]: 2,    // 4
  [ContentTypes.surroundingStreets]: 3,   // 5
  [ContentTypes.linesOperating]: 4,       // 6
  [ContentTypes.operatingHours]: 5,       // 7
};

/**
 *pointsOfInterests = '2',
  operatingHours = '3',
  surroundingStreets = '4',
  departureIntervals = '6',
  travelDuration = '7',
 */
const LINE_CONTENT_ORDER: { [key in LineContentTypes]: number } = {
  [LineContentTypes.pointsOfInterests]: 1,  // 2
  [LineContentTypes.operatingHours]: 2,     // 3
  [LineContentTypes.surroundingStreets]: 3, // 4
  [LineContentTypes.departureIntervals]: 4, // 6
  [LineContentTypes.travelDuration]: 5,     // 7
}

function sortStopContent(a: ContentResponse, b: ContentResponse) {
  if (STOP_CONTENT_ORDER[a.type] > STOP_CONTENT_ORDER[b.type]) return 1;
  if (STOP_CONTENT_ORDER[a.type] < STOP_CONTENT_ORDER[b.type]) return -1;
  return 0;
};

function sortLineContent(a: LineContentResponse, b: LineContentResponse) {
  if (LINE_CONTENT_ORDER[a.type] > LINE_CONTENT_ORDER[b.type]) return 1;
  if (LINE_CONTENT_ORDER[a.type] < LINE_CONTENT_ORDER[b.type]) return -1;
  return 0;
};


type Options = {
  apiFaq?: FaqResponse,
};
export function faqContentBuilder(
  options: Options
): FaqResponse {
  const {
    apiFaq
  } = options;

  const result: FaqResponse = []
  if (apiFaq) {
    result.push(...apiFaq);
  }
  return result.sort(sortStopContent);
}

export const lineFaqBuilder = (
  lineInfo: LineResponse,
  faqResponse?: LineFaqResponse,
): LineFaqResponse => {
  const firstStop = lineInfo.line_stops.slice()
    .sort((a, b) => a.forward_direction.position - b.forward_direction.position)[0];
  const lastStop = lineInfo.line_stops.slice()
    .sort((a, b) => b.forward_direction.position - a.forward_direction.position)[0];

  const middleNum = Math.floor(lineInfo.line_stops.length / 2);
  const intermediate_stop = lineInfo.line_stops[middleNum].stop_name;
  const intermediate_city = lineInfo.line_stops[middleNum].city_name;
  const intermediate_title = lineInfo.line_stops[middleNum].short_title;

  const duration = ((dep: string, arr: string) => {
    const dateForDep = getNewDate();
    let dateForArr = dateForDep;

    const diffInMin = (depTime: Date, arrTime: Date) => {
      const departure = parse(dep, 'HH:mm', dateForDep);
      const arrival = parse(arr, 'HH:mm', dateForArr);
      return differenceInMinutes(arrival, departure);
    }

    let diffMin = diffInMin(dateForDep, dateForArr);
    if (diffMin < 0) {
      dateForArr = addDays(dateForArr, 1);
      diffMin = diffInMin(dateForDep, dateForArr);
    }
    const hour = Math.floor((diffMin / 60));
    const minute = hour > 0 ? (diffMin - hour * 60) : diffMin;

    return {
      hour,
      minute
    }
  })(
    firstStop.forward_direction.stop_arrival_date,
    lastStop.forward_direction.stop_arrival_date
  )

  const travelDuration: TravelDuration = {
    type: LineContentTypes.travelDuration,
    city_name: lineInfo.departure_info.city_name,
    first_stop: firstStop.stop_name,
    last_stop: lastStop.stop_name,
    intermediate_stop,
    line: lineInfo.line,
    scheme: lineInfo.scheme.title,
    transport_type: lineInfo.transfer_provider,
    stops_count: lineInfo.line_stops.length.toString(),
    duration,
    additionalInfo: {
      city_name_first: firstStop.city_name ?? '',
      city_name_middle: intermediate_city ?? '',
      city_name_last: lastStop.city_name ?? '',
      short_title_first: firstStop.short_title,
      short_title_middle: intermediate_title,
      short_title_last: lastStop.short_title
    },
    state_name: lineInfo.departure_info.state_name
  };
  let result: LineFaqResponse = [travelDuration];
  if (faqResponse && faqResponse.length > 0) {
    result.push(...faqResponse);
  }
  return result.sort(sortLineContent);
}
