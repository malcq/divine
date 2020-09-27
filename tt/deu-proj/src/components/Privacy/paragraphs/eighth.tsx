import React from 'react';
import styled from 'styled-components';

type Props = {}

interface IEighthParagraph {
  title: string,
  main_text: string,
  sub_content: ISubContent[],
}

interface ISubContent {
  title: string,
  text: string
}

const EighthParagraph: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
        <h2 className="eighth-paragraph__title">
          {`VIII. ${eighthParagraph.title}`}
        </h2>
        <p className="eighth-paragraph__text eighth-paragraph__main-text">
          {eighthParagraph.main_text}
        </p>
        {eighthParagraph.sub_content.map((sub_content_item: ISubContent, index: number): React.ReactFragment => {
          return (
            <React.Fragment key={index}>
              <h3 className="eighth-paragraph__sub-content">
                {`${index + 1}. ${sub_content_item.title}`}
              </h3>
              <p
                key={index}
                className="eighth-paragraph__text eighth-paragraph__sub-text"
              >
                {sub_content_item.text}
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
  margin-bottom: 56px;

.eighth-paragraph {
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

  &__main-text {
    margin-bottom: 12px;
  }

  &__sub-content {
    ${props => props.theme.typography.fnMedium};
    font-size: 16px;
    letter-spacing: 0;
    line-height: 22px;
    color: ${props => props.theme.colorValues.grey};
    margin: 12px 0;
  }

  &__sub-text {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
`;

const eighthParagraph: IEighthParagraph = {
  title: "Datenübermittlung an dritte",
  main_text: `Der Umgang mit Ihren personenbezogenen Daten erfolgt nach den Vorgaben der EU-Datenschutzgrundverordnung
  („DSGVO“) und des BDSG neu sowie sonstiger rechtlicher Anforderungen als Basis für eine vertrauensvolle Geschäftsbeziehung
  mit unseren Partnern, Kunden und Interessenten. Wir wahren die Vertraulichkeit Ihrer personenbezogenen Daten und
  gewährleisten den Schutz Ihrer personenbezogenen Daten durch technische und organisatorische Sicherheitsmaßnahmen, die den
  aktuellen Sicherheitsstandards entsprechen.`,
  sub_content: [
    {
      title: "Datenübermittlung an kooperationspartner",
      text: `Ggf. übersenden wir Ihre personenbezogenen Daten an unsere Kooperationspartner, die Ihre Daten vollständig in
      unserem Auftrag und nach unseren Anweisungen verarbeiten.`
    },
    {
      title: "Datenübermittlung an lieferanten",
      text: `Zum Zwecke der Durchführung von Lieferungen und Leistungen übermitteln wir ggf. Ihre personenbezogenen Daten an
      unsere Lieferanten.`
    },
    {
      title: "Datenübermittlung an sonstige dritte",
      text: `Wir übermitteln Ihre personenbezogenen Daten für die unter oben Ziff. IV. festgelegten Zwecke sowie im Rahmen
      gesetzlicher Auskunfts- und Meldepflichten ggf. auch an andere Dritte, z.B. externe Service- oder IT-Provider, externe
      Berater oder Kooperationspartner, Transport- und Versicherungsunternehmen, soweit nicht vorstehend bereits benannt.
      Die Gesellschaft wird sicherstellen, dass diese Dritten die Vertraulichkeit Ihrer personenbezogenen Daten garantieren.
      Mit allen sonstigen Dritten, an welche die Gesellschaft gegebenenfalls Ihre Daten übermittelt, hat die Gesellschaft
      entsprechende Verträge zur Einhaltung aller datenschutzrechtlichen Vorgaben abgeschlossen.`
    },
    {
      title: "Datenübermittlung in nicht- eu-mitgliedsstaaten",
      text: `Soweit im Einzelfall Daten in Länder außerhalb der EU oder des Europäischen Wirtschaftsraums („EWR“) verarbeitet
      werden, wird die Gesellschaft sicherstellen, dass Ihre personenbezogenen Daten im Einklang mit europäischen
      Datenschutzstandards verarbeitet werden. Soweit erforderlich, werden wir zur Sicherheit der Datentransfers an Empfänger
      in Drittstaaten außerhalb der EU oder des EWR Datenübermittlungsverträge auf der Grundlage der EU Standardvertragsklauseln
      („SCC“) oder andere datenschutzrechtliche Erlaubnisregelungen (z.B. genehmigte „CBR“) nutzen, die auch geeignete technische
      und organisatorische Maßnahmen zum Schutz der übermittelten personenbezogenen Daten sicherstellen, soweit es sich um kein
      Land handelt, dass die EU nicht bereits offiziell als Land anerkannt hat, das ein angemessenes und vergleichbares Niveau an
      Datenschutz aufweist. In letzterem Fall bedarf die Datenübermittlungen in diese Länder nach dem geltenden Datenschutzrecht
      keiner gesonderten behördlichen Zustimmung oder Vereinbarung.`
    }
  ]
};


export default EighthParagraph;