import React, { useMemo, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from 'i18n';

import { ProviderTypes, PROVIDER_INFO } from '@utils/constants';
import { getDurationTime } from '@utils/time/getDurationTime';
import media from '@utils/media';
import getIsWhiteColor from '@utils/getIsWhiteColor';

import InternalStopList from '../../UI/InternalIntermediateStopList';
import RouteLine from '../../UI/RouteLine';

import { JourneyIntermediateStop, SegmentResponse } from '@models/journey';
import { LinesColorInfo } from '@models/stop';
import LineLabel from '@components/UI/Labels/LineLabel';
import { ColorValues } from '@models/common';

interface Props extends WithTranslation {
  segmentInfo: SegmentResponse,
  transferProvider: ProviderTypes,
  colorInfo: LinesColorInfo[],
  expandListWatcher: () => void
}

const SegmentItem: React.FC<Props> = (props) => {
  const { t } = props;

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
    color,
    text_color
  } = props.segmentInfo;

  const [isOpen, setIsOpen] = useState(false);
  const [routeHeight, setRouteHeight] = useState(0);

  const endRef = useRef<HTMLElement>(null);
  const startRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!endRef && !startRef) return;
    const stop = endRef.current?.offsetTop;
    const start = startRef.current?.offsetTop;
    if (stop && start) {
      setRouteHeight(stop - start + 20);
    }
  }, [isOpen])

  const depTime = useMemo(() => format(new Date(depOffset), 'HH:mm'), [depOffset]);
  const arrTime = useMemo(() => format(new Date(arrOffset), 'HH:mm'), [arrOffset]);

  const duration = useMemo(() => {
    return getDurationTime(depOffset, arrOffset);
  }, [depOffset, arrOffset]);

  const durationTime = duration.hour > 0 ? (
    `${duration.hour} ${t('journeys__segment-hour')} ${duration.minutes} ${t('journeys__segment-minute')}`
  ) : (
      `${duration.minutes} ${t('journeys__segment-minute')}`
    );

  const expandClickHandler = () => {
    setIsOpen(!isOpen);
    props.expandListWatcher();
  }

  const { baseColor, secondColor } = React.useMemo(() => {
    const defaultColor = props.transferProvider === ProviderTypes.flixbus ? '#00D202': '#ec1b2d';
    const baseColor = props.colorInfo.find(item => item.line === product);
    const lineColor = baseColor?.color;
    const result: ColorValues = {
      baseColor: defaultColor,
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
  }, [props.colorInfo, props.transferProvider]);

  return (
    <StyledWrapper
      isOpen={isOpen}
      baseColor={baseColor}
      isWhiteSpace={!depPlatform}
    >
      <div className="outer-stop-info-max__col">
        <RouteLine
          baseColor={baseColor}
          maxHeight={routeHeight}
          topPadding={25}
          secondColor={secondColor}
        />
      </div>
      <div className="outer-stop-info-max__col outer-stop-info-max__content">
        <div className="outer-stop-info-max__row">
          <span
            className="outer-stop-info-max__title outer-stop-info-max__title--first"
            ref={startRef}
          >
            {depName}
          </span>
        </div>
        <div className="outer-stop-info-max__row outer-stop-info-max__title-box">
          {product &&
            <LineLabel 
            line={product}
            colorInfo={props.colorInfo}
            className="outer-stop-info-max__product-logo"
          />
            }

          {/* <span className="outer-stop-info-max__sub-title">
            Hamburg-Altona
          </span> */}
          <span className="outer-stop-info-max__sub-title outer-stop-info-max__sub-title--big">
            {depTime}
          </span>
        </div>
        {depPlatform &&
          <div className="outer-stop-info-max__row outer-stop-info-max__platform-box">
            <span className="outer-stop-info-max__platform">
              {`${t('journeys__segment-way')} ${depPlatform}`}
            </span>
          </div>
        }
        {(intermediateStop && intermediateStop.length > 0) &&
          <InternalStopList
            durationTime={durationTime}
            intermediate_stop={intermediateStop}
            onClick={expandClickHandler}
            isOpen={isOpen}
            baseColor={baseColor}
          />
        }
        <div
          className="outer-stop-info-max__row outer-stop-info-max__arr-point"
          data-last
        >
          <span
            className="outer-stop-info-max__title outer-stop-info-max__title--last"
            ref={endRef}
          >
            {arrName}

          </span>
          <span className="outer-stop-info-max__text outer-stop-info-max__text--right-side">
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
  isWhiteSpace?: boolean
}

const StyledWrapper = styled.div<StylesProps>`
  display: flex;
  padding-left: 9px;
  margin-left: 17px;
  
  .outer-stop-info-max {

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
      margin: 14px 0 ${props => props.isWhiteSpace ? 20 : 7}px 0;
    }

    &__platform-box {
      margin-bottom: 20px;
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

    &__sub-title {
      padding-left: 10px;
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnTitle2};
      color: ${props => props.theme.colorValues.grey};

      &--big {
        ${props => props.theme.typography.fnTitle3};
        margin-left: auto;
        display: inline-block;
      }
    }

    &__product-logo {

    }

    &__platform {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
    }

    &__text {
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.grey};

      &--right-side {
        margin-left: auto;
      }
    }

    &__arr-point {
      padding-top: 16px;
      padding-bottom: 16px;
      align-items: center;
      border-top: .5px solid ${props => props.theme.colorValues.lightestgrey};
      border-bottom: .5px solid ${props => props.theme.colorValues.lightestgrey};
    }
  }
`;

export default withTranslation('common')(SegmentItem);