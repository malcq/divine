import React from 'react';
import styled from 'styled-components';

import { useTranslation, Link } from '../../../../i18n';

import { LineDepartureInterval } from '../../../models/linefaq';
import { DIE_ARTICLE, TRANSPORT_INFO } from '../../../utils/constants';
import LineLabel from '@components/UI/Labels/LineLabel';
import { getStopUrl } from '@utils/router.util';
import { getSlug } from '@utils/getSlug';


export const DepIntervalsTitle: React.FC<LineDepartureInterval> = (props) => {
  const {
    transport_type,
    line,
    departure_info,
    linesColorInfo,
  } = props;

  const type = TRANSPORT_INFO[transport_type]?.text ?? TRANSPORT_INFO.default.text;

  const { t } = useTranslation('faqcontent');

  return (
    <>
      {t('line_content.departure_intervals.title--before_line_label', { type })}{` `}
      <LineLabel
        line={line}
        colorInfo={linesColorInfo}
        styles={{
          display: 'inline-block'
        }}
      />{` `}
      {t('line_content.departure_intervals.title--after_line_label', {
        stop: departure_info[0].stop_name,
      })}
    </>
  )
};

export const DepIntervalsAnswer: React.FC<LineDepartureInterval> = (props) => {
  const {
    line,
    transport_type,
    departure_info,
    city_name,
    state_name
  } = props;


  const { t } = useTranslation('faqcontent');
  const articleNum = DIE_ARTICLE.includes(transport_type) ? 1 : 2;
  const type = TRANSPORT_INFO[transport_type]?.text ?? TRANSPORT_INFO.default.text;

  const {
    backDir,
    forwardDir,
    backUrl,
    forwardUrl
  } = React.useMemo(() => {
    const forwardDir = departure_info[0];
    const backDir = departure_info[1];

    const forwardUrl = getStopUrl({
      city: city_name,
      state: state_name,
      stop: getSlug(forwardDir.short_title)
    });
    const backUrl = getStopUrl({
      city: city_name,
      state: state_name,
      stop: getSlug(backDir.short_title)
    });

    return {
      forwardDir,
      backDir,
      forwardUrl,
      backUrl
    }
  }, [departure_info]);

  return (
    <StyledWrapper>
      <p>
        {t('line_content.departure_intervals.answer.main--before_stop', {
          count: articleNum,
          type,
          line,
        })}{' '}
        <Link href={forwardUrl.appUrl} as={forwardUrl.browserUrl}>
          <a>
            {forwardDir.stop_name}{` `}
          </a>
        </Link>
        {t('line_content.departure_intervals.answer.main--after_stop', {
          time_interval: forwardDir.interval,
          dep_time: forwardDir.first_departure
        })}
      </p>
      <p>
        {t('line_content.departure_intervals.title', {
          type,
          line,
          stop: backDir.stop_name,
        })}
      </p>
      <p>
        {t('line_content.departure_intervals.answer.secondary--before_stop')}{` `}
        <Link href={backUrl.appUrl} as={backUrl.browserUrl}>
          <a>
            {backDir.stop_name}{` `}
          </a>
        </Link>
        {t('line_content.departure_intervals.answer.secondary--after_stop', {
          count: articleNum,
          type,
          line,
          time_interval: backDir.interval,
          dep_time: backDir.first_departure
        })}
      </p>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  & > p:not(:first-child) {
    margin-top: 16px;
  }
`