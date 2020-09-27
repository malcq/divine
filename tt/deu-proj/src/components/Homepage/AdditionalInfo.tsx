import React from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from '../../../i18n';
import media from '../../utils/media';

const AdditionalInfo: React.FC<WithTranslation> = ({ t }) => {
  return (
    <StyledContainer>
      <div className="additional-info__item">
        <h3 className="additional-info__title">
          {t(`additional-info__closest-stop-title`)}
        </h3>
        <p className="additional-info__text">
          {t(`additional-info__closest-stop-text`)}
        </p>
      </div>
      <div className="additional-info__item">
        <h3 className="additional-info__title">
          {t(`additional-info__transport-leave-title`)}
        </h3>
        <p className="additional-info__text">
        {t(`additional-info__transport-leave-text`)}
        </p>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  ${media.desktop} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 24px;
  }

  .additional-info {
    &__item {
      margin-bottom: 24px;

      ${media.desktop} {
        margin-bottom: 0;
      }
    }

    &__item:last-child {
      margin-bottom: 0;
      margin-right: 0;
    }

    &__title {
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnTitle2};
      margin-bottom: 12px;
      color: ${props => props.theme.colorValues.grey};
    }

    &__text {
      ${props => props.theme.typography.fnBody};
      ${props => props.theme.typography.fnRegular};
      color: ${props => props.theme.colorValues.lightgrey};
      white-space: pre-line;
    }
  }
`;

export default withTranslation('homepage')(AdditionalInfo);
