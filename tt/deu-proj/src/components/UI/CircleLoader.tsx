import React from 'react';
import { defaultProps } from 'react-stickynode';
import styled, { ThemeContext } from 'styled-components';

import  ElipsisAnimation from './icons/ElipsisAnimation';


interface Props {
  isLoading: boolean,
}

const СircleLoader: React.FC<Props> = ({
  isLoading
}) => {
  const { colorValues } = React.useContext(ThemeContext);
    return (
      <React.Fragment>
      {isLoading
        ?
          <React.Fragment>
            <StyledWrapper>
              <ElipsisAnimation color={colorValues.primary} className="circle-loader__ellipsis" />
            </StyledWrapper>
            <StyledLayout />
          </React.Fragment>
        : ''}
      </React.Fragment>
    );
}

СircleLoader.defaultProps = {
  isLoading: false,
};

const StyledLayout = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 999;
`;
const StyledWrapper = styled.div`
  position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -999;
  .circle-loader {
    &__ellipsis {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export default СircleLoader;