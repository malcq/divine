import React, { createContext } from 'react';
import styled, { css } from 'styled-components';

import { IntermediateStopResponse, LinesColorInfo } from '../../../models/stop';

import { RelativeTime } from '../../../utils/time/getRelativeTime';
import getIsWhiteColor from '@utils/getIsWhiteColor';

import Stop from './Stops';

const MIN_MIDDLE_STOPS_TO_SHOW = 2;

type ColorValues = {
  mainColor: string,
  secondColor?: string,
}

function computeShouldShowStop(
  options: {
    expanded: boolean,
    index: number,
    length: number,
    minMiddleStopsToShow?: number,
  }
): boolean {
  const {
    expanded,
    index,
    length,
    minMiddleStopsToShow = MIN_MIDDLE_STOPS_TO_SHOW,
  } = options;

  if (expanded) { return true; }

  // show first one
  if (index === 0) { return true; }

  // show last one
  if (index === length - 1) { return true; }

  // show middle ones
  if (index <= minMiddleStopsToShow) { return true; }

  // show first expanded one
  if (index === minMiddleStopsToShow + 1) { return true; }

  return false;
}

type ContextProps = {
  isOpen: boolean,
  colorInfo: string,
}

export const IntermediateStopListContext = createContext<ContextProps>({
  isOpen: false,
  colorInfo: '#AE0000'
});
interface Props {
  intermediateStops: IntermediateStopResponse[],
  className: string,
  relativeTime: RelativeTime,
  expanded: boolean,
  lineColorInfo?: string,
  expandHandler: () => void,
}
const IntermediateStopList: React.FC<Props> = (props) => {
  const [routeLineHeight, setRouteLineHeight] = React.useState(0);
  const [shouldHeightRecalculate, setRecalculate] = React.useState(false);

  const hiddenStopLength = React.useMemo(() => {
    const stopsLength = props.intermediateStops.length;

    return stopsLength - MIN_MIDDLE_STOPS_TO_SHOW - 2 - 1; // 2 is for first and last and 1 for one expanded
  }, [props.intermediateStops]);

  const colorInfo = React.useMemo(() => {
    const result: ColorValues = {
      mainColor: '#AE0000',
    }

    if (props.lineColorInfo) {
      const colors = props.lineColorInfo.split(';');
      result.mainColor = getIsWhiteColor(colors[0]) ? result.mainColor : colors[0];

      if (colors[1]) {
        result.secondColor = colors[1]
      }
    }
    return result;
  }, [props.lineColorInfo]);

  const {
    intermediateStops,
    relativeTime,
    expandHandler,
    expanded
  } = props;

  const firstBarRef = React.useRef<HTMLDivElement>(null);
  const lastBarRef = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    if (firstBarRef.current && lastBarRef.current) {
      const firstElemHeight = firstBarRef.current.offsetHeight;
      const lastElemTop = lastBarRef.current.offsetTop;
      const height = lastElemTop - firstElemHeight + 5;

      setRouteLineHeight(height);
    }
  }, [shouldHeightRecalculate])

  const intermediateExpandHandler = () => {
    setRecalculate(state => !state)
    expandHandler();
  }
  return (
    <IntermediateStopListContext.Provider
      value={{
        isOpen: expanded,
        colorInfo: colorInfo.mainColor
      }}
    >
      <StyledContainer
        className={props.className}
        routeLineHeight={routeLineHeight}
        colorInfo={colorInfo}
      >
        <div className="route-line" />
        {intermediateStops.map((stop, index) => {
          const shouldShowStop = computeShouldShowStop({
            expanded,
            index,
            length: intermediateStops.length,
          });

          if (!shouldShowStop) { return null; }

          return (
            <Stop
              key={index}
              hiddenStopsLength={hiddenStopLength}
              expanded={expanded}
              stopLength={intermediateStops.length}
              index={index}
              stop={stop}
              onExpandClick={intermediateExpandHandler}
              isOpened={expanded}
              relativeTime={relativeTime}
              firstBarRef={firstBarRef}
              lastBarRef={lastBarRef}
            />
          )
        })}
      </StyledContainer>
    </IntermediateStopListContext.Provider>
  );
}

type StylesColors = {
  routeLineHeight: number,
  colorInfo: ColorValues,
};

const StyledContainer = styled.ul<StylesColors>`
  position: relative;

  .route-line {
    position: absolute;
    width: 4px;
    height: ${props => props.routeLineHeight}px;
    left: 14px;
    /* 32px height of the first bar icon */
    top: 32px;
    z-index: 1;

    ${props => {
    const { mainColor, secondColor } = props.colorInfo;
    if (secondColor) {
      return css`
          background: repeating-linear-gradient(to bottom, ${mainColor}, ${mainColor} 7px, ${secondColor} 7px, ${secondColor} 14px);
        `
    }
    return css`
      background: ${mainColor};
    `
  }}
  }
`;

export default IntermediateStopList;