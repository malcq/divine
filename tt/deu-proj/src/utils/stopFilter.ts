import { TransportInfo } from "../models/stop";
import { StopInfoFilter } from "../reducers/stopPage/stopInfoReducer";

export const stopFilter = (
  transportInfo: TransportInfo,
  filterInfo: StopInfoFilter,
): boolean => {
  const {
    lineSelected,
    transportSelected
  } = filterInfo;

  const {
    line,
    transport
  } = transportInfo;

  if (!transportSelected && !lineSelected) return true;
  
  if (transportSelected === transport && !lineSelected) return true;

  if (transportSelected === transport && lineSelected?.includes(line)) {
    return true
  };
  
  return false
};