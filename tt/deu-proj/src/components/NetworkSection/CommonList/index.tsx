import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '../../UI/Icon';
import { STATIC_URLS } from '../../../utils/constants';
import { Plan } from '../../../models/plans';
import { colors } from '../../../theme/default/constants';
import { WithTranslation } from 'next-i18next';
import { withTranslation } from '../../../../i18n';

const DOWNLOAD_ICON_URL = `${STATIC_URLS.SVG}/download_icon.svg`

interface Props extends WithTranslation {
  plans: Plan[],
}
const CommonList: React.FC<Props> = ({ plans, t }) => {
  const [showList, setShowList] = useState(false);

  const calcMaxIndex = () => {
    if (showList) {
      return plans.length
    }
    return 2
  }

  return (
    <ListWrapper isShow={showList}>
      {plans.map((plan, i) => {
        if (i > calcMaxIndex()) { return null; }
        return (
          <a
            target="_blank"
            href={plan.pdf_link}
            key={`${plan.pdf_link}_${i}`}
            className="plan-list__item"
          >
            <span className="plan-list__title">
              {plan.title}
            </span>
            <span className="plan-list__file-format">
              PDF
            </span>
            <span className="plan-list__link" >
              <Icon
                className="plan-list__link-icon"
                srcUrl={DOWNLOAD_ICON_URL}
                width={18}
                height={18}
                color={colors.primary}
              />
            </span>
          </a>
        )
      })}
      {(plans && (plans.length > 3)) &&
        (
          <button
            onClick={() => setShowList(true)}
            type="button"
            className="plan-list__button"
          >
            {t('plan__more-button')}
          </button>
        )
      }

    </ListWrapper>
  )
};

interface MainStyleProps {
  readonly isShow: boolean;
}
const ListWrapper = styled.div<MainStyleProps>`
  .plan-list{
    &__item {
      display: flex;
      width: 100%;
      height: 56px;
      align-items: center;
      border-bottom: 0.5px solid ${(props) => props.theme.colorValues.lightestgrey};
      -webkit-tap-highlight-color: transparent;
    }
    &__link {
      max-height: 24px;
    }
    &__title {
      ${(props) => props.theme.typography.fnText};
      ${(props) => props.theme.typography.fnTitle2};
      color: ${(props) => props.theme.colorValues.grey};
      flex-grow: 1;
    }
    &__file-format {
      ${(props) => props.theme.typography.fnMedium}
      ${(props) => props.theme.typography.fnCaption2}
      color: ${(props) => props.theme.colorValues.lightgrey};
      margin-right: 10px;
    }
    &__button {
      text-transform: uppercase;
      ${(props) => (props.isShow && css`
          display: none;
      `)}
      cursor: pointer;
      ${(props) => props.theme.typography.fnMedium}
      ${(props) => props.theme.typography.fnLabel2}
      color: ${(props) => props.theme.colorValues.primary};
      margin-top: 16px;

      :hover {
        color: ${(props) => props.theme.colorValues.primaryHover};
      }
    }
  }
`;

export default withTranslation('common')(CommonList);