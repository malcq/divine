import React from 'react';
import styled from 'styled-components';
import InnerItem from './InnerItem';

type Props = {

};
const skeletonArr = Array(10).fill(1);

const Skeleton: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      <div className="skeleton__edge-item skeleton__edge-item--top">
        <div />
      </div>
      <div className="skeleton__inner-content" >
        {skeletonArr.map((_, idx) => {
          return (
            <InnerItem key={idx} />
          )
        })
        }
      </div>
      <div className="skeleton__edge-item skeleton__edge-item--bottom">
        <div />
      </div>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .skeleton {

    &__edge-item {
      & > div {
        width: 58px;
        height: 16px;
        background-color: rgba(0, 0, 0, 0.07);
        margin: 12px 0 12px 16px;
      }
        &--top {
          border-bottom: 1px solid ${props => props.theme.colorValues.lightestgrey};
        }
        &--bottom {
          border-top: 1px solid ${props => props.theme.colorValues.lightestgrey};
        }
    }

    &__inner-content {   
      & > div:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.colorValues.lightestgrey}; 
      }
    }
  }
`;

export default Skeleton;