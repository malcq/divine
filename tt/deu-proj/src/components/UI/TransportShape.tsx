import React from 'react';
import styled from 'styled-components';

import { STATIC_URLS } from '../../utils/constants';
import { colors } from '../../theme/default/constants';

import { Icon } from './Icon';

type Props = {
  className?: string,
  icon: 'train' | 'bus',
}
const TransportShape: React.FC<Props> = (props) => {
  return (
    <Circle className={props.className}>
      <Icon 
        srcUrl={`${STATIC_URLS.SVG}/${props.icon}_shape_icon.svg?v=2`}
        width={20}
        height={20}
        color={colors.primary}
      />
    </Circle>
  )
};


const Circle = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => props.theme.colorValues.white};
  border-radius: 100%;
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TransportShape;