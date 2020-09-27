import React from 'react';
import styled from 'styled-components';

type Props = {}

interface IThirdSection {
  title: string,
  sub_content: ISubContent[],
}

interface ISubContent {
  text: string,
  content_list?: ISubContentList[],
}

interface ISubContentList {
  text: string,
}


const ThirdSection: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h3 className="ninth-paragraph__sub-title">
          3. {thirdSection.title}
      </h3>
      {thirdSection.sub_content.map((content: ISubContent, index_content: number): React.ReactFragment => {
              return (
                <React.Fragment key={index_content}>
                <div 
                  className="ninth-paragraph__text ninth-paragraph__sub-content"
                >
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
}
`;

const thirdSection: IThirdSection = {
  title: "Kontaktformular und emailkontakt",
  sub_content: [
    {
      text: `Auf unserer Internetseite ist zeitweise ein Kontaktformular bereitgestellt, das für die Anmeldung zu unseren Veranstaltungen
      genutzt werden kann. Nimmt ein Nutzer diese Möglichkeit wahr, so werden die in der Eingabemaske eingegeben Daten an uns übermittelt
      und gespeichert. Diese Daten sind:`,
      content_list: [
        {
          text: "Vor- und Nachname"
        },
        {
          text: "E-Mail-Adresse"
        },
        {
          text: "Benutzername"
        },
        {
          text: "E-Mail-Adresse"
        }
      ],
    },
    {
      text: "Im Zeitpunkt der Absendung des Formulars werden zudem folgende Daten gespeichert:",
      content_list: [
        {
          text: "Die IP-Adresse des Nutzers",
        },
        {
          text: "Datum und Uhrzeit der Registrierung",
        }
      ]
    },
    {
      text: `Für die Verarbeitung der Daten wird im Rahmen des Absendevorgangs Ihre Einwilligung eingeholt und auf diese Datenschutzerklärung
      verwiesen. Alternativ ist eine Kontaktaufnahme über die bereitgestellten E-Mail-Adressen möglich. In diesem Fall werden die mit der E-Mail
      übermittelten personenbezogenen Daten des Nutzers gespeichert. Es erfolgt in diesem Zusammenhang keine Weitergabe der Daten an Dritte. Die
      Daten werden ausschließlich für die Verarbeitung der Konversation verwendet.`
    }
  ]
};


export default ThirdSection;