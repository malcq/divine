import React from 'react';
import styled, { css } from 'styled-components';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
}

type Props = {
  src: string;
  previewSrc: string;
  className: string;
  alt: string;
  isOverlay?: boolean;
}
const LazyPicture: React.FC<Props> = (props) => {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [isBlur, setIsBlur] = React.useState(true);

  React.useEffect(() => {
    let isDone = false;
    if (!imgRef.current) return;
    const imgLoader = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!imgRef.current || isDone) return;
          imgRef.current.src = props.src;
          isDone = true;
          setIsBlur(false);
        }
      })
    };
    const imgObserver = new IntersectionObserver(imgLoader, options);
    imgObserver.observe(imgRef.current);
  }, [props.src])

  return (
    <StyledImgWrapper
      isBlur={isBlur}
      isOverlay={props.isOverlay}
    >
      <StyledImg
        ref={imgRef}
        src={props.previewSrc}
        className={props.className}
        alt={props.alt}
        isBlur={isBlur}
      />
    </StyledImgWrapper>
  )
};
type StylesProps = {
  isBlur: boolean;
  isOverlay?: boolean
}
const StyledImg = styled.img<StylesProps>`

  ${props => props.isBlur ? css`
    filter: blur(3px);
  ` : css`
    filter: none;
  `}
  transition: filter 1s;
`;

const StyledImgWrapper = styled.div<StylesProps>`
  overflow: hidden;
  position: relative;
  ${props => props.isOverlay && !props.isBlur && css`
    &:before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 100%);
      border-radius: 6px;
    }
  `}
`;
export default LazyPicture;