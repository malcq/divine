export type ErrorObj = {
  status: boolean,
  message: string,
};

export interface ParsedUrlQuery { 
  [key: string]: string | string[];
}

export type ColorValues = {
  baseColor: string,
  secondColor?: string,
}