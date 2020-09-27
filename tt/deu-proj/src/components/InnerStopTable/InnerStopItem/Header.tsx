import React, { useMemo, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import { useTranslation } from '../../../../i18n';

import { STATIC_URLS, ANIMATION_VALUES } from '../../../utils/constants';
import media from '../../../utils/media';

import { Icon } from '../../UI/Icon';

import AvailableTransport from './AvailableTransport';

import { ResponseSimplifiedList } from '../../../models/journey';
import { LinesColorInfo } from '@models/stop';


type Props = {
  className?: string,
  isOpen: boolean,
  simplifiedList: ResponseSimplifiedList[],
  duration: string,
  minHeight: number,
  onClick: () => void,
  children: React.ReactNode,
  colorInfo?: LinesColorInfo[],
};

const Header = forwardRef<HTMLDivElement, Props>((props, ref) => {

  const { t } = useTranslation('common');

  const duration = useMemo(() => {
    const date = props.duration.split(':');
    return {
      hour: parseInt(date[0]),
      minutes: parseInt(date[1]),
    }
  }, [props.duration]);

  const durationElem = duration.hour > 0 ? (
    <span>
      <span className="inner-stop-item-header__duration--big-text">
        {`${duration.hour} `}
      </span >
      <span className="inner-stop-item-header__duration--small-text">
        {`${t('journeys__segment-hour')} `}
      </span>
      <span className="inner-stop-item-header__duration--big-text">
        {`${duration.minutes} `}
      </span>
      <span className="inner-stop-item-header__duration--small-text">
        {`${t('journeys__segment-minute')}`}
      </span>
    </span>
  ) : (
      <span>
        <span className="inner-stop-item-header__duration--big-text">
          {`${duration.minutes} `}
        </span>
        <span className="inner-stop-item-header__duration--small-text">
          {`${t('journeys__segment-minute')}`}
        </span>
      </span>
    );

  return (
    <StyledHeaderContanier
      ref={ref}
      className={props.className}
      onClick={props.onClick}
      isOpen={props.isOpen}
      minHeight={props.minHeight}
    >
      <div className="inner-stop-item-header">
        <div
          className="inner-stop-item-header__transports"

        // in case to prevent opening when scrolling - uncomment
        // onClick={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        //   return ev.stopPropagation();
        // }}
        >
          {
            props.simplifiedList.map((listItem, index, arr) => {
              const isFirst = index === 0;
              const separatorClass = classNames({
                'inner-stop-item-header__transport-separator': true,
                'inner-stop-item-header__transport-separator--d-none': index === arr.length - 1,
              });
              const transportClass = classNames({
                'inner-stop-item-header__transport--fake-padding': index === arr.length - 1,
              })
              return (
                <React.Fragment key={index}>
                  <AvailableTransport
                    isFirst={isFirst}
                    separatorClass={separatorClass}
                    className={transportClass}
                    list={listItem}
                    colorInfo={props.colorInfo}
                  />
                </React.Fragment>
              )
            })
          }
        </div>
        <CSSTransition
          in={!props.isOpen}
          timeout={{
            appear: 0,
            enter: ANIMATION_VALUES.CARD_OPENING_ANIMATION.buttonRotateTime,
            exit: 0
          }}
          unmountOnExit={true}
          classNames="title-animation"
        >
          <div className="inner-stop-item-header__duration">
            {durationElem}
          </div>
        </CSSTransition>
        <Icon
          srcUrl={`${STATIC_URLS.SVG}/collapse_arrow.svg`}
          width={12}
          height={7.4}
          className="inner-stop-item-header__more-button"
        />
      </div>
        {props.children}
    </StyledHeaderContanier>
  )

});

type StylesProps = {
  isOpen: boolean,
  minHeight: number,
}

const StyledHeaderContanier = styled.div<StylesProps>`
    user-select: none;
    padding: 17px 8px 0 16px;
    -webkit-tap-highlight-color: transparent;
    ${media.desktop} {
      cursor: pointer;
      padding-right: 16px;
    }
    
  .inner-stop-item-header {
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 6px;
    min-height: 26px;

    &::before {
      opacity: ${props => props.isOpen ? '1' : '0'};
      content: "";
      display: inline-block;
      height: 100%;
      min-height: 26px;
      position: absolute;
      right: 23px;
      top: 0;
      width: 40px;
      z-index: 1;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 15%, rgba(255,255,255,1) 70%);
    }

    &::after {
      opacity: ${props => props.isOpen ? '1' : '0'};
      transition: ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.buttonRotateTime}ms;
      content: "";
      position: absolute;
      width: 44px;
      height: 36px;
      right: -14px;
      bottom: -6px;
      background-color: ${props => props.theme.colorValues.zumthor};
      border-top-left-radius: 100px;
      border-bottom-left-radius: 100px;
      z-index: 1;

      ${media.desktop} {
        width: 52px;
        right: -22px;
      }
    }
    
    &__more-button {
      margin-left: ${props => props.isOpen ? 'auto' : '10px'};
      z-index: 2;
      transition: transform ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.buttonRotateTime}ms;
      ${props => (props.isOpen ?
    css`
        transform: rotate(0deg);
        background-color: ${props => props.theme.colorValues.primary};
      ` :
    css`
        opacity: 0.3;
        transform: rotate(180deg);
      `)}
    }

    &__transports {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      padding-right: 3px;
      min-height: 22px;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
      &:last-child {
        display: none;
      }
    }


    &__transport--fake-padding {
      padding-right: ${props => props.isOpen ? '40px' : '10px'};
    }

    &__transport-separator {
      margin: 0 6px 0 8px; 

      &--d-none {
        display: none;
      }
    }

    &__duration {
      margin-left: auto;
      color: ${props => props.theme.colorValues.grey};
      flex-shrink: 0;
      position: relative;
      ${props => props.isOpen && css`
        display: none;
      `}

      &--big-text {
        ${props => props.theme.typography.fnMedium};
        ${props => props.theme.typography.fnTitle3};
      }

      &--small-text {
        ${props => props.theme.typography.fnText};
        ${props => props.theme.typography.fnCaption3};
      }

      &:before {
        content: "";
        display: inline-block;
        height: 100%;
        min-height: 26px;
        position: absolute;
        left: -14px;
        top: 0;
        width: 14px;
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 13%, rgba(255,255,255,1) 70%);
      }
    }
  }

  .title-animation {
    &-enter {
      opacity: 0;
    }

    &-enter-active {
      opacity: 1;
      transition: all ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.buttonRotateTime}ms ;
    }
    
    /* &-exit {
      opacity: 1;
      height: ${props => props.minHeight}px;
    } */
    
    /* &-exit-active {
      opacity: 0;
      height: 0;
      transition: all ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.exitAnimation}ms ;
    }

    &-exit-done {
      opacity: 0;
      height: 0;
    } */
  }
`;

export default Header;