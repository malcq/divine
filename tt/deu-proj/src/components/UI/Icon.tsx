import styled from 'styled-components';

type IconProps = {
  height?: number,
  width?: number,
  autoHeight?: boolean,
  opacity?: number,
  srcUrl: string,
  color?: string,
};

export const Icon = styled.span<IconProps>`
  display: inline-block;
  height: ${props => props?.height ?? '18'}px;
  width: ${props => props?.width ?? '18'}px;
  min-width: ${props => props?.width ?? '18'}px;
  mask-size: ${props => props?.width ?? '18'}px ${props => props.autoHeight ? 'auto' : (props?.height ?? '18')}px;
  mask-repeat: no-repeat;
  mask-image: url(${props => props.srcUrl});
  background-color: ${props => props.color || 'black'};
  opacity: ${props => props.opacity || 1};
`;
