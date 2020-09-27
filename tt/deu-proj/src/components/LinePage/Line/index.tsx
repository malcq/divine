import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { useTranslation } from '../../../../i18n';

import { LineStopResponse } from '../../../models/linePageInfo';

import LineItem, { Ref } from './LineItem';
import lineItemPropMaker from '../../../utils/lineItemPropMaker';
import { getRelativeTime } from '../../../utils/time/getRelativeTime';
import { getNewDate } from '@utils/time/getNewDate';
import { StopListResponse } from '@models/stop';

type Props = {
  isReverse: boolean,
  stopListResponse: LineStopResponse[],
  baseColor: string,
};

const Line = forwardRef<Ref, Props>((props, ref) => {

  const { stopListResponse } = props;
  const { t } = useTranslation('common');

  const timeConverter = React.useCallback((
    date: string | null,
    state?: boolean,
  ): {
    inTime: boolean | JSX.Element | undefined,
    mainTime: boolean | JSX.Element | undefined
  } => {
    let inTime, mainTime;

    if (!date) {
      inTime = false;
      mainTime = false;
    }
    if (state && date) {
      const relTime = getRelativeTime(getNewDate(), date, 'Europe/Berlin');
      const timePrefix = relTime.isAfter ? t('stop__time-in') : t('stop__time-ago');

      inTime = (relTime.time < 21) ?
        (<> {timePrefix} <span>{relTime.time}</span> Min </>)
        : <span>{date}</span>;
      mainTime = false;
    }
    if (date && !state) {
      mainTime = <span>{date}</span>;
      inTime = false;
    }
    return {
      inTime,
      mainTime
    }
  }, []);

  const {
    allNotLinePos,
    firstPos,
    lastPos
  } = React.useMemo(() => {
    const direction = props.isReverse ? 'back_direction' : 'forward_direction';
    const allNotLinePos: number[] = stopListResponse.reduce((accum: number[], stop: LineStopResponse, idx: number) => {
      if (stop[direction].position === undefined && stop[direction].stop_arrival_date === undefined) {
        return [ ...accum, idx];
      }
      return accum;
    }, []);
  
    const allIsLinePos: number[] = stopListResponse.reduce((accum: number[], stop: LineStopResponse, idx: number) => {
      if (stop[direction].position !== undefined && stop[direction].stop_arrival_date !== undefined) {
        return [ ...accum, idx];
      }
      return accum;
    }, []);
    
  
    const firstPos: number = allIsLinePos[0];
    const lastPos: number = allIsLinePos[allIsLinePos.length - 1];

    return {
      allNotLinePos,
      firstPos,
      lastPos
    }
  }, [props.isReverse, stopListResponse]);

  return (
    <StyledWrapper>
      {stopListResponse.map((stop, index, arr) => {
        const {
          isCurrent,
          isEdge,
          platformName,
          time,
        } = lineItemPropMaker(arr, index, props.isReverse, stop, firstPos, lastPos);

        const { inTime, mainTime } = timeConverter(time, stop.current);
        const isNotLineStop = allNotLinePos.includes(index) && (index > lastPos || index < firstPos);
        const isLineNotAvailable = allNotLinePos.includes(index) && (index < lastPos && index > firstPos);
        const isLastStation = props.isReverse
          ? index === firstPos && firstPos !== 0
          : index === lastPos && lastPos !== stopListResponse.length - 1;

        return (
          <LineItem
            key={index}
            inTime={inTime}
            mainTime={mainTime}
            isCurrent={isCurrent}
            stopName={stop.stop_name}
            short_title={stop.short_title}
            platform={platformName}
            isReverse={props.isReverse}
            ref={(index === arr.length - 1) ? ref : null}
            isEdge={isEdge}
            stateName={stop.state_name ?? ''}
            cityName={stop.city_name ?? ''}
            baseColor={props.baseColor}
            isNotLineStop={isNotLineStop}
            isLineNotAvailable={isLineNotAvailable}
            isLastStation={isLastStation}
          />
        )
      })
      }
    </StyledWrapper>
  )
});

type StylesProps = {};

const StyledWrapper = styled.div<StylesProps>`

`;

export default Line;