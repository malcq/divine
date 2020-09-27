import React, { ReactElement, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { Icon } from '../UI/Icon';

import { STATIC_URLS, ANIMATION_VALUES } from '@utils/constants';
import media from '@utils/media';
import { useCollapseAnimation } from '@utils/hooks/useCollapseAnimation';

interface Props {
  title: ReactElement | null;
  answer: ReactElement | null;
  isOpenCollapse: boolean,
  id?: string,
  hardCardClose: boolean,
  setSightRef?: (elem: HTMLLIElement) => void;
  setFakeSightRef?: (elem: HTMLElement) => void;
  setIsOpenCollapse: () => void;
  setIsCloseCollapse: () => void;
  addShiftToScroll?: (elem: HTMLElement) => void;
  resetHardClose: () => void
};

const FaqItem: React.FC<Props> = (props) => {
  const {
    title,
    answer,
    setSightRef,
    isOpenCollapse,
    setIsOpenCollapse,
    setIsCloseCollapse,
    setFakeSightRef
  } = props;
  const [isMountMaxContent, setIsMountMaxContent] = React.useState(false);
  const animationBoxRef = React.useRef<HTMLDivElement>(null);

  const setUnmount = React.useCallback(() => {
    setIsMountMaxContent(false);
  }, []);

  const clickHandler = (e: SyntheticEvent<HTMLLIElement>): void => {
    const elem = e.target as HTMLElement;
    if (elem.tagName !== 'A') {
      if (!isOpenCollapse) {
        setIsOpenCollapse();
        setIsMountMaxContent(true)
      } else {
        if (e.isTrusted) {
          setIsCloseCollapse()
        }
      }
    }
  };
  React.useEffect(() => {
    if (props.hardCardClose) {
      setIsMountMaxContent(false);
      props.resetHardClose()
    }
  }, [props.hardCardClose])

  useCollapseAnimation({
    animationIn: isOpenCollapse,
    ref: animationBoxRef,
    onAnimationInEnd: () => {
      if (isOpenCollapse && props.addShiftToScroll && animationBoxRef.current) {
        props.addShiftToScroll(animationBoxRef.current)
      }
    },
    onAnimationEnd: setUnmount
  }, []);

  return (
    <>
      {(title && answer) && (
        <StyledContainer
          isOpenCollapse={isOpenCollapse}
          ref={setSightRef}
          onClick={clickHandler}
          id={props.id}
        >
          {/* This span uses for top shifting when fire scrollIntoView
            Event fires on it span which have top equal fixed header height 
          */}

          <div
            className="faq-item__header"
          >
          <span
            ref={setFakeSightRef}
            style={{
              position: 'absolute',
              zIndex: -1000,
              top: -166,
              display: 'block',
              height: 2,
              width: 2
            }} />
            <div className="faq-item__header__text">{title}</div>
            <div className="faq-item__arrow-box">
              <Icon
                className="faq-item__more-button"
                srcUrl={`${STATIC_URLS.SVG}/keyboard_arrow_left.svg`}
                width={8}
                height={12}
              />
            </div>

          </div>
          {
            isMountMaxContent && (
              <div className="animation-content" ref={animationBoxRef}>
                <div className="faq-item__answer">
                  {answer}
                </div>
              </div>
            )
          }
        </StyledContainer>
      )
      }
    </>
  )
};

interface StyledProps {
  isOpenCollapse: boolean;
};

const StyledContainer = styled.li<StyledProps>`
  border-bottom: 0.5px solid ${props => props.theme.colorValues.lightestgrey};

  a {
    text-decoration: underline;

    :hover {
      text-decoration: none;
    }
  }
  ${media.desktop} {
    :last-child {
      border-bottom: none;
    }
  }

  .faq-item {
    &__header {
      padding: 16px 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      cursor:pointer;
      -webkit-tap-highlight-color: transparent;
      position: relative;

      &__text {
        ${props => props.theme.typography.fnTitle2};
        ${props => props.theme.typography.fnText};
        color: ${props => props.theme.colorValues.grey};
      }
    }
    &__arrow-box{
      min-width: 24px;
      height: 24px;
      display: flex;
      align-items:center;
      justify-content:center;
      margin-left: 12px;
    }
    &__more-button {
      cursor: pointer;
      display: inline-block;
      transform: ${props => props.isOpenCollapse ? 'rotate(90deg)' : 'rotate(270deg)'};
      user-select: none;
      opacity: 0.3;
      transition: transform ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.buttonRotateTime}ms;
    }

    &__answer {
      ${props => props.theme.typography.fnBody};
      ${props => props.theme.typography.fnText};
      color: ${props => props.theme.colorValues.lightgrey};
      margin-bottom: 32px;
    }
  }
  &:focus {
    outline: none;
  }

  .animation-content {
    overflow: hidden;
    max-height: 0px;
    opacity: 0;
    transform: translateY(-8.5px);
    transition: all ${ANIMATION_VALUES.FAQ_CARD_ANIMATION.enterAnimation}ms linear;
  }
`;

export default FaqItem;