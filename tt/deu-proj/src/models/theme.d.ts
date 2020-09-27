// import original module declarations
import { css, SimpleInterpolation } from 'styled-components'

interface ThemeColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  warning: string;
  success: string;
  zumthor: string;
  concrete: string;
  error: string;
  white: string;
  black: string;
  darkGrey: string;
  grey: string;
  lightgrey: string;
  lightergrey: string;
  lightestgrey: string;
  brightRed: string;
  defaultLine: string;
  aliceBlue: string;
  greyCircle: string;
  orange: string;
}

interface FontWeight {
  medium: number;
  regular: number;
  text: number;
}

interface FontFamily {
  primary: string;
  secondary: string;
}

interface ZIndexes {
  [name: string]: number;
}

interface GridValues {
  maxContentWidth: number;
  sideDesktopPadding: number;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamily: string,
    fontColor: string,
    bgColor: string,
    typography: {
      fnMedium: SimpleInterpolation,
      fnRegular: SimpleInterpolation,
      fnText: SimpleInterpolation,
      fnTitle1: SimpleInterpolation,
      fnTitle2: SimpleInterpolation,
      fnTitle3: SimpleInterpolation,
      fnBody: SimpleInterpolation,
      fnCaption: SimpleInterpolation,
      fnCaption2: SimpleInterpolation,
      fnCaption3: SimpleInterpolation,
      fnInputError: SimpleInterpolation,
      fnLabel: SimpleInterpolation,
      fnLabel2: SimpleInterpolation,
      fnLabel3: SimpleInterpolation,
      fnLabel4: SimpleInterpolation,
    },
    fontWeightValues: FontWeight,
    fontFamilyValues: FontFamily,
    zIndex: ZIndexes,
    colorValues: ThemeColors,
    gridValues: GridValues,
    stickShadow: SimpleInterpolation
  }
}