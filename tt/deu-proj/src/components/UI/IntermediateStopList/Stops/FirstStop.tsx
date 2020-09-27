import React, { useContext } from 'react';

import { IntermediateStopResponse } from '@models/stop';

import { StopItemLayout } from '../Common/Layouts';
import BigStopContent from '../Common/BigStopContent';
import { StartBarIcon } from '../Common/BarParts';
import { RelativeTime } from '@utils/time/getRelativeTime';
import { IntermediateStopListContext } from '..';

type Props = {
  stop: IntermediateStopResponse,
  relativeTime: RelativeTime
}
const FirstStop = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { stop, relativeTime } = props;
  const { colorInfo } = useContext(IntermediateStopListContext);
  return (
    <StopItemLayout >
      <div className="immediate-stop__bar">
        <StartBarIcon
          colorInfo={colorInfo}
          ref={ref}
        />
      </div>
      <div className="immediate-stop__content">
        <BigStopContent
          relativeTime={relativeTime}
          platform={stop.platform_name}
          title={stop.stop_title}
          arrivalDate={stop.stop_arrival_date}
          stop_url={stop.stop_url}
        />
      </div>
    </StopItemLayout>
  );
})

export default FirstStop;