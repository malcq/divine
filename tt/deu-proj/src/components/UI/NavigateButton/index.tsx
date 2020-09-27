import React from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from 'i18n';
import Ripple from '../Ripple';

interface Props extends WithTranslation {
  title: string,
  onClick: () => void,
}
const NavigateButton: React.FC<Props> = ({ onClick, title, t }) => (
  <StyledWrapper
    onClick={onClick}
  >
    <span className="nav-button__text">
      {t(title)}
    </span>

  </StyledWrapper>
);

const StyledWrapper = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;
  .nav-button {
    &__text {
      ${(props) => props.theme.typography.fnMedium};
      ${(props) => props.theme.typography.fnLabel2};
      color: ${(props) => props.theme.colorValues.primary};
      text-transform: uppercase;
    }
  }
`;
export default withTranslation('common')(NavigateButton);