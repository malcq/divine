import React from 'react';
import styled from 'styled-components';

type Props = {}

interface IEleventhParagraph {
  title: string,
  text_with_link: ITextWithLink,
}

interface ITextWithLink {
  before_text?: string,
  url: string,
  link: string,
  after_text?: string,
}

const EleventhParagraph: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h2 className="eleventh-paragraph__title">
        {`XI. ${eleventhParagraph.title}`}
      </h2>
      <p className="eleventh-paragraph__text">
        {eleventhParagraph.text_with_link.before_text}
        <a 
          href={eleventhParagraph.text_with_link.url}
          className="eleventh-paragraph__link"
        >
          {eleventhParagraph.text_with_link.link}
        </a>
        {eleventhParagraph.text_with_link.after_text}
      </p>
    </StyledWrapper>     
  );
}
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 56px;

.eleventh-paragraph {
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
}
`;

const eleventhParagraph: IEleventhParagraph = {
  title: "Gesetzegrundlagen",
  text_with_link: {
    before_text: "Den Text der DSGVO und des BDSG neu können Sie auf folgender Homepage abrufen: ",
    url: "https://dsgvo-gesetz.de/",
    link: "https://dsgvo-gesetz.de/",
    after_text: "."
  }
};


export default EleventhParagraph;