import React from 'react';
import styled from 'styled-components';
import { parseLetterToPos } from '../utils';

type Props = {}

interface IFourthSection {
  title: string,
  sub_content: ISubContent[],
  unmarcked_content_text?: IUnmarckedContentText[]
}

interface ISubContent {
  text: string,
  content_list?: IContentList[],
  text_second?: ITextSecond,
}

interface IContentList {
  text: string,
}

interface ITextSecond {
  text: string,
}

interface IUnmarckedContentText {
  text: string,
  content_list?: IContentList[],
  letter_list?: ILetterList[],
  link_list?: ILinkList[]
}

interface ILetterList {
  text: string,
}

interface ILinkList {
  link: string,
  url: string,
}


const FourthSection: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h3 className="ninth-paragraph__sub-title">
          4. {fourthSection.title}
      </h3>
      {fourthSection.sub_content.map((content: ISubContent, index_content: number): React.ReactFragment => {
        return (
          <React.Fragment key={index_content}>
          <div 
            className="ninth-paragraph__text ninth-paragraph__sub-content"
          >
            <span className="ninth-paragraph__text--dark">
              {`${parseLetterToPos(index_content + 1)}) `}
            </span>
            <p className="ninth-paragraph__sub-letter-content">
              {content.text}
            </p>
          </div>
          {content.content_list?.map((list_item: IContentList, index_list_item: number): React.ReactNode => {
            return (
              <div 
                key={index_list_item}
                className="ninth-paragraph__text ninth-paragraph__content"
              >
                <p className="ninth-paragraph__content-list">
                  {list_item.text}
                </p>
              </div>
            )
          })}
          {content.text_second?.text
          ?
            (<React.Fragment>
              <div className="ninth-paragraph__text ninth-paragraph__sub-content">
                <p className="ninth-paragraph__text-content">
                  {content.text_second?.text}
                </p>
              </div>
              </React.Fragment>)
          : ''
          }
          </React.Fragment>
        )
      })}
       {fourthSection.unmarcked_content_text?.map((unmarcked_content: IUnmarckedContentText, index_unmarcked_content: number): React.ReactFragment => {
          return(
            <React.Fragment key={index_unmarcked_content}>
              <div 
              className="ninth-paragraph__text ninth-paragraph__sub-content"
              >
                <p className="ninth-paragraph__sub-letter-content">
                  {unmarcked_content.text}
                </p>
              </div>
            {unmarcked_content.content_list?.map((list_item: IContentList, index_list_item: number): React.ReactNode => {
              return (
                <div 
                  key={index_list_item}
                  className="ninth-paragraph__text ninth-paragraph__content"
                >
                  <p className="ninth-paragraph__content-list">
                    {list_item.text}
                  </p>
                </div>
              )
            })}
              {unmarcked_content.letter_list?.map((list_item: ILetterList, index_list_item: number): React.ReactNode => {
              return (
                <div 
                key={index_list_item}
                className="ninth-paragraph__text ninth-paragraph__sub-content"
              >
                <span className="ninth-paragraph__text--dark">
                  {`${parseLetterToPos(index_list_item + 2)}) `}
                </span>
                <p className="ninth-paragraph__sub-letter-content">
                  {list_item.text}
                </p>
              </div>
              )
            })}
            {unmarcked_content.link_list?.map((list_item: ILinkList, index_list_item: number): React.ReactNode => {
              return (
                <div 
                  key={index_list_item}
                  className="ninth-paragraph__text ninth-paragraph__content"
                >
                  <p className="ninth-paragraph__content-list">
                    <a href={list_item.url} className="ninth-paragraph__link">{list_item.link}</a>
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
  margin-bottom: 12px;

.ninth-paragraph {
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

    &--dark {
      color: ${props => props.theme.colorValues.darkGrey};
    }
  }

  &__link {
    color: ${props => props.theme.colorValues.primary};
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
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
    position: relative;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__sub-letter-content {
    padding-left: 12px;
  }

  &__content {
    display: flex;
    padding-left: 25px;
    position: relative;
    margin-left: 25px;
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
}
`;

const fourthSection: IFourthSection = {
  title: "Cookies",
  sub_content: [
    {
      text: `Unsere Website verwendet Cookies. Hierbei handelt es sich um kleine Textdateien, die Ihr Browser automatisch erstellt und die auf
      Ihrem Endgerät (Laptop, Tablet, Smartphone o.ä.) gespeichert werden, wenn Sie unsere Seite besuchen. Dies bedeutet jedoch nicht, dass wir
      dadurch unmittelbar Kenntnis von Ihrer Identität erhalten. Cookies richten auf Ihrem Endgerät keinen Schaden an, enthalten keine Viren,
      Trojaner oder sonstige Schadsoftware. Der Einsatz von Cookies dient dazu, die Nutzung unseres Angebots für Sie angenehmer zu gestalten.
      So setzen wir sogenannte Session-Cookies ein, um zu erkennen, dass Sie einzelne Seiten unserer Website bereits besucht haben. Besuchen Sie
      unsere Seite erneut, um unsere Dienste in Anspruch zu nehmen, wird automatisch erkannt, dass Sie bereits bei uns waren und welche Eingaben
      und Einstellungen sie getätigt haben, um diese nicht noch einmal eingeben zu müssen. Einige Funktionen unserer Internetseite können ohne den
      Einsatz von Cookies nicht angeboten werden.`
    }
  ],
  unmarcked_content_text: [
    {
      text: "Die meisten Browser akzeptieren Cookies automatisch. In den Cookies werden dabei folgende Daten gespeichert und übermittelt:",
      content_list: [
        {
          text: "Spracheinstellungen"
        },
        {
          text: "Log-In-Informationen"
        },
        {
          text: "Sitzungsvariablen"
        }
      ]
    },
    {
      text: "Die durch technisch notwendige Cookies erhobenen Nutzerdaten werden nicht zur Erstellung von Nutzerprofilen verwendet.",
      letter_list: [
        {
          text: "Der Zweck dieser Verwendung technisch notwendiger Cookies ist, die Nutzung von Websites für die Nutzer zu vereinfachen."
        },
        {
          text: `Die durch Cookies verarbeiteten Daten sind für die genannten Zwecke zur Wahrung unserer berechtigten Interessen nach
          Art. 6 Abs. 1 S. 1 lit. f) DSGVO erforderlich.`
        },
        {
          text: `Dauer der Speicherung, Widerspruchs- und Beseitigungsmöglichkeit`
        }
      ]
    },
    {
      text: `Die meisten Browser akzeptieren Cookies automatisch. Cookies werden auf dem Rechner des Nutzers gespeichert und von diesem an
      unsere Seite übermittelt. Daher haben Sie als Nutzer auch die volle Kontrolle über die Verwendung von Cookies. Durch eine Änderung der
      Einstellungen in Ihrem Internetbrowser können Sie die Übertragung von Cookies deaktivieren oder einschränken. Bereits gespeicherte
      Cookies können jederzeit gelöscht werden. Dies kann auch automatisiert erfolgen. Jeder Browser unterscheidet sich in der Art, wie er
      die Cookie-Einstellungen verwaltet. Diese ist in dem Hilfemenü jedes Browsers beschrieben, welches Ihnen erläutert, wie Sie Ihre
      Cookie-Einstellungen ändern können. Diese finden Sie für die jeweiligen Browser unter den folgenden Links:`,
      link_list: [
        {
          link: "Internet Explorer™",
          url: "https://support.microsoft.com/ru-ru/help/17442/windows-internet-explorer-delete-manage-cookies"
        },
        {
          link: "Safari™",
          url: "https://support.apple.com/kb/ph21411?locale=de_DE"
        },
        {
          link: "Chrome™",
          url: "https://support.google.com/chrome/answer/95647?hl=de&hlrm=en"
        },
        {
          link: "Firefox™",
          url: "https://support.mozilla.org/de/kb/verbesserter-schutz-aktivitatenverfolgung-desktop?redirectlocale=de&redirectslug=cookies-erlauben-und-ablehnen"
        },
        {
          link: "Opera™",
          url: "https://help.opera.com/ru/latest/web-preferences/#cookies"
        }
      ]
    },
    {
      text: `Werden Cookies für unsere Website deaktiviert, können möglicherweise nicht mehr alle Funktionen der Website vollumfänglich genutzt
      werden. Temporäre Cookies (Session-Cookies) werden automatisiert gelöscht, wenn Sie den Browser schließen.`
    },
  ]
};

export default FourthSection;