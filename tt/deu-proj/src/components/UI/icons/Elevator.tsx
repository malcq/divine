import React from 'react';
import { CommonIconProps } from './commonTypes';

const Elevator: React.FC<CommonIconProps> = ({color, width, height}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 15"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.6">
        <g transform="translate(-319.000000, -295.000000)" fill={color} fillRule="nonzero">
          <g transform="translate(0.000000, 10.000000)">
            <g transform="translate(16.000000, 172.000000)">
              <g>
                <g transform="translate(255.000000, 108.000000)">
                  <g transform="translate(44.000000, 2.000000)">
                    <g transform="translate(2.000000, 2.000000)">
                      <g transform="translate(2.000000, 1.000000)">
                        <path d="M2.84444444,0 L5.68888889,2.84444444 L3.55555556,2.84444444 L3.55555556,5.68888889 L2.13333333,5.68888889 L2.13333333,2.84444444 L0,2.84444444 L2.84444444,0 M9.95555556,5.68888889 L7.11111111,2.84444444 L9.24444444,2.84444444 L9.24444444,0 L10.6666667,0 L10.6666667,2.84444444 L12.8,2.84444444 L9.95555556,5.68888889 M2.84444444,7.11111111 L9.95555556,7.11111111 C10.7410272,7.11111111 11.3777778,7.74786169 11.3777778,8.53333333 L11.3777778,12.8 C11.3777778,13.5854716 10.7410272,14.2222222 9.95555556,14.2222222 L2.84444444,14.2222222 C2.0589728,14.2222222 1.42222222,13.5854716 1.42222222,12.8 L1.42222222,8.53333333 C1.42222222,7.74786169 2.0589728,7.11111111 2.84444444,7.11111111 M2.84444444,8.53333333 L2.84444444,12.8 L9.95555556,12.8 L9.95555556,8.53333333 L2.84444444,8.53333333 Z"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

Elevator.defaultProps = {
  color: '#000000',
  width: '13px',
  height: '15px',
}

export default Elevator;