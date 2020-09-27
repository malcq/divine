import React from 'react';
import styled from 'styled-components';
import { STATIC_URLS } from '../../utils/constants';

type Props = {

}
const StopLandingHeadline: React.FC = () => {
  return (
    <StyledContainer>
      <img
        src={`${STATIC_URLS.IMAGES}/stoplanding-bg.jpg`}
        alt="fahrplan-logo"
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.section`
  width: 100%;
  
  & > img {
    display: block;
    max-width: 862px;
    width: 100%;
    height: 267px;
    object-fit: cover;
    margin: 0 auto;
  }
`;

export default StopLandingHeadline;