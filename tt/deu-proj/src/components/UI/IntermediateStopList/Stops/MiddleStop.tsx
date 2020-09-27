import React from 'react';

import { StopItemLayout } from '../Common/Layouts';

import SmallStopContent from '../Common/SmallStopContent';
import { IntermediateStopResponse } from '@models/stop';

import { SmallBar } from '../Common/BarParts';
import { IntermediateStopListContext } from '..';

type Props = {
  stop: IntermediateStopResponse,
}
const MiddleStop: React.FC<Props> = (props) => {
  const {
    stop,
  } = props;
  const { colorInfo } = React.useContext(IntermediateStopListContext);

  return (
    <StopItemLayout>
      <div className="immediate-stop__bar">
        <SmallBar colorInfo={colorInfo} />
      </div>
      <div className="immediate-stop__content">
        <SmallStopContent
          departureDate={stop.stop_arrival_date}
          platform={stop.platform_name}
          title={stop.stop_title}
          stop_url={stop.stop_url}
        />
      </div>
    </StopItemLayout>
  );
}

export default MiddleStop;