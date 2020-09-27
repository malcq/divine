import React, { useRef, useEffect, useState } from 'react';
import styled, { ThemeContext, css } from 'styled-components';
import Header from './Header';
import Sticky from 'react-stickynode';

import { TransportsTypes } from '../../models/transports';
import { LineStops, LineResponse } from '../../models/linePageInfo';

import media from '../../utils/media';
import getIsWhiteColor from '@utils/getIsWhiteColor';

import StopListButtons from '../UI/StopListButtons';
import Line from './Line';
import { Ref } from './Line/LineItem';
import { ColorValues } from '@models/common';

type Props = {
  stopTitle: string,
  stopInfoResponse: LineResponse,
  isReverse: boolean,
  lineColor?: string,
  lineTextColor?: string,
  swapButtonDisabled?: boolean,
  titleAppUrl: string,
  titleBrowserUrl: string,
  onSwapClick: () => void,
  sightClickHandler: () => void,
}

const LinePage: React.FC<Props> = (props) => {
  const {
    stopInfoResponse,
    sightClickHandler
  } = props;
  const { colorValues } = React.useContext(ThemeContext);
  const [subtractedHeight, setSubtractedHeight] = useState(0);

  const boxRef = useRef<Ref>(null);
  // calculating subtracted height for the red route line 
  useEffect(() => {
    if (boxRef && boxRef.current) {
      const styles = getComputedStyle(boxRef.current).marginTop;
      const height = boxRef.current.offsetHeight;
      setSubtractedHeight(() => height + parseInt(styles));
    }
  }, []);

  const { baseColor, secondColor } = React.useMemo(() => {
    const result: ColorValues = {
      baseColor: colorValues.brightRed
    }
    if (props.lineColor) {
      const colors = props.lineColor.split(';');
      if (!getIsWhiteColor(colors[0])) {
        result.baseColor = colors[0];
      }
      result.secondColor = colors[1];
    }

    return result;
  }, [props.lineColor, colorValues])

  return (
    <StyledWrapper
      subtractedHeight={subtractedHeight}
      baseColor={baseColor}
      secondColor={secondColor}
    >
      <Sticky
        top={0}
        innerZ={15}
      >
        <div className="line-info__header">
          <Header
            lineColor={props.lineColor}
            lineTextColor={props.lineTextColor}
            line={stopInfoResponse.line}
            swapButtonDisabled={props.swapButtonDisabled}
            onSwapClick={props.onSwapClick}
            stopTitle={props.stopTitle}
            transport={stopInfoResponse.transfer_provider}
            titleAppUrl={props.titleAppUrl}
            titleBrowserUrl={props.titleBrowserUrl}
          />
          <StopListButtons
            buttonLineOff
            buttonDirectionOff
            buttonTicketOff
            className="line-info__nav-buttons"
            sightClickHandler={sightClickHandler}
          />
        </div>
      </Sticky>
      <div className="line-info__stops">
        <div className="line-info__col line-info__route">
          <div
            className="line-info__route-line"
          />
        </div>
        <div
          className="line-info__col line-info__stop-info">
          <Line
            stopListResponse={stopInfoResponse.line_stops}
            isReverse={props.isReverse}
            ref={boxRef}
            baseColor={baseColor}
          />
        </div>
      </div>
    </StyledWrapper>
  )
};

type StylesProps = {
  subtractedHeight: number,
  baseColor: string,
  secondColor?: string,
}

const StyledWrapper = styled.div<StylesProps>`

  .line-info {
    &__header {
      border-bottom: .5px solid rgba(0,0,0,0.10);
      box-shadow: 0px 2px 4px rgba(0,0,0,0.16);
      background-color: ${props => props.theme.colorValues.white};

      ${media.desktop} {
        display: none;
      }
    }

    &__nav-buttons {
      padding: 17px 0 16px 16px; 
    }

    &__stops {
      margin-top: 10px;
      display: flex;
      padding: 0 17px 0 16px;
    }

    &__col {

    }

    &__route {
      flex-basis: 32px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    &__route-line {
      position: relative;
      /* 
        top position is the sum 5px (circle top shift) + 
        17px (first line-item margin-top )
       */
      top: calc(5px + 17px);
      height: calc(100% - ${props => props.subtractedHeight}px);
      width: 4px;

      ${props => {
    if (props.secondColor) {
      return css`
            background: repeating-linear-gradient(to bottom, ${props.baseColor}, ${props.baseColor} 7px, ${props.secondColor} 7px, ${props.secondColor} 14px);
          `
    }
    return css` 
          background: ${props.baseColor};
        `
  }}
    }

    &__stop-info {
      flex-grow: 1;
      margin-left: 16px;
    }
  }
`;

export default LinePage; 