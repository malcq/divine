import { ContentTypes, ContentResponse } from '../../models/stopfaq';

import { Output } from './stopFaqCards/commonParts';
import { LineContentResponse, LineContentTypes } from '../../models/linefaq';
import {
  LinePointsOfInterestsAnswer,
  LinePointsOfInterestsTitle
} from './lineFaqCards/pointsOfInterest';
import {
  LineSurroundingStreetsAnswer,
  LineSurroundingStreetsTitle
} from './lineFaqCards/surroundingStreets';

import { NumberOfLinesAnswer, NumberOfLinesTitle } from './stopFaqCards/numberOfLines';
import { PointsOfInterestAnswer, PointsOfInterestTitle } from './stopFaqCards/pointsOfInterests';
import { SurroundingStreetAnswer, SurroundingStreetTitle } from './stopFaqCards/surroundingStreet';
import { AvailableLinesAnswer, AvailableLinesTitle } from './stopFaqCards/availableLines';
import { OperatingHoursTitle, OperatingHoursAnswer } from './commonCards/operatingHours';
import { DepIntervalsTitle, DepIntervalsAnswer } from './lineFaqCards/departureIntervals';
import { TravelDurationTitle, TravelDurationAnswer } from './lineFaqCards/travelDuration';

export function contentCards(type: 'stop', options: ContentResponse): Output;
export function contentCards(type: 'line', options: LineContentResponse): Output;
export function contentCards(type: any, options: any): Output {
  if (type === 'stop') {
    switch (options.type) {
      case ContentTypes.numberOfLines:
        return {
          title: <NumberOfLinesTitle {...options} />,
          answer: <NumberOfLinesAnswer {...options} />
        };
      case ContentTypes.pointsOfInterests:
        return {
          title: <PointsOfInterestTitle {...options} />,
          answer: <PointsOfInterestAnswer {...options} />
        };
      case ContentTypes.surroundingStreets:
        return {
          title: <SurroundingStreetTitle {...options} />,
          answer: <SurroundingStreetAnswer {...options} />
        };
      case ContentTypes.linesOperating:
        return {
          title: <AvailableLinesTitle {...options} />,
          answer: <AvailableLinesAnswer {...options} />
        };
      case ContentTypes.operatingHours:
        return {
          title: <OperatingHoursTitle {...options} />,
          answer: <OperatingHoursAnswer {...options} />
        };
      default:
        return {
          answer: null,
          title: null
        };
    };
  }
  switch (options.type) {
    case LineContentTypes.pointsOfInterests:
      return {
        title: <LinePointsOfInterestsTitle {...options} />,
        answer: <LinePointsOfInterestsAnswer {...options} />
      };
    case LineContentTypes.operatingHours:
      return {
        title: <OperatingHoursTitle {...options} />,
        answer: <OperatingHoursAnswer {...options} />
      };
    case LineContentTypes.surroundingStreets:
      return {
        title: <LineSurroundingStreetsTitle {...options} />,
        answer: <LineSurroundingStreetsAnswer {...options} />
      };
    case LineContentTypes.departureIntervals: 
      return {
        title: <DepIntervalsTitle {...options} />,
        answer: <DepIntervalsAnswer {...options} />
      };
    case LineContentTypes.travelDuration: 
      return {
        title: <TravelDurationTitle {...options} />,
        answer: <TravelDurationAnswer {...options} />
      }
    default:
      return {
        title: null,
        answer: null
      }
  }
};
