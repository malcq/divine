import React, { useEffect, forwardRef } from 'react';
import styled, { ThemeContext, css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'i18n';

import { TransportsTypes } from '@models/transports';
import { LinesColorInfo } from '@models/stop';

import { STATIC_URLS, ANIMATION_VALUES, SCHEMA_URL } from '@utils/constants';
import { RelativeTime } from '@utils/time/getRelativeTime';
import media from '@utils/media';

import LineLabel from '../../UI/Labels/LineLabel';
import TransportLabel from '../../UI/Labels/TransportLabel';
import { Icon } from '../../UI/Icon';



interface Props {
  transport: TransportsTypes,
  stopTitle: string,
  line: string,
  isOpen: boolean,
  departureDate: string,
  relativeTimeInMin: RelativeTime,
  isOppositeRouteAnable: boolean,
  onSwapClick: () => void,
  setIsOpen: (state: boolean) => void,
  setIsDisabled: (state: boolean) => void,
  children: JSX.Element
  lineColorInfo?: LinesColorInfo[],
}

const Header = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { colorValues } = React.useContext(ThemeContext);
  const { relativeTimeInMin, lineColorInfo } = props;
  const { t } = useTranslation('common')

  function toggleIsOpen() {
    props.setIsOpen(!props.isOpen);
  }

  useEffect(() => {
    props.setIsDisabled(!relativeTimeInMin.isAfter);
  }, [relativeTimeInMin])


  const onSwapClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    props.onSwapClick()
  };

  const timeInArea = relativeTimeInMin.time <= 20;

  const timePrefix = relativeTimeInMin.isAfter ? t(`stop__time-in`) : t(`stop__time-ago`);
  return (
    <StyledContainer
      isOpen={props.isOpen}
      onClick={toggleIsOpen}
      ref={ref}
    >
      <div className="stop-item-header__content">
        <TransportLabel
          transport={props.transport}
          className="stop-item-header__transport"
        />

        <LineLabel
          line={props.line}
          colorInfo={lineColorInfo}
          className="stop-item-header__line"
        />

        <h3
          title={props.stopTitle}
          className="stop-item-header__title"
        >
          <span itemProp="name">{props.stopTitle}</span>
        </h3>


        <div className="stop-item-header__right-header">
          <CSSTransition
            in={props.isOpen}
            unmountOnExit={true}
            timeout={{
              appear: 0,
              enter: ANIMATION_VALUES.CARD_OPENING_ANIMATION.enterAnimation,
              exit: ANIMATION_VALUES.CARD_OPENING_ANIMATION.exitAnimation,
            }}
            classNames="header-items-anima"
          >
            {props.isOppositeRouteAnable ?
              <p className="stop-item-header__swap-layout"  onClick={onSwapClick}>
                <Icon
                  srcUrl={`${STATIC_URLS.SVG}/arrows-next-prev.svg`}
                  color={colorValues.primary}
                  width={15}
                  height={15}
                  className="stop-item-header__swap-button"
                />
              </p>
            : 
              <span></span>        
            }
          </CSSTransition>
          <CSSTransition
            in={!props.isOpen}
            unmountOnExit={true}
            timeout={{
              appear: 0,
              enter: ANIMATION_VALUES.CARD_OPENING_ANIMATION.enterAnimation,
              exit: ANIMATION_VALUES.CARD_OPENING_ANIMATION.exitAnimation,
            }}
            classNames="header-items-anima"
          >
            <div className="stop-item-header__departure-time">
              {timeInArea && `${timePrefix}${' '}`}

              {timeInArea ?
                <>
                  <span
                    className="stop-item-header__big-number"
                  >
                    {relativeTimeInMin.time}
                  </span>
                  {` Min`}
                </> :
                <span
                  className="stop-item-header__big-number"
                >
                  {relativeTimeInMin.fullTime}
                </span>
              }
            </div>
          </CSSTransition>
          <div className="stop-item-header__button-box">
            <Icon
              className="stop-item-header__more-button"
              srcUrl={`${STATIC_URLS.SVG}/collapse_arrow.svg`}
              width={12}
              height={7.4}
            />
          </div>
        </div>
      </div>
      {props.children}
    </StyledContainer>
  );
});

type StyledContainerProps = {
  isOpen?: boolean,
}
const StyledContainer = styled.div<StyledContainerProps>`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  padding: 17px 8px 0 16px;

  ${media.desktop} {
    padding: 21px 16px 0 16px;
  }
  .stop-item-header {

    &__content {
      display: grid;
      grid-template-columns: auto auto 1fr auto;
      align-items: center;
    }

    &__left-header,
    &__button-box,
    &__right-header {
      display: flex;
      position: relative;
      align-items: center;
    }

    &__button-box {
      min-width: 24px;
      height: 24px;
      justify-content: center;

      &::after {
        opacity: ${props => props.isOpen ? '1' : '0'};
        transition: ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.buttonRotateTime}ms;
        content: "";
        position: absolute;
        width: 44px;
        height: 36px;
        right: -8px;
        background-color: ${props => props.theme.colorValues.zumthor};
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
        z-index: 1;

        ${media.desktop} {
          width: 52px;
          right: -16px;
        }
      }
    }

    &__left-header {
      flex-grow: 1;
    }

    &__transport {
      margin-right: 4px;
    }

    &__line {
      margin-right: 10px;
    }

    &__departure-time {
      color: ${props => props.theme.colorValues.grey};
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnCaption3};
      position: absolute;
      width: max-content;
      position: absolute;
      transform: translateX(calc(-100% - 4px));

      ${media.desktop} {
        transform: translateX(calc(-100% - 12px));
      }
    }

    &__title {
      color: ${props => props.theme.colorValues.grey};
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnTitle2};
      ${props => props.isOpen ? css`
          font-size: 19px;
        `
    : null};
      transition: ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.buttonRotateTime}ms;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-right: 65px;
    }
    
    &__big-number {
      ${props => props.theme.typography.fnTitle3};
      ${props => props.theme.typography.fnMedium};
    }

    &__swap-button {
    }
 
    &__swap-layout {
      height: 24px;
      width: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: absolute;
      transform: translateX(calc(-100% - 28px));
     
      &::before {
        content: '';
        width: 36px;
        height: 36px;
        position: absolute;
        right: -6px;
        bottom: -7px;
        background-color: transparent;
        border-radius: 50%;
      }

      :active ::before {
        background-color: ${props => props.theme.colorValues.zumthor};
      }
      
      ${media.desktop} {
        :hover ::before {
          background-color: ${props => props.theme.colorValues.zumthor};
        }
      }
    }

    &__more-button {
      cursor: pointer;
      display: inline-block;
      -webkit-tap-highlight-color: transparent;
      z-index: 2;
      ${props => props.isOpen
    ? css`
          transform: rotate(0deg);
          background-color: ${props => props.theme.colorValues.primary};
          `
    : css`
          opacity: 0.3;
          transform: rotate(180deg);
        `
  };
      user-select: none;
      transition: ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.buttonRotateTime}ms;
    }
  }

  .header-items-anima {
    &-enter {
      opacity: 0;
    }

    &-enter-active {
      opacity: 1;
      transition: all ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.enterAnimation}ms; 
    }

    &-exit {
      opacity: .8;
    }

    &-exit-active {
      opacity: 0;
      transition: all ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.exitAnimation}ms; 
    }

    &-exit-done {
      opacity: 0;
    }
  }
`;

Header.defaultProps = {
  isOpen: false,
};

export default Header;