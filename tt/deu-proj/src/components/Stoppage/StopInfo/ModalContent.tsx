import React from 'react';
import styled from 'styled-components';
import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';

import { Icon } from '../../UI/Icon';

import { STATIC_URLS } from '@utils/constants';
import media from '@utils/media';
import getFacilitiesIcon from '@utils/facilitiesIcons';

import { AvailableFacilities } from '@models/stop';
import { FacilitiesItem, FacilitiesTypes } from '@models/facilities';


interface LinkAndFacilitiesProps extends WithTranslation {
  available_facilities: AvailableFacilities[],
  onClose: () => void,
}

const ModalContent: React.FC<LinkAndFacilitiesProps> = ({
  t,
  available_facilities,
  onClose,
}) => {


  return (
    <StyledModal>
      <div className="facility-modal__layout" onClick={onClose}>
        <Icon
          className="facility-modal__close"
          height={14}
          width={14}
          srcUrl={`${STATIC_URLS.SVG}/close.svg`}
        />
      </div>
      <h1 className="facility-modal__available-header">{t('facilities-available')}</h1>
      {available_facilities.map((el, index) => {
        return el.available && (
          <div className="facility-modal__item" key={index}>
            <div className="facility-modal__circle">
              {getFacilitiesIcon(el.name, {
                size: 20
              })}
            </div>
            <div className="facility-modal__wrapper-item-text">
              <p className="facility-modal__item-text">{el.title}</p>
            </div>
          </div>
        )
      })}
      <div className="facility-modal__unavailable">
        {available_facilities.map((el, index) => {
          return !el.available && (
            <div className="facility-modal__item" key={index}>
              <div className="facility-modal__circle facility-modal__circle--light">
                {getFacilitiesIcon(el.name, {
                  size: 20
                })}
              </div>
              <div className="facility-modal__wrapper-item-text">
                <p className="facility-modal__item-text facility-modal__item-text--light">{el.title}</p>
              </div>
            </div>
          )
        })}
      </div>
    </StyledModal>
  )
};

const StyledModal = styled.div`
  padding: 16px 0 16px 16px;
  height: 100%;
  overflow: auto;

  ${media.desktop} {
    width: 468px;
    padding: 8px;
    overflow: hidden;
  }

  .facility-modal {

    &__layout {
      position: relative;
      display: inline-block;
      margin: 5px 5px 5px 7px;
      width: 14px;
      height: 14px;
      cursor: pointer;
      ::before {
        content: "";
        position: absolute;
        width: 36px;
        height: 36px;
        top: calc(50% - 18px);
        left: calc(50% - 18px);
        background-color: transparent;
       
        border-radius: 50%;
      }
      :hover ::before {
        background-color: ${props => props.theme.colorValues.aliceBlue};
      }
    }

    &__available-header {
      ${props => props.theme.typography.fnTitle1};
      ${props => props.theme.typography.fnText};

      color: ${props => props.theme.colorValues.grey};
      margin: 28px 0 18px;

      ${media.desktop} {
      
      }
    }

    &__item {
      display: flex;
      align-items: center;
    }

    &__circle {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border-radius: 100%;
      margin-right: 12px;
      /* background-color: ${props => props.theme.colorValues.black}; */
      opacity: 0.6;

      &--light {
        opacity: .3;
      }
    }


    &__wrapper-item-text {
      display: flex;
      align-items: center;
      height: 56px;
      flex-grow: 1;
      border-bottom: 0.5px solid ${props => props.theme.colorValues.lightestgrey};
    }

    &__item-text {
      ${props => props.theme.typography.fnTitle2};
      ${props => props.theme.typography.fnText};
      color: ${props => props.theme.colorValues.grey};
      text-transform: capitalize;
      
      &--light {
        color: ${props => props.theme.colorValues.lightgrey};
        text-decoration: line-through;
      }

    }

    &__unavailable {
      .facility-modal__item:last-child {
        .facility-modal__wrapper-item-text {
          ${media.desktop} {
            border-bottom: none;
          }
        }
      } 
    }
  }
`;

export default withTranslation('stoppage')(ModalContent);