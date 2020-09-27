import React from 'react';
import styled, { css } from 'styled-components';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import parse from 'date-fns/parse';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from '../../../../i18n';
import { STATIC_URLS } from '../../../utils/constants';

import { Icon } from '../Icon';
import { Dot } from '../IntermediateStopList/Common/BarParts';
import { getNewDate } from '@utils/time/getNewDate';

interface Props extends WithTranslation {
  dotHeight: number[],
  depTime?: string,
  duration?: string,
  arrTime?: string,
  className?: string,
  left?: number,
  bottom?: number,
  top?: number,
  right?: number,
}

const Changeover: React.FC<Props> = (props) => {
  const { t } = props;

  const time: {
    minutes: number,
    hour: number,
  } = React.useMemo(() => {
// TO DO: check real API on the duration field in the segment 
// if not exist remove the condition
    if (props.duration) {
      const date = parse(props.duration, 'HH:mm', getNewDate());
      return {
        minutes: getMinutes(date),
        hour: getHours(date),
      }
    }
    if (props.depTime && props.arrTime) {
      const dep = new Date(props.depTime);
      const arr = new Date(props.arrTime);
  
      const diffTime = differenceInMinutes(arr, dep);
      const minutes = diffTime % 60;
      const hour = +Math.floor(diffTime / 60);
      return {
        minutes,
        hour
      };
    }
    return {
      minutes: 0,
      hour: 0,
    }
  }, [props.depTime, props.arrTime])

  const durationElem = time.hour > 0 ? (
    <span>
      {`${time.hour} ${t('journeys__segment-hour')} ${time.minutes} ${t('journeys__segment-min-on-foot')}`}
    </span>
  ) : (
      <span>
        {`${time.minutes} ${t('journeys__segment-min-on-foot')}`}
      </span>
    );

  return (
    <StyledWrapper
      className={props.className}
      left={props.left}
      top={props.top}
      bottom={props.bottom}
      right={props.right}
    >
      <Icon
        srcUrl={`${STATIC_URLS.SVG}/human_shape.svg`}
        width={8.67}
        height={14.33}
      />
      <span className="changeover-stops__text">
        {durationElem}
      </span>
      <div className="changeover-stops__dots">
        {
          props.dotHeight.map((dot) => {
            return (
              <Dot key={dot} />
            )
          })
        }
      </div>
    </StyledWrapper>
  )
};

type StylesProps = {
  left?: number,
  bottom?: number,
  top?: number,
  right?: number,
}

const StyledWrapper = styled.div<StylesProps>`
  padding-bottom: 15px;
  padding-top: 15px;
  display: flex;
  align-items: center;
  position: relative;

  .changeover-stops {

    &__text {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
      padding-left: 9px;
    }
    
    &__dots {
      position: absolute;
      ${props => props.top && css`
        top: ${props.top}px;
      `}
      ${props => props.bottom && css`
        bottom: ${props.bottom}px;
      `}
      ${props => props.left && css`
        left: ${props.left}px;
      `}
      ${props => props.right && css`
        right: ${props.right}px;
      `}
    }
  }
`;

export default withTranslation('common')(Changeover);