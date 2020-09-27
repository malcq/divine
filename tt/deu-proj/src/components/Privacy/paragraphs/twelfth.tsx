import React from 'react';
import styled from 'styled-components';

type Props = {}

interface ITwelfthParagraph {
  title: string,
  main_text: string,
  mail_urls: string[],
  links: string[]
}

interface ITextWithLink {
  before_text?: string,
  url: string,
  link: string,
  after_text?: string,
}

const TwelfthParagraph: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h2 className="twelfth-paragraph__title">
        {`XII. ${twelfthParagraph.title}`}
      </h2>
      <p className="twelfth-paragraph__text">
        {twelfthParagraph.main_text}
      </p>
      <p className="twelfth-paragraph__text twelfth-paragraph__content">
        <span>3B Data GmbH</span>
        <span>Baaderstraße 56d</span>
        <span>80469 München</span>
        <span>
          mail:
          <a 
            href={twelfthParagraph.mail_urls[0]}
            className="twelfth-paragraph__link"
          >
            {twelfthParagraph.links[0]}
          </a>
        </span>
      </p>
      <p className="twelfth-paragraph__text twelfth-paragraph__content">
        <span>
          Datenschutzbeauftragter:
          <a 
            href={twelfthParagraph.mail_urls[1]}
            className="twelfth-paragraph__link"
          >
            {twelfthParagraph.links[1]}
          </a>
        </span>
      </p>
    </StyledWrapper>     
  );
}
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

.twelfth-paragraph {
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

  &__link {
    color: ${props => props.theme.colorValues.primary};
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  &__content {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }
}
`;

const twelfthParagraph: ITwelfthParagraph = {
  title: "Kontaktdaten",
  main_text: "Schriftliche Anfragen/Aufträge richten Sie bitte an uns über die nachfolgend genannten Kontaktkanäle:",
  mail_urls: [
    "mailto:info@fahrplan.guru",
    "mailto:dsb@fahrplan.guru"
  ],
  links: [
    " info@fahrplan.guru",
    "dsb@fahrplan.guru"
  ]
};


export default TwelfthParagraph;