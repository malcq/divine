import React from 'react';
import styled from 'styled-components';

type Props = {}

interface IThirdParagraph {
  title: string,
  main_text: string,
  content: IContent[],
}

interface IContent {
  text: string,
}

const ThirdParagraph: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
        <h2 className="third-paragraph__title">
          {`III. ${thirdParagraph.title}`}
        </h2>
        <p className="third-paragraph__text">
          {thirdParagraph.main_text}
        </p>
        {thirdParagraph.content.map((content: IContent, index: number): React.ReactNode => {
          return (
            <p
              key={index}
              className="third-paragraph__text third-paragraph__content"
            >
              {content.text}
            </p>
          )
        })}
    </StyledWrapper>     
  );
}
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 56px;

.third-paragraph {
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
      margin-bottom: 12px;
    }

    &__content {
      padding-left: 25px;
      position: relative;
      margin-bottom: 12px;

      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 4px;
        height: 4px;
        left: 0;
        top: 7px;
        border-radius: 100%;
        background-color: #000;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const thirdParagraph: IThirdParagraph = {
  title: "Art der Daten",
  main_text: `Personenbezogene Daten sind Informationen, die sich auf eine
  identifizierte oder identifizierbare natürliche Person beziehen.
  Im Rahmen unserer Leistungen verarbeiten wir im rechtlich zulässigen Umfang
  Daten über Ihre Person, stets unter Berücksichtigung des Grundsatzes der
  Datensparsamkeit. Dies betrifft insbesondere folgende Informationen:`,
  content: [
    {
      text: `Daten, die Sie uns zur Verfügung stellen: Sie stellen uns bei der
      Inanspruchnahme unserer Leistungen verschiedene Informationen über Sie zur
      Verfügung. Die verschiedenen Kategorien Ihrer Daten, die Sie uns zur
      Verfügung stellen, hängen von Ihrem konkreten Vertragsverhältnis mit uns ab.
      Hierzu stellen Sie uns z.B. die folgenden Informationen zur Verfügung: Namen,
      Kontaktdaten mit Adresse, E-Mail-Adresse und Telefonnummer/n,
      Kontoinformationen (=personenbezog. Daten).` 
    },
    {
      text: `Bei Dritten erhobene Daten: Im Rahmen der Vertragsanbahnung oder
      -erfüllung werden wir ggf. auch Ihre personenbezogenen Daten,
      die uns Dritte zur Verfügung stellen, verarbeiten.
      Etwa Datensätze von Vertragspartnern, Kooperationspartnern von der
      Gesellschaft sowie sonstiger Dritter. Weiterhin erhalten wir zur
      Durchführung unserer Leistungen ebenfalls personenbezogene Daten über Sie,
      soweit sie zur Durchführung dieser Leistungen notwendig sind.`
    },
    {
      text: `Besondere Kategorien von personenbezogenen Daten: Grundsätzlich erheben
      und verarbeiten wir keine besonderen Kategorien personenbezogener Daten.
      Besondere Kategorien personenbezogener Daten sind Daten, aus denen Ihre rassische
      und ethnische Herkunft, politische Meinungen, religiöse oder weltanschauliche
      Überzeugungen oder die Gewerkschaftszugehörigkeit hervorgehen, sowie genetische Daten,
      biometrische Daten zur eindeutigen Identifizierung einer natürlichen Person,
      Gesundheitsdaten oder Daten zum Sexualleben oder der sexuellen Orientierung.
      Sollte es im Einzelfall notwendig sein, beispielsweise aus buchhalterischen Gründen
      die Religionszugehörigkeit, besondere Kategorien personenbezogener zu erheben oder
      in sonstiger Weise zu verarbeiten, werden wir diese stets gemäß der DSGVO und dem BSG
      neu sowie den Vorgaben aus dieser Datenschutzinformation verarbeiten.`
    }
  ]
};


export default ThirdParagraph;