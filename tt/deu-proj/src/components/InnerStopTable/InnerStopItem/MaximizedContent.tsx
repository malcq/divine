import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useTranslation } from '../../../../i18n';

import SegmentsIndentifier from '../../UI/segmentsIdentifier';
import InnerSegment from './InnerSegment';

import { InnerResponse } from '../../../models/journey';
import { LinesColorInfo } from '@models/stop';

interface Props {
  className?: string,
  responseStopInfo: InnerResponse,
  nowDate: Date,
  colorInfo: LinesColorInfo[],
  expandListWatcher: () => void;
};

const MaximizedContent: React.FC<Props> = (props) => {

  const { t } = useTranslation('common')

  const {
    responseStopInfo: {
      segments,
      duration
    }
  } = props;

  const durationTime = useMemo(() => {
    const date = duration.split(':');
    return {
      hour: parseInt(date[0]),
      minutes: parseInt(date[1]),
    }
  }, [duration]);

  const travelTimeElem = durationTime.hour > 0 ? (
    <span>
      {`${durationTime.hour} ${t('journeys__segment-hour')} ${durationTime.minutes} ${t('journeys__segment-minute')}`}
    </span>
  ) : (
      <span>
        {`${durationTime.minutes} ${t('journeys__segment-minute')}`}
      </span>
    );

  return (
    <StyledWrapper
      className={props.className}
    >
      {
        segments.map((segment, index, arr) => {
          return (
            <SegmentsIndentifier
              key={index}
              index={index}
              segment={segment}
              segmentsArr={arr}
            >
              <InnerSegment
                segmentInfo={segment}
                colorInfo={props.colorInfo}
                nowDate={props.nowDate}
                expandListWatcher={props.expandListWatcher}
              />

            </SegmentsIndentifier>
          )
        })
      }
      <div className="inner-stop-info-max__additional-info">
        {`${t('journeys__travel-time')} `}
        {travelTimeElem}
      </div>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  padding-top: 11px;
  
  .inner-stop-info-max {

    &__additional-info {
      padding-left: 17px;
      padding-top: 16px;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnLabel3};
      color: ${props => props.theme.colorValues.lightgrey};
    }

    &__single-title {
      display: flex;
      margin-left: 56px;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnTitle2};
      color: ${props => props.theme.colorValues.grey};
      position: relative;
      padding: 16px 16px 16px 0;
      border-bottom: .5px solid ${props => props.theme.colorValues.lightestgrey};

      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(0,0,0,0.4);;
        background-color: ${props => props.theme.colorValues.white};
        top: 20px;
        left: -30px;
        border-radius: 100%;
        z-index: 5;
      }
     
    &--s-text {
      ${props => props.theme.typography.fnBody};
    }

    &--right-side {
        margin-left: auto;
      }
    }
  }
`;

export default MaximizedContent;