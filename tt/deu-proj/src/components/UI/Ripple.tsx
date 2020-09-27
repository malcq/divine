import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useScreenWidth } from '@utils/hooks/useScreenWidth';

type Props = {
  color?: string;
}

const Ripple: React.FC<Props> = (props) => {
  const circleRef = React.useRef<HTMLSpanElement>(null);
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (circleRef.current) {
      const elem = circleRef.current;
      const parent = elem.parentElement;
      if (parent) {
        const parentCoords = parent.getBoundingClientRect()
        elem.style.top = `${e.clientY - parentCoords.top}px`;
        elem.style.left = `${e.clientX - parentCoords.left}px`;

        elem.classList.add('ripple-circle--active');
        elem.addEventListener('animationend', () => {
          elem.classList.remove('ripple-circle--active')
          elem.style.top = `50%`;
          elem.style.left = `50%`;
        });
      }
    }
  };

  return (
    <RippleBox
      onClick={onClickHandler}
      color={props.color}
    >
      <span className="ripple-circle" ref={circleRef} />
    </RippleBox>
  )
};

const rippleAnimation = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    width: 200%;
    padding-bottom: 200%;
    opacity: 0;
  }
`;

type StylesProps = {
  color?: string;
}

const RippleBox = styled.div<StylesProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
  border-radius: inherit;
  
  .ripple-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: ${props => props.color ? props.color : 'rgba(255, 255, 255, .25)'} ;

    &--active {
      animation: ${rippleAnimation} .3s ease-in;
    }
  }
`;

export default Ripple;