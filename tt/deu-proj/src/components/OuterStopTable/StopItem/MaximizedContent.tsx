import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'i18n';

import AdditionalInfo from './AdditionalInfo';
import SegmentItem from './SegmentItem';
import Fares from './Fares';

import SegmentsIndentifier from '../../UI/segmentsIdentifier';

import { OuterResponse, Fare } from '../../../models/journey';
import { LinesColorInfo } from '@models/stop';
import { ProviderTypes } from '@utils/constants';

interface Props {
  stopInfo: OuterResponse,
  className?: string,
  colorInfo: LinesColorInfo[],
  expandListWatcher: () => void;
};

const MaximizedContent: React.FC<Props> = (props) => {
  const { t } = useTranslation('common');
  const {
    segments,
    provider: transferProvider,
    fares,
    deeplink,
    arr_offset,
    dep_offset,
    duration
  } = props.stopInfo;

  const faresValues = React.useMemo(() => {
    if (transferProvider === ProviderTypes.deutsche_bahn) {
      return {
        fares,
        topTitle: ''
      }
    };

    const durationParts = duration.split(':');
    const durationHour = parseInt(durationParts[0]);
    const durationMinutes = parseInt(durationParts[1]);

    const durationStr = durationHour > 0 ? (
      `${durationHour} ${t('journeys__segment-hour')} ${durationMinutes} ${t('journeys__segment-minute')}`
    ) : (
        `${durationMinutes} ${t('journeys__segment-minute')}`
      );
    const arrDate = new Date(arr_offset);
    const depDate = new Date(dep_offset);

    const arrValues = {
      hours: arrDate.getHours(),
      minutes: arrDate.getMinutes()
    };
    const depValues = {
      hours: depDate.getHours(),
      minutes: depDate.getMinutes()
    };
    const arrHours = arrValues.hours > 9 ? arrValues.hours : `0${arrValues.hours}`;
    const depHours = depValues.hours > 9 ? depValues.hours : `0${depValues.hours}`;
    const arrMinutes = arrValues.minutes > 9 ? arrValues.minutes : `0${arrValues.minutes}`;
    const depMinutes = depValues.minutes > 9 ? depValues.minutes : `0${depValues.minutes}`;

    const name = `${depHours}:${depMinutes} / ${arrHours}:${arrMinutes}`;
    return {
      fares: fares.map((item) => ({
      ...item,
      name,
    })),
    topTitle: durationStr
  }
  }, [t, fares, duration, arr_offset, dep_offset, transferProvider]);

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
              <SegmentItem
                segmentInfo={segment}
                colorInfo={props.colorInfo}
                transferProvider={transferProvider}
                expandListWatcher={props.expandListWatcher}
              />
            </SegmentsIndentifier>
          )
        })
      }
      <AdditionalInfo
        className="outer-stop-info-max__additional-info"
        changeover={props.stopInfo.changeovers}
        duration={props.stopInfo.duration}
      />
      {(fares.length > 0) &&
        <Fares
          provider={transferProvider}
          deepLink={deeplink}
          fares={faresValues.fares}
          topTitle={faresValues.topTitle}
        />}
    </StyledWrapper>
  )
};

type StyledProps = {
};

const StyledWrapper = styled.div<StyledProps>`
  padding-top: 16px;
  .outer-stop-info-max {

    &__additional-info {
      padding: 16px 0 20px 17px;
    }
  }

  .segment {

    &__aditional-info {
      margin-left: 17px
    }
  }
`;

export default MaximizedContent;