import React from 'react';
import styled from 'styled-components';

import { useTranslation } from 'i18n';

import { STATIC_URLS } from '@utils/constants';
import media from '@utils/media';
import { Icon } from '../Icon';
import { JourneyIntermediateStop } from '@models/journey';

type Props = {
  className?: string,
  intermediate_stop: JourneyIntermediateStop[],
  durationTime: string,
  isOpen: boolean,
  baseColor: string,
  onClick: () => void,
}

const InternalStopList: React.FC<Props> = (props) => {
  const { t } = useTranslation('common');
  return (
    <StyledWrapper
      baseColor={props.baseColor}
      isOpen={props.isOpen}
      className={props.className}
    >
      <div
        className="internal-stops__row internal-stops__header"
        onClick={props.onClick}
      >
        <Icon
          srcUrl={`${STATIC_URLS.SVG}/keyboard_arrow_left.svg`}
          width={6}
          height={10}
          className="internal-stops__more-stops-button"
        />
        <span className="internal-stops__title">
          {`${props.intermediate_stop.length} ${t('journeys__intermediate-stops')} (${props.durationTime})`}
        </span>
      </div>
      {props.isOpen &&
        <div className="internal-stops__row">
          <div className="internal-stops__col">
            {props.intermediate_stop.map((stop, index) => {
              return (
                <span
                  className="internal-stops__text"
                  key={index}
                >
                  {stop.name}
                </span>
              )
            })}
          </div>
        </div>
      }
    </StyledWrapper>
  )
};

type StylesProps = {
  isOpen: boolean,
  baseColor: string,
}

const StyledWrapper = styled.div<StylesProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-right: 14px;
  padding-bottom: 24px;
  
  .internal-stops {

    &__header {
      user-select: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    
    &__row {
      display: flex;
      align-items: center;
    }

    &__col {
      display: flex;
      flex-direction: column;
      padding-left: 19px;
    }

    &__title {
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.grey};

      :active {
        text-decoration: underline;
      }

      ${media.desktop} {
        :hover {
          text-decoration: underline;
        }
      }
    }

    &__more-stops-button {
      margin-right: 13px;
      transform:${props => props.isOpen ? 'rotate(90deg)' : 'rotate(-90deg)'};
      transition: transform 0.1s;
    }

    &__text {
      margin-bottom: 4px;
      ${props => props.theme.typography.fnRegular};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.grey};
      position: relative;

      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        border: 2px solid ${props => props.baseColor};
        background-color: ${props => props.theme.colorValues.white};
        top: 4px;
        left: -47px;
        border-radius: 100%;
        z-index: 5;
      } 

      &:first-child {
        margin-top: 8px;
      }
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export default InternalStopList;
