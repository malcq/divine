import React from 'react';

import { CommonIconProps } from './commonTypes';


interface Props extends CommonIconProps {
  className?: string
}

const ElipsisAnimation: React.FC<Props> = ({
  width,
  height,
  color,
  className,
}) => (
    <svg  
    x="0px" y="0px"
    width={width}
    height={height}
    viewBox="0 0 100 100"
    className={className}
    enableBackground="new 0 0 0 0">
      <circle fill={color} stroke="none" cx="30" cy="50" r="6">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        width="100px"
        begin="0.1"/>    
      </circle>
      <circle fill={color} stroke="none" cx="50" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite" 
          begin="0.2"/>       
      </circle>
      <circle fill={color} stroke="none" cx="70" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite" 
          begin="0.3"/>     
      </circle>
    </svg>
)

ElipsisAnimation.defaultProps = {
  color: '#FFFFFF',
  width: '100px',
  height: '100px',
};

export default ElipsisAnimation;