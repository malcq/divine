import React from 'react';
import { CommonIconProps } from './commonTypes';

const JourneySearchIcon: React.FC<CommonIconProps> = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 36 36"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-224.000000, -590.000000)">
          <g transform="translate(0.000000, 490.000000)">
            <g transform="translate(224.000000, 100.000000)">
              <circle fill={props.color} cx="18" cy="18" r="18" />
              <g transform="translate(5.000000, 12.000000)">
                <g transform="translate(8.000000, 0.000000)">
                  <g transform="translate(8.000000, 6.000000) rotate(-90.000000) translate(-8.000000, -6.000000) translate(2.000000, 0.000000)">
                    <polygon fill="#FFFFFF" fillRule="nonzero" points="3.705 4.295 6 6.585 8.295 4.295 9 5 6 8 3 5" />
                    <polygon points="0 0 12 0 12 12 0 12" />
                  </g>
                  <rect fill="#FFFFFF" x="0" y="5.5" width="9" height="1"></rect>
                </g>
                <rect fill="#FFFFFF" x="0" y="3" width="6" height="6" rx="3"></rect>
                <rect fill="#FFFFFF" x="20" y="3" width="6" height="6"></rect>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )

}

JourneySearchIcon.defaultProps = {
  color: '#B2B2B2',
  width: '36px',
  height: '36px',
}

export default JourneySearchIcon;