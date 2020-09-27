import React from 'react';
import styled from 'styled-components';

import { useTranslation, Link } from 'i18n';

import { LinePointsOfInterests } from '../../../models/linefaq';
import { TRANSPORT_INFO } from '../../../utils/constants';
import LineLabel from '@components/UI/Labels/LineLabel';
import { getStopUrl } from '@utils/router.util';
import { getSlug } from '@utils/getSlug';

export const LinePointsOfInterestsTitle: React.FC<LinePointsOfInterests> = (props) => {
  const {
    transport_type,
    line,
    city_name,
    linesColorInfo
  } = props;
  const { t } = useTranslation('faqcontent');
  const type = TRANSPORT_INFO[transport_type]?.text ?? TRANSPORT_INFO.default.text

  return (
    <>
      {t('line_content.points_of_interest.title--before_line_label', {
        type,
      })}{` `}
      <LineLabel
        line={line}
        colorInfo={linesColorInfo}
        styles={{
          display: 'inline-block'
        }}
      />{` `}
      {t('line_content.points_of_interest.title--after_line_label', { city_name })}
    </>
  );

};

export const LinePointsOfInterestsAnswer: React.FC<LinePointsOfInterests> = (props) => {
  const {
    transport_type,
    line,
    city_name,
    state_name,
    points_of_interest
  } = props;
  const { t } = useTranslation('faqcontent');
  const type = TRANSPORT_INFO[transport_type]?.text ?? TRANSPORT_INFO.default.text

  return (
    <>
      {t('line_content.points_of_interest.answer', {
        type,
        line
      })}
      <StyledList>
        {
          points_of_interest.map((item, ind) => {
            const { appUrl, browserUrl } = getStopUrl({
              city: getSlug(city_name),
              state: getSlug(state_name),
              stop: getSlug(item.short_title)
            });
            return (
              <li key={ind}>
                <Link href={appUrl} as={browserUrl}>
                  <a>
                    {item.stop_name}
                  </a>
                </Link>
                   : {item.points.join(', ')}
              </li>
            )
          })
        }
      </StyledList>
    </>
  );

};

const StyledList = styled.ul`
  margin-bottom: 16px;
  list-style-type: disc;
  
  & li {
    margin-left: 20px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;