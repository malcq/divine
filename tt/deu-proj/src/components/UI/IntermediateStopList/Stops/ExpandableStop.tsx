import React from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { IntermediateStopResponse } from '@models/stop';

import { StopItemLayout } from '../Common/Layouts';
import SmallStopContent from '../Common/SmallStopContent';

import { withTranslation } from 'i18n';
import { MiddleDots } from '../Common/BarParts';
import { IntermediateStopListContext } from '..';
import media from '@utils/media';

interface Props extends WithTranslation {
  stop: IntermediateStopResponse,
  onExpandClick?: () => void,
  hiddenStopsLength: number,
}
const ExpandableStop: React.FC<Props> = (props) => {
  const {
    stop,
    onExpandClick,
    hiddenStopsLength,
    t,
  } = props;
  const { colorInfo } = React.useContext(IntermediateStopListContext);
  return (
    <StopItemLayout>
      <div className="immediate-stop__bar">
        <MiddleDots colorInfo={colorInfo} />
      </div>
      <div className="immediate-stop__content">
        <SmallStopContent
          departureDate={stop.stop_arrival_date}
          platform={stop.platform_name}
          title={stop.stop_title}
          stop_url={stop.stop_url}
        />
        <ShowMore
          onClick={onExpandClick}
        >
          {hiddenStopsLength}
          {' '}
          {t(`stop__tickets-left`)}
        </ShowMore>
      </div>
    </StopItemLayout>
  );
}

const ShowMore = styled.div`
  cursor: pointer;
  padding-top: 15px;
  color: ${props => props.theme.colorValues.primary};
  ${props => props.theme.typography.fnBody};
  ${props => props.theme.typography.fnText};
  :active {
    text-decoration: underline;
  }

  ${media.desktop} {
    :hover {
      text-decoration: underline;
    }
  }
`;

export default withTranslation('common')(ExpandableStop);