import React, { ReactElement } from 'react';

import { useTranslation } from '../../../../i18n';
import { getCityAndStop } from './commonParts';
import { NumberOfLines, LinesPerTransport } from '../../../models/stopfaq';
import { TRANSPORT_INFO } from '../../../utils/constants';

export const NumberOfLinesTitle: React.FC<NumberOfLines> = (props) => {
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
      {t('number_of_line.title')} {stop} in {cityLink}?
    </>
  )
};

export const NumberOfLinesAnswer: React.FC<NumberOfLines> = (props) => {
  const {
    city_name: cityName,
    stop_name: stopName,
    transport_lines: transportAndLines
  } = props;

  const { t } = useTranslation('faqcontent');

  const transportCountToHtml = React.useCallback((
    elem: LinesPerTransport,
    isLast: boolean
  ): ReactElement => {
    const type = elem.transport_type;
    const transportType = TRANSPORT_INFO[type]?.text ?? TRANSPORT_INFO.default.text;
    const lineCount = elem.lines.length;

    let separator = '';
    if (!isLast) {
      separator = `${t('number_of_line.answer.and')} `;
    }

    const linePerType = <span>{lineCount} {transportType}</span>
    return (
      <>
        {linePerType} {t('number_of_line.answer.line', { count: lineCount })} {separator}
      </>
    )
  }, [TRANSPORT_INFO, t]);

  const linesCount = transportAndLines.map((item, ind) => {
    const isLast = ind === transportAndLines.length - 1;
    return (
      <React.Fragment key={ind}>
        {transportCountToHtml(item, isLast)}
      </React.Fragment>
    )
  });

  const {
    city,
    cityLink,
    stop
  } = getCityAndStop(cityName, stopName);

  return (
    <>
      {t('number_of_line.answer.first_part')} {stop} in {cityLink}{` `}
      {t('number_of_line.answer.middle_part')} {linesCount} {t('number_of_line.answer.last_part')}
    </>
  );

};