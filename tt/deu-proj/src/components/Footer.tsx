import React from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { STATIC_URLS } from '../utils/constants';
import { withTranslation, Link } from '../../i18n';
import media from '../utils/media';
import { Icon } from './UI/Icon';
import { colors } from '../theme/default/constants';
import { IMPRINT_URL, PRIVACY_URL, PHOTO_CREDITS_URL } from '../utils/router.util';

const Footer: React.FC<WithTranslation> = ({ t }) => {
  return (
    <FooterContainer>
      <div className="footer">
        <div className="footer__content">
          <div className="footer__logo-container">
            <Icon 
              srcUrl={`${STATIC_URLS.SVG}/main-logo.svg`}
              width={20}
              height={24}
              color={colors.grey}
            />
            <p className="footer__copyright footer__copyright--desktop">
              {t('footer__guarantee')}
            </p>
          </div>

          <div className="footer__links">
            <Link href={IMPRINT_URL.appUrl} as={IMPRINT_URL.browserUrl}>
              <a className="footer__link">
                {t('footer__imprint')}
              </a>
            </Link>
            <Link href={PRIVACY_URL.appUrl} as={PRIVACY_URL.browserUrl}>
              <a className="footer__link">
                {t('footer__data-protection')}
              </a>
            </Link>
            <Link href={PHOTO_CREDITS_URL.appUrl} as={PHOTO_CREDITS_URL.browserUrl}>
              <a className="footer__link">
                {t('footer__credits')}
              </a>
            </Link>
          </div>
        </div>
        <p className="footer__copyright footer__copyright--mobile">
          {t('footer__guarantee')}
        </p>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  position: relative;
  box-shadow: rgba(0,0,0,0.12) 0 -1px 0 0;

  ${media.desktop} {
    box-shadow: none;
  }

  .footer {
    max-width: ${props => props.theme.gridValues.maxContentWidth + (2 * props.theme.gridValues.sideDesktopPadding) + 1}px;
    margin: 0 auto;
    padding: 24px 16px;

    ${media.desktop} {
      padding: 26px ${props => props.theme.gridValues.sideDesktopPadding}px;
    }

    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__logo-container {
      display: flex;
      align-items: center;
    }

    &__link,
    &__copyright {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnCaption};
    }

    &__link {
      margin-right: 16px;
      color: ${props => props.theme.colorValues.lightgrey};
      text-decoration: none;

      :active {
        text-decoration: underline;
      }

      ${media.desktop} {
        :hover {
          text-decoration: underline;
        }
      }
    }

    &__link:last-child {
      margin-right: 0;
    }

    &__copyright {
      color: ${props => props.theme.colorValues.lightergrey};

      &--mobile {
        margin-top: 8px;
        display: block;
        text-align: right;
        ${media.desktop} {
          display: none;
        }
      }

      &--desktop {
        margin-left: 16px;
        display: none;
        ${media.desktop} {
          display: block;
        }
      }

    }
  }
`;


export default withTranslation('common')(Footer);