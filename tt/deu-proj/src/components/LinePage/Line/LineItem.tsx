import React, { ReactNode, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { useTranslation, Link } from 'i18n';

import { STATIC_URLS } from '../../../utils/constants';
import { colors } from '../../../theme/default/constants';
import { Icon } from '../../UI/Icon';

import { BigCirle, SmallCircle } from '../../UI/IntermediateStopList/Common/BarParts';
import { getStopUrl } from '@utils/router.util';
import { getSlug } from '@utils/getSlug';

const ANIMATION_DURATION = 300;

type Props = {
  isEdge: boolean,
  stopName: string,
  short_title: string,
  cityName: string,
  stateName: string,
  platform: string,
  isReverse: boolean,
  inTime: ReactNode,
  mainTime: ReactNode,
  baseColor: string,
  isCurrent?: boolean,
  className?: string,
  isNotLineStop: boolean,
  isLineNotAvailable: boolean,
  isLastStation: boolean,
};

export type Ref = HTMLDivElement;

const LineItem = forwardRef<Ref, Props>((props, ref) => {
  const { t } = useTranslation('common')

  const { appUrl, browserUrl } = React.useMemo(() => {
    return getStopUrl({
      city: getSlug(props.cityName),
      state: getSlug(props.stateName),
      stop: getSlug(props.short_title)
    })
  }, [props.cityName, props.short_title, props.stateName, props.stopName]);

  return (
    <StyledWrapper
      className={props.className}
      isCurrent={props.isCurrent}
      ref={ref}
      isEdge={props.isEdge}
      isReverse={props.isReverse}
      baseColor={props.baseColor}
      isNotLineStop={props.isNotLineStop}
      isLineNotAvailable={props.isLineNotAvailable}
      circleIsAlign={props.isCurrent && !!props.platform}
    >
      <div className="line-item__row">
        {(props.stateName && props.cityName) ?
          (
            <Link href={appUrl} as={browserUrl}>
              <a className="line-item__title line-item__title--link">
                {props.stopName}
              </a>
            </Link>
          ) : (
            <span className="line-item__title">
              {props.stopName}
            </span>
          )
        }
        {props.inTime &&
          <div className="line-item__in-time line-item--left-side">
            {props.inTime}
          </div>
        }
        <CSSTransition
          in={!!props.mainTime}
          timeout={ANIMATION_DURATION}
          unmountOnExit={true}
          classNames="disappear-animation"
        >
          <div className="line-item__title line-item--left-side">
            {props.mainTime}
          </div>
        </CSSTransition>
      </div>
      {props.isLineNotAvailable && 
        (<div className="line-item__text line-item__info">
          {t('line__station__not-available')}
        </div>)
      }

      {!props.isLastStation
        && !props.isLineNotAvailable
        && props.platform 
        && <div className='line-item__platform-info'>
            <span className="line-item__text">
              {`${t('journeys__segment-way')} ${props.platform}`}
            </span>
          </div>
      }
      {props.isLastStation &&
        <div className="line-item__row">
            <div className="line-item__text line-item__info line-item--last">
              {t('line__station__end')}
            </div>
          {props.platform && <div className='line-item__platform-info'>
            <span className="line-item__dot">&#8226;</span>
            <span className="line-item__text">
              {`${t('journeys__segment-way')} ${props.platform}`}
            </span>
            </div>}
        </div>}
      {props.isCurrent ?
        (
          <BigCirle
            className="line-item__circle--big"
            colorInfo={props.baseColor}
          >
            <Icon
              srcUrl={`${STATIC_URLS.SVG}/arrow.svg`}
              color={props.baseColor}
              height={20}
              width={20}
            />
          </BigCirle>
        ) :
        (
          <>
            {!props.isLineNotAvailable && (<SmallCircle
              className="line-item__circle--small"
              colorInfo={props.baseColor}
            />)}
            {
              props.isEdge && <div className="line-item--line-through" />
            }
          </>
        )
      }
    </StyledWrapper>
  )
});

type StylesProps = {
  isCurrent?: boolean,
  isEdge: boolean,
  isReverse: boolean,
  baseColor: string,
  isNotLineStop: boolean,
  isLineNotAvailable: boolean,
  circleIsAlign?: boolean,
}

const StyledWrapper = styled.div<StylesProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 17px;
  ${props => props.isNotLineStop && css`
    :before {
      content: '';
      position: absolute;
      top: -8px;
      bottom: 0;
      right: 0;
      left: -42px;
      background-color: #fff;
      opacity: 0.8;
      height: calc(100% + 17px);
      z-index: 5;
    }
  `}
  ${props => props.isLineNotAvailable && css`
    :before {
      content: '';
      position: absolute;
      top: -8px;
      bottom: 0;
      right: 0;
      left: 0;
      background-color: #fff;
      opacity: 0.8;
      height: calc(100% + 17px);
      z-index: 5;
    }
  `}
  
  .line-item {
    &__row {
      display: flex;
      align-items: center;
      position: relative;
    }

    &__title {
      ${props => props.theme.typography.fnTitle2};
      ${props => props.theme.typography.fnText};
      color: ${props => props.theme.colorValues.grey};

      ${props => props.isCurrent && css`
        ${props => props.theme.typography.fnMedium};
      `}

      &--link:hover {
        text-decoration: underline;
      }
    }

    &__text {
      ${props => props.theme.typography.fnLabel3};
      ${props => props.theme.typography.fnText};
      color: ${props => props.theme.colorValues.lightgrey};
    }

    &__in-time {
      ${props => props.theme.typography.fnCaption3};
      ${props => props.theme.typography.fnText};
      color: ${props => props.theme.colorValues.grey};

      & span {
        ${props => props.theme.typography.fnTitle3};
        ${props => props.theme.typography.fnMedium};
      }
    }

    &__info {
      ${props => props.theme.typography.fnCaption2};
      ${props => props.theme.typography.fnRegular};
      color: ${props => props.theme.colorValues.orange};
      z-index: 6;
    }

    &--last {
      position: relative;
      :before {
        content: '';
        position: absolute;
        ${props => !props.isReverse
        ? css`
            top: -5px;
            height: calc(100% + 14px);
          `
        : css`
            top: -32px;
            height: calc(100% - 7px);
          `
        };
        width: 15px;
        bottom: 0;
        right: 0;
        left: -42px;
        background-color: #fff;
        opacity: 0.8;
        z-index: -1;
      }
    }

    &__dot {
      color: ${props => props.theme.colorValues.lightgrey};
      margin: 0 5px;
    }
    &__circle {
      &--big {
        top: -2px;
        left: -48px;

        ${props => props.circleIsAlign && css`top: 8px;`};

        & > * {
          transition: ${ANIMATION_DURATION}ms;
          transform: rotate(${props => props.isReverse ? 180 : 0}deg);
        }
      }

      &--small {
        left: -39px;
        top: 5px;
      }
    }
    &--line-through {
      position: absolute;
      width: 20px;
      height: 4px;
      background-color: ${props => props.baseColor};
      z-index: -1;
      left: -42px;
      top: 10px;
    }

    &--left-side {
      margin-left: auto;
    }
  }
  .disappear-animation {
    &-enter {
      opacity: 0;
    }

    &-enter-active {
      opacity: 1;
      transition: ${ANIMATION_DURATION}ms;
    }

    &-exit {
      opacity: 1;
    }

    &-exit-active {
      opacity: 0;
      transition: ${ANIMATION_DURATION}ms;
    }
  }
`;

export default LineItem;