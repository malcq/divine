
import React from 'react'
import styled from 'styled-components';
import { withTranslation } from '../../../i18n';
import { WithTranslation } from 'next-i18next';

import media from '../../utils/media';

interface MoreButtonProps extends WithTranslation {
  title?: string,
  currentAllList?: () => void,
}
const MoreButton: React.FC<MoreButtonProps> = ({ t, currentAllList, title }) => {
  return (
    <ButtonWrapper>
      <StyledButton onClick={currentAllList}>
        {title ? title : t('station-info__show-all-cities')}
        </StyledButton>
    </ButtonWrapper>
  )
}

const StyledButton = styled.button`
  margin: 24px 16px 0;
  background-color: inherit;
  cursor: pointer;
  text-transform: uppercase;

  color: ${props => props.theme.colorValues.primary};
  ${props => props.theme.typography.fnMedium};
  ${props => props.theme.typography.fnLabel2};

  :active {
    color: ${props => props.theme.colorValues.primaryHover};
  }
  
  ${media.desktop} {
    margin: 48px 0 0 0;
    :hover {
      color: ${props => props.theme.colorValues.primaryHover};
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: start;

  ${media.desktop} {
    justify-content: center;
  }
`

export default withTranslation('homepage')(MoreButton)