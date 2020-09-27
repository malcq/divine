import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { CSSTransition } from 'react-transition-group';

import { Icon } from '../../UI/Icon';

import { STATIC_URLS, SCHEMA_URL, ANIMATION_VALUES } from '../../../utils/constants';
import { useViewHeight } from '../../../utils/hooks/useViewHeight';

import AdditionalInfo from './AdditionalInfo';
import { BusTrainOptions } from '../../../models/schema';
import media from '@utils/media';

type Props = {
  depName: string,
  arrName: string,
  depOffset: string,
  arrOffset: string,
  duration: string,
  changeover: number,
  className?: string,
  tripOptions: BusTrainOptions,
  isOpen: boolean;
  heightSet: (h: number) => void
}

const MinimizedContent: React.FC<Props> = (props) => {

  const depTime = useMemo(() => format(new Date(props.depOffset), 'HH:mm'), [props.depOffset]);
  const arrTime = useMemo(() => format(new Date(props.arrOffset), 'HH:mm'), [props.arrOffset]);

  const boxRef = useRef<HTMLDivElement>(null)

  useViewHeight(boxRef, props.heightSet, [props.depOffset, props.depName, props.arrOffset]);
  return (
    <CSSTransition
      in={!props.isOpen}
      classNames="animation"
      timeout={{
        appear: 220,
        enter: 500,
        exit: 500
      }}
      unmountOnExit={true}
    >

      <StyledWrapper
        ref={boxRef}
        className={props.className}
        isOpen={props.isOpen}
      >
        <div className="outer-stop-info-min__row">
          <div className="outer-stop-info-min__dep-info ">
            <span
              className="outer-stop-info-min__time-info"
              itemProp="departureTime"
            >
              {depTime}
            </span>
            <Icon
              className="outer-stop-info-min__arrow"
              srcUrl={`${STATIC_URLS.SVG}/right_arrow.svg`}
              width={16}
              height={8}
            />
          </div>
          <div className="outer-stop-info-min__arr-info">
            <span
              className="outer-stop-info-min__time-info"
              itemProp="arrivalTime"
            >
              {arrTime}
            </span>
          </div>
        </div>
        <div className="outer-stop-info-min__row">
          <div
            className="outer-stop-info-min__dep-info"
            itemProp={props.tripOptions.depStopOptions.itemProp}
            itemScope
            itemType={props.tripOptions.depStopOptions.itemType}
          >
            <span
              className="outer-stop-info-min__text outer-stop-info-min__text--max-width"
              itemProp="name"
            >
              {props.depName}
            </span>
          </div>
          <div
            className="outer-stop-info-min__arr-info"
            itemProp={props.tripOptions.arrStopOptions.itemProp}
            itemScope
            itemType={props.tripOptions.arrStopOptions.itemType}
          >
            <span
              className="outer-stop-info-min__text"
              itemProp="name"
            >
              {props.arrName}
            </span>
          </div>
        </div>
        <AdditionalInfo
          changeover={props.changeover}
          duration={props.duration}
        />
      </StyledWrapper>
    </CSSTransition>
  )

};


const StyledWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: 0;
  width: 100%;
  padding: 10px 38px 12px 16px;
  opacity: 1;



  ${media.desktop} {
    padding-right: 52px;
  }

  .outer-stop-info-min {
    &__row {
      display: flex;

      &:not(:first-child) {
        margin-bottom: 8px;
      }
    }

    &__dep-info {
      display: flex;
      align-items: center;
      flex: 1;
      white-space: pre;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 168px;

      ${media.desktop} {
        max-width: 188px;
      }
    }
    &__arr-info {
      display: flex;
      align-items: center;
      flex: 1;
      margin-left: 8px;
      max-width: 335px;
      margin-right: 40px;
    }
    &__arrow {
      margin-left: auto;
      padding-right: 4px;
    }

    &__text {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &--max-width {
        max-width: 160px;
      }
    }

    &__time-info {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnTitle2};
      color: ${props => props.theme.colorValues.grey};
    }
  }
`;

export default MinimizedContent;