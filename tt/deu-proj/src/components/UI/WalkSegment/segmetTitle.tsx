import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

type Props = {
  stopName: string,
  time: string,
  className?: string
}

const WalkTitle: React.FC<Props> = (props) => {

  const time = React.useMemo(() => {
    return format(new Date(props.time), 'HH:mm')
  }, [props.time]);
  
  return (
    <StyledWrapper
      className={props.className}
      data-last
    >
      {props.stopName}
      <span className="walk-segment__sub-title">
        {time}
      </span>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
    display: flex;
    margin-left: 56px;
    ${props => props.theme.typography.fnText};
    ${props => props.theme.typography.fnTitle2};
    color: ${props => props.theme.colorValues.grey};
    position: relative;
    padding: 16px 16px 16px 0;
    border-bottom: .5px solid ${props => props.theme.colorValues.lightestgrey};

    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(0,0,0,0.4);;
      background-color: ${props => props.theme.colorValues.white};
      top: 20px;
      left: -30px;
      border-radius: 100%;
      z-index: 5;
    }
    .walk-segment {
      &__sub-title {
        ${props => props.theme.typography.fnBody};
        margin-left: auto;
      }
    }
`;

export default WalkTitle;