import { StopLandingPlace, StopLandingList, ServiceInfo, StopLandingResponse, AvailableScheme, ServiceCompanies } from "../../models/stopLanding";
import { ErrorObj } from "../../models/common";

export type StopLandingState = {
  stopList?: StopLandingList[],
  pagination?: ServiceInfo,
  placeInfo?: StopLandingPlace,
  availableSchemes?: AvailableScheme[],
  error: ErrorObj,
  isLoading: boolean,
  serviceCompanies?: ServiceCompanies[]
};

export type StopLandingActions =
  | {
    type: 'set_clear_info',
    pagination: ServiceInfo,
    placeInfo: StopLandingPlace,
    stopList: StopLandingList[],
    availableSchemes: AvailableScheme[],
    serviceCompanies?: ServiceCompanies[]
  }
  | {
    type: 'set_info',
    stopList: StopLandingList[],
    pagination: ServiceInfo,
    placeInfo: StopLandingPlace
  }
  | { type: 'set_default' }
  | { type: 'set_start_loading' }
  | { type: 'set_stop_loading' }
  | { type: 'set_error', message: string }
  | { type: 'reset_error' };

export const stopLandingReducer = (
  state: StopLandingState,
  action: StopLandingActions
): StopLandingState => {
  switch (action.type) {
    case 'set_clear_info':
      return {
        error: {
          message: '',
          status: false
        },
        isLoading: false,
        pagination: action.pagination,
        placeInfo: action.placeInfo,
        stopList: action.stopList,
        availableSchemes: action.availableSchemes,
        serviceCompanies: action.serviceCompanies
      }
    case 'set_info':
      return {
        ...state,
        stopList: state.stopList?.concat(action.stopList),
        placeInfo: action.placeInfo,
        pagination: action.pagination
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

export type InitialStopLandingState = {
  error: ErrorObj,
  response?: StopLandingResponse,
}
export const initStopLandingState = (options: InitialStopLandingState): StopLandingState => {
  return {
    error: options.error,
    isLoading: false,
    pagination: options.response?.pagination,
    placeInfo: options.response?.place_info,
    stopList: options.response?.stop_list,
    availableSchemes: options.response?.available_schemes,
    serviceCompanies: options.response?.service_companies
  }
}