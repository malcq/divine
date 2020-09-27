import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

type Props = {
  html?: string,
  className?: string,
}
const HtmlAnswer: React.FC<Props> = (props) => {

  const htmlObject = {
    __html: props.html ?? '',
  }

  const containerClasses = classnames('html-answer', props.className);

  return (
    <StyledContainer
      dangerouslySetInnerHTML={htmlObject}
      className={containerClasses}
    />
  );
}

const StyledContainer = styled.div`
  ${props => props.theme.typography.fnBody};
  ${props => props.theme.typography.fnText};
  color: ${props => props.theme.colorValues.lightgrey};

  p,
  table,
  ul {
    margin-bottom: 16px;
  }

  p:last-child,
  table:last-child,
  ul:last-child {
    margin-bottom: 0;
  }

  th, td {
    text-align: left;
  }

  th {
    padding: 0;
    padding-bottom: 4px;
    font-weight: inherit;
  }

  td {
    padding: 0;
    color: ${props => props.theme.colorValues.grey};
  }

  td:nth-child(1) {
    width: 120px;
  }

  td:nth-child(2) {
    width: 167px;
  }

  ul {
    list-style-type: disc;
  }

  li {
    margin-left: 20px;
  }

`;

export default HtmlAnswer;