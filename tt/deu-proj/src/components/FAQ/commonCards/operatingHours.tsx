import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Link, useTranslation } from '../../../../i18n';

import { OperatingHours } from '../../../models/stopfaq';
import { TRANSPORT_INFO, DayOfWeek, DIE_ARTICLE } from '../../../utils/constants';
import { getLineUrl, getStopUrl } from '../../../utils/router.util';
import subDomainUrl from '../../../utils/subdomain.routes';
import LineLabel from '../../UI/Labels/LineLabel';
import { LineOperatingHours, LineContentTypes } from '../../../models/linefaq';
import { LinesColorInfo } from '@models/stop';
import { getSlug } from '@utils/getSlug';

const withSpan = (str?: string | number): ReactElement => {
  return <span>{str}</span>
};
type Props = OperatingHours | LineOperatingHours;

export const OperatingHoursTitle: React.FC<Props> = (props) => {
  const {
    last_stop,
    line,
    transport_type,
    type,
    linesColorInfo,
    city_name,
    short_title,
    state_name
  } = props;

  const { t } = useTranslation('faqcontent');
  const {
    text: transport
  } = TRANSPORT_INFO[transport_type] ?? TRANSPORT_INFO.default;
  const articleNum = DIE_ARTICLE.includes(transport_type) ? 1 : 2;

  const {
    useLink,
    appUrl,
    browserUrl
  } = React.useMemo(() => {
    if (city_name && state_name && short_title) {
      const { appUrl, browserUrl } = getStopUrl({
        city: getSlug(city_name),
        state: getSlug(state_name),
        stop: getSlug(short_title)
      });
      return {
        useLink: true,
        appUrl,
        browserUrl
      }
    }
    return {
      useLink: false
    }
  }, [city_name, short_title, state_name]);

  return (
    <StyledWrapper>
      {t('operatingHours.title.first_part', { articleNum })}{` `}
      {withSpan(transport)}{` `}
      {t('operatingHours.title.middle_part')}{` `}
      <LineLabel line={line} colorInfo={linesColorInfo} className="operating-hour__title-line" />
      {` `}
      {t('operatingHours.title.last_part')}{` `}
      {useLink
        ? (
          <Link href={appUrl ?? ''} as={browserUrl}>
            <a>
              {last_stop}?
            </a>
          </Link>
        ) : (
          <>
            {withSpan(last_stop)}?
          </>
        )
      }
    </StyledWrapper>
  )
};

export const OperatingHoursAnswer: React.FC<OperatingHours | LineOperatingHours> = (props) => {
  const {
    last_stop,
    line,
    schedule,
    transport_type,
    scheme,
    type
  } = props;
  const {
    text: transport
  } = TRANSPORT_INFO[transport_type] ?? TRANSPORT_INFO.default;

  const { t } = useTranslation('faqcontent');

  const lineLink: ReactElement = React.useMemo(() => {
    if (!scheme || scheme === 'none' || type === LineContentTypes.operatingHours) return <span> {line}</span>;

    const { appUrl, browserUrl } = getLineUrl({
      line,
      type: transport_type,
      scheme
    });
    const domainUrl = subDomainUrl({
      action: 'getUrl',
      path: browserUrl,
      scheme
    });

    return (
      <Link href={appUrl} as={browserUrl}>
        <a>
          {line}
        </a>
      </Link>
    )
    //TODO: uncomment when subdomains will be setup
    // return (
    //   <a href={domainUrl} >
    //     {line}
    //   </a>
    // )
  }, [line, transport_type, scheme]);

  const workDayHour = React.useMemo(() => {
    return schedule.find(item => {
      return item.title !== DayOfWeek.sun && Object.values(item.hours).length > 1
    });
  }, [schedule])

  const dayOffHour = React.useMemo(() => {
    return schedule.find(item => {
      return item.title === DayOfWeek.sun && Object.values(item.hours).length > 1
    });
  }, [])

  return (
    <>
      {withSpan(transport)}{` `}
      {t('operatingHours.answer.line')}{` `}
      {lineLink}{` `}
      {t('operatingHours.answer.first_part')}{` `}
      {withSpan(workDayHour?.hours.from)}{` `}
      {t('operatingHours.answer.separator_or')}{` `}
      {withSpan(workDayHour?.hours.to)} {` `}
      {!!dayOffHour &&
        <>
          {t('operatingHours.answer.last_part')}{` `}
          {withSpan(dayOffHour?.hours.from)}{` `}
          {t('operatingHours.answer.separator_or')}{` `}
          {withSpan(dayOffHour?.hours.to)}
        </>
      }.
      <StyledTable>
        <div className="shedule__row">
          <span>{t('operatingHours.answer.shedule.weekday')}</span>
          <span>{t('operatingHours.answer.shedule.uptime')}</span>
        </div>
        {schedule.map((item, ind) => {
          if (Object.values(item.hours).length < 2) return null;
          return (
            <div className="shedule__row" key={ind}>
              <span className="shedule__text--highlighted">
                {t(`operatingHours.answer.shedule.days.${item.title}`)}
              </span>
              <span className="shedule__text--highlighted">
                {item.hours.from} - {item.hours.to}
              </span>
            </div>
          )
        })}
      </StyledTable>
    </>
  )
};

const StyledWrapper = styled.div`
  .operating-hour {
    &__title-line {
      display: inline-block;
    }
  }
`;

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-row-gap: 4px;
  margin-top: 16px;

  .shedule {
    &__row {
      display: grid;
      grid-template-columns: 120px 1fr;
    }

    &__text {
      &--highlighted {
        color: ${props => props.theme.colorValues.grey};
      }
    }
  }
`;