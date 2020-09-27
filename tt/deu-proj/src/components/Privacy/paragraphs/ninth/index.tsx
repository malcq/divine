import React from 'react';
import styled from 'styled-components';

import FirstSection from './firstSection';
import SecondSection from './secondSection';
import ThirdSection from './thirdSection';
import FourthSection from './fourthSection';
import FiveSection from './fiveSection';



type Props = {}

interface INinthParagraph {
  title: string,
}


const NinthParagraph: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h2 className="ninth-paragraph__title">
        {`IX. ${ninthParagraph.title}`}
      </h2>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FiveSection />
    </StyledWrapper>     
  );
}
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 56px;
.ninth-paragraph {
  &__title {
    ${props => props.theme.typography.fnMedium};
    ${props => props.theme.typography.fnTitle3};
    color: ${props => props.theme.colorValues.darkGrey};
    margin-bottom: 12px;
  }
}
`;

const ninthParagraph: INinthParagraph = {
  title: "Einzelne datenerherbungen",
};


export default NinthParagraph;