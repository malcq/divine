import React from 'react';
import styled, { css, ThemeContext } from 'styled-components';

import getIsWhiteColor from '@utils/getIsWhiteColor';
import { hexToRGB } from '@utils/ToHexConverter';
import media from '@utils/media';

import { LinesColorInfo } from '@models/stop';
import { copyFileSync } from 'fs';

type ColorsInfo = {
  bgColor: string,
  secondBgColor?: string,
  borderColor: string,
  textColor: string,
};

type Props = {
  line: string,
  className?: string,
  isBig?: boolean,
  colorInfo?: LinesColorInfo[],
  styles?: React.CSSProperties
};

const MAX_VALUE = 186;

const checkColorIsLight = (stringColor: string): boolean => {
  let R: number = 0, G: number = 0, B: number = 0;
  if (stringColor.includes('rgb')) {
    const match = stringColor.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    if (match) {
      R = parseInt(match[1].toString(), 16);
      G = parseInt(match[2].toString(), 16);
      B = parseInt(match[3].toString(), 16);
    }
  } else {
    const { R_HEX, G_HEX, B_HEX } = hexToRGB(stringColor);
    R = R_HEX;
    G = G_HEX;
    B = B_HEX;
  }

  return (R * 0.299 + G * 0.587 + B * 0.114) > MAX_VALUE;
}


const LineLabel: React.FC<Props> = (props) => {
  const { line, colorInfo } = props;
  const { colorValues } = React.useContext(ThemeContext);
  const title: string = React.useMemo(() => line.toUpperCase(), [line]);

  const lineColorOptions: ColorsInfo = React.useMemo(() => {
    
    const result: ColorsInfo = {
      bgColor: colorValues.defaultLine,
      borderColor: colorValues.lightestgrey,
      textColor: colorValues.grey
    };

    if (colorInfo) {
      const info = colorInfo.find((item: LinesColorInfo) => item.line === line);

      if (info && info.text_color && info.color) {
        const isWhite = getIsWhiteColor(info.color);
        result.bgColor = info.color;
        result.borderColor = isWhite ? colorValues.lightestgrey : info.color;

        const bgColors = info.color.split(';')

        if (bgColors.length > 1) {
          result.bgColor = bgColors[0];
          result.secondBgColor = bgColors[1];
          result.textColor = info.text_color;
        }
        
        const bgIsLight = checkColorIsLight(result.bgColor);
        const textColorIsLight = checkColorIsLight(info.text_color);

        if (!result.secondBgColor && (bgIsLight || textColorIsLight)) {
          result.textColor = colorValues.grey;
        }

        if (
          !bgIsLight && textColorIsLight
        ) {
          result.textColor = info.text_color;
        }

        if (!bgIsLight && !textColorIsLight) {
          result.textColor = colorValues.white;
        }
      }
    }
    return result;
  }, [line, colorInfo]);

  return (
    <StyledContainer
      isBig={props.isBig}
      className={props.className}
      lineColors={lineColorOptions}
      style={props.styles}
    >
      {title}
    </StyledContainer>
  );
};

type StyledContainerProps = {
  isBig?: boolean,
  lineColors: ColorsInfo
}
const StyledContainer = styled.div<StyledContainerProps>`
  border: 1px solid ${props => props.lineColors.borderColor};

  ${props => {
    if (props.lineColors.secondBgColor) {
      const mainBg = props.lineColors.bgColor;
      const secondBg = props.lineColors.secondBgColor;

      return css`
        background: linear-gradient(to right bottom, ${mainBg} 50%, ${secondBg} 50%);
        border-top-color: ${mainBg};
        border-left-color: ${mainBg};
        border-bottom-color: ${secondBg};
        border-right-color: ${secondBg};
      `
    }
      return css`
        background-color: ${props.lineColors.bgColor};
      `
  }}

  color: ${props => props.lineColors.textColor};
  ${props => props.theme.typography.fnBody};
  ${props => props.theme.typography.fnMedium};
  letter-spacing: 0.5px;
  height: 20px;
  padding: 0 6.5px;
  text-align: center;
  border-radius: 4px;
  user-select: none;
  flex-shrink: 0;
  white-space: nowrap;
  
  ${props => props.isBig && css`
    
    ${media.desktop} {
      height: 28px;
      font-size: 18px;
      letter-spacing: 0.64px;
      line-height: 28px;
    }
  `}
`;

export default LineLabel;