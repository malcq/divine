import React from 'react';
import styled from 'styled-components';
import { useTranslation, Link } from 'i18n';
import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';

import { RouterFactoryResult } from '@models/appSettings';

import { STATIC_URLS, SCHEMA_URL } from '@utils/constants';
import media from '@utils/media';

import { Icon } from '../../Icon';
import { getNewDate } from '@utils/time/getNewDate';

type Props = {
  title: string,
  platform?: string,
  departureDate: string,
  stop_url: RouterFactoryResult,
}
const SmallStopContent: React.FC<Props> = (props) => {
  const {
    title,
    platform,
    departureDate,
    stop_url: { appUrl, browserUrl }
  } = props;
  const { t } = useTranslation('common');

  const departureTitle: string = React.useMemo(() => {
    const date = parse(departureDate, 'HH:mm', getNewDate());
    if (isValid(date)) {
      return departureDate
    } 
    return 'N/A'

  }, [departureDate]);

  const StopLink: React.ReactElement = React.useMemo(() => {
    return (
      (!appUrl && !browserUrl)
      ?
        <span itemProp="name">
          {title}
        </span>
      :
        <Link href={appUrl} as={browserUrl} shallow={true}> 
        <a itemProp="name" className="intermediate-stop-info__link">
          {title}
        </a>
      </Link>
    );
  }, [appUrl, browserUrl]);

  return (
    <StyledContainer>
      <div className="intermediate-stop-info__info">
        <div className="intermediate-stop-info__title-container">
          <h3
            className="intermediate-stop-info__title"
            itemProp="itinerary"
            itemScope
            itemType={`${SCHEMA_URL}/Place`}
          >
            {StopLink}
          </h3>
          <Icon
            srcUrl={`${STATIC_URLS.SVG}/keyboard_arrow_left.svg`}
            width={6}
            height={8}
            className="intermediate-stop-info__arrow"
          />
        </div>
        {platform &&
          <p className="intermediate-stop-info__subtitle">
            {`${t('journeys__segment-way')} ${platform}`}
          </p>
        }
      </div>
      <div
        className="intermediate-stop-info__departure"
      >
        {departureTitle}
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;

  .intermediate-stop-info {
    &__info {
      margin-right: 10px;
      flex-grow: 1;
    }

    &__title-container {
      display: flex;
      align-items: center;
      max-width: 200px;

      ${media.desktop} {
        max-width: 300px;
      }
    }

    &__arrow {
      transform: rotate(180deg);
      opacity: 0.3;
    }
    
    &__title {
      margin-right: 7px;
    }

    &__title,
    &__departure {
      ${props => props.theme.typography.fnTitle2};
      ${props => props.theme.typography.fnText};
      color: ${props => props.theme.colorValues.grey};
    }

    &__subtitle {
      ${props => props.theme.typography.fnLabel3};
      ${props => props.theme.typography.fnText};
      color: ${props => props.theme.colorValues.lightgrey};
    }

    &__link {
      cursor: pointer;

      :hover {
        text-decoration: underline;
      }
    }
  }

`;

export default SmallStopContent;