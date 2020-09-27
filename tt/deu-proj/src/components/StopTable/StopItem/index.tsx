import React, { useReducer, useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import Router from 'next/router';

import Header from './Header';
import MinimizedContent from './MinimizedContent';
import MaximizedContent from './MaximizedContent';

import { StopResponse, LinesColorInfo } from '@models/stop';

import { SCHEMA_URL } from '@utils/constants';
import { getRelativeTime } from '@utils/time/getRelativeTime';
import { useBoxHeight } from '@utils/hooks/useBoxHeight';
import { useCollapseAnimation } from '@utils/hooks/useCollapseAnimation';

import {
  cardBehaviorReducer,
  getInitialCardState
} from '../../../reducers/cardAnimationReducer';
import { useRelativeTime } from '@utils/hooks/useRelativeTime';
import media from '@utils/media';
import { useObserver } from '@utils/hooks/useObserver';



type Props = {
  stop: StopResponse,
  nowDate: Date,
  isCardOpen: boolean,
  selectedDate: Date,
  scheme: string,
  className?: string,
  lineColorInfo?: LinesColorInfo[],
  isShowSightseeingButton: boolean,
  onSwapHandler: (id: string, opposite_id: string, time: string) => void;
}
const StopItem: React.FC<Props> = (props) => {
  const [state, dispatch] = useReducer(cardBehaviorReducer, getInitialCardState(props.isCardOpen));
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isMountMaxContent, setIsMountMaxContent] = useState(props.isCardOpen);
  const [expandIntermediateList, setExpanded] = useState(false);

  const {
    transport_info: transportInfo,
    stop_title: stopTitle,
    intermediate_stop_list: intermediateStopList,
    stop_time_periods: stopTimePeriods,
    warning_info: warningInfo,
    nearest_trip_time: nearestTime,
    route_back,
    stop_id,
  } = props.stop;

  const { className } = props;
  const stopItemClassNames = classNames('stop-item', className);

  const firstIntermediateStop = intermediateStopList[0];
  const lastIntermediateStop = intermediateStopList[1];
  const animationBoxRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const contanierRef = React.useRef<HTMLDivElement>(null);
  const { viewHeight: headerHeight } = useBoxHeight(headerRef);

  const setContanierHeight = React.useCallback(() => {
    if (contanierRef.current) {
      dispatch({
        type: 'set_max_height',
        height: contanierRef.current.scrollHeight - 2
      })
    }
  }, [dispatch]);

  const setUnmount = React.useCallback(() => {
    setIsMountMaxContent(false);
    setContanierHeight()
  }, [setContanierHeight]);

  useEffect(() => {
    const setDefault = () => {
      dispatch({ type: 'set_default' })
    };
    Router.events.on('routeChangeComplete', setDefault);

    return () => {
      Router.events.off('routeChangeComplete', setDefault);
    }
  }, []);

  useEffect(() => {
    if (!isMountMaxContent) {
      setExpanded(false)
    }
  }, [isMountMaxContent])

  const minHeightSet = useCallback((h: number): void => {
    dispatch({ type: 'set_min_height', height: h });
  }, []);

  const relativeTimeInMin = useRelativeTime({
    nearestTime: nearestTime,
    nowDate: props.nowDate,
    selectedDate: props.selectedDate,
  })

  const { isInViewport } = useObserver({
    rootElement: null,
    rootMargin: '-50px 0px 250px 0px',
    threshold: 0.01,
    observableElement: contanierRef,
  })

  const moreButtonHandler = () => {
    if (!relativeTimeInMin.isAfter) return;
    dispatch({ type: 'set_is_open' });
    setIsMountMaxContent(true);
  }

  const setDisabledOnTimeAgo = (state: boolean): void => {
    setIsDisabled(state);
  };

  useCollapseAnimation({
    animationIn: state.isOpen,
    ref: animationBoxRef,
    minHeight: state.minHeight,
    onAnimationInEnd: setContanierHeight,
    onAnimationEnd: setUnmount
  }, [expandIntermediateList]);

  const expandHandler = React.useCallback(() => {
    setExpanded(true);
    setContanierHeight()
  }, [setContanierHeight]);


  useEffect(() => {
    setContanierHeight()
  }, [setContanierHeight, state.minHeight])

  return (
    <StyledContainer
      isDisabled={isDisabled}
      className={stopItemClassNames}
      itemScope
      itemType={`${SCHEMA_URL}/Trip`}
      isOpen={state.isOpen}
      minHeight={state.minHeight}
      headerHeight={headerHeight}
      ref={contanierRef}
      isVisible={isInViewport}
      invisibleHeight={state.maxHeight}
    >
      <Header
        ref={headerRef}
        relativeTimeInMin={relativeTimeInMin}
        transport={transportInfo.transport}
        line={transportInfo.line}
        stopTitle={stopTitle}
        isOpen={state.isOpen}
        setIsOpen={moreButtonHandler}
        onSwapClick={() => props.onSwapHandler(stop_id, route_back, nearestTime)}
        departureDate={nearestTime}
        setIsDisabled={setDisabledOnTimeAgo}
        isOppositeRouteAnable={!!route_back}
        lineColorInfo={props.lineColorInfo}
      >
        <MinimizedContent
          isOpen={state.isOpen}
          heightSet={minHeightSet}
          firstIntermediateStop={firstIntermediateStop}
          secondIntermediateStop={lastIntermediateStop}
          platformName={props.stop.platform_name}
          timePeriods={stopTimePeriods}
          warningText={warningInfo.description}
          departureDate={nearestTime}
          relativeTimeInMin={relativeTimeInMin}
        />
      </Header>
      {isMountMaxContent &&
        <div className="animation-content" ref={animationBoxRef}>
          <MaximizedContent
            expandHandler={expandHandler}
            expanded={expandIntermediateList}
            scheme={props.scheme}
            stop={props.stop}
            relativeTime={relativeTimeInMin}
            nowDate={props.nowDate}
            lineColorInfo={props.stop.transport_info.color}
            isShowSightseeingButton={props.isShowSightseeingButton}
          />
        </div>
      }
    </StyledContainer>
  );
}

