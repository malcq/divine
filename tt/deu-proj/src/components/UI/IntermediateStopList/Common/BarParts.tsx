import React, { useRef, useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '../../Icon';
import { STATIC_URLS } from '../../../../utils/constants';
import { colors } from '../../../../theme/default/constants';

const DOT_SIZE = 4; // in px
const DOT_SPACE = 4; // in px
const DEFAULT_COLOR = '#AE0000';

export const SmallBar: React.FC<{ colorInfo: string }> = ({ colorInfo }) => {
  return (
    <SmallBarContainer>
      <SmallCircle className="small-bar__circle" colorInfo={colorInfo} />
    </SmallBarContainer>
  )
}

const SmallBarContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .small-bar {
    &__circle {
      top: 6px;
    }
  }
`;
export const StartBarIcon = React.forwardRef<HTMLDivElement, { colorInfo: string }>(({ colorInfo }, ref) => {
  return (
    <StartBarContanier>
      <div className="start-bar__dots">
        <Dot />
        <Dot />
      </div>
      <BigCirle
        className="start-bar__circle"
        colorInfo={colorInfo}
        ref={ref}
      >
        <Icon
          srcUrl={`${STATIC_URLS.SVG}/arrow.svg`}
          color={colorInfo}
          height={20}
          width={20}
        />
      </BigCirle>
    </StartBarContanier>
  )
})

const StartBarContanier = styled(SmallBarContainer)`
  .start-bar {
    &__circle {
      top: 0;
    }

    & > span:last-child {
      margin-bottom: 0;
    }

    &__dots {
      background-color: white;
      position: absolute;
      top: -15px;
    }
  }
`;

export const MiddleDots: React.FC<{ colorInfo: string }> = ({ colorInfo }) => {
  const [dots, setDots] = useState<number[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!wrapperRef.current) { return; }

    const height = wrapperRef.current.offsetHeight;

    const dotLength = Math.floor((height - 4) / 8);

    const newDots = Array.from({ length: dotLength }, (_, index) => {
      return index;
    });
    setDots(newDots);
  }, []);

  return (
    <MiddleBarContainer>
      <SmallCircle className="middle-bar__circle" colorInfo={colorInfo} />
      <div className="middle-bar__dots-wrapper"
        ref={wrapperRef}
      >
        {dots.map((dot, index) => {
          return (
            <Dot key={index} />
          )
        })}
      </div>
    </MiddleBarContainer>
  );
}

const MiddleBarContainer = styled.div`
  height: 100%;
  .middle-bar {
    &__circle {
      position: absolute;
      left: 50%;
      top: 6px;
      transform: translateX(-50%);
    }
    &__dots-wrapper {
      height: 100%;
      position: absolute;
      width: 100%;
      top: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2;
      background-color: #fff;
    }
 
  }
`;
type EndBarProps = {
  isOpened: boolean;
  isNoExpandetList?: boolean,
  colorInfo: string,
}

export const EndBarIcon = React.forwardRef<HTMLDivElement, EndBarProps>((props, ref) => {
  return (
    <EndBarIconContainer
      isOpened={props.isOpened}
      isNoExpandetList={props.isNoExpandetList}
      colorInfo={props.colorInfo}
    >
      <div className="end-bar__stick" />
      <SmallCircle
        className="end-bar__circle"
        colorInfo={props.colorInfo}
        ref={ref}
      />
    </EndBarIconContainer>
  )
})

export const Dot = styled.span`
  display: block;
  width: 4px;
  height: 4px;
  margin-bottom: 4px;
  border-radius: 100%;
  background-color: rgba(0,0,0,0.4);
`;

type EndBarStylesProps = {
  isOpened: boolean,
  isNoExpandetList?: boolean,
  colorInfo?: string,
}
const EndBarIconContainer = styled.div<EndBarStylesProps>`
  margin-top: 10px;
  position: relative;
  width: 20px;
  margin: 0 auto;
  top: 10px;
  z-index: 3;

  .end-bar {
    &__stick {
      height: 4px;
      width: 20px;
      background-color: ${props => props.colorInfo ? props.colorInfo : DEFAULT_COLOR};
    }

    &__circle {
      top: -5px;
      left: 3px;
    }
  }
`;

export const SmallCircle = styled.div<{ colorInfo?: string }>`
  width: 14px;
  height: 14px;
  border-radius: 100%;
  border: 2px solid ${props => props.colorInfo ? props.colorInfo : DEFAULT_COLOR};
  position: absolute;
  
  z-index: 3;
  background-color: ${props => props.theme.colorValues.white};
`;

export const BigCirle = styled(SmallCircle)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  z-index: 3;
`;
export const Stick = styled.div<{ colorInfo?: string }>`
  width: 4px;
  flex-grow: 1;
  background-color: ${props => props.colorInfo ? props.colorInfo : DEFAULT_COLOR};
`;