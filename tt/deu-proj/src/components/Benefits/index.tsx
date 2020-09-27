import React from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import BenefitInfo from './BenefitInfo';
import info from './info';

import { withTranslation } from '../../../i18n';
import media from '../../utils/media';

interface BenefitsProps extends WithTranslation {}
const Benefits: React.FC<BenefitsProps> = (props) => {
  const { t } = props;
  return (
    <StyledContainer>
      <h2 className="benefits__title">{t('title')}</h2>
      <h3 className="benefits__subtitle">{t('subtitle')}</h3>
      <div className="benefits__list">
        {info.map((item) => {
          const text = t(item.text);
          return (
            <BenefitInfo
              iconSrc={item.iconSrc}
              sprite={item.sprite}
              text={text}
              title={item.title}
              key={item.title}
              baseColor={item.baseColor}
            />
          )
        })}
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  .benefits {
    &__title,
    &__subtitle {
      ${media.desktop} {
        text-align: center;
      }
    }

    &__title {
      margin-bottom: 12px;
      ${props => props.theme.typography.fnRegular};
      ${props => props.theme.typography.fnTitle1};
      color: ${props => props.theme.colorValues.grey};

      ${media.desktop} {
        margin-bottom: 16px;
      }
    }

    &__subtitle {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
      margin-bottom: 24px;

      ${media.desktop} {
        margin-bottom: 48px;
      }
    }

    &__list {
      ${media.desktop} {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 24px;
        grid-row-gap: 36px;
      }
    }

    &__list > div {
      margin-bottom: 24px;
      ${media.desktop} {
        margin-bottom: 0;
      }
    }

    &__list > div:last-child {
      margin-bottom: 0px;
    }
  }
`;

export default withTranslation('benefits')(Benefits);
