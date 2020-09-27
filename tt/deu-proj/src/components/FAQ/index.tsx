import React, { useReducer } from 'react';
import styled from 'styled-components';
import FaqItem from './FaqItem';
import { contentCards } from './ContentCards';
import faqReducer, { getFaqInitialState } from './FaqReducer';

import media from '@utils/media';
import { useDragScroll } from '@utils/hooks/useDragScroll';
import { FaqResponse, ContentTypes } from '@models/stopfaq';
import { LineFaqResponse, LineContentTypes } from '@models/linefaq';
import { LinesColorInfo } from '@models/stop';
type StopProps = {
  type: 'stop'
  faq: FaqResponse,
};
type LineProps = {
  type: 'line',
  faq: LineFaqResponse
};
type Faqs = StopProps | LineProps;
type Props = {
  colorInfo?: LinesColorInfo[],
  className?: string,
  setSightRef?: (elem: HTMLLIElement) => void;
  setFakeSightRef?: (elem: HTMLElement) => void;
  addShiftToScroll?: (elem: HTMLElement) => void;
} & Faqs;
const Faq: React.FC<Props> = (props) => {
  const {
    faq,
    className,
    type,
    setSightRef,
    setFakeSightRef
  } = props;
  const [state, dispatch] = useReducer(faqReducer, getFaqInitialState(faq));
  const [hardCardClose, setHardCardClose] = React.useState(false);
  const isInit = React.useRef(true);

  const setIsOpenCollapse = (id: number) => {
    dispatch({ type: 'set_opened', id });
  };

  const setIsCloseCollapse = (id: number) => {
    dispatch({ type: 'set_close', id });
  }

  React.useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
      return;
    }
    dispatch({ type: 'set_new_state', arr: faq });
    setHardCardClose(true)
  }, [faq]);

  const resetHardClose = React.useCallback(() => {
    setHardCardClose(false)
  }, []);

  return (
    <StyledContainer
      className={className}
    >
      <header className="faq__header">FAQ</header>
      <ul
        className="faq__content"
      >
        {type === 'stop' ?
          ((faq as FaqResponse).map((el, index) => {
            const element = el;
            if (element.type === ContentTypes.operatingHours) {
              element.linesColorInfo = props.colorInfo
            }
            const { answer, title } = contentCards('stop', element);
            const collapseState = state.find((item) => item.id === index);
            return (
              <FaqItem
                key={index}
                title={title}
                answer={answer}
                setIsOpenCollapse={() => setIsOpenCollapse(index)}
                setIsCloseCollapse={() => setIsCloseCollapse(index)}
                isOpenCollapse={!!collapseState?.isOpen}
                setSightRef={el.type === ContentTypes.pointsOfInterests ? setSightRef : () => null}
                addShiftToScroll={props.addShiftToScroll}
                hardCardClose={hardCardClose}
                resetHardClose={resetHardClose}
              />
            )
          })) : (
            (faq as LineFaqResponse).map((el, index) => {
              const element = el;
              element.linesColorInfo = props.colorInfo
              const { answer, title } = contentCards('line', element);
              const collapseState = state.find((item) => item.id === index);
              return (
                <FaqItem
                  key={index}
                  title={title}
                  answer={answer}
                  setIsOpenCollapse={() => setIsOpenCollapse(index)}
                  setSightRef={el.type === LineContentTypes.pointsOfInterests ? setSightRef : () => null}
                  setFakeSightRef={el.type === LineContentTypes.pointsOfInterests ? setFakeSightRef : () => null}
                  isOpenCollapse={!!collapseState?.isOpen}
                  setIsCloseCollapse={() => setIsCloseCollapse(index)}
                  addShiftToScroll={props.addShiftToScroll}
                  hardCardClose={hardCardClose}
                  resetHardClose={resetHardClose}
                />
              )
            })
          )
        }
      </ul>
    </StyledContainer>
  )
};


const StyledContainer = styled.section`
  width: 100%;
  
  .faq {
    &__header { 
      ${props => props.theme.typography.fnTitle3};
      ${props => props.theme.typography.fnText};
      color: ${props => props.theme.colorValues.darkGrey};
      margin-bottom: 8px;
    }
  }
`;
export default Faq;