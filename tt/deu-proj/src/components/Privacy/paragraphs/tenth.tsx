import React from 'react';
import styled from 'styled-components';

type Props = {}

interface ITenthParagraph {
  title: string,
  main_text: string,
  content: IContent[]
}

interface IContent {
  text: string,
  list?: IList []
}

interface IList {
  text: string,
  items?: IItem[]
}

interface IItem {
  text: string,
}

const TenthParagraph: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
        <h2 className="tenth-paragraph__title">
          {`X. ${tenthParagraph.title}`}
        </h2>
        <p className="tenth-paragraph__text tenth-paragraph__main-text">
          {tenthParagraph.main_text}
        </p>

        {tenthParagraph.content.map((content: IContent, index: number): React.ReactFragment => {
          return (
            <React.Fragment key={index}>
              <p className="tenth-paragraph__text tenth-paragraph__sub-content">
                <span className="tenth-paragraph__numeric">
                  {(index + 1)}.
                </span>
                {content.text}
              </p>
                {content.list?.map((list_item: IList, index_list_item: number): React.ReactFragment => {
                  return (
                    <React.Fragment key={index_list_item}>
                      <p
                        className="tenth-paragraph__text tenth-paragraph__circle-content"
                      >
                      {list_item.text}
                    </p>
                    {list_item.items?.map((item: IItem, index_item: number): React.ReactNode => {
                      return (
                        <p
                          key={index_item}
                          className="tenth-paragraph__text tenth-paragraph__content"
                         >
                          {item.text}
                        </p>
                        )
                      })}
                    </React.Fragment>
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

.tenth-paragraph {
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
      &:last-child {
        margin-bottom: 0;
      }
    }

    &__main-text {
      padding-left: 12px;
      margin-bottom: 12px;
    }

    &__circle-content {
      padding-left: 25px;
      position: relative;
      margin-bottom: 12px;

      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 6px;
        height: 7px;
        top: 7px;
        left: 0;
        border-radius: 100%;
        border: 1px solid #000;
        background-color: #fff;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__content {
      padding-left: 25px;
      margin-left: 25px;
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

    &__sub-content {
      display: flex;
      position: relative;
    }
    &__numeric {
      margin-right: 12px;
    }
  }
`;

const tenthParagraph: ITenthParagraph = {
  title: "Betroffenenrechte und ihr beschwerderecht bei der aufsichtsbehörde",
  main_text: `Als von der Verarbeitung Ihrer personenbezogenen Daten betroffene Personen können Sie nach der DSGVO
  sowie nach anderen einschlägigen Datenschutzbestimmungen bestimmte Rechte bei uns geltend machen („Betroffenenrechte“),
  siehe nachfolgenden Abschnitt:`,
  content: [
    {
      text: "Betroffenenrechte",
      list: [
        {
          text: `Recht auf Auskunft gem. Art. 15 DSGVO: Sie können von uns jederzeit Informationen über Ihre personenbezogenen Daten,
          die wir über Sie halten, verlangen. Insbesondere können Sie Auskunft über die Verarbeitungszwecke, die Kategorie der
          personenbezogenen Daten, die Kategorien von Empfängern, gegenüber denen Ihre Daten offengelegt wurden oder werden,
          die geplante Speicherdauer, das Bestehen eines Rechts auf Berichtigung, Löschung, Einschränkung der Verarbeitung oder
          Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft ihrer Daten, sofern diese nicht bei uns erhoben wurden,
          sowie über das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling und ggf. aussagekräftigen
          Informationen zu deren Einzelheiten verlangen; Recht auf Berichtigung gem. Art. 16 DSGVO: Sie können von uns die
          unverzügliche Berichtigung unrichtiger oder Vervollständigung Ihrer personenbezogenen Daten fordern. Wir werden angemessene
          Maßnahmen unternehmen, um Ihre Daten, die wir über Sie halten und laufend verarbeiten, richtig, vollständig, aktuell und
          einschlägig zu halten, basierend auf den aktuellsten uns zur Verfügung stehenden Informationen.`
        },
        {
          text: `Recht auf Löschung gem. Art. 17 DSGVO: Sie können von uns die Löschung Ihrer personenbezogenen Daten verlangen,
          sofern hierfür die rechtlichen Voraussetzungen vorliegen. Dies kann gemäß Art. 17 DSGVO etwa dann der Fall sein, wenn`,
          items: [
            {
              text: `die personenbezogenen Daten für die Zwecke, für die sie erhoben oder auf sonstige Weise verarbeitet wurden,
              nicht länger erforderlich sind;`
            },
            {
              text: `Sie Ihre Einwilligung, die Grundlage der Datenverarbeitung ist, widerrufen und es an einer anderweitigen
              Rechtsgrundlage für die Verarbeitung fehlt;`
            },
            {
              text: `Sie Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einlegen und keine vorrangigen berechtigten
              Gründe für die Verarbeitung vorliegen, oder Sie gegen die Datenverarbeitung zu Zwecken der Direktwerbung widersprechen;`
            },
            {
              text: 'die personenbezogenen Daten unrechtmäßig verarbeitet wurden; sofern die Verarbeitung nicht notwendig ist:'
            },
            {
              text: `um die Einhaltung einer gesetzlichen Verpflichtung, die von uns die Verarbeitung Ihrer personenbezogenen Daten erfordert,
              sicherzustellen, insbesondere im Hinblick auf gesetzliche Aufbewahrungsfristen;`
            },
            {
              text: 'um Rechtsansprüche geltend zu machen, auszuüben oder zu verteidigen.'
            }
          ]
        },
        {
          text: `Recht auf Einschränkung der Verarbeitung gem. Art. 18 DSGVO: Sie können von uns die Einschränkung der Verarbeitung
          Ihrer personenbezogenen Daten verlangen, falls`,
          items: [
            {
              text: `Sie die Richtigkeit der personenbezogenen Daten bestreiten und zwar für den Zeitraum, den wir benötigen,
              um die Richtigkeit der Daten zu überprüfen;`
            },
            {
              text: `die Verarbeitung unrechtmäßig ist und Sie die Löschung Ihrer personenbezogenen Daten ablehnen und
              stattdessen die Einschränkung der Nutzung verlangen;`
            },
            {
              text: `wir Ihre personenbezogenen Daten nicht länger benötigen, Sie diese aber benötigen,
              um Rechtsansprüche geltend zu machen, auszuüben oder zu verteidigen;`
            },
            {
              text: `Sie Widerspruch gegen die Verarbeitung eingelegt haben, solange noch nicht feststeht, ob unsere berechtigten Gründe Ihre überwiegen.`
            }
          ]
        },
        {
          text: `Recht auf Datenübertragbarkeit gem. Art. 20 DSGVO: Auf Ihren Antrag hin werden wir Ihnen Ihre personenbezogenen Daten , die Sie uns
          bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesebaren Format zur Verfügung stellen, so dass Sie diese an einen anderen
          Verantwortlichen übertragen können. Dieses Recht steht Ihnen allerdings nur zu, sofern die Datenverarbeitung auf Ihrer Einwilligung beruht oder
          erforderlich ist, um einen Vertrag durchzuführen.` 
        },
        {
          text: `Recht auf Widerruf gemäß Art. 7 Abs. 3 DSGVO: Sie haben das Recht, Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu widerrufen.
          Dies hat zur Folge, dass wir die Datenverarbeitung, die auf dieser Einwilligung beruhte, für die Zukunft nicht mehr fortführen dürfen.`
        },
        {
          text: `Recht auf Widerspruch gem. Art. 21 DSGVO: Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen gemäß Art. 6 Abs.
          1 S. 1 lit. f) DSGVO verarbeitet werden, haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung Ihrer personenbezogenen
          Daten einzulegen, soweit dafür Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben oder sich der Widerspruch gegen Direktwerbung
          richtet. Im letzteren Fall haben Sie ein generelles Widerspruchsrecht, das ohne Angabe einer besonderen Situation von uns umgesetzt wird.
          Im Fall des Widerspruchs werden wir Ihre personenbezogenen Daten nicht länger verarbeiten. Letzteres gilt nicht, sofern wir zwingende schutzwürdige
          Gründe für die Verarbeitung nachweisen können, die Ihre Interessen überwiegen oder wir Ihre personenbezogenen Daten zur Geltendmachung, Ausübung oder
          Verteidigung von Rechtsansprüchen benötigen; Möchten Sie von Ihrem Widerrufs- oder Widerspruchsrecht Gebrauch machen, genügt eine E-Mail an
          info@crawler2api.com gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren. In der Regel können Sie sich hierfür an die Aufsichtsbehörde
          Ihres üblichen Aufenthaltsortes oder Arbeitsplatzes wenden (siehe unten Ziff. 4).`
        }
      ]
    },
    {
      text: `Fristen zur Erfüllung von Betroffenenrechten. Wir bemühen uns grundsätzlich, allen Anfragen innerhalb von 30 Tagen nachzukommen. Diese Frist kann
      sich jedoch wegen des spezifische Betroffenenrechts oder der Komplexität Ihrer Anfrage gegebenenfalls verlängern.`
    },
    {
      text: `Auskunftsbeschränkung bei der Erfüllung von Betroffenenrechten. In bestimmten Situationen können wir Ihnen aufgrund gesetzlicher Vorgaben
      möglicherweise keine Auskunft über sämtliche Ihrer personenbezogenen Daten erteilen. Falls wir Ihren Auskunftsantrag in einem solchen Fall ablehnen müssen,
      werden wir Sie zugleich über die Gründe der Ablehnung informieren.`
    },
    {
      text: `Beschwerde bei Aufsichtsbehörden. Die Gesellschaft wird Ihre Rechte stets wahren. Sollten Sie aber der Ansicht sein, dass wir Ihren Beschwerden oder
      Bedenken nicht hinreichend nachgekommen sind, haben Sie das Recht, eine Beschwerde bei einer zuständigen Datenschutzbehörde einzureichen.`
    }
  ]
};


export default TenthParagraph;