import React from 'react';
import styled from 'styled-components';
import { NetLink } from '../../models/links';
import LinkItem from './LinkItem';

interface Props {
  links: NetLink[]
}

const LinksSection: React.FC<Props> = ({ links }) => (
  <LinksWrapper>
    <h1 className="links__title">
      Links
    </h1>
    {links.map((link, index) => (
      <LinkItem
        key={`${link.url}_${index}`}
        title={link.title}
        url={link.url}
      />
    ))}
  </LinksWrapper>
);

const LinksWrapper = styled.div`
  margin-bottom: 32px;
  & > div:last-child {
    box-shadow: none;
  }
  .links{
    &__title{
      ${(props) => props.theme.typography.fnMedium};
      ${(props) => props.theme.typography.fnTitle3};
      color: ${(props) => props.theme.colorValues.darkGrey};
      padding-bottom: 8px;
    }
  }
`;
export default LinksSection;