import {
  ThemeColors,
  FontFamily,
  FontWeight,
  ZIndexes
} from '../../models/theme';

/*
* Font variables
*/
export const fontFamily: FontFamily = {
  primary: `IBM Plex Sans, sans-serif`,
  secondary: `'IBM Plex Sans, sans-serif`,
};

export const fontWeight: FontWeight = {
  medium: 500,
  regular: 400,
  text: 450,
};

/*
* Color variables
*/
export const colors: ThemeColors = {
  primary: '#0081FF',
  primaryHover: '#0074E6',
  secondary: '#0172B1',
  success: '#43A047',
  warning: '#F4960A',
  zumthor: '#ECF3FF',
  concrete: '#f9f9f9',
  error: '#B91717',
  white: '#FFFFFF',
  black: '#000',
  brightRed: '#AE0000',
  defaultLine: 'rgba(135, 5, 5, 0)',
  darkGrey: 'rgba(0,0,0,0.9)',
  grey: 'rgba(0,0,0,0.86)',
  lightgrey: 'rgba(0,0,0,0.54)',
  lightergrey: 'rgba(0,0,0,0.38)',
  lightestgrey: 'rgba(0,0,0,0.12)',
  aliceBlue: '#F8F9FA',
  greyCircle: '#B2B2B2',
  orange: '#FFA500',
};

export const zIndex: ZIndexes = {
  header: 10100,
  autocompleteModal: 100000,
  baseModal: 10000,
  widgetInput: 1,
};
