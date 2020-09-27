import React from 'react';
import styled from 'styled-components';

import { useTranslation, Link } from '../../../../i18n';
import { TRANSPORT_INFO } from '../../../utils/constants';

import { LineSurroundingStreets } from '../../../models/linefaq';
import LineLabel from '@components/UI/Labels/LineLabel';
import { getStopUrl } from '@utils/router.util';
import { getSlug } from '@utils/getSlug';

export const LineSurroundingStreetsTitle: React.FC<LineSurroundingStreets> = (props) => {
  const {
    city_name,
    line,
    transport_type,
    linesColorInfo,
  } = props;

  const type = TRANSPORT_INFO[transport_type]?.text ?? TRANSPORT_INFO.default.text;
  const { t } = useTranslation('faqcontent');

  return (
    <>
      {t('line_content.surrounding_streets.title--before_line_label', {
        type
      })}{` `}
      <LineLabel
        line={line}
        colorInfo={linesColorInfo}
        styles={{
          display: 'inline-block'
        }}
      />{` `}
      {t('line_content.surrounding_streets.title--after_line_label', {
        city_name,
      })}
    </>
  );
}

export const LineSurroundingStreetsAnswer: React.FC<LineSurroundingStreets> = (props) => {
  const {
    city_name,
    line,
    nearby_streets,
    transport_type,
    state_name
  } = props;

  const type = TRANSPORT_INFO[transport_type]?.text ?? TRANSPORT_INFO.default.text;
  const { t } = useTranslation('faqcontent');

  return (
    <>
      {t('line_content.surrounding_streets.answer', {
        city_name,
        line,
        type
      })}
      <StyledList>
        {
          nearby_streets.map((item, ind) => {
            const { appUrl, browserUrl } = getStopUrl({
              city: getSlug(city_name),
              state: getSlug(state_name),
              stop: getSlug(item.short_title)
            })
            return (
              <li key={ind}>
                {t('stop')}{` `}
                <Link href={appUrl} as={browserUrl}>
                  <a>
                    {item.stop_name}
                  </a>
                </Link>
                : {item.streets.join(', ')}
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