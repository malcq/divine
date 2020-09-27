import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { TransportsTypes } from '@models/transports';
import { LinesColorInfo } from '@models/stop';

import LineLabel from '@components/UI/Labels/LineLabel';


type LineButtonProps = {
  type: string,
  provider: TransportsTypes,
  selected: boolean,
  className?: string,
  lineColorInfo?: LinesColorInfo[],
  setLineSelection: (line: string, state: boolean, provider: TransportsTypes) => void;
};


const LineButton: React.FC<LineButtonProps> = forwardRef(({
  type,
  setLineSelection,
  selected,
  provider,
  className,
  lineColorInfo
}, ref: any) => {
  return (
    <StyledContainer
      className={className}
      ref={ref}
      onClick={() => setLineSelection(type, selected, provider)}
      selected={selected}
    >
      <LineLabel line={type} colorInfo={lineColorInfo}/>
    </StyledContainer>
  )
});

type StyledContainerProps = {
  selected: boolean,
};

const StyledContainer = styled.button<StyledContainerProps>`
  opacity: ${props => props.selected ? 1 : .3};
`;

export default LineButton;