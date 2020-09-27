import React from 'react';
import styled, { css } from 'styled-components';
import classnames from 'classnames';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from '../../../../../i18n';

import { STATIC_URLS } from '../../../../utils/constants';
import { Icon } from '../../../UI/Icon';
import { HeaderWidgetErrors } from '../../../../models/widget';

const FROM_TO_ICON_URL = `${STATIC_URLS.SVG}/from-to-icon.svg`;

interface Props extends WithTranslation {
  fromTitle?: string,
  toTitle?: string,
  onPreviewClick?: () => void,
  errors?: HeaderWidgetErrors,
  isHeaderMobileWidget?: boolean,
};
const PreviewDestination: React.FC<Props> = (props) => {
  const { errors } = props;

  const fromTitleClass = classnames(
    'preview-destination__title',
    {
      'preview-destination__title--placeholder': !props.fromTitle,
    }
  );

  const toTitleClass = classnames(
    'preview-destination__title',
    {
      'preview-destination__title--placeholder': !props.toTitle,
    }
  );

  const fromTitle = props.fromTitle
    ? props.fromTitle
    : props.t(`destination__from-placeholder`);

  let toTitle;

  if (props.toTitle) {
    toTitle = props.toTitle
  } else if (props.isHeaderMobileWidget) {
    toTitle = props.t('placeholder')
  } else {
    toTitle = props.t('destination__to-placeholder')
  }

  const shouldShowErros = React.useMemo((): boolean => {
    if (!errors) { return false; }
    return !!(errors.from || errors.to);
  }, [errors])

  return (
    <StyledContainer
      onClick={props.onPreviewClick}
      showError={shouldShowErros}
      isHeaderMobileWidget={props.isHeaderMobileWidget}
    >
      <Icon
        className="preview-destination__icon"
        srcUrl={FROM_TO_ICON_URL}
        height={28}
        width={8}
      />
      <div className="preview-destination__content">
        <div className={fromTitleClass}>
          {fromTitle}
        </div>
        <div className={toTitleClass}>
          {toTitle}
        </div>
      </div>
    </StyledContainer>
  )
};

type StyledContainerProps = {
  showError?: boolean,
  isHeaderMobileWidget?: boolean,
}
const StyledContainer = styled.div<StyledContainerProps>`

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
  padding: 5px 11px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;

  border-color: ${props => props.showError
    ? props.theme.colorValues.primary
    : props.theme.colorValues.lightestgrey};

  .preview-destination {
    &__icon {
      display: block;
      margin-right: 12px;
    }

    &__content {
      flex-grow: 1;
      max-width: calc(100% - 8px - 12px);
    }

    &__title {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: rgba(0,0,0,0.86);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &--placeholder {
        ${props => props.isHeaderMobileWidget
    ? css`
              color: ${props => props.theme.colorValues.primary};
            `
    : css`
              color: ${props => props.theme.colorValues.lightgrey};
            `
  }
      }
    }
    
  }
`;

export default withTranslation('search-widget')(PreviewDestination);