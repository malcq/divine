import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import Changeover from '../RouteLine/Changeover';


type Props = {
  arrTime: string,
  depTime: string
}

const WalkSegment: React.FC<Props> = (props) => {
  const [dots, setDots] = useState<number[]>([]);

  const endRef = useRef<HTMLDivElement>(null);

  // -->> calculating dots length <<-- 

  useEffect(() => {

    const findElem = (parent: any): HTMLElement => {
      if (!!parent.dataset.last) {
        return parent
      }
      return findElem(parent.lastChild);
    };

    if (endRef) {
      const prevElement = endRef.current?.previousElementSibling;
      const currentElement = endRef.current

      if (prevElement && currentElement) {
        const needElem = findElem(prevElement);
        
        const needElemHeight = needElem.offsetHeight;
        const needPaddingTop = parseInt(getComputedStyle(needElem).paddingTop);
        const currHeight = currentElement.offsetHeight;

        const height = needElemHeight + currHeight;
        const dotLength = Math.floor((height - needPaddingTop ) / 8);
        const newDots = Array.from({ length: dotLength }, (_, index) => {
          return index;
        });
        setDots(newDots);
      }
    }
  }, [])

  return (
    <StyledWrapper ref={endRef}>
      <Changeover
        arrTime={props.arrTime}
        depTime={props.depTime}
        dotHeight={dots}
        left={-25}
        bottom={-20}
      />
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  margin-left: 56px;
  border-bottom: .5px solid ${props => props.theme.colorValues.lightestgrey};
`;

export default WalkSegment;