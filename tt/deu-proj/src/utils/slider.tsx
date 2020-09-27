import React, { useRef } from 'react';
import styled from 'styled-components';

import media from '@utils/media';

type Props = {
  
};

const Slider: React.FC<Props> = (props) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <StyledWrapper ref={sliderRef}>
     {/* {props.children} */}
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
   
`;

export default Slider;