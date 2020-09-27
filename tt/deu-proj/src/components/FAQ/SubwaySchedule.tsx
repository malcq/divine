import React from 'react';
import styled from 'styled-components';

interface Props {

};

const SubwaySchedule: React.FC<Props> = ({ }) => {
  return (
    <StyledContainer>
      <div className="schedule__week">
        <header className="schedule__header">Wochentag</header>
        <ul className="schedule__text">
          <li>Montag</li>
          <li>Dienstag</li>
          <li>Mittwoch</li>
          <li>Donnerstag</li>
          <li>Freitag</li>
          <li>Samstag</li>
          <li>Sonntag</li>
        </ul>
      </div>
      <div className="schedule__time">
        <header className="schedule__header">Betriebszeiten</header>
        <ul className="schedule__text">
          <li>00:05 - 23:55</li>
          <li>00:15 - 23:55</li>
          <li>00:15 - 23:55</li>
          <li>00:05 - 23:55</li>
          <li>00:15 - 23:55</li>
          <li>00:15 - 23:55</li>
          <li>00:05 - 23:55</li>
        </ul>
      </div>
    </StyledContainer>
  )
};

const StyledContainer = styled.section`
  display: flex;
  width: 100%;
  margin-top: 16px;

  .schedule {
    ${props => props.theme.typography.fnBody};
    ${props => props.theme.typography.fnText};

    &__week {
      width: 120px;
    }

    &__time {
      flex: auto;
    }

    &__header {
      color: ${props => props.theme.colorValues.lightgrey};
      margin-bottom: 4px;
    }

    &__text {
      color: ${props => props.theme.colorValues.grey};
    }
  }

`;

export default SubwaySchedule;