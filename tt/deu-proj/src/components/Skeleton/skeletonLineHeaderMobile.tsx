import React from 'react';
import styled from 'styled-components';
import { SKELETON } from '@utils/constants';
import media from '@utils/media';

type Props = {};


const SkeletonLineHeaderMobile: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      <div className="skeleton__inner-top">
      <div className="skeleton__rectangle skeleton__rectangle--medium" />
      </div>
      <div className="skeleton__inner-middle">
        <div className="skeleton__circle" />
        <div className="skeleton__rectangle skeleton__rectangle--small" />
        <div className="skeleton__rectangle skeleton__rectangle--title" />
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
  padding: 17px 0 16px 16px;
  border-bottom: .5px solid rgba(0,0,0,0.10);
  box-shadow: 0px 2px 4px rgba(0,0,0,0.16);
  background-color: #FFFFFF;

  ${media.desktop} {
    display: none;
  }
  
  .skeleton {
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

    &__circle {
        height: 20px;
        width: 20px;
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
      &--small {
        height: 20px;
        max-width: 33px;
        margin-right: 10px;
        border-radius: 4px;
      }

      &--title {
        max-width: 181px;
        height: 24px;
      }

      &--medium {
        max-width: 180px;
        height: 20px;
      }

      &--pill-btn {
        max-width: 193px;
        height: 34px;
        border-radius: 30px;
      }
    }
  }
`;


export default SkeletonLineHeaderMobile;