import { TransportsTypes } from "../../models/transports";
import { StopListResponse, StopInfoResponse, StopAdditionalInfo } from "../../models/stop";
import { ErrorObj } from "../../models/common";
import { FaqResponse } from "../../models/stopfaq";
import { faqContentBuilder } from "../../utils/faqContent";

export type StopInfoFilter = {
  transportSelected: null | TransportsTypes,
  lineSelected: null | string[],
}

export type StopInfoState = {
  stopInfoFilter: StopInfoFilter,
  stopList?: StopListResponse,
  faqContent: FaqResponse,
  error: ErrorObj,
  isLoading: boolean,
  stopInfo?: StopInfoResponse,
  additionalInfo?: StopAdditionalInfo
};

export type StopInfoActions =
  | {
    type: 'set_stop_page_info',
    stopInfo: StopInfoResponse,
    additionalInfo: StopAdditionalInfo,
  }
  | { type: 'set_transport', transport: TransportsTypes }
  | { type: 'set_line', line: string, provider: TransportsTypes }
  | { type: 'remove_line', line: string }
  | { type: 'set_default' }
  | { type: 'set_start_loading' }
  | { type: 'set_stop_loading' }
  | { type: 'set_error', message: string }
  | { type: 'set_faq', content: FaqResponse }
  | { type: 'set_api_faq', content: FaqResponse }
  | { type: 'set_stop-info_&_stop-list_faq', content: FaqResponse }
  | { type: 'reset_error' }
  | { type: 'set_stop_page_stop-list', stopList: StopListResponse }

export const stopInfoReducer = (
  state: StopInfoState,
  action: StopInfoActions
): StopInfoState => {
  switch (action.type) {
    case 'set_stop_page_stop-list':
      return {
        ...state,
        stopList: action.stopList,
      };
    case 'set_stop_page_info':
      return {
        ...state,
        stopInfo: action.stopInfo,
        additionalInfo: action.additionalInfo,
        stopInfoFilter: {
          lineSelected: null,
          transportSelected: null
        },
      };
    case 'set_faq':
      return {
        ...state,
        faqContent: action.content
      };
    case 'set_api_faq':
      return {
        ...state,
        faqContent: action.content 
      };
    case 'set_stop-info_&_stop-list_faq': 
      return {
        ...state,
        faqContent: [
          ...state.faqContent,
          ...action.content
        ]
      }
    case 'set_default':
      return {
        ...state,
        stopInfoFilter: {
          transportSelected: null,
          lineSelected: null
        }
      };
    case 'set_transport':
      return {
        ...state,
        stopInfoFilter: {
          ...state.stopInfoFilter,
          transportSelected: action.transport
        }
      };
    case 'set_line': {
      let newState;
      if (state.stopInfoFilter.lineSelected !== null) {
        newState = state.stopInfoFilter.lineSelected.concat(action.line)
      } else {
        newState = [action.line]
      }
      return {
        ...state,
        stopInfoFilter: {
          transportSelected: action.provider,
          lineSelected: newState
        }
      };
    };
    case 'remove_line':
      if (state.stopInfoFilter.lineSelected?.length === 1) {
        return {
          ...state,
          stopInfoFilter: {
            ...state.stopInfoFilter,
            lineSelected: null,
          }
        }
      }
      return {
        ...state,
        stopInfoFilter: {
          ...state.stopInfoFilter,
          lineSelected: state.stopInfoFilter.lineSelected?.filter((item) => item !== action.line) ?? null
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
    case 'set_error':
      return {
        ...state,
        error: {
          message: action.message,
          status: true,
        }
      };
    case 'reset_error':
      return {
        ...state,
        error: {
          status: false,
          message: '',
        }
      };
    default:
      return state;
  }
}

export type GetInitialStateOptions = {
  transportSelected?: TransportsTypes,
  lineSelected?: string[],
  stopList?: StopListResponse,
  stopInfo?: StopInfoResponse,
  faqContent: FaqResponse,
  additionalInfo?: StopAdditionalInfo,
  error: ErrorObj,
}

export function initStopInfoState(options: GetInitialStateOptions): StopInfoState {
  const {
    transportSelected = null,
    lineSelected = null,
    stopList,
    stopInfo,
    additionalInfo,
    error,
    faqContent
  } = options;

  return {
    error,
    isLoading: false,
    stopInfoFilter: {
      transportSelected,
      lineSelected
    },
    stopList,
    stopInfo,
    additionalInfo,
    faqContent
  }
}