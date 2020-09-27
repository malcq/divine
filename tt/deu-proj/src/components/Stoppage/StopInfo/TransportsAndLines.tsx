import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import FlipMove from 'react-flip-move';
import dynamic from 'next/dynamic';

import media from '@utils/media';
import { SCHEMA_URL } from '@utils/constants';

import { LinesItemResponse, LinesColorInfo } from '@models/stop';
import { TransportsTypes } from '@models/transports';

import { StopInfoFilter } from '../../../reducers/stopPage/stopInfoReducer';

import TransportButton from './TransportButton';
import { useDragScroll } from '@utils/hooks/useDragScroll';

const LineButton = dynamic(() => import('./LineButton'));

type TransportsAndLinesProps = {
  transports: TransportsTypes[],
  lines: LinesItemResponse[],
  setTransportSelection: (
    transport: TransportsTypes,
    state: boolean,
    cb?: () => void
  ) => void;
  setLineSelection: (
    line: string,
    state: boolean,
    provider: TransportsTypes,
  ) => void;
  stopInfoState: StopInfoFilter,
  lineColorInfo?: LinesColorInfo[],
}

const TransportsAndLines: React.FC<TransportsAndLinesProps> = ({
  transports,
  lines,
  setTransportSelection,
  setLineSelection,
  stopInfoState: {
    transportSelected,
    lineSelected
  },
  lineColorInfo
}) => {
  const [appearAnimation, setAppearAnimation] = React.useState<'none' | 'elevator'>('none');
  const boxRef = useRef<HTMLDivElement>(null);

  const scrollToLeftSide = () => {
    if (boxRef) {
      boxRef.current?.scrollTo({
        left: 0
      })
    }
  };
  useEffect(() => {
    if (appearAnimation === 'none' && transportSelected !== null) {
      setAppearAnimation('elevator')
    }
  }, [transportSelected, appearAnimation]);

  const {
    onMouseDownHandler,
    onMouseMoveHandler,
    onMouseUpHandler
  } = useDragScroll(boxRef, 'x');

  return (
    <StyledContainer
      ref={boxRef}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
      onMouseMove={onMouseMoveHandler}
      itemScope
      itemType={`${SCHEMA_URL}/Service`}
    >
      <FlipMove
        className="transport-filter"
        leaveAnimation="none"
        enterAnimation={appearAnimation}
      >
        {
          transports.map((el, index) => {
            let selected = transportSelected === el;
            let isAvailable = true;
            if (transportSelected !== null) {
              isAvailable = el === transportSelected
            }
            if (!isAvailable) return null;
            return (
              <TransportButton
                key={index}
                className="transport-filter__transport-btn"
                isSelected={selected}
                type={el}
                setTransportSelection={setTransportSelection}
                moveLeft={scrollToLeftSide}
              />
            )
          })
        }
        {transportSelected &&
          <div className="transport-filter__lines">
            {lines.map((el, index) => {

              let selected = lineSelected?.includes(el.line) ?? false;
              let isAvailable = true;
              if (transportSelected !== null) {
                isAvailable = el.transport === transportSelected
              }
              const lineBtnClass = classNames({
                'transport-filter__lines-btn': true,
                'transport-filter__lines-btn--margin-off': !isAvailable,
              })
              if (!isAvailable) return null;
              return (
                <LineButton
                  key={index}
                  className={lineBtnClass}
                  provider={el.transport}
                  selected={selected}
                  type={el.line}
                  setLineSelection={setLineSelection}
                  lineColorInfo={lineColorInfo}
                />
              )
            })}
          </div>
        }
      </FlipMove>
    </StyledContainer >
  )
};

const StyledContainer = styled.div`
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

  .transport-filter {
    padding: 8px 0 0 8px;
    display: flex;
    align-items: center;

    ${media.desktop} {
      padding-left: 0;
    }

    &__lines {
      display: flex;
      align-items: center;
      margin-left: 12px;
      padding: 0 12px;
      box-shadow: -1px 0px 0px 0px ${props => props.theme.colorValues.lightestgrey};
    }

    &__transport-btn {
      margin-right: 4px;

      :last-child {
        margin-right: 0;
      }

      :active {
        background-color: ${props => props.theme.colorValues.aliceBlue};
      }

      ${media.desktop} {
        :hover {
          background-color: ${props => props.theme.colorValues.aliceBlue};
        }
      }
    }

    &__lines-btn {
    margin-right: 12px;
    overflow: hidden;
    transform-origin: left 50%;

    &--margin-off {
      margin-right: 0;
    }
   }

  }
`;


export default TransportsAndLines;