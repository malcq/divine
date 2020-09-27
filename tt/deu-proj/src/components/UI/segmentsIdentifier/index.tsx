import React from 'react';
import styled from 'styled-components';

import { TransportsTypes } from '../../../models/transports';
import { SegmentResponse } from '../../../models/journey';

import WalkTitle from '../WalkSegment/segmetTitle';
import WalkSegment from '../WalkSegment';

type Options = {
  isFirstWalk: boolean,
  isLastWalk: boolean,
  isTransfer: boolean,
  depTime: string,
  arrTime: string,
  isMainSegment: boolean,
}

type Props = {
  segmentsArr: SegmentResponse[],
  segment: SegmentResponse,
  index: number,
};

const SegmentsIndentifier: React.FC<Props> = (props) => {

  const {
    segmentsArr,
    segment,
    index
  } = props;

  const options: Options = React.useMemo(() => {
    const result = {
      isFirstWalk: false,
      isLastWalk: false,
      isTransfer: false,
      isMainSegment: true,
      depTime: segment.dep_offset,
      arrTime: segment.arr_offset,
    }

    if (segment.product === TransportsTypes.walk) {
      result.isMainSegment = false;
    }

    if ((index !== (segmentsArr.length - 1)) && (segmentsArr[index + 1].product !== TransportsTypes.walk)) {
      result.isTransfer = true;
      result.arrTime = segmentsArr[index + 1].dep_offset;
      result.depTime = segment.arr_offset;
    }

    if ((index !== (segmentsArr.length - 1)) && !result.isMainSegment) {
      result.depTime = segment.dep_offset;
      result.arrTime = segmentsArr[index + 1].dep_offset;
    }

    if (index === 0 && !result.isMainSegment) {
      result.isFirstWalk = true;
    }

    if ((index === (segmentsArr.length - 1)) && !result.isMainSegment) {
      result.isLastWalk = true;
    }
    return result;
  }, [segment, segmentsArr, index]);

  return (
    <>
      {options.isFirstWalk &&
        <WalkTitle
          stopName={segment.dep_name}
          time={segment.dep_offset}
        />
      }
      {options.isMainSegment && props.children}
      {(options.isTransfer || !options.isMainSegment) &&
        <WalkSegment
          arrTime={options.arrTime}
          depTime={options.depTime}
        />
      }
      {options.isLastWalk && 
        <WalkTitle 
          stopName={segment.arr_name}
          time={segment.arr_offset}
        />
      }
    </>
  );
};

const StyledWrapper = styled.div`

`;

export default SegmentsIndentifier;