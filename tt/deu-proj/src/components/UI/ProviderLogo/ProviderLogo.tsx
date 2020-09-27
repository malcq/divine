import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { PROVIDER_INFO, ProviderTypes, BASE_URL } from '../../../utils/constants';
import LogosSprite from '@components/UI/LogosSprite';

type Props = {
  provider: ProviderTypes,
  className?: string,
  children?: (url: string) => ReactElement
}

const DEFAULT_IMAGE = {
  url: undefined,
  alt: 'N/A transport'
}

const ProviderLogo: React.FC<Props> = (props) => {
  const { provider } = props;

  const imgSrc = PROVIDER_INFO[provider]?.image ?? DEFAULT_IMAGE;
  const imgSprite = PROVIDER_INFO[provider]?.sprite ?? PROVIDER_INFO.unknown.sprite;
  return (
    <StyledWrapper className={props.className}>
      {props.children && props.children(`${BASE_URL}${imgSrc.url}`)}
       <LogosSprite 
          sprite={imgSprite}
          width={provider === 'flixbus' ? 80 : 30}
        />
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  max-height: 20px;
`;

export default ProviderLogo;