import React from 'react';
import styled from 'styled-components';

import FirstParagraph from './paragraphs/first';
import SecondParagraph from './paragraphs/second';
import ThirdParagraph from './paragraphs/third';
import FourthParagraph from './paragraphs/fourth';
import FifthParagraph from './paragraphs/fifth';
import SixthParagraph from './paragraphs/sixth';
import SeventhParagraph from './paragraphs/seventh';
import EigthParagraph from './paragraphs/eighth';
import NinthParagraph from './paragraphs/ninth';
import TenthParagraph from './paragraphs/tenth';
import EleventhParagraph from './paragraphs/eleventh';
import TwelfthParagraph from './paragraphs/twelfth';
import * as privacy from './privacyContent.json';


type Props = {}

const Privacy: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h1 className="privacy__title-main">
        {privacy.page_title}
      </h1>
      <p className="privacy__text">
        {privacy.main_text}
      </p>
      <FirstParagraph />
      <SecondParagraph />
      <ThirdParagraph />
      <FourthParagraph />
      <FifthParagraph />
      <SixthParagraph />
      <SeventhParagraph />
      <EigthParagraph />
      <NinthParagraph />
      <TenthParagraph />
      <EleventhParagraph />
      <TwelfthParagraph />
    </StyledWrapper>
  )
  
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .privacy {

    &__title-main {
      ${props => props.theme.typography.fnTitle1};
      ${props => props.theme.typography.fnRegular};
      color: ${props => props.theme.colorValues.grey};
      margin-bottom: 12px;
    }

    &__text {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};

    }
  }
`;

export default Privacy;