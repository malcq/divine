import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useScreenWidth } from '@utils/hooks/useScreenWidth';

type Props = {
  scrollOffOnValue?: number;
  autoHide: boolean;
  styles?: React.CSSProperties;
  className?: string;
  scrollElem?: React.RefObject<HTMLElement>
};

const CustomBar: React.FC<Props> = (props) => {
  const { screenWidth } = useScreenWidth();
  const isHidden = React.useMemo(() => {
    if (!props.scrollOffOnValue) return false;
    return screenWidth && screenWidth <= props.scrollOffOnValue
      ? true
      : false;
  }, [screenWidth, props.scrollOffOnValue]);

  return (
    <>
      {isHidden
        ? (
          props.children
        )
        : (
          <SimpleBar
            scrollableNodeProps={{ref: props.scrollElem}}
            autoHide={props.autoHide}
            className={props.className}
            style={props.styles}
          >
            {props.children}
          </SimpleBar>
        )}
    </>
  )
};

export default CustomBar;