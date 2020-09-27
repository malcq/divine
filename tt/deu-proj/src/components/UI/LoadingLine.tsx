import React, { memo } from 'react';
import styled from 'styled-components';

type Props = {

}

const LoadingLine: React.FC<Props> = (props) => {
  //useScrollToTopPage([]);
  return (
    <StyledWrapper>
      <div className="load-line" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #c5cae9;
  overflow: hidden;

  .load-line {
    :before {
      content: "";
      position: absolute;
      top:0px;
      left:0px;
      bottom:0px;
      background: ${props => props.theme.colorValues.primary};
      animation: box-1 2100ms cubic-bezier(0.65,0.81,0.73,0.4) infinite;
    }

    :after {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      background: ${props => props.theme.colorValues.primary};
      animation: box-2 2100ms cubic-bezier(0.16,0.84,0.44,1) infinite;
      animation-delay: 1150ms;
    }
  }

@keyframes box-1 {
  0% {
    left: -35%;
    right: 100%;
  }
  60%,100% {
    left: 100%;
    right: -90%;
  }
}

@keyframes box-2 {
  0% {
    left: -200%;
    right: 100%;
  }
  60%,100% {
    left: 107%;
    right: -8%;
  }
}
`;

export default memo(LoadingLine);