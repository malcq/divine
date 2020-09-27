import React from 'react';

import { useTranslation, Link } from '../../../../i18n';
import { TravelDuration } from '../../../models/linefaq';
import { DIE_ARTICLE, TRANSPORT_INFO } from '../../../utils/constants';
import LineLabel from '@components/UI/Labels/LineLabel';
import { getStopUrl } from '@utils/router.util';
import { getSlug } from '@utils/getSlug';


export const TravelDurationTitle: React.FC<TravelDuration> = (props) => {
  const {
    transport_type,
    line,
    city_name,
    linesColorInfo
  } = props;

  const type = TRANSPORT_INFO[transport_type]?.text ?? TRANSPORT_INFO.default.text;
  const articleNum = DIE_ARTICLE.includes(transport_type) ? 1 : 2;
  const { t } = useTranslation('faqcontent');

  return (
    <>
      {t('line_content.travel_duration.title--before_line_label', {
        type,
      })}{` `}
      <LineLabel
        line={line}
        colorInfo={linesColorInfo}
        styles={{
          display: 'inline-block'
        }}
      />{` `}
      {t('line_content.travel_duration.title--after_line_label', {
        city_name
      })}
    </>
  );
};

export const TravelDurationAnswer: React.FC<TravelDuration> = (props) => {
  const {
    transport_type,
    line,
    city_name,
    scheme,
    stops_count,
    duration,
    first_stop,
    intermediate_stop,
    last_stop,
    state_name,
    additionalInfo
  } = props;
  const type = TRANSPORT_INFO[transport_type]?.text ?? TRANSPORT_INFO.default.text;
  const articleNum = DIE_ARTICLE.includes(transport_type) ? 1 : 2;
  const { t } = useTranslation('faqcontent');

  const strDuration = React.useMemo(() => {
    return duration.hour ? `${duration.hour} Uhr ${duration.minute}` :
      duration.minute
  }, [duration])

  const urls = React.useMemo(() => {
    const firstUrl = getStopUrl({
      city: getSlug(additionalInfo.city_name_first),
      state: getSlug(state_name),
      stop: getSlug(additionalInfo.short_title_first)
    })
    const middleUrl = getStopUrl({
      city: getSlug(additionalInfo.city_name_middle),
      state: getSlug(state_name),
      stop: getSlug(additionalInfo.short_title_middle)
    })
    const lastUrl = getStopUrl({
      city: getSlug(additionalInfo.city_name_last),
      state: getSlug(state_name),
      stop: getSlug(additionalInfo.short_title_last)
    });

    return {
      firstUrl,
      middleUrl,
      lastUrl
    }
  }, [
    first_stop,
    intermediate_stop,
    last_stop
  ])
  return (
    <>
      {t('line_content.travel_duration.article', { count: articleNum })}{` `}
      {/* TODO: setup link when subdomain will be available */}
      {/* <Link href='/' as='/'>
        <a>
          {scheme.toUpperCase()}
        </a>
        </Link> */}
      {scheme && scheme.toUpperCase()}{` `}
      {t('line_content.travel_duration.answer__before_first_stop', {
        type,
        line,
      })}{` `}
      <Link href={urls.firstUrl.appUrl} as={urls.firstUrl.browserUrl}>
        <a>
          {first_stop}{` `}
        </a>
      </Link>
      {t('line_content.travel_duration.answer__before_middle_stop')}{` `}
      <Link href={urls.middleUrl.appUrl} as={urls.middleUrl.browserUrl}>
        <a>
          {intermediate_stop}{` `}
        </a>
      </Link>
      {t('line_content.travel_duration.answer__before_last_stop')}{` `}
      <Link href={urls.lastUrl.appUrl} as={urls.lastUrl.browserUrl}>
        <a>
          {last_stop}.{` `}
        </a>
      </Link>
      {t('line_content.travel_duration.answer__after_last_stop', {
        stops_count,
        duration: strDuration,
      })}
    </>
  );
};
