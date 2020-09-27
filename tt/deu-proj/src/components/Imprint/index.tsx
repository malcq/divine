import React from 'react';
import styled from 'styled-components';

type Props = {}

interface IImprintPage {
  page_title: string,
  main_text: string,
  creds: ICred[]
}
interface ICred {
  text: string;
}
const Imprint: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h1 className="imprint__title-main">
        {imprintPage.page_title}
      </h1>
      <p className="imprint__text imprint__main-text">
        {imprintPage.main_text}
      </p>
      {imprintPage.creds.map((cred: ICred, index: number): React.ReactNode => {
        return (
          <p
            key={index}
            className="imprint__text"
          >
            {cred.text}
          </p>
        )
      })}
    </StyledWrapper>
  )
  
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .imprint {
    &__title-main {
      ${props => props.theme.typography.fnTitle1};
      ${props => props.theme.typography.fnRegular};
      color: ${props => props.theme.colorValues.grey};
      margin-bottom: 12px;
    }

    &__text {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
    }

    &__main-text {
      margin-bottom: 12px;
    }
  }
`;

const imprintPage: IImprintPage = {
  page_title: "Impressum",
  main_text: "Hinweise gem. § 5 des Telemediengesetzes (TMG) in der Fassung vom 26.02.2007. Diese Seiten werden Dir bereitgestellt von:",
  creds: [
    {
      text: "3B Data GmbH"
    },
    {
      text: "Baaderstraße 56d"
    },
    {
      text: "80469 München"
    },
    {
      text: "info@fahrplan.guru"
    },
    {
      text: "GF: B.Bilsky"
    },
    {
      text: "HRB 230681 Registergericht München"
    }
  ]
}
export default Imprint;
