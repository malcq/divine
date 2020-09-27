import { css, DefaultTheme } from 'styled-components';

import {
  colors,
  fontFamily,
  fontWeight,
  zIndex,
} from './constants';

import media from '../../utils/media';

/*
* Default Theme
*/
export const themeDefault: DefaultTheme = {
  fontFamily: fontFamily.primary,
  fontColor: colors.black,
  bgColor: colors.white,
  typography: {
    fnMedium: css`
      font-family: ${fontFamily.primary};
      font-weight: ${fontWeight.medium};
      font-style: normal;
    `,
    fnRegular: css`
      font-family: ${fontFamily.primary};
      font-weight: ${fontWeight.regular};
      font-style: normal;
    `,
    fnText: css`
      font-family: ${fontFamily.primary};
      font-weight: ${fontWeight.text};
    `,
    fnTitle1: css`
      font-size: 24px;
      letter-spacing: -0.44px;
      line-height: 28px;

      ${media.desktop} {
        font-size: 34px;
        line-height: 36px;
      }
    `,

    /**
     * Be careful with fnTitle2
     * and don't add any media inside, 
     * becuase a lot of components depends on it
     * */
    fnTitle2: css`
      font-size: 16px;
      line-height: 24px;
    `,
    fnTitle3: css`
      font-size: 19px;
      letter-spacing: 0;
      line-height: 24px;
    `,
    fnBody: css`
      font-size: 14px;
      letter-spacing: 0px;
      line-height: 20px;
    `,
    fnCaption: css`
      font-size: 12px;
      letter-spacing: 0px;
      line-height: 16px;
    `,
    fnCaption2: css`
      font-size: 12px;
      letter-spacing: 0;
      line-height: 20px;
    `,
    fnCaption3: css`
      font-size: 14px;
      line-height: 24px;
    `,
    fnInputError: css`
      font-size: 11px;
      letter-spacing: 0px;
      line-height: 14px;
    `,
    fnLabel: css`
      font-size: 16px;
      letter-spacing: 0.75px;
      line-height: 16px;
    `,
    fnLabel2: css`
      font-size: 14px;
      letter-spacing: 0.75px;
      line-height: 16px;
    `,
    fnLabel3: css`
      font-size: 14px;
      line-height: 16px;
    `,
    fnLabel4: css`
    font-size: 14px;
    letter-spacing: 0.75px;
    line-height: 20px;
  `,
  },
  fontWeightValues: fontWeight,
  fontFamilyValues: fontFamily,
  colorValues: colors,
  /*
    List of global z-indexes to beware in the future.
    Please, don't add z-indexes for small components here,
    just try to keep them smaller than next values.
  */
  zIndex,
  gridValues: {
    maxContentWidth: 1079,
    sideDesktopPadding: 5,
  },
  stickShadow: css`
    box-shadow: 0 1px 0 0 rgba(0,0,0,0.06), 0 2px 6px 0 rgba(0,0,0,0.12);
  `
};
