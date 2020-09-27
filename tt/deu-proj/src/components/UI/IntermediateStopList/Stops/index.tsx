import React from 'react';

import { IntermediateStopResponse } from '../../../../models/stop';

import FirstStop from './FirstStop';
import MiddleStop from './MiddleStop';
import ExpandableStop from './ExpandableStop';
import LastStop from './LastStop';
import { RelativeTime } from '@utils/time/getRelativeTime';


enum EIntermediateStopType {
  first,
  last,
  middle,
  expandable,
};

function getStopType(options: {
  itemIndex: number,
  stopsLength: number,
  expanded?: boolean,
  middleStopsToShow?: number,
  hiddenStopsLength?: number,
}): EIntermediateStopType {
  const {
    itemIndex,
    stopsLength,
    expanded = false,
    middleStopsToShow = 2,
    hiddenStopsLength,
  } = options;

  if (itemIndex === 0) { return EIntermediateStopType.first; }

  if (itemIndex === stopsLength - 1) {
    return EIntermediateStopType.last;
  }

  if (expanded) {
    return EIntermediateStopType.middle;
  }

  if (itemIndex > middleStopsToShow && hiddenStopsLength && hiddenStopsLength > 0) {
    return EIntermediateStopType.expandable;
  }

  return EIntermediateStopType.middle;
}

type Props = {
  index: number,
  stopLength: number,
  expanded: boolean,
  stop: IntermediateStopResponse,
  hiddenStopsLength: number,
  isOpened: boolean,
  relativeTime: RelativeTime,
  firstBarRef: React.RefObject<HTMLDivElement>,
  lastBarRef: React.RefObject<HTMLLIElement>,
  onExpandClick: () => void,
};
const Stop: React.FC<Props> = (props) => {
  const {
    index,
    stopLength,
    expanded,
    stop,
    onExpandClick,
    hiddenStopsLength,
    relativeTime,
    firstBarRef,
    lastBarRef
  } = props;

  const stopType = getStopType({
    itemIndex: index,
    stopsLength: stopLength,
    expanded,
    hiddenStopsLength,
  });
  
  switch (stopType) {
    case EIntermediateStopType.first:
      return (
        <FirstStop
          stop={stop}
          relativeTime={relativeTime}
          ref={firstBarRef}
        />
      );
    case EIntermediateStopType.expandable:
      return (
        <ExpandableStop
          hiddenStopsLength={hiddenStopsLength}
          onExpandClick={onExpandClick}
          stop={stop}
        />
      );
    case EIntermediateStopType.last:
      return (
        <LastStop
          hiddenStopsLength={hiddenStopsLength}
          stop={stop}
          isOpened={props.isOpened}
          ref={lastBarRef}
        />
      );
    case EIntermediateStopType.middle:
    default:
      return (
        <MiddleStop
          stop={stop}
        />
      );
  }

  return null;
};

export default Stop;