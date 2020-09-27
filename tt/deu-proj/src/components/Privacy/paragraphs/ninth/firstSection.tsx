import React from 'react';
import styled from 'styled-components';
import { parseLetterToPos } from '../utils';

type Props = {}

interface IFirstSection {
  title: string,
  sub_content: ISubContent[],
}

interface ISubContent {
  text: string,
  content_list?: ISubContentList[],
  text_second?: ITextSecond,
}

interface ISubContentList {
  text: string,
}

interface ITextSecond {
  text: string,
}


const FirstSection: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h3 className="ninth-paragraph__sub-title">
          1. {firstSection.title}
      </h3>
      {firstSection.sub_content.map((content: ISubContent, index_content: number): React.ReactFragment => {
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
                    </React.Fragment>)
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

  &__text-content {
    padding-left: 12px;
  }
}
`;

const firstSection: IFirstSection =  {
  title: "Server log-in dateien",
  sub_content: [
    {
      text: `Beim Aufrufen unserer Website werden in den Serverstatistiken automatisch Daten gespeichert,
      (so genannte Server-Log-Dateien), die Ihr Browser automatisch an uns übermittelt. Diese Informationen
      werden temporär in einem sog. Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun
      erfasst und bis zur automatisierten Löschung gespeichert:`,
      content_list: [
        {
          text: "P-Adresse des anfragenden Rechners,"
        },
        {
          text: "Datum und Uhrzeit des Zugriffs,"
        },
        {
          text: "Name und URL der abgerufenen Datei,"
        },
        {
          text: "Website, von der aus der Zugriff erfolgt (Referrer-URL),"
        },
        {
          text: "verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres Access-Providers."
        }
      ],
      text_second: {
        text: `Aus datenschutzrechtlichen Gründen wird in den Logfiles der Hostname bzw. die IP-Adresse des
        Clients, der Ihre Website aufruft, anonymisiert. In den Logfiles werden nur die Einträge für den Host
        des Clients oder, wenn dieser nicht ermittelbar ist, die IP-Adresse des Clients anonymisiert. Das Format
        aller anderen Einträge ändert sich nicht.`
      }
    },
    {
      text: "Die genannten Daten werden durch uns zu folgenden Zwecken verarbeitet:",
      content_list: [
        {
          text: "Gewährleistung eines reibungslosen Verbindungsaufbaus der Website,"
        },
        {
          text: "Gewährleistung einer komfortablen Nutzung unserer Website,"
        },
        {
          text: "Auswertung der Systemsicherheit und -stabilität sowie"
        },
        {
          text: "zu weiteren administrativen Zwecken."
        }
      ]
    },
    {
      text: `Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f) DSGVO. Unser berechtigtes
      Interesse folgt aus den oben aufgelisteten Zwecken zur Datenerhebung.`
    },
    {
      text: `Logfile-Informationen werden aus Sicherheitsgründen (z.B. zur Aufklärung von Missbrauchs- oder
        Betrugshandlungen) vom Provider 6 Wochen anonymisiert aufbewahrt und dann gelöscht. Wir haben für diesen
        Zeitraum Zugriff auf Server Logfiles.`
    }
  ]
};


export default FirstSection;