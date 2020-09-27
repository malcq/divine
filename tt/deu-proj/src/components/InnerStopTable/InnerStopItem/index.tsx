import React, { useReducer, useState, useRef } from 'react';
import Router from 'next/router';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import isAfter from 'date-fns/isAfter';
import differenceInMinutes from 'date-fns/differenceInMinutes'

import { InnerResponse } from '@models/journey';
import { LinesColorInfo } from '@models/stop';

import { cardBehaviorReducer, InitialCardState } from '../../../reducers/cardAnimationReducer';

import { ANIMATION_VALUES } from '@utils/constants';
import { useCollapseAnimation } from '@utils/hooks/useCollapseAnimation';
import { useBoxHeight } from '@utils/hooks/useBoxHeight';

import Header from './Header';
import MaximizedContent from './MaximizedContent';
import MinimizedContent from './MinimizedContent';
import { useObserver } from '@utils/hooks/useObserver';

interface Props {
  nowDate: Date,
  className?: string,
  isNoneBorder?: boolean,
  responseStopInfo: InnerResponse,
  currentDate: Date,
  colorInfo: LinesColorInfo[],
};

const InnerStopItem: React.FC<Props> = (props) => {

  const [state, dispatch] = useReducer(cardBehaviorReducer, InitialCardState);
  const animationBoxRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contanierRef = useRef<HTMLDivElement>(null);
  const [isMountMaxContent, setIsMountMaxContent] = useState(false);
  const [callToRecalcHeight, setCallToRecalcHeight] = useState(false);
  const { viewHeight: headerHeight } = useBoxHeight(headerRef);

  const setContanierHeight = React.useCallback(() => {
    if (contanierRef.current) {
      dispatch({
        type: 'set_max_height',
        height: contanierRef.current.scrollHeight - 2
      })
    }
  }, [dispatch]);

  React.useEffect(() => {
    const defaultStateOnUpdate = () => {
      dispatch({ type: 'set_default' })
    }
    Router.events.on('routeChangeComplete', defaultStateOnUpdate);

    return () => {
      Router.events.off('routeChangeComplete', defaultStateOnUpdate);
    }
  });

  React.useEffect(() => {
    setContanierHeight()
  }, [setContanierHeight, state.minHeight])

  const { isInViewport } = useObserver({
    rootElement: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.01,
    observableElement: contanierRef,
  })

  const minHeightSet = (h: number): void => {
    dispatch({ type: 'set_min_height', height: h });
  };

  const moreButtonHandler = () => {
    dispatch({ type: 'set_is_open' });
    setIsMountMaxContent(true);
  };

  const setUnmount = React.useCallback(() => {
    setIsMountMaxContent(false);
    setContanierHeight()
  }, [setContanierHeight]);

  useCollapseAnimation({
    animationIn: state.isOpen,
    ref: animationBoxRef,
    minHeight: 50,
    onAnimationEnd: setUnmount,
    onAnimationInEnd: setContanierHeight
  },[callToRecalcHeight]);

  //Using for watching when internal intermediate lists would be opened
  const expandListWatcher = () => {
    setCallToRecalcHeight(!callToRecalcHeight);
    setContanierHeight();
  };

  const timePeriods = React.useMemo((): string => {
    if (props.responseStopInfo.estimated_reaching_time.length > 0) {
      const filteredTimes = props.responseStopInfo.estimated_reaching_time
        .filter((time) => {
          return isAfter(new Date(time), props.currentDate) &&
            isAfter(new Date(time), new Date(props.responseStopInfo.dep_offset))
        })
        .filter((_, ind) => ind < 3);

      const strTimes = filteredTimes.map((time) => {
        return differenceInMinutes(new Date(time), props.currentDate)
      })
      return strTimes.join(', ');
    }
    return ''
  }, [props.currentDate, props.responseStopInfo.estimated_reaching_time]);

  return (
    <StyledContanier
      className={props.className}
      isNoneBorder={props.isNoneBorder}
      minHeight={state.minHeight}
      headerHeight={headerHeight}
      isOpen={state.isOpen}
      ref={contanierRef}
      isVisible={isInViewport}
      invisibleHeight={state.maxHeight}
    >
      <Header
        ref={headerRef}
        simplifiedList={props.responseStopInfo.simplified_journey_list}
        minHeight={state.minHeight}
        isOpen={state.isOpen}
        onClick={moreButtonHandler}
        duration={props.responseStopInfo.duration}
        colorInfo={props.colorInfo}
      >
        <MinimizedContent
          isOpen={state.isOpen}
          heightSet={minHeightSet}
          arrOffset={props.responseStopInfo.arr_offset}
          depOffset={props.responseStopInfo.dep_offset}
          timePeriod={timePeriods}
          depName={props.responseStopInfo.dep_name}
        />
      </Header>
      {isMountMaxContent &&
        <div className="animation-content" ref={animationBoxRef}>
          <MaximizedContent
            nowDate={props.nowDate}
            responseStopInfo={props.responseStopInfo}
            expandListWatcher={expandListWatcher}
            colorInfo={props.colorInfo}
          />
        </div>}
    </StyledContanier>
  )
};

type StylesProps = {
  isNoneBorder?: boolean,
  minHeight: number,
  headerHeight: number,
  isOpen: boolean,
  isVisible: boolean,
  invisibleHeight: number
}

const StyledContanier = styled.div<StylesProps>`
  border-bottom: .5px solid ${props => props.theme.colorValues.lightestgrey};
  padding-bottom: 16px;
  min-height: 112px;

  ${props => props.minHeight && props.headerHeight && css`
    min-height: ${props.minHeight + props.headerHeight}px;
  `}

  ${props => !props.isVisible && css`
    height: ${props.invisibleHeight}px;
  `}
  
  :hover {
    ${props => props.isOpen
    ? css`
        background-color: 'transparent';
      `
    : css`
        background-color: ${props => props.theme.colorValues.aliceBlue};
      `
  }
  }

  .animation-content {
    overflow: hidden;
    max-height: ${props => props.minHeight}px;
    opacity: 0;
    transform: translateY(-8.5px);
    ${props => props.isOpen ? css`
      transition: max-height 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 50ms, opacity 500ms cubic-bezier(0.4, 0, 0.2, 1) 50ms;
    ` : css`
      transition: max-height 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 50ms, opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 50ms;
    `}

  }
  
  
  &:last-child {
        border-bottom: none;
  }

  ${props => props.isNoneBorder && css`
      border-bottom: none;
  `}

  & > * {
    ${props => !props.isVisible && css`
      display: none;
    `}
  }
  .animation {

    &-enter {
    opacity: 0;
    }

    &-enter-active {
      opacity: 1;
      transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1) 200ms;
    }

    &-exit {
      opacity: 1;
    }

    &-exit-active {
      transform: translate3d(0, 3.5px, 0);
      opacity: 0;
      transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
    }

  }
`;

export default InnerStopItem;