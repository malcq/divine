import React from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import { withTranslation, Link } from 'i18n';

import { RouterFactoryResult } from '@models/appSettings';

import { RelativeTime } from '@utils/time/getRelativeTime';
import { SCHEMA_URL } from '@utils/constants';


interface Props extends WithTranslation {
  title: string,
  arrivalDate: string,
  platform?: string,
  relativeTime: RelativeTime,
  stop_url: RouterFactoryResult,
}
const BigStopContent: React.FC<Props> = (props) => {
  const {
    title,
    platform,
    t,
    arrivalDate,
    relativeTime,
    stop_url: { appUrl, browserUrl },
  } = props;

  const timeInArea = relativeTime.time <= 20;
  const timePrefix = relativeTime.isAfter ? t(`stop__time-in`) : t(`stop__time-ago`);

  // TODO hold it commented until recieve correct server Api 
/*   const StopLink: React.ReactElement = React.useMemo(() => {
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
  }, [appUrl, browserUrl]); */

  return (
    <StyledContainer>
      <div className="intermediate-stop-item__info">
        <h3
          className="intermediate-stop-item__title"
          itemProp="itinerary"
          itemScope
          itemType={`${SCHEMA_URL}/Place`}
        >
          {/*  // TODO use this code instead StopLink until recieve correct server Api */}
          <span itemProp="name">
          {title}
        </span>
        </h3>
        {platform &&
          <p className="intermediate-stop-item__subtitle">
            {`${t('journeys__segment-way')} ${platform}`}
          </p>
        }
      </div>
      <div className="intermediate-stop-item__departure">
        {timeInArea && `${timePrefix}${' '}`}
        {timeInArea ?
          <>
            <span>{relativeTime.time}</span> Min
                </> :
          <span> {relativeTime.fullTime} </span>
        }
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;

  .intermediate-stop-item {
    &__info {
      flex-grow: 1;
    }

    &__title {
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnTitle2};
      color: ${props => props.theme.colorValues.grey};
      padding-right: 10px;
    }

    &__subtitle {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnLabel3};
      color: ${props => props.theme.colorValues.lightgrey};
    }

    &__departure {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnCaption3};
      color: ${props => props.theme.colorValues.grey};
      margin-left: auto;
      flex-shrink: 0;

      & > span {
        ${props => props.theme.typography.fnMedium};
        ${props => props.theme.typography.fnTitle3};
      }
    }

    &__link {
      cursor: pointer;

      :hover {
        text-decoration: underline;
      }
    }
  }
`;

export default withTranslation('common')(BigStopContent);