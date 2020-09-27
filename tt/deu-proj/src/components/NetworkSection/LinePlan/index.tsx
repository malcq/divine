import React from 'react';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from '../../../../i18n';

import { Line } from '../../../models/plans';

import CommonList from '../CommonList';
import NetSectionWrapper from '../Layouts/intex';


interface Props extends WithTranslation{
  line: Line,
}
const LinePlan: React.FC<Props> = ({ line, t }) => (
  <NetSectionWrapper>
    <h3 className="plan-section__title">
      {t('plan__line-title')}
    </h3>
    <CommonList plans={line.plans} />
  </NetSectionWrapper>
);

export default withTranslation('common')(LinePlan);
