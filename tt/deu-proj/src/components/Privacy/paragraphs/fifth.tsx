import React, { ReactFragment } from 'react';
import styled from 'styled-components';
import { parseLetterToPos } from './utils';

type Props = {};
interface IFifthParagraph {
  title: string,
  main_text_first: string,
  main_text_second: string,
  content: IContent[],
  sub_title: ISubTitle[],
}

interface IContent {
  text: string,
}

interface ISubTitle {
  title: string,
  text: string,
  sub_content?: IContent[],
}


const FifthParagraph: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h2 className="fifth-paragraph__title">
        {`V. ${fifthParagraph.title}`}
      </h2>
      <p className="fifth-paragraph__text">
        {fifthParagraph.main_text_first}
      </p>
      {fifthParagraph.content.map((content: IContent, index: number): React.ReactNode => {
        return (
          <p
            key={index}
            className="fifth-paragraph__text fifth-paragraph__content"
          >
            {content.text}
          </p>
        )
      })}
      <p className="fifth-paragraph__text">
        {fifthParagraph.main_text_second}
      </p>
      
      {fifthParagraph.sub_title.map((sub_title_item: ISubTitle, index: number): React.ReactFragment => {
        return (
          <React.Fragment key={index}>
            <h3 className="fifth-paragraph__sub-title">
              {`${index + 1}. ${sub_title_item.title}`}
            </h3>
            <p
              key={index}
              className="fifth-paragraph__text"
            >
              {sub_title_item.text}
            </p>
            {sub_title_item.sub_content?.map((sub_content_item: IContent, index_content: number): React.ReactNode => {
              return (
                <div 
                  key={index_content}
                  className="fifth-paragraph__text fifth-paragraph__sub-content"
                >
                  <span className="fifth-paragraph__text--dark">
                    {`${parseLetterToPos(index_content + 1)}. `}
                  </span>
                  <p className="fifth-paragraph__text-content">
                    {sub_content_item.text}
                  </p>
                </div>
              )
            })}
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

.fifth-paragraph {
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

      &--dark {
        color: ${props => props.theme.colorValues.darkGrey};
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__content {
      display: flex;
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
    }

    &__sub-title {
      ${props => props.theme.typography.fnMedium};
      font-size: 16px;
      letter-spacing: 0;
      line-height: 22px;
      color: ${props => props.theme.colorValues.grey};
      margin: 12px 0;
    }

    &__sub-content {
      display: flex;
      padding-left: 25px;
      position: relative;
      margin-bottom: 12px;
    }

    &__text-content {
      padding-left: 12px;
    }
  }
`;

const fifthParagraph: IFifthParagraph = {
  title: "Zweck der datenverarbeitung",
  main_text_first: `Wir werden Ihre personenbezogenen Daten ausschließlich für
  datenschutzrechtlich zulässige Zwecke verarbeiten. Dies betrifft insbesondere
  die nachfolgend beispielhaft aufgezählten Zwecke:`,
  content: [
    {
      text: "für die Sie uns eine vorherige Einwilligung erteilt haben;"
    },
    {
      text: "die Verarbeitung zur Erfüllung unseres Vertrages mit Ihnen;"
    },
    {
      text: "die Erfüllung rechtlicher Verpflichtungen, denen wir unterliegen;"
    },
    {
      text: `die Wahrung unserer berechtigten Interessen oder der berechtigten
      Interessen Dritter, soweit nicht Ihre Interessen überwiegen;`
    },
    {
      text: "die Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen;"
    },
    {
      text: "Marketing und Werbung."
    }
  ],
  main_text_second: `Die Verarbeitung Ihrer personenbezogenen Daten kann z. B. zu
  den nachfolgend genannten konkreten Einzelzwecken erfolgen:`,
  sub_title: [
    {
      title: "Vertragsbezogener verarbeitungzweck",
      text: "Wir verarbeiten Ihre personenbezogenen Daten zur Durchführung des mit Ihnen geschlossenen Vertrags:",
      sub_content: [
        {
          text: `Vertragsanbahnung: Zur Anbahnung eines (weiteren) Vertragsverhältnisses übermitteln wir Ihnen
          Produktinformationen und verarbeiten hierfür personenbezogene Daten über Sie.`
        },
        {
          text: `Vertragsdurchführung: Das Vertragsmanagement organisiert die Verwaltung und Abwicklung der Verträge
          zwischen Ihnen und uns. Hierbei verarbeiten wir personenbezogene Informationen über Sie.`
        },
        {
          text: `Kundenbetreuung: Im Rahmen der Kundenbetreuung verarbeiten wir regelmäßig Ihre personenbezogenen Daten,
          um Sie zu beraten und Support zu gewährleisten.`
        },
        {
          text: `Forderungsmanagement: Aus den mit Ihnen abgeschlossenen Verträgen stehen uns Forderungen zu. Um diese
          Forderungen zu verwalten, verarbeiten wir Ihre personenbezogenen Daten (z.B. Zahlungswesen) insbesondere im
          Falle offener Forderungen. Gegebenenfalls kontaktieren wir Sie, um offene Forderungen zu klären.`
        },
        {
          text: "Vertragsbeendigung: Wenn unser Vertragsverhältnis beendet wird, verarbeiten wir Ihre personenbezogenen Daten."
        },
        {
          text: `Zusammenarbeit mit Partnern: Die Gesellschaft arbeitet im Rahmen des Vertragsabschlusses, des Vertragsmanagements
          und Ihrer Betreuung ggf. mit Service- und Kooperationspartnern zusammen, die Sie betreuen. Um eine optimale Kundenbetreuung
          zu gewährleisten, teilt die Gesellschaft den Partnern im Rahmen der Zusammenarbeit die hierfür erforderlichen
          personenbezogenen Daten mit.`
        },
        {
          text: `Übermittlung an Kooperationspartner: In bestimmten Fällen arbeitet die Gesellschaft mit Kooperationspartnern zusammen,
          z.B. mit Lieferanten. Diese werden im Antrag oder Vertrag konkret benannt. An diese übermitteln wir für Zwecke der Durchführung
          der von Ihnen gewählten Vertragsbausteine personenbezogene Daten im hierfür notwendigen Umfang.`
        }
      ]
    },
    {
      title: "Einwilligungsbasierter verarbeitungszweck",
      text: `Im Einzelfall verarbeiten wir Ihre personenbezogenen Daten auf der Grundlage einer von Ihnen erklärten Einwilligung in die
      Verarbeitung. Im Falle einer vorliegenden Einwilligung verarbeiten wir ggf. Ihre personenbezogenen Daten etwa zur Information über
      und Durchführung von Veranstaltungen zu Präsentationszwecken.`,
    },
    {
      title: "Verarbeitungszweck auf basis des berechtigten interesses",
      text: `Manche Ihrer personenbezogenen Daten verarbeiten wir zur Wahrung berechtigter Interessen, soweit nicht Ihre Interessen
      gegebenenfalls überwiegen.`,
      sub_content: [
        {
          text: `Werbung und Marketing: Im Falle einer vorliegenden Einwilligung verarbeiten wir Ihre personenbezogenen Daten, um Sie über
          unsere Angebote, die Sie interessieren könnten, zu informieren.`
        },
        {
          text: `Serviceleistungen: Bestimmte Service- und sonstige Leistungen werden ggf. durch Partnerunternehmen durchgeführt. Damit die
          Partnerunternehmen diese Leistungen vertragsgemäß durchführen können, übermitteln wir gegebenenfalls Ihre personenbezogenen Daten
          im dafür erforderlichen Umfang.`
        },
        {
          text: `Forderungsmanagement: Aus dem mit Ihnen abgeschlossenen Vertragsverhältnis können offene Forderungen resultieren. Wir werden
          Ihnen im Rahmen unseres Mahnwesens ausreichend Gelegenheit geben, um diese zu begleichen. Wir behalten uns bei Fruchtlosigkeit im
          Einzelfall vor, externe Rechtsanwälte oder Inkassounternehmen zwecks Forderungseintreibung einzubeziehen. Dabei würden ausschließlich
          nur solche Informationen übermittelt werden, die zur Betreibung der offenen Forderung zwingend erforderlich sind.`
        }
      ]
    },
    {
      title: "Beabsichtigen wir, die personenbezogenen daten für einen anderen zweck weiterzuverarbeiten",
      text: `als den, für den die personenbezogenen Daten erlangt wurden, so stellen wir Ihnen vor dieser Weiterverarbeitung Informationen über
      diesen anderen Zweck und alle anderen maßgeblichen Informationen gemäß dieser Datenschutzinformation zur Verfügung.`,
    }
  ]
};

export default FifthParagraph;