import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Link, useTranslation } from '../../../../i18n';

import { LinesOperating, LinesPerTransport } from '../../../models/stopfaq';

import { getLineUrl } from '../../../utils/router.util';
import subDomainUrl from '../../../utils/subdomain.routes';
import { TRANSPORT_INFO } from '../../../utils/constants';

import { getCityAndStop } from './commonParts';

export const AvailableLinesTitle: React.FC<LinesOperating> = (props) => {
  const {
    city_name: cityName,
    stop_name: stopName,
  } = props;

  const { t } = useTranslation('faqcontent');
  const {
    cityLink,
    stop
  } = getCityAndStop(cityName, stopName);

  return (
    <>
      {t('lines_operating.title')} {stop} in {cityLink}?
    </>
  )
};


export const AvailableLinesAnswer: React.FC<LinesOperating> = (props) => {
  const {
    city_name: cityName,
    stop_name: stopName,
    transport_lines
  } = props;

  const {
    city,
    cityLink,
    stop
  } = getCityAndStop(cityName, stopName);

  const { t } = useTranslation('faqcontent');

  const linksFromStr = React.useCallback((arr: LinesPerTransport): ReactElement => {
    return (
      <>
        {arr.lines.map((item, ind) => {
          const comma = (ind === arr.lines.length - 1) ? '' : ',';
          if (!arr.scheme || arr.scheme === 'none') {
            return (
              <span key={ind}>
                {item}{comma}
              </span>
            )
          };
          const { appUrl, browserUrl } = getLineUrl({
            line: item,
            type: arr.transport_type,
            scheme: arr.scheme,
            current_stop: stopName
          });

          const domainUrl = subDomainUrl({
            action: 'getUrl',
            path: browserUrl,
            scheme: arr.scheme
          });
          //TODO: uncomment when subdomains will be setup
          // return (
          //   <a key={ind} href={domainUrl}>
          //     {item}{comma}
          //   </a>
          // )

          return (
            <Link href={appUrl} as={browserUrl} key={ind}>
              <a>
                {item}{comma}
              </a>
            </Link>
          )
        })}
      </>
    )
  }, [getLineUrl, subDomainUrl]);

  return (
    <>
      {t('lines_operating.answer.first_part')} {stop} in {cityLink}{` `}
      {t('lines_operating.answer.last_part')}:
      <StyledList>
        {transport_lines.map((item, index) => {
          const type = item.transport_type;
          const transportType = TRANSPORT_INFO[type]?.text ?? TRANSPORT_INFO.default.text;
          return (
            <li key={index}>
              <span>{transportType}:</span> {linksFromStr(item)}
            </li>
          )
        })}
      </StyledList>
    </>
  )
};

const StyledList = styled.ul`
  list-style-type: disc;
  
  & li {
    margin-left: 20px;
    overflow-wrap: break-word;

    & > span,
    & > a {
      margin: 0 2px; 
      display: inline-block;
    }
  }

`;