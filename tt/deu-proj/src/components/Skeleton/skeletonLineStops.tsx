import React from 'react';
import styled from 'styled-components';
import { SKELETON } from '@utils/constants';


type Props = {
  /* className?: string */
};

const skeletonArr = Array(20).fill(1);
const InnerItem: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      
       {skeletonArr.map((_, idx) => <div className="skeleton__rectangle skeleton__rectangle--big" key={idx} />)}
     
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  padding: 0 17px;
  .skeleton {
    &__rectangle {
      width: 100%;
      background-color: ${SKELETON.backgroundColor};
      border-radius: 2px;
      position: relative;
      overflow: hidden;

      :before {
        content: "";
        position: absolute;
        opacity: 0;
        top:-50px;
        left:0px;
        width: 20px;
        height: 140px;
        background: ${SKELETON.background};
        animation: ${SKELETON.animation} 2700ms linear infinite;
      }

      &--big {
        margin-top: 17px;
        height: 20px;
      }
    }
  }
`;

export default InnerItem;

