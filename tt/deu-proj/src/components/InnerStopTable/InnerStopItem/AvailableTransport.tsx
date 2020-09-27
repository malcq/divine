import React, { useMemo } from 'react';
import styled from 'styled-components';

import { TransportsTypes } from '../../../models/transports';
import { TransportAndLines, ResponseSimplifiedList } from '../../../models/journey';
import { LinesColorInfo } from '@models/stop';

import TransportLabel from '../../UI/Labels/TransportLabel';
import LineLabel from '../../UI/Labels/LineLabel';
import { Icon } from '../../UI/Icon';

import { STATIC_URLS } from '../../../utils/constants';


type Props = {
  isFirst: boolean,
  className?: string,
  separatorClass: string,
  list: ResponseSimplifiedList,
  colorInfo?: LinesColorInfo[]
};

const AvailableTransport: React.FC<Props> = (props) => {


  const isWalkFirst = useMemo(() => {
    return props.isFirst && props.list.product_type === TransportsTypes.walk
  }, [props.list, props.isFirst]);

  if (isWalkFirst && !props.isFirst) return null;

  if (isWalkFirst) {
    return (
      <AvailableTransportWrapper
        className={props.className}
        isWalk={isWalkFirst}
      >
        <Icon
          srcUrl={`${STATIC_URLS.SVG}/human_shape.svg`}
          height={14.33}
          width={8.67}
          className="inner-available-transport__human"
        />
        <span className="inner-available-transport__walk-time">
          4
        </span>
        <Icon
          srcUrl={`${STATIC_URLS.SVG}/separator.svg`}
          width={3.71}
          height={6}
          className={props.separatorClass}
        />
      </AvailableTransportWrapper>
    )
  };

  return (
    <AvailableTransportWrapper
      className={props.className}
    >
      <TransportLabel
        transport={props.list.product_type}
        className="inner-available-transport__label"
      />
      <LineLabel
        line={props.list.product}
        className="inner-available-transport__line"
        colorInfo={props.colorInfo}
      />
      <Icon
        srcUrl={`${STATIC_URLS.SVG}/separator.svg`}
        width={3.71}
        height={6}
        className={props.separatorClass}
      />
    </AvailableTransportWrapper>

  )
};

type StylesProps = {
  isWalk?: boolean,
};

const AvailableTransportWrapper = styled.div<StylesProps>`
  display: flex;
  align-items: center;
  position: relative;
  min-width: max-content;
  
  .inner-available-transport {

    &__label {

      &:not(:first-child) {
        margin-left: 4px;
      }
    }

    &__line {
      margin-left: 4px;
    }

    &__human {
      margin-right: 7px;
    }

    &__walk-time {
      position: absolute;
      font-size: 11px;
      line-height: 16px;
      opacity: .6;
      color: ${props => props.theme.colorValues.black};
      right: 17px;
      bottom: -8px;
    }
  }

`;

export default AvailableTransport;
