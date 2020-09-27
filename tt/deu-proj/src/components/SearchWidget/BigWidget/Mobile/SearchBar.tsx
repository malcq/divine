import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'i18n';

import BaseModal from '@components/Modals/BaseModal';
import { Icon } from '@components/UI/Icon';
import SearchBarButton from './SearchBarButton';
import Header from '@components/Headers/HomepageHeader';

import { STATIC_URLS } from '@utils/constants';
import media from '@utils/media';
import SearchWidget from '..';

type Props = {
  positionY: number,
};

const SearchBar: React.FC<Props> = (props) => {
  const [widgetModalOpen, setWidgetModalOpen] = React.useState(false);
  const [isShowBar, setIsShowBar] = React.useState(false);
  const { t } = useTranslation('common');

  const onWidgetModalToggle = () => {
    setWidgetModalOpen(state => !state)
  };

  React.useEffect(() => {
    const scrollHeightWatcher = () => {
      if (scrollY >= props.positionY) {
        return setIsShowBar(true)
      }
      return setIsShowBar(false)
    }
    scrollHeightWatcher();
    window.addEventListener('scroll', scrollHeightWatcher)

    return () => {
      window.removeEventListener('scroll', scrollHeightWatcher);
    }
  }, [props.positionY])

  return (
    <>
      {isShowBar &&
        <StyledWrapper>
          <Header />
          <SearchBarButton
            onClickHandler={onWidgetModalToggle}
            title={t('search-bar__title')}
            className="search-bar__button"
          />
          <BaseModal
            isOpen={widgetModalOpen}
            onClose={onWidgetModalToggle}
          >
            <WidgetModalHeader>
              <div className="widget-modal-header__layout" onClick={() => setWidgetModalOpen(false)}>
                <Icon
                  srcUrl={`${STATIC_URLS.SVG}/cross_line.svg`}
                  height={14}
                  width={14}
                />
              </div>
            </WidgetModalHeader>
            <WidgegModalContent>
              <SearchWidget headLineOff />
            </WidgegModalContent>
          </BaseModal>
        </StyledWrapper>}
    </>
  )
}

const StyledWrapper = styled.div`
  box-shadow: 0 0.5px 0 ${props => props.theme.colorValues.lightestgrey};
  padding-bottom: 12px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colorValues.white};
  z-index: 5;

  ${media.desktop} {
    display: none;
  }
  .search-bar {

   &__button {
      margin: 0 auto;
   }
  }
`;

const WidgegModalContent = styled.div`
  width: 311px;

  & > div > div {
    padding: 0;
  }
`;

const WidgetModalHeader = styled.div`
  position: relative;
  height: 56px;    
  margin: -16px -16px 0 -16px;
  box-shadow: 0 0.5px 0 ${props => props.theme.colorValues.lightestgrey};
  
  .widget-modal-header__layout {
    display: inline-block;
    :active {
      ::before {
        content: '';
        position: absolute;
        width: 36px;
        height: 36px;
        top: calc(50% - 18px);
        left: 10px;
        background-color: ${props => props.theme.colorValues.aliceBlue};;
        border-radius: 50%;
      }
    }
    span {
      margin: 21px 21px 16px;
      z-index: 1;
    }
  }
  
`;

export default SearchBar;