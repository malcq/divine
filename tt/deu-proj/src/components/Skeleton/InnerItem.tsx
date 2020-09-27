import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SKELETON } from '@utils/constants';


type Props = {
  className?: string
};

const InnerItem: React.FC<Props> = (props) => {
  return (
    <StyledWrapper className={props.className}>
      <div className="skeleton__inner-top">
        <div className="skeleton__circle" />
        <div className="skeleton__rectangle skeleton__rectangle--small" />
        <div className="skeleton__rectangle skeleton__rectangle--big" />
        <div className="skeleton__rectangle skeleton__rectangle--medium" />
      </div>
      <div className="skeleton__inner-middle">
        <div className="skeleton__rectangle skeleton__rectangle--common" />
      </div>
      <div className="skeleton__inner-bottom">
        <div className="skeleton__rectangle skeleton__rectangle--common" />
        <div className="skeleton__rectangle skeleton__rectangle--medium" />
      </div>
    </StyledWrapper>
  )
};

const loading = keyframes`
  0% {
    transform: translateX(0) rotate(45deg);
    opacity: 1;
  }
  40%, 100% {
    opacity: 0;
    transform: translateX(1550%) rotate(45deg);
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 21px 16px 20px;
  
  .skeleton {

    &__circle {
        height: 16px;
        width: 16px;
        border-radius: 100%;
        background-color: ${SKELETON.backgroundColor};
      }

    &__inner-top {
      display: flex;
      align-items: center;
      & > div:last-child {
        margin-left: auto;
      }
    }
    &__inner-middle {
      margin: 7px 0 5px;
    }
    &__inner-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

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
      &--common {
        height: 14px;
        max-width: 160px;
      }

      &--big {
        height: 20px;
        max-width: 210px;
      }

      &--small {
        height: 20px;
        max-width: 33px;
        margin: 0 10px 0 5px;
        border-radius: 4px;
      }

      &--medium {
        max-width: 50px;
        height: 14px;
      }
    }
  }
`;

export default InnerItem;

