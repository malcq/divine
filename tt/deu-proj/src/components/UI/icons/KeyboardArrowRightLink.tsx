import React from 'react';

import { CommonIconProps } from './commonTypes';

interface Props extends CommonIconProps {
  className?: string;
};

const KeyboardArrow: React.FC<Props> = ({ color, height, width, className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 8"
      className={className}
    >
      <g id="Screens" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.3">
        <g transform="translate(-682.000000, -1414.000000)">
          <g transform="translate(0.000000, 962.000000)">
            <g transform="translate(240.000000, 446.000000)">
              <g transform="translate(246.000000, 0.000000)">
                <g transform="translate(199.000000, 10.000000) rotate(-90.000000) translate(-199.000000, -10.000000) translate(191.000000, 2.000000)">
                  <polygon fill={color} fillRule="nonzero" points="4.94 5.72666667 8 8.78 11.06 5.72666667 12 6.66666667 8 10.6666667 4 6.66666667"></polygon>
                  <polygon points="-1.36424205e-12 0 16 0 16 16 -1.36424205e-12 16"></polygon>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

KeyboardArrow.defaultProps = {
  height: '8px',
  width: '6px',
  color: '#000000',
  className: '',
};

export default KeyboardArrow;