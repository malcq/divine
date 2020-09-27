import { DeviceTypes } from "../utils/constants";

export interface DeviceInfo {
  type: DeviceTypes;
}

export interface ClientInfo {
  isBodyOverflowing: boolean;
}

export type RouterFactoryResult = {
  appUrl: string;
  browserUrl: string;
};