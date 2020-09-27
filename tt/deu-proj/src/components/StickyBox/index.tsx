import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled, { css } from 'styled-components';
import media from '../../utils/media';

type Props = {
  isDesktop: boolean,
  top: number,
  extraTop?: number,
  desktopTop?:number,
  innerZ?: number, 
  state?: boolean,
}

const StickyBox: React.FC<Props> = (props) => {

  const [isPositionFixed, setIsPositionFixed] = useState(false);
  
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const mainHeight: number = useMemo(() => {
    if (innerRef.current) {
      return innerRef.current?.offsetHeight;
    } return 0;
  }, [isPositionFixed, innerRef]);


  useEffect(() => {
    const calcPositionCoords = (event: any) => {

      const el = outerRef.current;
      if (!el) { return; }
      const {
        top: elTop
      } = el.getBoundingClientRect();

      if ((elTop <= Math.trunc(props.top)) && !isPositionFixed) {
        setIsPositionFixed(true);
      } else if ((elTop > props.top) && isPositionFixed) {
        setIsPositionFixed(false);
      }
    }

    window.addEventListener('scroll', calcPositionCoords);

    return () => window.removeEventListener('scroll', calcPositionCoords);

  }, [isPositionFixed, props.top])

  return (
    <StyledWrapper
      isFixed={isPositionFixed}
      top={props.top}
      mainHeight={mainHeight}
      extraTop={props.extraTop}
      state={props.state}
      innerZ={props.innerZ}
      desktopTop={props.desktopTop}
      ref={outerRef}
    >
      <div className="sticky-box__inner-wrapper" ref={innerRef}>
        {props.children}
      </div>
    </StyledWrapper>
  )
};

type StylesProps = {
  readonly isFixed: boolean,
  readonly top: number,
  readonly mainHeight: number,
  readonly extraTop?: number,
  readonly state?: boolean
  readonly innerZ?: number,
  readonly desktopTop?: number
  
};

const StyledWrapper = styled.div<StylesProps>`

  ${props => props.isFixed && css`
    height: ${props.mainHeight}px;
  `}

  .sticky-box {

    &__inner-wrapper {
      z-index: ${props => props.innerZ ? props.innerZ : '0'};
      width: 100%;

      ${props => props.isFixed && css`
        position: fixed;
        top: 0;
        transform: translateY(${props.state ? props.extraTop : props.top}px);
        ${media.desktop} {
          ${props.desktopTop && css`
          transform: translateY(${props.desktopTop}px);
      `}
      }
      `}
    }
  }
`;

export default StickyBox;