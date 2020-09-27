import React from 'react';
import styled from 'styled-components';

import BaseHeader from '../UI/BaseHeader';
import media from '../../utils/media';

const StopHeader: React.FC = () => {
  return (
    <>
      <Wrapper>
        <BaseHeader className="stop-header-content" />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.header`
  max-width: ${props => props.theme.gridValues.maxContentWidth + (2 * props.theme.gridValues.sideDesktopPadding) + 1}px;
  margin: 0 auto;

  ${media.desktop} {
    padding: 0 ${props => props.theme.gridValues.sideDesktopPadding}px;
  }
`;


export default StopHeader;