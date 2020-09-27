import React from 'react';
import styled from 'styled-components';

import { AvailableFacilities, FacilitiesTypes, SchemeInfo } from '@models/stop';

import media from '@utils/media';
import { STATIC_URLS } from '../../../utils/constants';
import { colors } from '../../../theme/default/constants';

import { Icon } from '../../UI/Icon';
import FacilitiesModal from './FacilitiesModal';

import getFacilitiesIcon from '../../../utils/facilitiesIcons';


const PREVIEW_FACILITIES = [
  {
    name: FacilitiesTypes.wheelchair
  },
  {
    name: FacilitiesTypes.wc
  },
  {
    name: FacilitiesTypes.taxi
  },
]
interface LinkAndFacilitiesProps {
  link_to_search_provider: string,
  available_facilities: AvailableFacilities[],
  scheme_info: SchemeInfo[],
}

const LinkAndFacilities: React.FC<LinkAndFacilitiesProps> = ({
  link_to_search_provider: link,
  available_facilities,
  scheme_info,
}) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const totalSchemeInfo = scheme_info.length;
  // link to search provider should be opened when api will be prepared
  return (
    <StyledContainer>
      {/* <a
          href={link}
          target="_blank"
          className="header-provider__link"
        >
          {link}
        </a> */}
        {scheme_info.length
        ? (<div className="header-provider__name">
            {scheme_info.map((scheme, index) => {
            const isComma = index + 1 < totalSchemeInfo;
            const nameLong = scheme.name_long.replace(/-/g, ' ');
            return(
              <React.Fragment key={index}>
                <span className="header-provider__name--short" title={scheme.name_short}>
                  {scheme.name_short}
                </span>
                <span className="header-provider__name--long" title={scheme.name_long}>
                  {nameLong}{isComma && (',')}
                </span>
              </React.Fragment>
              )
            })}
          </div>)
        : null}
         
      <div className="header-facilities">

        {PREVIEW_FACILITIES.map((el, index) => {
          return (
            <div
              className="header-facilities__icon"
              key={index}>
              {getFacilitiesIcon(el.name, {
                size: 16
              })}
            </div>
          )
        })}

        <div className="header-facilities__icon-container">
          <Icon
            height={24}
            width={24}
            srcUrl={`${STATIC_URLS.SVG}/facilities/available_facities.svg`}
            color={colors.primary}
            className="header-facilities__icon--more"
            onClick={() => setIsOpenModal(true)}
          />
        </div>
      </div>
      <FacilitiesModal
        isOpenModal={isOpenModal}
        available_facilities={available_facilities}
        setIsOpenModal={() => setIsOpenModal(false)}
        contentClassName="facilities-modal__content"
        portalClassName="places-search-modal"
        overlayClassName="places-search-modal__overlay"
        className="places-search-modal__content"
        bodyOpenClassName="places-search-modal__body--open"
      />
    </StyledContainer>
  )
};

const StyledModal = styled.div`
  width: 468px;
  margin: 8px;
`;

const StyledContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  padding: 0 8px;

  ${media.desktop} {
    padding: 0;
    margin-bottom: 14px;
  }


  .header-provider {
    &__link {
      color: ${props => props.theme.colorValues.primary};
      cursor: pointer;
      padding-left: 8px;
      ${media.desktop} {
        padding-left: 0;
      }

      &:hover {
       text-decoration: underline;
      }
    }
    &__name {
      padding-left: 8px;
      overflow: hidden;
      min-height: 24px;
      line-height: 24px;
      display: flex;
      text-overflow: ellipsis;
      align-items: center;
      max-width: calc(100% - 105px);

      ${media.desktop} {
        padding-left: 0;
        display: flex;
        max-width: calc(100% - 96px);
      }
      
      &--short {
        padding-right: 4px;
      }

      &--long {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-right: 10px;
      }
    }
  }

  .header-facilities {
    display: flex;
    align-items: center;
    margin-left: auto;
    overflow: hidden;
    &__icon-container {
      position:relative;
      margin-left: 5px;
      height: 24px;
      width: 24px;
      ::before {
        content: '';
        height: 22px;
        width: 22px;
        position: absolute;
        left: calc(50% - 11px);
        top: calc(50% - 11px);
        background-color: transparent;
        border-radius: 50%;
        z-index: 0;
      }
      &:hover ::before {
        background-color: ${props => props.theme.colorValues.zumthor};
      }
    }

    &__icon {
      margin-right: 6px;
      opacity: .6;
      height: 16px;
      width: 16px;
      display: flex;
      align-items: center;

      &--more {
        margin-right: 0px;
        opacity: 1;
        cursor: pointer;
      }
    }
  }
`;



export default LinkAndFacilities