import React from 'react';
import styled from 'styled-components';
import NetPlan from './NetPlan';
import { PlansInfo } from '../../models/plans';
import LinePlan from './LinePlan';

interface Props {
  plansInfo: PlansInfo,
}

const NetworkSection: React.FC<Props> = ({ plansInfo }) => (
  <NetworkSectionWrapper>
    <NetPlan
      net={plansInfo.net}
    />
    <LinePlan
      line={plansInfo.line}
    />
  </NetworkSectionWrapper>
);

const NetworkSectionWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    & > div:last-child {
        margin-top: 40px;
    }
`;
export default NetworkSection;