import React, { useMemo } from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from 'i18n';

interface Props extends WithTranslation {
  duration: string,
  changeover: number,
  className?: string,
}

const AdditionalInfo: React.FC<Props> = (props) => {
  const { t } = props;

  const duration = useMemo(() => {
    const date = props.duration.split(':');
    return {
      hour: parseInt(date[0]),
      minutes:  parseInt(date[1]),
    }
  }, [props.duration]);

  const durationElem = duration.hour > 0 ? (
    <span>
      {`${duration.hour} ${t('journeys__segment-hour')} ${duration.minutes} ${t('journeys__segment-minute')}`}
    </span>
  ) : (
      <span>
        {`${duration.minutes} ${t('journeys__segment-minute')}`}
      </span>
    );

  return (
    <StlyledWrapper className={props.className}>
      {durationElem}
      <span>
        {`${props.changeover} ${t('journeys__segment-changeover')}`}
      </span>
    </StlyledWrapper>
  )
};

const StlyledWrapper = styled.div`
  display: flex;
  ${props => props.theme.typography.fnText};
  ${props => props.theme.typography.fnBody};
  color: ${props => props.theme.colorValues.lightgrey};

  & span {
    padding-right: 19px;
    position: relative;
    display: block;

    &::after {
      content: "";
      position: absolute;
      display: block;
      width: 2px;
      height: 2px;
      background-color: ${props => props.theme.colorValues.lightgrey};
      top: 50%;
      transform: translateY(-1px);
      right: 8px;
      border-radius: 100%;
    }
  };

  & span:last-child {
    padding-right: 0;
    &::after {
      display: none;
    }
  }
`;

export default withTranslation('common')(AdditionalInfo);