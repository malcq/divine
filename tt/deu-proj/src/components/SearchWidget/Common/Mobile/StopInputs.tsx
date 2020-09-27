import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from '../../../../../i18n';

import { HeaderWidgetErrors } from '../../../../models/widget';
import { STATIC_URLS } from '@utils/constants';

interface Props extends WithTranslation {
  onFromClick: () => void,
  onToClick: () => void,
  onSwapClick?: () => void,
  swapDisabled?: boolean,
  fromInputTitle?: string,
  toInputTitle?: string,
  errors?: HeaderWidgetErrors,
}
const StopInputs: React.FC<Props> = (props) => {
  const { t, errors } = props;

  const [switchRotated, setSwitchRotated] = React.useState(false);

  function toggleSwitch() {
    if (props.swapDisabled) { return; }
    setSwitchRotated(prev => !prev);
    props?.onSwapClick?.();
  }

  const shouldShowFromError = React.useMemo((): boolean => {
    if (!errors) { return false; }
    return !!errors.from;
  }, [errors]);

  const shouldShowToError = React.useMemo((): boolean => {
    if (!errors) { return false; }
    return !!errors.to;
  }, [errors]);

  return (
    <StyledContainer
      switchRotated={switchRotated}
      swapDisabled={props.swapDisabled}
      showFromError={shouldShowFromError}
      showToError={shouldShowToError}
    >
      <button
        className="journey-form__button journey-form__button--from"
        onClick={props.onFromClick}
      >
        <span className="journey-form--stop-icon" />
        <p className="journey-form__help-title">
          {t(`destination__from`)}
        </p>
        {props.fromInputTitle
          ? (
            <p className="journey-form__title">
              {props.fromInputTitle}
            </p>
          )
          : (
            <p className="journey-form__placeholder">
              {t(`destination__journey-placeholder`)}
            </p>
          )
        }
        <div className="journey-form__half-circle journey-form__half-circle--top" />
      </button>
      <button
        className="journey-form__switch-button"
        onClick={toggleSwitch}
      >
        <span className="journey-form--up-down-icon" />
      </button>
      <button
        className="journey-form__button journey-form__button--to"
        onClick={props.onToClick}
      >
        <span className="journey-form--square-icon" />
        <p className="journey-form__help-title">
          {t(`destination__to`)}
        </p>
        {props.toInputTitle
          ? (
            <p className="journey-form__title">
              {props.toInputTitle}
            </p>
          )
          : (
            <p className="journey-form__placeholder">
              {t(`destination__journey-placeholder`)}
            </p>
          )
        }
        <div className="journey-form__half-circle journey-form__half-circle--bottom" />
      </button>
    </StyledContainer>
  )
};


type StyledContainerProps = {
  switchRotated?: boolean,
  swapDisabled?: boolean,
  showFromError?: boolean,
  showToError?: boolean,
}
const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: column;

  .journey-form {
    &__button {
      position: relative;
      cursor: unset;
      width: 100%;
      padding: 16px;
      padding-right: 70px;
      display: flex;
      align-items: center;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnTitle2};

      overflow: hidden;

      :active {
        background-color: ${props => props.theme.colorValues.aliceBlue};
      }

      &::before {
        border-radius: 8px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        content: "";
        border: 1px solid ${props => props.theme.colorValues.lightestgrey};
      }

      &--from {
        &::before {
          ${props => props.showFromError && css`border: 2px solid ${props => props.theme.colorValues.primary};`}
        }
      }

      &--to {
        &::before {
          ${props => props.showToError && css`border: 2px solid ${props => props.theme.colorValues.primary};`}
        }
      }
    }

    &--up-down-icon {
      width: 14px;
      height: 18px;
      background: url(${STATIC_URLS.SVG}/widget/arrow-up-down.svg) no-repeat 50% 50%;
    }

    &--stop-icon {
      width: 12px;
      height: 12px;
      background: url(${STATIC_URLS.SVG}/widget/circle-icon.svg) no-repeat 50% 50%;
    }

    &--square-icon {
      width: 12px;
      height: 12px;
      background: url(${STATIC_URLS.SVG}/widget/square-icon.svg) no-repeat 50% 50%;
    }

    &__half-circle {
      position: absolute;
      width: 52px;
      height: 52px;
      border-radius: 100%;

      background-color: white;
      border: 1px solid ${props => props.theme.colorValues.lightestgrey};
      z-index: 1;

      &--top {
        bottom: -31px;
        right: 19px;
        ${props => props.showFromError && css`border: 2px solid ${props => props.theme.colorValues.primary};`}
      }
      
      &--bottom {
        top: -31px;
        right: 19px;
        ${props => props.showToError && css`border: 2px solid ${props => props.theme.colorValues.primary};`}
      }
    }

    &__help-title {
      margin-left: 15px;
      margin-right: 4px;
      color: ${props => props.theme.colorValues.lightgrey};
    }
    
    &__title,
    &__placeholder {
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }

    &__placeholder {
      color: rgba(0,0,0,0.32);
    }

    &__title {
      color: ${props => props.theme.colorValues.black};
    }

    &__switch-button {
      width: 50px;
      height: 50px;
      align-self: flex-end;
      margin: -21px 0;
      margin-right: 20px;
      border-radius: 100%;
      position: relative;
      z-index: 10;
      cursor: ${props => props.swapDisabled ? 'not-allowed' : 'pointer'};
      opacity: ${props => props.swapDisabled ? '30%' : '100%'};
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.1s;
      transform: ${props => props.switchRotated ? 'rotate(180deg)' : 'rotate(0deg)'}
    }

  }
`;

StopInputs.defaultProps = {
  swapDisabled: false,
};

export default  withTranslation('search-widget')(StopInputs);