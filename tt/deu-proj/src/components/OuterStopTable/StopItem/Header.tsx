import React, { useMemo, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'i18n';

import {
  STATIC_URLS,
  ANIMATION_VALUES,
  PROVIDER_INFO,
  ProviderTypes,
  SCHEMA_URL,
  BASE_URL,
} from '../../../utils/constants';
import media from '../../../utils/media';

import ProviderLogo from '../../UI/ProviderLogo/ProviderLogo';
import { Icon } from '../../UI/Icon';

type Props = {
  transferProvider: ProviderTypes,
  mainPrice?: number,
  isOpen: boolean,
  className?: string
  onClick: () => void,
  minHeight: number,
  children: React.ReactNode
}

const Header = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    transferProvider,
    mainPrice,
    onClick,
    isOpen,
  } = props;
  const { t } = useTranslation('journeypage');
  const providerText = useMemo(() => {
    return PROVIDER_INFO[transferProvider].text ?? ''
  }, [transferProvider]);

  const price = useMemo(() => {
    if (!mainPrice) return;
    return (mainPrice / 100).toString().replace('.', ',')
  }, [mainPrice]);


  return (
    <StyledHeaderContanier
      ref={ref}
      className={props.className}
      isOpen={isOpen}
      onClick={onClick}
      minHeight={props.minHeight}
      isPriceAvailable={!!mainPrice}
    >
      <div className="outer-stop-item__header">
        <div
          itemProp="provider"
          itemScope
          itemType={`${SCHEMA_URL}/Organization`}>
          <meta itemProp="url" content={BASE_URL} />
          <ProviderLogo provider={transferProvider}>
            {(url) => <meta itemProp="logo" content={url} />}
          </ProviderLogo>
          <span className="outer-stop-item__header-title" itemProp="name">
            {providerText}
          </span>
        </div>
        {mainPrice ?
          (<span
            className="outer-stop-item__header-price"
            itemProp="offers"
            itemScope
            itemType={`${SCHEMA_URL}/Offer`}
          >
            <span itemProp="price">
              {price}
            </span>
            {`${' '}`}
            <span className="outer-stop-item__header-bank-note">
              <meta itemProp="priceCurrency" content="EUR" />
              €
        </span>
          </span>) : (
            <span className="outer-stop-item__header-price outer-stop-item__header-price--warning">
              {t('journey-page__tickets_reserved')}
            </span>
          )
        }
        <Icon
          srcUrl={`${STATIC_URLS.SVG}/collapse_arrow.svg`}
          width={12}
          height={7.4}
          className="outer-stop-item__more-button"
        />
      </div>
      {props.children}
    </StyledHeaderContanier>
  )

});

type StylesProps = {
  isOpen: boolean,
  minHeight: number,
  isPriceAvailable: boolean
}

const StyledHeaderContanier = styled.div<StylesProps>`
    user-select: none;
    padding: 17px 8px 0 16px;
    min-height: 24px;
    -webkit-tap-highlight-color: transparent;
    ${media.desktop} {
      cursor: pointer;
      padding-right: 16px;
    }
  .outer-stop-item {

    &__header {
      display: flex;
      align-items: center;
      position: relative;
      margin-right: 6px;
      min-height: 24px;

      &::after {
        opacity: ${props => props.isOpen ? '1' : '0'};
        transition: ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.buttonRotateTime}ms;
        content: "";
        position: absolute;
        width: 44px;
        height: 36px;
        right: -14px;
        bottom: -6px;
        background-color: ${props => props.theme.colorValues.zumthor};
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
        z-index: -1;

      ${media.desktop} {
        width: 52px;
        right: -22px;
      }
      }
      & > div:first-of-type {
        display: flex;
      }

    }

    &__header-title {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
      margin-left: 10px;
    }

    &__header-price {
      margin-left: auto;
      display: block;
      height: 24px;
      margin-right: 12px;
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnTitle3};
      color: ${props => props.theme.colorValues.grey};
      opacity: ${props => props.isOpen ? '0' : '1'};
      transition: opacity ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.buttonRotateTime}ms;

      &--warning {
        ${props => props.theme.typography.fnMedium};
        ${props => props.theme.typography.fnBody};
        color: ${props => props.theme.colorValues.warning};
        margin-right: 0;
        height: auto;
        text-align: end;
        ${media.desktop} {
          margin-right: 12px;
        }
      }
    }

    &__header-bank-note {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnCaption3};
      color: ${props => props.isOpen ? 'transparent' : props.theme.colorValues.grey};
    }

    &__more-button {
      margin-left: 10px;
      transition: transform ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.buttonRotateTime}ms;
      ${props => (props.isOpen ?
    css`
        transform: rotate(0deg);
        background-color: ${props => props.theme.colorValues.primary};
      ` :
    css`
        opacity: 0.3;
        transform: rotate(180deg);
      `)}
    }
  }
`;

export default Header;