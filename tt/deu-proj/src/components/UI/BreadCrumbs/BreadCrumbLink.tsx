import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../../i18n';
import { getFederalUrl } from '../../../utils/router.util';
import { BASE_URL } from '../../../utils/constants';

type Props = {
  title: string,
  endPoint: 'state' | 'city' | 'county' | 'home'
}

const BreadCrumbLink: React.FC<Props> = (props) => {

  if (props.endPoint === 'home') {
    return (
      <Link href='/' as='/' passHref>
        <StyledLink>
          <meta itemProp="item" content={`${BASE_URL}`} />
          {props.title}
        </StyledLink>
      </Link>
    )
  };

  const { appUrl, browserUrl } = React.useMemo(() => {
    return getFederalUrl({
      title: props.title,
      type: props.endPoint
    })
  }, [props]);

  return (
    <Link href={appUrl} as={browserUrl} passHref>
      <StyledLink>
        <meta itemProp="item" content={`${BASE_URL}${browserUrl}`} />
        {props.title}
      </StyledLink>
    </Link >
  )
};

const StyledLink = styled.a.attrs(props => ({
  href: props.href
}))`
  &:hover {
    text-decoration: underline;
  }
`;
export default BreadCrumbLink;