import React, { useReducer, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Router from 'next/router';

import Header from './Header';
import MaximizedContent from './MaximizedContent';
import MinimizedContent from './MinimizedContent';

import {
  cardBehaviorReducer,
  InitialCardState
} from '../../../reducers/cardAnimationReducer';

import { ANIMATION_VALUES, ProviderTypes, SCHEMA_URL } from '@utils/constants';
import { useCollapseAnimation } from '@utils/hooks/useCollapseAnimation';
import { useBoxHeight } from '@utils/hooks/useBoxHeight';
import media from '@utils/media';

import { OuterResponse } from '@models/journey';
import { BusTrainOptions } from '@models/schema';
import { LinesColorInfo } from '@models/stop';
import { useObserver } from '@utils/hooks/useObserver';

interface Props {
  stopInfo: OuterResponse,
  colorInfo: LinesColorInfo[],
  className?: string,
  isNoneBorder?: boolean,
};

const OuterStopItem: React.FC<Props> = (props) => {
  const {
    provider: transferProvider,
    main_price: mainPrice,
    arr_name: arrName,
    dep_name: depName,
    arr_offset: arrOffset,
    dep_offset: depOffset,
    duration,
    changeovers
  } = props.stopInfo;

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

  useEffect(() => {
    const defaultStateOnUpdate = () => {
      dispatch({ type: 'set_default' })
    }
    Router.events.on('routeChangeComplete', defaultStateOnUpdate);

    return () => {
      Router.events.off('routeChangeComplete', defaultStateOnUpdate);
    }
  }, []);

  useEffect(() => {
    setContanierHeight()
  }, [setContanierHeight, state.minHeight])

  const { isInViewport } = useObserver({
    rootElement: null,
    rootMargin: '-130px 0px 0px 0px',
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
    setIsMountMaxContent(false)
    setContanierHeight()
  }, [setContanierHeight]);

  useCollapseAnimation({
    animationIn: state.isOpen,
    ref: animationBoxRef,
    minHeight: 68,
    exitOpacity: 0,
    onAnimationEnd: setUnmount,
    onAnimationInEnd: setContanierHeight
  }, [callToRecalcHeight]);

  // for recognizing schema.org types (bus or train)
  const tripOptions: BusTrainOptions = React.useMemo(() => {
    const isBus = transferProvider === ProviderTypes.flixbus;
    const itemType = isBus ? `${SCHEMA_URL}/BusStation` : `${SCHEMA_URL}/TrainStation`;

    return {
      tripType: isBus ? 'BusTrip' : 'TrainTrip',
      arrStopOptions: {
        itemProp: isBus ? 'arrivalBusStop' : 'arrivalStation',
        itemType,
      },
      depStopOptions: {
        itemProp: isBus ? 'departureBusStop' : 'departureStation',
        itemType
      }
    }
  }, [transferProvider]);

  //Using for watching when internal intermediate lists would be opened
  const expandListWatcher = () => {
    setCallToRecalcHeight(!callToRecalcHeight);
    setContanierHeight();
  };

  return (
    <StyledContanier
      className={props.className}
      headerHeight={headerHeight}
      minHeight={state.minHeight}
      isOpen={state.isOpen}
      itemScope
      itemType={`${SCHEMA_URL}/${tripOptions.tripType}`}
      ref={contanierRef}
      isVisible={isInViewport}
      invisibleHeight={state.maxHeight}
    >
      <Header
        ref={headerRef}
        transferProvider={transferProvider}
        mainPrice={mainPrice}
        onClick={moreButtonHandler}
        isOpen={state.isOpen}
        minHeight={state.minHeight}
      >
        <MinimizedContent
          isOpen={state.isOpen}
          tripOptions={tripOptions}
          depName={depName}
          arrName={arrName}
          depOffset={depOffset}
          arrOffset={arrOffset}
          duration={duration}
          changeover={changeovers}
          heightSet={minHeightSet}
        />
      </Header>
      {isMountMaxContent &&
        <div className="animation-content" ref={animationBoxRef}>
          <MaximizedContent
            stopInfo={props.stopInfo}
            expandListWatcher={expandListWatcher}
            colorInfo={props.colorInfo}
          />
        </div>
      }
    </StyledContanier>
  )
};

type StylesProps = {
  readonly isNoneBorder?: boolean,
  minHeight: number,
  headerHeight: number,
  isOpen: boolean,
  isVisible: boolean,
  invisibleHeight: number
}

const StyledContanier = styled.div<StylesProps>`
  border-bottom: .5px solid ${props => props.theme.colorValues.lightestgrey};
  padding-bottom: 12px; 
  min-height: 118px;

  ${props => props.minHeight && props.headerHeight && css`
    min-height: ${props.minHeight + props.headerHeight}px;
  `}

  ${props => !props.isVisible && css`
    height: ${props.invisibleHeight}px;
  `}

  :active {
    ${props => props.isOpen
    ? css`
        background-color: 'transparent';
      `
    : css`
        background-color: ${props => props.theme.colorValues.aliceBlue};
      `
  }
  }

  ${media.desktop} {
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
  }
  
  .animation-content {
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

export default OuterStopItem;