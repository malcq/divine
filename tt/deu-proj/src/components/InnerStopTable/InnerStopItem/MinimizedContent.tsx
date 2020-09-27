import React, { useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import format from 'date-fns/format';
import { CSSTransition } from 'react-transition-group';

import { STATIC_URLS, ANIMATION_VALUES } from '@utils/constants';
import { Icon } from '../../UI/Icon';
import { useViewHeight } from '@utils/hooks/useViewHeight';
import media from '@utils/media';

type Props = {
  depOffset: string,
  arrOffset: string,
  timePeriod?: string,
  depName?: string,
  className?: string,
  isOpen: boolean;
  heightSet: (h: number) => void
};

const MinimizedContent: React.FC<Props> = (props) => {

  const depTime = useMemo(() => format(new Date(props.depOffset), 'HH:mm'), [props.depOffset]);
  const arrTime = useMemo(() => format(new Date(props.arrOffset), 'HH:mm'), [props.arrOffset]);

  const boxRef = useRef<HTMLDivElement>(null)

  useViewHeight(boxRef, props.heightSet, [props.depName, props.arrOffset, props.depOffset]);

  const isTimePeriods = React.useMemo(() => {
    return !!(props.depName && props.timePeriod)
  }, [props.depName, props.timePeriod])

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
      <MinimizedWrapper
        className={props.className}
        ref={boxRef}
        isTimePeriods={isTimePeriods}
        isOpen={props.isOpen}
      >
        <div className="inner-stop-info-min__row">
          <span className="inner-stop-info-min__time-info inner-stop-info-min__text">
            {depTime}
          </span>
          <Icon
            className="inner-stop-info-min__arrow"
            srcUrl={`${STATIC_URLS.SVG}/right_arrow.svg`}
            width={16}
            height={8}
          />
          <span className="inner-stop-info-min__time-info inner-stop-info-min__text">
            {arrTime}
          </span>
        </div>
        {isTimePeriods &&
          <div className="inner-stop-info-min__row">
            <span className="inner-stop-info-min__time-periods inner-stop-info-min__text">
              in
          {`${' '}${props.timePeriod} `}
            Min
        </span>
            <span className="inner-stop-info-min__dep-point inner-stop-info-min__text inner-stop-info-min__text--light">
              ab
          {`${' '}${props.depName}`}
            </span>
          </div>}
      </MinimizedWrapper>
    </CSSTransition>
  )
};

type StylesProps = {
  isTimePeriods: boolean,
  isOpen: boolean
};

const MinimizedWrapper = styled.div<StylesProps>`
  position: absolute;
  left: 0;
  width: 100%;
  padding: 10px 38px 16px 16px;

  ${media.desktop} {
    padding: 4px 52px 16px 16px;
  }
  
  .inner-stop-info-min {

    &__row {
      display: flex;
      align-items: center;

      &:not(:first-child) {
        margin-top: 6px;
      }
    }

    &__text {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color:${props => props.theme.colorValues.grey};

      &--light {
        color: ${props => props.theme.colorValues.lightgrey}
      }
    }

    &__time-period {

    }

    &__dep-point {
      padding-left: 4px;

    }

    &__arrow {
      margin: 0 8px;
    }
  }
`;

export default MinimizedContent;