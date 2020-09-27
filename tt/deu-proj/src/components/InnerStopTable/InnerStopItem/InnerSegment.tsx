import React, { useMemo, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';


import { useTranslation } from 'i18n';

import { getDurationTime } from '@utils/time/getDurationTime';
import { getRelativeTime } from '@utils/time/getRelativeTime';
import media from '@utils/media';
import getIsWhiteColor from '@utils/getIsWhiteColor';

import { SegmentResponse } from '@models/journey';
import { LinesColorInfo } from '@models/stop';

import InternalStopList from '../../UI/InternalIntermediateStopList';
import TransportLabel from '../../UI/Labels/TransportLabel';
import LineLabel from '../../UI/Labels/LineLabel';
import RouteLine from '../../UI/RouteLine';
import { useRelativeTime } from '@utils/hooks/useRelativeTime';
import { ColorValues } from '@models/common';

interface Props {

  nowDate: Date,
  nextDepTime?: string,
  segmentInfo: SegmentResponse,
  colorInfo: LinesColorInfo[],
  expandListWatcher: () => void;
}

const InnerSegment: React.FC<Props> = (props) => {
  const { t } = useTranslation('common');
  const {
    dep_name: depName,
    arr_name: arrName,
    dep_offset: depOffset,
    arr_offset: arrOffset,
    product,
    product_type: productType,
    dep_platform: depPlatform,
    intermediate_stop: intermediateStop,
    stop_time_periods,
  } = props.segmentInfo;

  const [isOpen, setIsOpen] = useState(false);
  const [routeHeight, setRouteHeight] = useState(0);

  const endRef = useRef<HTMLElement>(null);
  const startRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!endRef && !startRef) return;
    const stop = endRef.current?.offsetTop
    const start = startRef.current?.offsetTop

    if (stop && start) {
      setRouteHeight(stop - start + 20);
    }
  }, [isOpen]);

  const duration = useMemo(() => {

    const date = getDurationTime(depOffset, arrOffset);
    if (date.hour > 0) {
      return `${date.hour} ${t('hour')} ${date.minutes} min`
    }
    return `${date.minutes} min`
  }, [depOffset, arrOffset]);

  const { baseColor, secondColor } = React.useMemo(() => {
    const baseColor = props.colorInfo.find(item => item.line === product);
    const lineColor = baseColor?.color;
    const result: ColorValues = {
      baseColor: '#ec1b2d',
    };

    if (lineColor) {
      const colors = lineColor.split(';');
      if (!getIsWhiteColor(colors[0])) {
        result.baseColor = colors[0]
      }
      if (colors[1]) {
        result.secondColor = colors[1]
      }
    }
    return result;
  }, [props.colorInfo]);

  const arrTime = useMemo(() => format(new Date(arrOffset), 'HH:mm'), [arrOffset]);
  const strDate = useMemo(() => {
    return format(new Date(depOffset), 'HH:mm');
  }, [depOffset]);

  const date = useRelativeTime({
    nearestTime: strDate,
    nowDate: props.nowDate
  })

  const expandClickHandler = () => {
    setIsOpen(!isOpen);
    props.expandListWatcher();
  }

  const timeInArea = React.useMemo(() => date.time <= 20, [date.time])
  const timePrefix = React.useMemo(() => date.isAfter ? t(`stop__time-in`) : t(`stop__time-ago`), [date.isAfter])

  const timePeriodInMinutes = React.useMemo(() => {
    const filteredArr = stop_time_periods.map((time) => {
      const departureDate = new Date(depOffset);
      const mountOfAddMinutes = departureDate.getMinutes() + time;
      const newTime = new Date(departureDate.setMinutes(mountOfAddMinutes)).getMinutes();
      if (newTime < 10) {
        return `0${newTime}`
      }
      return `${newTime}`
    });

    return filteredArr
      .filter((_, i) => i < 3)
      .join(', ')
  }, [depOffset, stop_time_periods])

  const isWhiteSpace = React.useMemo(() => {
    return !depPlatform && !timePeriodInMinutes;
  }, [depPlatform, timePeriodInMinutes]);

  return (
    <StyledWrapper
      isOpen={isOpen}
      baseColor={baseColor}
      isWhiteSpace={isWhiteSpace}
    >
      <div className="inner-stop-info-max__col">
        <RouteLine
          baseColor={baseColor}
          maxHeight={routeHeight}
          topPadding={20}
          secondColor={secondColor}
        />
      </div>
      <div className="inner-stop-info-max__col inner-stop-info-max__content">
        <div className="inner-stop-info-max__row inner-stop-info-max__departure">
          <span
            ref={startRef}
            className="inner-stop-info-max__title inner-stop-info-max__title--first"
          >
            {depName}
          </span>
        </div>
        <div className="inner-stop-info-max__row inner-stop-info-max__title-box">
          <div className="inner-stop-info-max__product-logo">
            <TransportLabel
              transport={productType}
              className="inner-stop-info-max__transport-label"
            />
            <LineLabel
              line={product}
              colorInfo={props.colorInfo}
              className="inner-stop-info-max__line"
            />
          </div>
          {/* <span className="inner-stop-info-max__sub-title">
            Marienplatz
          </span> */}
          <span className="inner-stop-info-max--right-side">
            {timeInArea && `${timePrefix}${' '}`}
            {timeInArea ?
              <>
                <span
                  className="inner-stop-info-max--big-num"
                >
                  {date.time}
                </span>
                {` Min`}
              </> :
              <span
                className="inner-stop-info-max--big-num"
              >
                {date.fullTime}
              </span>
            }
          </span>
        </div>
        {!isWhiteSpace &&
          <div className="inner-stop-info-max__row inner-stop-info-max__platform-box">
            {depPlatform &&
              <span>
                {`${t('journeys__segment-way')} ${depPlatform}`}
              </span>
            }
            {timePeriodInMinutes &&
              <span className="inner-stop-info-max--right-side">
                {`${timePeriodInMinutes} Min`}
              </span>
            }
          </div>
        }
        {(intermediateStop && intermediateStop.length > 0) &&
          <InternalStopList
            durationTime={duration}
            intermediate_stop={intermediateStop}
            onClick={expandClickHandler}
            isOpen={isOpen}
            baseColor={baseColor}
          />
        }
        <div
          className="inner-stop-info-max__row inner-stop-info-max__arr-point"
          data-last
        >
          <span
            ref={endRef}
            className="inner-stop-info-max__title"
          >
            {arrName}
          </span>
          <span className="inner-stop-info-max__text inner-stop-info-max--right-side">
            {arrTime}
          </span>
        </div>
      </div>


    </StyledWrapper>
  )
};

