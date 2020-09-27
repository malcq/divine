import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';


type Props = {
  width: number,
  height: number,
  autoHeight?: boolean,
  autoHeightMax?: number,
  autoHeightMin?: number,
};

const ScrollBar: React.FC<Props> = (props) => {
  const { width, height } = props;

  const autoheightProps = React.useMemo(() => {
    if (props.autoHeight && props.autoHeightMax && props.autoHeightMin) {
      return {
        autoHeight: true,
        autoHeightMax: props.autoHeightMax,
        autoHeightMin: props.autoHeightMin,
      }
    }
    return {};
  }, [props.autoHeight && props.autoHeightMax && props.autoHeightMin])

  const finalHeight = !props.autoHeight ? height : undefined;

  return (
    <StyledScroll
      {...autoheightProps}
      style={{ width, height: finalHeight }}
      renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
    >
      {props.children}

    </StyledScroll>
  )
};

const StyledScroll = styled(Scrollbars)`
  .thumb-vertical {
    background-color: red;
    width: 4px;
    border-radius: 8px;
    background-color: ${props => props.theme.colorValues.primary};
  }
`;

export default ScrollBar;