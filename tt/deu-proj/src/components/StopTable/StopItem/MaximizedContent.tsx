import React, { useRef } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

import { StopResponse } from '../../../models/stop';

import media from '@utils/media';
import { getLineUrl } from '@utils/router.util';
import { SCHEMA_URL } from '@utils/constants';
import { RelativeTime } from '@utils/time/getRelativeTime';

import IntermediateStopList from '../../UI/IntermediateStopList';
import StopListButtons from '../../UI/StopListButtons';


type Props = {
  stop: StopResponse,
  nowDate: Date,
  relativeTime: RelativeTime,
  scheme: string,
  className?: string,
  expanded: boolean,
  lineColorInfo?: string,
  isShowSightseeingButton: boolean,
  expandHandler: () => void,
};
const MaximizedContent: React.FC<Props> = (props) => {
  const {
    stop,
    relativeTime,
    expanded,
    expandHandler
  } = props;

  const boxRef = useRef<HTMLDivElement>(null);
  // TODO: remove when subdomains will be ready
  const { appUrl, browserUrl } = React.useMemo(() => {
    return getLineUrl({
      scheme: props.scheme,
      line: props.stop.transport_info.line,
      type: props.stop.transport_info.transport,
      date: format(props.nowDate, 'dd.MM.yyyy'),
      time: format(props.nowDate, 'HH:mm'),
      current_stop: props.stop.intermediate_stop_list[0].stop_title,
    })
  }, [props.nowDate, props.stop, props.scheme]);

  const {
    appUrl: sightButtonAppUrl,
    browserUrl: sightButtonBrowserUrl
  } = React.useMemo(() => {
    return getLineUrl({
      scheme: props.scheme,
      line: props.stop.transport_info.line,
      type: props.stop.transport_info.transport,
      date: format(props.nowDate, 'dd.MM.yyyy'),
      time: format(props.nowDate, 'HH:mm'),
      current_stop: props.stop.intermediate_stop_list[0].stop_title,
      showSight: true
    })
  }, [props.nowDate, props.stop, props.scheme])

  return (
    <StyledContainer
      ref={boxRef}
      isShowButtons={props.isShowSightseeingButton && !!props.scheme}
    >
      <IntermediateStopList
        expandHandler={expandHandler}
        expanded={expanded}
        className="stop-table__list"
        intermediateStops={stop.intermediate_stop_list}
        relativeTime={relativeTime}
        lineColorInfo={props.lineColorInfo}
      />
      <StopListButtons
        scheme={props.scheme}
        line={stop.transport_info.line}
        className="stop-table__stop-buttons"
        buttonDirectionOff
        buttonTicketOff
        buttonSightOff={!props.isShowSightseeingButton || !props.scheme}
        lineLinkAs={browserUrl}
        lineLinkHref={appUrl}
        sightButtonBrowserUrl={sightButtonBrowserUrl}
        sightButtonAppUrl={sightButtonAppUrl}
        buttonLineOff={!props.scheme}
      />
    </StyledContainer>
  );
}

type StylesProps = {
  isShowButtons: boolean
}

const StyledContainer = styled.div<StylesProps>`
  padding-top: 25px;
  padding-bottom: ${props => props.isShowButtons ? 24 : 5}px;

  ${media.desktop} {
    padding-bottom: ${props => props.isShowButtons ? 28 : 9}px;
  }
  .stop-table {
    &__list {
      margin: 0 16px;

      ${media.desktop} {
        margin-right: 52px;
      }
    }
    &__stop-buttons {
      padding-left: 16px;
      margin-top: 5px;
      ${media.desktop} {
        padding-left: 0;
        margin:4px 0 0 16px;
      }
    }
  }
`;

export default MaximizedContent;