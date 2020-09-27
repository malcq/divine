import React from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import media from '../../utils/media';
import { withTranslation } from '../../../i18n';


const FromToInfo: React.FC<WithTranslation> = ({ t }) => {
  return (
    <StyledContainer>
      <h2 className="from-to-description__title">
        {t(`from-to-into__title`)}
      </h2>
      <p className="from-to-description__text">
        {t(`from-to-into__text`)}
      </p>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  .from-to-description {
    &__title {
      ${props => props.theme.typography.fnTitle1};
      ${props => props.theme.typography.fnRegular};
      color: ${props => props.theme.colorValues.grey};
      margin-bottom: 12px;
    }
    
    &__text {
      ${props => props.theme.typography.fnBody};
      ${props => props.theme.typography.fnText};
      color: ${props => props.theme.colorValues.lightgrey};
    }
  }

  ${media.desktop} {
    /* display: none; */
  }

`;

export default withTranslation('homepage')(FromToInfo);