import React from 'react';

import { IntermediateStopResponse } from '../../../../models/stop';

import { StopItemLayout } from '../Common/Layouts';
import SmallStopContent from '../Common/SmallStopContent';
import { EndBarIcon } from '../Common/BarParts';
import { IntermediateStopListContext } from '..';

type Props = {
  stop: IntermediateStopResponse,
  hiddenStopsLength: number
  isOpened: boolean,
}
const LastStop = React.forwardRef<HTMLLIElement, Props>((props, ref) => {
  const { isOpen, colorInfo } = React.useContext(IntermediateStopListContext)
  const { stop, hiddenStopsLength } = props;
  return (
    <StopItemLayout ref={ref} >
      <div className="immediate-stop__bar" >
        <EndBarIcon
          isNoExpandetList={hiddenStopsLength <= 0}
          isOpened={isOpen}
          colorInfo={colorInfo}
        />
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
  )
})

export default LastStop;