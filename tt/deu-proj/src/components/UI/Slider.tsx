import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import media from '@utils/media';

import KeyboardArrow from '../UI/icons/KeyboardArrowRightLink';
import { useDragScroll } from '@utils/hooks/useDragScroll';


const DEFAULT_SLIDES_TO_SCROLL = 1;

export type SliderOptions = {
  prevClass: string,
  nextClass: string,
  slidesToScroll?: number,
  showSlides?: number,
}

type ArrowProps = {
  isHide: boolean,
  onClick?: () => void,
  className: string,
}


const LeftArrow: React.FC<ArrowProps> = (props) => {
  return (
    <>
      <Previous onClick={props.onClick} isHide={props.isHide} className={props.className}>
        <KeyboardArrow width="8px" height="12px" />
      </Previous>
    </>
  )
}

const RightArrow: React.FC<ArrowProps> = (props) => {
  return (
    <>
      <Next onClick={props.onClick} isHide={props.isHide} className={props.className}>
        <KeyboardArrow width="8px" height="12px" />
      </Next>
    </>
  )
}

const Slider: React.FC<SliderOptions> = (props) => {
  const [hideNext, setHideNext] = useState(false);
  const [hidePrev, setHidePrev] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const {
    slidesToScroll = DEFAULT_SLIDES_TO_SCROLL,
    showSlides = 4,
    nextClass,
    prevClass,
  } = props;

  const scrollToLeftSide = () => {
    const curPosX = sliderRef.current?.scrollLeft ?? 0;
    const el = (sliderRef.current?.children[1].firstElementChild as HTMLElement);
    const style = window.getComputedStyle(el);
    const marginRight = parseInt(style.marginRight) || 0;
    const marginLeft = parseInt(style.marginLeft) || 0;
    const itemWidth = el.offsetWidth + marginRight + marginLeft;

    if (sliderRef) {
      let sliderPos = curPosX - (itemWidth * slidesToScroll);
      sliderRef.current?.scrollTo({ left: sliderPos, behavior: 'smooth' });     
    }
  };

  const scrollToRightSide = () => {
    const curPosX = sliderRef.current?.scrollLeft ?? 0;
    const el = (sliderRef.current?.children[1].firstElementChild as HTMLElement);
    const style = window.getComputedStyle(el);
    const marginRight = parseInt(style.marginRight) || 0;
    const marginLeft = parseInt(style.marginLeft) || 0;
    const itemWidth = el.offsetWidth + marginRight + marginLeft;

    if (sliderRef) {
      let sliderPos = curPosX + (itemWidth * slidesToScroll);
      sliderRef.current?.scrollTo({ left: sliderPos, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    if (!sliderRef.current) return;

    const options = {
      root: sliderRef.current,
      rootMargin: '0px',
      threshold: 1
    }

    const nextElObs = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) =>  entry.isIntersecting ? setHideNext(true) : setHideNext(false))
    };

    const prevElObs = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => entry.isIntersecting ? setHidePrev(true) : setHidePrev(false))
    };
   
    const lastElContent = (sliderRef.current?.children[1].lastElementChild?.lastElementChild as HTMLElement);
    const firstEl = (sliderRef.current?.children[1].firstElementChild as HTMLElement);
   
    const nextBtnObserver = new IntersectionObserver(nextElObs, options);
    const prevBtnObserver = new IntersectionObserver(prevElObs, options);

    nextBtnObserver.observe(lastElContent);
    prevBtnObserver.observe(firstEl);

  }, []);

  const {
    onMouseDownHandler,
    onMouseMoveHandler,
    onMouseUpHandler,
  } = useDragScroll(sliderRef, 'x');

  return (
    <StyledWrapper>
      <div className="slider"
        ref={sliderRef}
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        onMouseMove={onMouseMoveHandler}
        itemScope
      >
        <LeftArrow isHide={hidePrev} onClick={scrollToLeftSide} className={prevClass} />
          {props.children}
        <RightArrow isHide={hideNext} onClick={scrollToRightSide} className={nextClass} />
      </div>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  .slider {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-x: auto;
    user-select: none;
    ::-webkit-scrollbar {
      display: none;
    }

    &__line {
      display: flex;
    }

    &__item {
      margin-right: 12px;
      flex: 1 0 20%;
    }
  }
`;

const StyledButton = styled.button`

  display: none;

  ${media.custom(960)} {
    display: flex;
    position: absolute;
    border-radius: 100%;
    top: 2px;
    border: 0.5px solid rgba(0,0,0,0.06);
    background-color: ${props => props.theme.colorValues.white};
    box-shadow: 0 2px 6px ${props => props.theme.colorValues.lightestgrey};
    height: 36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      box-shadow: 0 2px 10px ${props => props.theme.colorValues.lightestgrey};
    }
  }
`

type InputProps = {
  isHide: boolean,
}

const Previous = styled(StyledButton)<InputProps>`
  z-index: ${props => props.isHide ? -1 : 1};
  opacity: ${props => props.isHide ? 0 : 1};
`;

const Next = styled(StyledButton)<InputProps>`
  && {
    z-index: ${props => props.isHide ? -1 : 1};
    opacity: ${props => props.isHide ? 0 : 1};
  }
`;

export default Slider;