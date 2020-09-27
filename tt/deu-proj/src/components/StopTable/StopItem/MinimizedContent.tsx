import React, { useRef, useMemo } from 'react';
import styled, { ThemeContext, css } from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { IntermediateStopResponse } from '../../../models/stop';

import { STATIC_URLS, SCHEMA_URL, ANIMATION_VALUES } from '../../../utils/constants';
import { withTranslation } from '../../../../i18n';
import media from '../../../utils/media';
import { useViewHeight } from '../../../utils/hooks/useViewHeight';
import { Icon } from '../../UI/Icon';
import { RelativeTime } from '@utils/time/getRelativeTime';


const TICKET_ICON = `${STATIC_URLS.SVG}/ticket.svg`;
const WARNING_ICON = `${STATIC_URLS.SVG}/warning.svg`;

interface Props extends WithTranslation {
  timePeriods: number[],
  platformName: string,
  departureDate: string,
  firstIntermediateStop?: IntermediateStopResponse,
  secondIntermediateStop?: IntermediateStopResponse,
  warningText?: string,
  isTicketAvailable?: boolean,
  className?: string,
  relativeTimeInMin: RelativeTime,
  isOpen: boolean;
  heightSet: (h: number) => void
}
const MinimizedContent: React.FC<Props> = (props) => {

  const {
    firstIntermediateStop,
    secondIntermediateStop,
    timePeriods,
    departureDate,
    t,
    relativeTimeInMin
  } = props;

  const { colorValues } = React.useContext(ThemeContext);

  const timePeriodsText: string = useMemo(() => {
    return timePeriods.filter((_, idx) => idx < 3).join(', ');
  }, [timePeriods, relativeTimeInMin]);

  const boxRef = useRef<HTMLDivElement>(null)

  useViewHeight(boxRef, props.heightSet, [
    props.departureDate,
    props.warningText,
    props.firstIntermediateStop,
    props.secondIntermediateStop
  ]);

  return (
    <StyledContainer
      className={props.className}
      ref={boxRef}
      isOpen={props.isOpen}
    >
      <div className="stop-minimized-info__row">
        <div
          title={firstIntermediateStop?.stop_title}
          className="stop-minimized-info__stop-title stop-minimized-info__stop-title--top"
          itemProp="itinerary"
          itemScope
          itemType={`${SCHEMA_URL}/Place`}
        >
          <span itemProp="name">{firstIntermediateStop?.stop_title}</span>
        </div>
        <span
          className="stop-minimized-info__arr-time"
          itemProp="departureTime"
        >
          {firstIntermediateStop?.stop_arrival_date}
        </span>
        {timePeriodsText &&
          <div className="stop-minimized-info__time-periods">
            {timePeriodsText} Min
        </div>}
      </div>
      <div className="stop-minimized-info__row">
        <div
          title={secondIntermediateStop?.stop_title}
          className="stop-minimized-info__stop-title stop-minimized-info__stop-title--bottom"
          itemProp="itinerary"
          itemScope
          itemType={`${SCHEMA_URL}/Place`}
        >
          <span itemProp="name">{secondIntermediateStop?.stop_title}</span>
        </div>
        <span className="stop-minimized-info__arr-time">
          {secondIntermediateStop?.stop_arrival_date}
        </span>
        <div className="stop-minimized-info__platform-name">
          {props.platformName &&
            `${t('journeys__segment-way')} ${props.platformName}`
          }
        </div>
      </div>
      {props.warningText &&
        <div
          className="stop-minimized-info__warning"
          title={props.warningText}
        >
          <Icon
            color={colorValues.warning}
            srcUrl={WARNING_ICON}
            width={13}
            height={13}
          />
          <p>
            {props.warningText}
          </p>
        </div>
      }
      {props.isTicketAvailable &&
        <div className="stop-minimized-info__ticket">
          <Icon
            color={colorValues.success}
            srcUrl={TICKET_ICON}
            width={13}
            height={13}
          />
          {t(`stop__ticket-available`)}
        </div>
      }
    </StyledContainer>
  )
}

const StyledContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: 0;
  width: 100%;
  padding: 7px 36px 16px 16px;
  ${props => props.isOpen ? css`
    opacity: 0;
    transform: translate3d(0, 3.5px, 0);
  ` : css`
    opacity: 1;
    transform: translate3d(0);
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  `}


  ${media.desktop} {
    padding: 7px 52px 20px 21px;
  }

  .stop-minimized-info {
    &__row {
      display: flex;
    }

    &__stop-title {
      max-width: 160px;
    }

    &__stop-title,
    &__platform-name,
    &__time-periods,
    &__arr-time {
      white-space: nowrap;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
    }
    &__arr-time {
      margin: 0 10px 0 15px;
      position: relative;

      &::before {
        content: "·";
        display: block;
        position: absolute;
        left: -9px;
      }
    }
    &__time-periods {
      color: ${props => props.theme.colorValues.grey};
      margin-left: auto;
    }

    &__stop-title,
    &__warning > p {
      white-space: pre;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__warning,
    &__ticket {
      display: flex;
      align-items: center;
      margin-top: 8px;
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnBody};

      & > span {
        margin-right: 8px;
      }
    }

    &__warning {
      color: ${props => props.theme.colorValues.warning};
    }

    &__ticket {
      color: ${props => props.theme.colorValues.success};
    }

    &__platform-name {
      white-space: pre-line;
      text-align: right;
      margin-left: auto;

      ${media.desktop} {
        white-space: nowrap;
      }
    }
  }
`;

export default withTranslation('common')(MinimizedContent);