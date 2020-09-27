import React from 'react';
import { WithTranslation } from 'next-i18next';

import CommonList from '../CommonList';
import { Net } from '../../../models/plans';
import NetSectionWrapper from '../Layouts/intex';
import { withTranslation } from '../../../../i18n';

interface Props extends WithTranslation {
  net: Net
}
const NetPlan: React.FC<Props> = ({
  net,
  t
}) => (
    <NetSectionWrapper>
      <h3 className="plan-section__title">
        {t('plan__net-title')}
      </h3>
      <div className="plan-section__cover-box">
        {/* 
          TODO: when real image is available from backend -
          decide what to do with image below
        */}
        {/* <img
          src={net.image}
          alt="net-plan cover"
          className="plan-section__img"
        /> */}
      </div>

      <span className="plan-section__subtitle">
        {net.provider}
      </span>
      <CommonList plans={net.plans} />
    </NetSectionWrapper>
);

export default withTranslation('common')(NetPlan);