type StyledContainerProps = {
  isDisabled?: boolean,
  minHeight: number,
  isOpen: boolean,
  headerHeight: number,
  isVisible: boolean,
  invisibleHeight: number
}
const StyledContainer = styled.div<StyledContainerProps>`
  position: relative;
  min-height: 104px;
  border-bottom: 1px solid ${props => props.theme.colorValues.lightestgrey};

  
  &:last-child {
    border-bottom: none;
  }

  ${props => props.minHeight && props.headerHeight && css`
    min-height: ${props.minHeight + props.headerHeight}px;
  `}
  
  ${media.desktop} {
    min-height: 112px;
    ${props => props.minHeight && props.headerHeight && css`
      min-height: ${props.minHeight + props.headerHeight}px;
    `}
  }
  ${props => !props.isVisible && css`
    height: ${props.invisibleHeight}px;
  `}


  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    ${props => props.isDisabled
    ? css`
      z-index: 7;
      background-color: ${props => props.theme.colorValues.concrete};
      opacity: .5;
      `
    : css`
      z-index: -1;
      background-color: transparent;
      opacity: 1;
      `
  }
  }
  ${props => !props.isOpen && !props.isDisabled
    ? css`
      &:active ::before {
        background-color: ${props => props.theme.colorValues.aliceBlue};
      }

      ${media.desktop} {
        &:hover ::before {
          background-color: ${props => props.theme.colorValues.aliceBlue};
        }
      }`
    : css``
  } 

  .animation-content {
    overflow: hidden;
    max-height: ${props => props.minHeight}px;
    opacity: 0;
    transform: translateY(-8.5px);
    ${props => props.isOpen ? css`
      transition: max-height 300ms cubic-bezier(0.8, 0, 0.6, 1) 0ms, transform 200ms cubic-bezier(0.8, 0, 0.6, 1) 50ms, opacity 200ms cubic-bezier(0.8, 0, 0.6, 1) 50ms;
    ` : css`
      transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 50ms, opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 50ms;
    `}
  }
  & > * {
    ${props => !props.isVisible && css`
      display: none;
    `}
  }
`;

export default StopItem;