import React from 'react';
import styled from 'styled-components';

const secondParagraph = {
  title: "Definitionen",
  sub_title: "Verwendete Begrifflichkeiten",
};

type Props = {}

const SecondParagraph: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
        <h2 className="second-paragraph__title">
          {`II. ${secondParagraph.title}`}
        </h2>
        <h3 className="second-paragraph__sub-title">
          {secondParagraph.sub_title}
        </h3>
        <div className="second-paragraph__text second-paragraph__content">
          <span className="second-paragraph__text--dark">
            1.
          </span>
          <p className="second-paragraph__text-content">
            <span className="second-paragraph__text--dark">„Personenbezogene Daten“</span>
            sind alle Informationen, die sich auf
            eine identifizierte oder identifizierbare natürliche Person (im Folgenden
            „betroffene Person“)beziehen; als identifizierbar wird eine natürliche Person
            angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer
            Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer
            Online-Kennung (z.B. Cookie) oder zu einem oder mehreren besonderen Merkmalen
            identifiziert werden kann, die Ausdruck der physischen, physiologischen,
            genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität
            dieser natürlichen Person sind.
          </p>
        </div>
        <div className="second-paragraph__text second-paragraph__content">
          <span className="second-paragraph__text--dark">
            2.
          </span>
          <p className="second-paragraph__text-content">
            <span className="second-paragraph__text--dark">„Verarbeitung“</span>
            ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführten Vorgang oder
            jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten.
            Der Begriff reicht weit und umfasst praktisch jeden Umgang mit Daten.
          </p>
        </div>
        <div className="second-paragraph__text second-paragraph__content">
          <span className="second-paragraph__text--dark">
            3.
          </span>
          <p className="second-paragraph__text-content">
            Als <span className="second-paragraph__text--dark">„Verantwortlicher“</span> wird die natürliche oder juristische Person, Behörde,
            Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die
            Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet, bezeichnet
          </p>
        </div>
    </StyledWrapper>     
  );
}
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 56px;

.second-paragraph {
  &__title {
    ${props => props.theme.typography.fnMedium};
    ${props => props.theme.typography.fnTitle3};
    color: ${props => props.theme.colorValues.darkGrey};
  }

  &__text {
    ${props => props.theme.typography.fnText};
    ${props => props.theme.typography.fnBody};
    color: ${props => props.theme.colorValues.lightgrey};

    &--dark {
      color: ${props => props.theme.colorValues.darkGrey};
    }
  }
 
  &__sub-title {
    ${props => props.theme.typography.fnMedium};
    font-size: 16px;
    letter-spacing: 0;
    line-height: 22px;
    color: ${props => props.theme.colorValues.grey};
    margin: 24px 0 12px 0;
  }

  &__content {
    display: flex;
    padding-bottom: 12px;

    &:last-child {
      padding-bottom: 0;
    }
  }

  &__text-content {
    padding-left: 12px;
  }
}
`;

export default SecondParagraph;