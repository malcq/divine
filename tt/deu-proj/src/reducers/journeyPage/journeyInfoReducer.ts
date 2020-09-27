import { ErrorObj } from "../../models/common";
import { OuterResponse, InnerResponse } from "../../models/journey";
import { LinesColorInfo } from "@models/stop";

export type JourneyInfoState = {
  journeyList?: OuterResponse[] | InnerResponse[],
  error: ErrorObj,
  isLoading: boolean,
  type?: 'inner' | 'outer',
  linesColorInfo: LinesColorInfo[],
};

export type JourneyInfoActions =
  | { 
    type: 'set_journey_list', 
    journeyList: OuterResponse[] | InnerResponse[],
    repType: 'inner' | 'outer',
    linesColorInfo: LinesColorInfo[]
  }
  | { type: 'set_error', message: string }
  | { type: 'set_start_loading' }
  | { type: 'set_stop_loading' }
  | { type: 'set_type', respType: 'inner' | 'outer' }
  | { type: 'reset_error' };

export const journeyInfoReducer = (
  state: JourneyInfoState,
  action: JourneyInfoActions
): JourneyInfoState => {
  switch (action.type) {
    case 'set_type': 
      return {
        ...state,
        type: action.respType
      }
    case 'set_journey_list':
      return {
        ...state,
        journeyList: action.journeyList,
        type: action.repType,
        linesColorInfo: action.linesColorInfo
      };
    case 'set_error':
      return {
        ...state,
        error: {
          status: true,
          message: action.message
        }
      };
    case 'reset_error':
      return {
        ...state,
        error: {
          status: false,
          message: ''
        }
      };
    case 'set_start_loading':
      return {
        ...state,
        isLoading: true,
        error: {
          message: '',
          status: false
        }
      };
    case 'set_stop_loading':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export type GetInitialJourneyOptions = {
  journeyList?: OuterResponse[] | InnerResponse[],
  error: ErrorObj,
  linesColorInfo: LinesColorInfo[],
  type?: 'inner' | 'outer'
}

export const initJourneyInfoState = (options: GetInitialJourneyOptions): JourneyInfoState => {
  const {
    error,
    journeyList,
    type,
    linesColorInfo
  } = options;

  return {
    error,
    journeyList,
    isLoading: false,
    type,
    linesColorInfo
  }
};