type StylesProps = {
  baseColor: string,
  isOpen: boolean,
  isWhiteSpace: boolean,
}

const StyledWrapper = styled.div<StylesProps>`
  padding-left: 26px;
  display: flex;
  
  .inner-stop-info-max {
    &__human-shape {
      margin-left: 30px;
    }

    &__col {
      display: flex;
      flex-direction: column;
    }

    &__content {
      flex: 1;
      margin-left: 16px;
      
    }

    &__row {
      display: flex;
      align-items: center;
      padding-right: 16px;

      ${media.desktop} {
        padding-right: 52px;
      }
    }

    &__title-box {
      margin: 15px 0 ${props => props.isWhiteSpace ? 20 : 7}px 0;
    }

    &__platform-box {
      margin-bottom: 20px;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
    }

    &__title {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnTitle2};
      color: ${props => props.theme.colorValues.grey};
      position: relative;

      &--first {
        margin-top: 16px;
      }

      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 14px;
        height: 14px;
        border: 2px solid ${props => props.baseColor};
        background-color: ${props => props.theme.colorValues.white};
        top: 4px;
        left: -30px;
        border-radius: 100%;
        z-index: 5;
      } 
    }

    &__line {
      margin-left: 4px;
    }

    &__sub-title {
      padding-left: 10px;
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnTitle2};
      color: ${props => props.theme.colorValues.grey};
    }

    &__product-logo {
      display: flex;
      align-items: center;
    }

    &__text {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.grey};
    }

    &--right-side {
        margin-left: auto;
      }

    &--big-num {
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnTitle3};
      color: ${props => props.theme.colorValues.grey};
    }

    &__arr-point {
      padding-top: 16px;
      padding-bottom: 16px;
      align-items: center;
      border-top: .5px solid ${props => props.theme.colorValues.lightestgrey};
      border-bottom: .5px solid ${props => props.theme.colorValues.lightestgrey};
    }

    &__human-shape {
      border-bottom: .5px solid ${props => props.theme.colorValues.lightestgrey};
      margin-bottom: 16px;
    }
  }
`;

export default InnerSegment;