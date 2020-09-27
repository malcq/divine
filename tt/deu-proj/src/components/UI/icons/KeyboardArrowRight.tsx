import React from 'react';

import { CommonIconProps } from './commonTypes';

const KeyboardArrowRight: React.FC<CommonIconProps> = (props) => {
  const {
    color,
    height,
    width,
  } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 12"
    >
      <g
        id="Screens"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        opacity="0.6"
      >
        <g transform="translate(-26.000000, -30.000000)">
          <g transform="translate(8.000000, 8.000000)">
            <g transform="translate(22.000000, 28.000000) rotate(90.000000) translate(-22.000000, -28.000000) translate(10.000000, 16.000000)">
              <polygon
                fill={color}
                fillRule="nonzero"
                points="7.41 8.59 12 13.17 16.59 8.59 18 10 12 16 6 10"
              />
              <polygon points="0 0 24 0 24 24 0 24" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

KeyboardArrowRight.defaultProps = {
  color: '#000',
  width: '7px',
  height: '12px',
};

export default KeyboardArrowRight;