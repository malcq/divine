import React from 'react';
import styled from 'styled-components';
import { STATIC_URLS } from '../../utils/constants';
import media from '../../utils/media';

type Props = {

}
const Headline: React.FC = () => {

  return (
    <StyledContainer>
      <img
        src={`${STATIC_URLS.SVG}/fahrplan_main_bg.svg`}
        alt="fahrplan-logo"
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.section`
  width: 100%;

  & > img {
    display: block;
    width: 100%;
    height: 152px;
    object-fit: cover;

    ${media.desktop} {
      height: 216px;
    }
  }
`;

export default Headline;