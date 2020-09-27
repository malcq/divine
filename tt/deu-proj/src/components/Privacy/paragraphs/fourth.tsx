import React from 'react';
import styled from 'styled-components';


type Props = {}

interface IFourthParagraph {
  title: string,
  main_text_first: string,
  main_text_second: string,
  content_list_first: IContent[],
  content_list_second: IContent[],
}

interface IContent {
  text: string,
}

const FourthParagraph: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h2 className="fourth-paragraph__title">
        {`IV. ${fourthParagraph.title}`}
      </h2>
      <p className="fourth-paragraph__text">
        {fourthParagraph.main_text_first}
      </p>
      {fourthParagraph.content_list_first.map((content_first: IContent, index: number): React.ReactNode => {
        return (
          <p
            key={index}
            className="fourth-paragraph__text fourth-paragraph__content"
          >
            {content_first.text}
          </p>
        )
      })}
      <p className="fourth-paragraph__text">
        {fourthParagraph.main_text_second}
      </p>
      {fourthParagraph.content_list_second.map((content_second: IContent, index: number): React.ReactNode => {
        return (
          <p
            key={index}
            className="fourth-paragraph__text fourth-paragraph__content"
          >
            {content_second.text}
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

.fourth-paragraph {
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

const fourthParagraph: IFourthParagraph = {
  title: "Rechtsgrundlage für die verarbeitung ihrer daten",
  main_text_first: `Wir verarbeiten Ihre personenbezogenen Daten nur dann,
  wenn eine Rechtsvorschrift dies erlaubt. Die Rechtsgrundlagen sind
  vorwiegend Art. 6, ggf. Art. 9 der DSGVO sowie Ihre Einwilligung nach Art.
  7 DSGVO. Die Verarbeitung Ihrer personenbezogenen Daten werden wir dabei
  unter anderem auf die folgenden Rechtsgrundlagen stützen:`,
  content_list_first: [
    {
      text: `Einwilligung gem. Art. 6 Abs. 1 S. 1 lit. a), Art. 7 DSGVO, ggf.
      Art. 9 Abs. 2 lit. a), Art. 7 DSGVO: Wir verarbeiten bestimmte
      personenbezogene Daten`
    },
    {
      text: `nur auf der Grundlage Ihrer zuvor erteilten ausdrücklichen und
      freiwilligen Einwilligung. Sie haben das Recht, Ihre Einwilligung
      jederzeit mit Wirkung für die Zukunft zu widerrufen.`
    },
    {
      text: `Erfüllung eines Vertrages / vorvertragliche Maßnahmen gem. Art.
      6 Abs. 1 S. 1 lit. b) DSGVO: Zur Anbahnung bzw. Durchführung Ihres
      Vertragsverhältnisses mit der Gesellschaft.`
    },
    {
      text: `Wahrung berechtigter Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO):
      Die Gesellschaft verarbeitet bestimmte personenbezogene Daten zur Wahrung
      Ihrer oder der Interessen Dritter, unter der zwingenden Voraussetzung, dass
      Ihre Interessen im Einzelfall nicht überwiegen.`
    }
  ],
  main_text_second: `Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:`,
  content_list_second: [
    {
      text: `Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a) DSGVO ausdrückliche
      Einwilligung dazu erteilt haben,`
    },
    {
      text: `die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f) DSGVO zur Geltendmachung,
      Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist und kein Grund
      zur Annahme besteht. dass Sie ein überwiegendes schutzwürdiges Interesse an der
      Nichtweitergabe Ihrer personenbezogenen Daten haben.`
    },
    {
      text: `für den Fall, dass für die Weitergabe nach Art. 6 Abs. 1 S. 1 lit.
      c) DSGVO eine gesetzliche Verpflichtung besteht, sowie`  
    },
    {
      text: `dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b) DSGVO für die
      Abwicklung von Vertragsverhältnissen mit Ihnen erforderlich ist.`
    }
  ]
};

export default FourthParagraph;