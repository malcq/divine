import { TransportsTypes } from "./transports";
import { DayOfWeek } from "../utils/constants";
import { LinesColorInfo } from "./stop";

export interface FaqItem {
  question: string,
  answer: string, // html code
}

export enum ContentTypes {
  numberOfLines = '3',
  pointsOfInterests = '4',
  surroundingStreets = '5',
  linesOperating = '6',
  operatingHours = '7',
}

export type LinesPerTransport = {
  lines: string[],
  transport_type: TransportsTypes,
  scheme?: string,
};
// Card 3 number of lines per transport

export type NumberOfLines = {
  type: ContentTypes.numberOfLines,
  stop_name: string,
  city_name: string,
  transport_lines: LinesPerTransport[]
};


// Card 4 Points of interests

export type PointsOfInterests = {
  type: ContentTypes.pointsOfInterests,
  stop_name: string,
  city_name: string,
  points_of_interest: string[]
};

// Card 5 Surrounding streets

export type SurroundingStreet = {
  type: ContentTypes.surroundingStreets,
  stop_name: string,
  city_name: string,
  streets: string[],
};

// Card 6 Lines operating

export type LinesOperating = {
  type: ContentTypes.linesOperating,
  stop_name: string,
  city_name: string,
  transport_lines: LinesPerTransport[],
}

// Card 7 Operating hours

export type OperatingHours = {
  type: ContentTypes.operatingHours,
  transport_type: TransportsTypes,
  line: string,
  scheme?: string,
  last_stop: string,
  schedule: DaysAndHours[],
  linesColorInfo?: LinesColorInfo[],
  state_name?: string,
  city_name?: string,
  short_title?: string,
}

export type DaysAndHours = {
  title: DayOfWeek,
  hours: {
    from: string,
    to: string
  }
};

export type ContentResponse =
  | NumberOfLines
  | PointsOfInterests
  | SurroundingStreet
  | LinesOperating
  | OperatingHours;

export type FaqResponse = ContentResponse[];

export const faqResp: FaqResponse = [
  {
    type: ContentTypes.numberOfLines,
    city_name: 'Berlin',
    stop_name: 'Parkow',
    transport_lines: [
      {
        lines: ['S1'],
        transport_type: TransportsTypes.sBahn
      },
      {
        lines: ['U1', 'U8', 'U6', 'U5', 'U3'],
        transport_type: TransportsTypes.uBahn
      },
      {
        lines: ['61', '68', '154'],
        transport_type: TransportsTypes.bus
      }
    ]
  },
  {
    type: ContentTypes.pointsOfInterests,
    city_name: 'Berlin',
    stop_name: 'Parkow',
    points_of_interest: ['Maurer Kirche', 'Maurer Kirche', 'Maurer Kirche']
  },
  {
    type: ContentTypes.surroundingStreets,
    city_name: 'Berlin',
    stop_name: 'Parkow',
    streets: ['Spandau str', 'Fraushtrase str']
  },
  {
    type: ContentTypes.linesOperating,
    city_name: 'Berlin',
    stop_name: 'Parkow',
    transport_lines: [
      {

        lines: ['S8', 'S3', 'S2'],
        transport_type: TransportsTypes.sBahn,
        scheme: 'VBB'
      },
      {
        lines: ['U8', 'U3', 'U2'],
        transport_type: TransportsTypes.uBahn,
        scheme: 'VBB'
      },
      {
        lines: ['68', '163', '42'],
        transport_type: TransportsTypes.bus,
        scheme: 'VBB'
      }
    ]
  },
  {
    type: ContentTypes.operatingHours,

    last_stop: 'Spandau S+U',
    line: 'S2',
    scheme: 'VBB',
    transport_type: TransportsTypes.sBahn,
    schedule: [
      {
        title: DayOfWeek.mon,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.tue,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.wed,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.thu,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.fri,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.sat,
        hours: {
          from: '00:15',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.sun,
        hours: {
          from: '00:15',
          to: '23:55'
        }
      },
    ],
  },
  {
    type: ContentTypes.operatingHours,

    last_stop: 'Spandau S+U',
    line: 'RB 10(18511)',
    scheme: 'VBB',
    transport_type: TransportsTypes.regionTraffic,
    schedule: [
      {
        title: DayOfWeek.mon,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.tue,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.wed,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.thu,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.fri,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.sat,
        hours: {
          from: '00:15',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.sun,
        hours: {
          from: '00:15',
          to: '23:55'
        }
      },
    ],
  },
  {
    type: ContentTypes.operatingHours,

    last_stop: 'Spandau S+U',
    line: 'U7',
    scheme: 'VBB',
    transport_type: TransportsTypes.uBahn,
    schedule: [
      {
        title: DayOfWeek.mon,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.tue,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.wed,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.thu,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.fri,
        hours: {
          from: '00:05',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.sat,
        hours: {
          from: '00:15',
          to: '23:55'
        }
      },
      {
        title: DayOfWeek.sun,
        hours: {
          from: '00:15',
          to: '23:55'
        }
      },
    ],
  }
]







