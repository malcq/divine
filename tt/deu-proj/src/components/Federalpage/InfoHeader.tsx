import React from 'react';
import styled from 'styled-components';

import { useTranslation } from '../../../i18n';

import media from '../../utils/media';
import { SCHEMA_URL } from '../../utils/constants';

import { StopLandingPlace } from '../../models/stopLanding';

import BreadCrumbs from '../UI/BreadCrumbs';

type Props = {
  cityName: string,
  placeInfo: StopLandingPlace,
};

const InfoHeader: React.FC<Props> = (props) => {

  const { t } = useTranslation('common');
  return (
    <StyledWrapper
      itemScope
      itemType={`${SCHEMA_URL}/Trip`}
    >
      <div className="info-header">
        <div className="info-header__text">
          <BreadCrumbs
            placeInfo={props.placeInfo}
          />
        </div>
        <h1
          className="info-header__title"
          itemProp="name"
        >
          <span className="info-header__sub-title" >
            {t('federal__sub-header-title')}
          </span>
          <span>
            {props.cityName}
          </span>
        </h1>
      </div>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
 

  ${media.desktop} {
    box-shadow: 0 1px 0 0 rgba(0,0,0,0.06), 0 2px 6px 0 rgba(0,0,0,0.12), 0 -1px 0 0 rgba(0,0,0,0.06);
  }
    
    .info-header {
      padding: 16px 20px 16px 16px;
      max-width: 1090px;
      margin: 0 auto;

      ${media.desktop} {
        padding: 16px 0 40px 16px;
      }

      &__sub-title {
        display: block;
        ${props => props.theme.typography.fnText};
        ${props => props.theme.typography.fnBody};
        color: ${props => props.theme.colorValues.lightgrey};
        margin: 24px 0 7px;

        ${media.desktop} {
          margin: 34px 0 8px;
        }
      }

      &__title {
        ${props => props.theme.typography.fnRegular};
        ${props => props.theme.typography.fnTitle1};
        color: ${props => props.theme.colorValues.grey};
      }
    }
`;

export default InfoHeader;