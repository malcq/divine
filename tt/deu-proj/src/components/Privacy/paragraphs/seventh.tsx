import React from 'react';
import styled from 'styled-components';

type Props = {}

interface ISeventhParagraph {
  title: string,
  main_text: string,
}

const SeventhParagraph: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h2 className="seventh-paragraph__title">
        {`VII. ${seventhParagraph.title}`}
      </h2>
      <p className="seventh-paragraph__text">
        {seventhParagraph.main_text}
      </p>
    </StyledWrapper>     
  );
}
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 56px;

.seventh-paragraph {
  &__title {
    ${props => props.theme.typography.fnMedium};
    ${props => props.theme.typography.fnTitle3};
    color: ${props => props.theme.colorValues.darkGrey};
    margin-bottom: 12px;
  }

  &__text {
    ${props => props.theme.typography.fnText};
    ${props => props.theme.typography.fnBody};
    color: ${props => props.theme.colorValues.lightgrey};
  }
}
`;

const seventhParagraph: ISeventhParagraph = {
  title: "Technische und organsatorische massanahmen zum schutz ihrer daten",
  main_text: `Wir verarbeiten Ihre personenbezogenen Daten gemäß den Sicherheitsanforderungen aus Art. 32 DSGVO.
  Hierfür sind bei uns entsprechende technische und organisatorische Sicherheitsmaßnahmen implementiert, die den
  anerkannten IT-Standards entsprechen und laufend überprüft werden. Dadurch stellen wir sicher, dass Ihre Daten
  gegen missbräuchliche Nutzung oder jede andere unzulässige Datenverarbeitung zu jedem Zeitpunkt angemessen
  geschützt sind.`
};


export default SeventhParagraph;