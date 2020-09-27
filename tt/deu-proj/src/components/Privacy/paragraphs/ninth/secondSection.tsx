import React from 'react';
import styled from 'styled-components';
import { parseLetterToPos } from '../utils';

type Props = {}

interface ISecondSection {
  title: string,
  sub_content: ISubContent[],
}

interface ISubContent {
  text: string,
  content_list?: ISubContentList[],
  text_second?: ITextSecond,
  text_third?: { text: string }
}

interface ISubContentList {
  text: string,
}

interface ITextSecond {
  text: string,
  content_list_second: ITextSecondContent[]
}

interface ITextSecondContent {
  text: string,
}


const SecondSection: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h3 className="ninth-paragraph__sub-title">
          2. {secondSection.title}
      </h3>
      {secondSection.sub_content?.map((content: ISubContent, index_content: number): React.ReactFragment => {
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
                {content.content_list?.map((list_item: ISubContentList, index_list_item: number): React.ReactNode => {
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
                    {content.text_second?.content_list_second?.map((list_item_second: ITextSecondContent, index_list_item_second: number): React.ReactNode => {
                    return (
                      <div 
                        key={index_list_item_second}
                        className="ninth-paragraph__text ninth-paragraph__content"
                      >
                        <p>
                          {list_item_second.text}
                        </p>
                      </div>
                    )
                  })}
                  </React.Fragment>)
                : ''
                }
                {content.text_third?.text
                ?
                  (<div 
                    className="privacy__text ninth-paragraph__sub-content"
                  >
                    <p className="ninth-paragraph__text-content">
                      {content.text_third.text}
                    </p>
                  </div>)
                : ''
                } 
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

  &__sub-letter-content {
    padding-left: 12px;
  }
}
`;

const secondSection: ISecondSection =  {
  title: "Registrierung auf der webseite",
  sub_content: [
    {
      text: `Auf unserer Internetseite bieten wir zeitweise Nutzern die Möglichkeit, sich unter Angabe personenbezogener
      Daten zu registrieren. Die Daten werden dabei in eine Eingabemaske eingegeben und an uns übermittelt und gespeichert.
      Folgende Daten werden im Rahmen des Registrierungsprozesses erhoben, wie aus der Eingabemaske bei der Registrierung
      ersichtlich:`,
      content_list: [
        {
          text: "Vorname"
        },
        {
          text: "Nachname"
        },
        {
          text: "Benutzername"
        },
        {
          text: "E-Mail-Adresse"
        }
      ],
      text_second: {
        text: "Im Zeitpunkt der Registrierung bzgl. a) und b) werden zudem folgende Daten gespeichert:",
        content_list_second: [
          {
            text: "Die IP-Adresse des Nutzers"
          },
          {
            text: "Datum und Uhrzeit der Registrierung"
          }
        ]
      },
      text_third: {
        text: "Im Rahmen des Registrierungsprozesses wird eine Einwilligung des Nutzers zur Verarbeitung dieser Daten eingeholt."
      }
    },
    {
      text: "Eine Registrierung des Nutzers ist für das Bereithalten bestimmter Inhalte und Leistungen auf unserer Website erforderlich."
    },
    {
      text: "Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung des Nutzers Art. 6 Abs. 1 lit. DSGVO."
    },
    {
      text: `Die bei der Registrierung von uns erhobenen personenbezogenen Daten werden nach Erledigung der von Ihnen gestellten Anfrage
      im Rahmen etwaiger Aufbewahrungsfristen gelöscht.`
    }
  ]
};

export default SecondSection;