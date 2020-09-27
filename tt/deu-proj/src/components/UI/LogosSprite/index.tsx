import React from 'react';
import { STATIC_URLS } from '@utils/constants';
import styled from 'styled-components';


interface LogosSpriteProps {
  sprite: {
    backgroundPosition: string,
    backgroundSize: string,
  },
  width?: number,
  height?: number,
}

const LogosSprite: React.FC<LogosSpriteProps> = ({ sprite, width, height }) => {
  return (<LogosWrapper width={width} height={height} sprite={sprite}></LogosWrapper>);
}

LogosSprite.defaultProps = {
  width: 20,
  height: 20,
}
const LogosWrapper = styled.div<LogosSpriteProps>`
  display: inline-block; 
  overflow: hidden;
  background-repeat: no-repeat;
  background-image:url(${STATIC_URLS.LOGO}/logoIcons.png?ver=2);
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-position: ${props => props.sprite.backgroundPosition};
  background-size: ${props => props.sprite.backgroundSize};
`;

export default LogosSprite;