import { TransportsTypes } from "./transports";
import { DayOfWeek } from "../utils/constants";
import { LinesColorInfo } from "./stop";

export enum LineContentTypes {
  pointsOfInterests = '2',
  operatingHours = '3',
  surroundingStreets = '4',
  departureIntervals = '6',
  travelDuration = '7',
};

type CommonParts = {
  transport_type: TransportsTypes,
  line: string,
  linesColorInfo?: LinesColorInfo[],
}

/**
 * Card №2  Points of interest along the line
 */
export type LinePointsOfInterests = {
  type: LineContentTypes.pointsOfInterests, // 3..
  city_name: string // Berlin..
  points_of_interest: Interests[],
  state_name: string,
} & CommonParts;

export type Interests = {
  stop_name: string, // Spandau Hbf
  points: string[],
  short_title: string,
};

/**
 * Card №3 Operating hours of line
 */
export type LineOperatingHours = {
  type: LineContentTypes.operatingHours,
  last_stop: string,
  city_name?: string,
  state_name?: string,
  short_title?: string,
  scheme?: string,
  schedule: LineShedule[],
} & CommonParts;

export type LineShedule = {
  title: DayOfWeek,
  hours: {
    from: string,
    to: string
  }
};

/**
 * Card №4 Surrounding streets along stops on this line
 */
export type LineSurroundingStreets = {
  type: LineContentTypes.surroundingStreets,
  city_name: string,
  nearby_streets: LineNearbyStreets[],
  state_name: string,
} & CommonParts;

export type LineNearbyStreets = {
  stop_name: string,
  short_title: string,
  streets: string[]
};

/**
 * Card №6 Departure time intervals of line
 */
export type LineDepartureInterval = {
  type: LineContentTypes.departureIntervals,
  departure_info: [Interval, Interval],
  linesColorInfo?: LinesColorInfo[],
  state_name: string,
  city_name: string,
} & CommonParts;

export type Interval = {
  stop_name: string,
  short_title: string,
  first_departure: string,
  interval: string,
}

/**
 * Card №7 First and last stops of line and duration of travel from
first to last stop
 */
export type TravelDuration = {
  type: LineContentTypes.travelDuration,
  city_name: string,
  stops_count: string,
  duration: Duration,
  scheme: string,
  first_stop: string,
  last_stop: string,
  intermediate_stop: string,
  state_name: string,
  additionalInfo: {
    short_title_first: string,
    city_name_first: string,
    short_title_middle: string,
    city_name_middle: string,
    short_title_last: string,
    city_name_last: string,
  }
} & CommonParts;

export type Duration = {
  hour: number,
  minute: number,
};


export type LineContentResponse =
  | LinePointsOfInterests
  | LineOperatingHours
  | LineSurroundingStreets
  | LineDepartureInterval
  | TravelDuration;

export type LineFaqResponse = LineContentResponse[];

// export const linefaqresp: LineFaqResponse = [
//   {
//     type: LineContentTypes.pointsOfInterests,
//     city_name: 'Berlin',
//     line: 'S4',
//     transport_type: TransportsTypes.sBahn,
//     state_name: 'Bayern'
//     points_of_interest: [
//       {
//         stop_name: 'Spandau str',
//         short_title: 'Spandau str',
//         points: ['Maurer Kirche', 'Maurer Kirche', 'Maurer Kirche']
//       },
//       {
//         stop_name: 'Fraherstrasse',
//         short_title: 'Spandau str',
//         points: ['Berlin hbf', 'Berlin hbf', 'Berlin hbf']
//       }
//     ]
//   },
//   {
//     type: LineContentTypes.operatingHours,
//     last_stop: 'Parkowstr',
//     line: 'S4',
//     transport_type: TransportsTypes.sBahn,
    
//     schedule: [{
//       title: DayOfWeek.mon,
//       hours: {
//         from: '00:25',
//         to: '22:30'
//       }
//     },
//     {
//       title: DayOfWeek.wed,
//       hours: {
//         from: '00:25',
//         to: '22:30'
//       }
//     }]
//   },
//   {
//     type: LineContentTypes.surroundingStreets,
//     city_name: 'Berlin',
//     line: 'S4',
//     nearby_streets: [
//       {
//         streets: ['Berlin hbf', 'Berlin hbf', 'Berlin hbf'],
//         stop_name: 'Parkow'
//       },
//       {
//         streets: ['Berlin hbf', 'Berlin hbf', 'Berlin hbf'],
//         stop_name: 'Parkow'
//       }
//     ],
//     transport_type: TransportsTypes.sBahn
//   },
//   {
//     type: LineContentTypes.departureIntervals,
//     departure_info: [
//       {
//         first_departure: '04:34',
//         interval: '30',
//         stop_name: 'Spandau'
//       },
//       {
//         first_departure: '06:34',
//         interval: '20',
//         stop_name: 'Pankow'
//       }
//     ],
//     line: 'S4',
//     transport_type: TransportsTypes.sBahn
//   },
//   {
//     type: LineContentTypes.travelDuration,
//     city_name: 'Berlin',
//     duration: {
//       hour: 1,
//       minute: 43,
//     },
//     line: 'S4',
//     stops_count: '12',
//     transport_type: TransportsTypes.sBahn,
//     scheme: 'VBB',
//     first_stop: 'Spandau',
//     last_stop: 'Parkow',
//     intermediate_stop: 'Berlin Hbf'
//   }
// ]
