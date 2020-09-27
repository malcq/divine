import React from 'react';
import styled from 'styled-components';
import { SKELETON } from '@utils/constants';

type Props = {

};


const SkeletonLineHeader: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      <div className="skeleton__top">
        <div className="skeleton__rectangle skeleton__rectangle--common" />
        <div className="skeleton__rectangle skeleton__rectangle--caret" />
        <div className="skeleton__rectangle skeleton__rectangle--common" />
        <div className="skeleton__rectangle skeleton__rectangle--caret" />
        <div className="skeleton__rectangle skeleton__rectangle--common" />
      </div>
      <div className="skeleton__inner-top">
      <div className="skeleton__rectangle skeleton__rectangle--medium" />
      </div>
      <div className="skeleton__inner-middle">
        <div className="skeleton__circle" />
        <div className="skeleton__rectangle skeleton__rectangle--small" />
        <div className="skeleton__rectangle skeleton__rectangle--title" />

      </div>
      <div className="skeleton__inner-bottom">
        <div className="skeleton__rectangle skeleton__rectangle--long" />
      </div>
      <div className="skeleton__bottom">
      <div className="skeleton__rectangle skeleton__rectangle--pill-btn" />
      </div>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 17px;
  
  .skeleton {

    &__top {
      display: flex;
      align-items: center;
      margin-bottom: 35px;
    }
    &__bottom {
      margin-top: 20px;
    }
    &__inner-top {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    &__inner-middle {
      display: flex;
      align-items: center;
    }
    &__inner-bottom {
      margin-top: 20px;
    }

    &__circle {
        height: 28px;
        width: 28px;
        border-radius: 100%;
        background-color: ${SKELETON.backgroundColor};
        margin-right: 5px;
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
        height: 11px;
        max-width: 53px;
      }

      &--caret {
        margin: 0 5px;
        width: 5px;
        height: 8px;
      }

      &--long {
        height: 20px;
        max-width: 320px;
      }

      &--small {
        height: 28px;
        max-width: 38px;
        margin-right: 20px;
        border-radius: 4px;
      }

      &--title {
        max-width: 310px;
        height: 34px;
      }

      &--medium {
        max-width: 180px;
        height: 20px;
      }

      &--pill-btn {
        max-width: 170px;
        height: 34px;
        border-radius: 30px;
      }
    }
  }
`;


export default SkeletonLineHeader;