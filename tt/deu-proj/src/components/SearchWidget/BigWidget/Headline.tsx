import React from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { SearchWidgetSections } from '../../../utils/constants';
import { withTranslation } from '../../../../i18n';
import media from '../../../utils/media';

interface Props extends WithTranslation {
  section: SearchWidgetSections,
}
const Headline: React.FC<Props> = ({ t, section }) => {
  const title = section === SearchWidgetSections.stops 
    ? t(`title-stop`)
    : t(`title-journey`);

  const subtitle = section === SearchWidgetSections.stops 
    ? t(`subtitle-stop`)
    : t(`subtitle-journey`);

  return (
    <StyledContainer>
      <h1 className="search-widget__headline">
        {title}
      </h1>
      <p className="search-widget__subtitle">
        {subtitle}
      </p>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: 0 16px;
  margin-bottom: 24px;

  ${media.desktop} {
    margin-bottom: 40px;
  }

  .search-widget {
    &__headline {
      ${props => props.theme.typography.fnTitle1};
      ${props => props.theme.typography.fnRegular};
      text-align: center;
      margin-bottom: 12px;
      
      ${media.desktop} {
        margin-bottom: 16px;
      }
    }

    &__subtitle {
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
      text-align: center;
    }
  }
`;

export default withTranslation('search-widget')(Headline);