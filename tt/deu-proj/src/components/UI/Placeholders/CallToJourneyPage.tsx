import React from 'react';
import styled from 'styled-components';

import { useTranslation } from '../../../../i18n';
import { Button, ButtonSizes } from '../Button';

import { STATIC_URLS, SERVER_ERRORS } from '../../../utils/constants';
import media from '../../../utils/media';
import Ripple from '../Ripple';

type Props = {
  errorMessage: string,
  onActionClick?: () => void,
}
const CallToJourneyPage: React.FC<Props> = (props) => {
  const { t } = useTranslation('common');
  const mainText = React.useMemo(() => {
    switch (props.errorMessage) {
      case SERVER_ERRORS.INVALID_TIME:      
        return {
          title: t('call-to-journey__invalid-time'),
          button: t('call-to-journey__action-title')
        }
      case SERVER_ERRORS.STOP_NOT_FOUND:
      case SERVER_ERRORS.COULDNT_FIND_STOP:
      case SERVER_ERRORS.NO_TRAIN_RESULTS_IN_TIME:
        return {
          title: t('call-to-journey-both-fields__description'),
        };
      case SERVER_ERRORS.NO_RESULTS_IN_TIME:
        return {
          title: t('call-to-journey__no-results'),
          button: t('call-to-journey__choose-time'),
        };
      default:
        return {
          title: '',
          button: ''
        }
    };
  }, []);

  return (
    <StyledContainer>
      <p className="call-to-journey__description">
        {mainText.title}
      </p>
      {mainText.button && props.errorMessage !== SERVER_ERRORS.INVALID_TIME  &&
        <Button
          onClick={props.onActionClick}
          size={ButtonSizes.small}
          className="call-to-journey__button"
        >
          <Ripple />
          {mainText.button}
        </Button>}
      {/* <img className="call-to-journey__image"
        src={`${STATIC_URLS.IMAGES}/call-to-journey_1x.jpg`}
      /> */}

    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 845px;
  margin: 0 auto;

  .call-to-journey {
    &__description {
      margin-bottom: 24px;
      color: ${props => props.theme.colorValues.grey};
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnTitle2};
      text-align: center;
    }

    &__button {
      margin-bottom: 36px;
      text-transform: none;

      ${media.desktop} {
        margin-bottom: 60px;
      }
    }

    &__image {
      width: 310px;
      height: 213px;
      object-fit: cover;

      ${media.desktop} {
        width: 477px;
        height: 328px;
      }
    }
  }
`;

export default CallToJourneyPage;