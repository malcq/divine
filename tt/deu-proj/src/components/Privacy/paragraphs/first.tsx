import React from 'react';
import styled from 'styled-components';

type Props = {}

interface IFirstParagraph {
  title: string,
  content: IContent[],
}

interface IContent {
  title: string,
  text: string,
}

const FirstParagraph: React.FC<Props> = (props) => {  
  return (
    <StyledWrapper>
        <h2 className="first-paragraph__title">
          {`I. ${firstParagraph.title}`}
        </h2>
        {firstParagraph.content.map((content: IContent, index: number): React.ReactFragment => {
          return (
            <React.Fragment key={index}>
              <h3 className="first-paragraph__sub-title">
                {`${index + 1}. ${content.title}`}
              </h3>
              <p className="first-paragraph__text">
                {content.text}
              </p>
            </React.Fragment>
          )
        })}
    </StyledWrapper>     
  );
}
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 56px 0;

.first-paragraph {
  &__title {
    ${props => props.theme.typography.fnMedium};
    ${props => props.theme.typography.fnTitle3};
    color: ${props => props.theme.colorValues.darkGrey};
  }

  &__text {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
  }

  &__sub-title {
    ${props => props.theme.typography.fnMedium};
    font-size: 16px;
    letter-spacing: 0;
    line-height: 22px;
    color: ${props => props.theme.colorValues.grey};
    margin: 24px 0 12px 0;
  }
}
`;

const firstParagraph: IFirstParagraph = {
  title: "Verantwortlicher für die Datenverarbeitungsvorgänge",
  content: [
    {
      title: "Name und Kontaktdaten des für die Verarbeitung verantwortlichen",
      text: "3B Data GmbH Baaderstraße 56d 80469 München (nachfolgend “Gesellschaft“ bzw. „Wir“)"
    },
    {
      title: "Name und kontakdaten des datenschutzbeauftragten",
      text: `Der Datenschutzbeauftragte der Gesellschaft ist unter dsb@fahrplan.guru erreichbar.
      Die Gesellschaft ist der Verantwortliche im Sinne der DSGVO für die Verarbeitung
      Ihrer personenbezogenen Daten. Wir verarbeiten im Rahmen der Vertragsbegründung
      bzw. -abwicklung für Ihre über uns erworbenen Produkte und Services sowie im Zusammenhang
      mit der Erfüllung von Service-, Support-, Wartungs- und sonstigen Dienstleistungen wie Beschaffung von Verbrauchsmaterial
      (nachfolgend „Leistungen“) bestimmte personenbezogene Daten zu den in dieser Datenschutzinformation genannten Zwecken`
    }
  ]
};

export default FirstParagraph;