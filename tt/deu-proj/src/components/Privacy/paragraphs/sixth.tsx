import React from 'react';
import styled from 'styled-components';

type Props = {}

interface ISixthParagraph {
  title: string,
  main_text: string,
}

const SixthParagraph: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h2 className="sixth-paragraph__title">
        {`VI. ${sixthParagraph.title}`}
      </h2>
      <p className="sixth-paragraph__text">
        {sixthParagraph.main_text}
      </p>
    </StyledWrapper>     
  );
}
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 56px;

.sixth-paragraph {
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

const sixthParagraph: ISixthParagraph = {
  title: "Aufbewahrungsfrist ihrer daten",
  main_text: `Wir bewahren Ihre personenbezogenen Daten entsprechend Art. 17 DSGVO nur so lange auf,
  wie dies für die jeweiligen betreffenden Zwecke, für die wir Ihre personenbezogenen Daten verarbeiten,
  notwendig ist. Falls wir personenbezogene Daten für mehrere Zwecke verarbeiten, werden sie automatisch
  gelöscht oder in einem Format gespeichert, das keine direkten Rückschlüsse auf Ihre Person zulässt,
  sobald der letzte spezifische Zweck erfüllt worden ist. Ein betriebliches Löschkonzept stellt sicher,
  dass alle Ihre personenbezogenen Daten nach dem Grundsatz der Datenminimierung und Art. 17 DSGVO wieder
  gelöscht werden.`
};


export default SixthParagraph;