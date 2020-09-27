import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from 'i18n';
import { SearchWidgetSections, STATIC_URLS } from '@utils/constants';
import media from '@utils/media';
import Ripple from '@components/UI/Ripple';

interface Props extends WithTranslation {
  selectedTab: SearchWidgetSections,

  onSetSearchType?: (tab: SearchWidgetSections) => void,
}
class SearchTypeSelect extends React.Component<Props> {
  static contextType = ThemeContext;

  context!: React.ContextType<typeof ThemeContext>;

  constructor(props: Props) {
    super(props);
  }

  onClick = (type: SearchWidgetSections) => {
    if (type === this.props.selectedTab) {
      return;
    }
    this.props?.onSetSearchType?.(type);
  }

  render() {
    const {
      t, selectedTab,
    } = this.props;
    const { colorValues } = this.context;
    return (
      <StyledContainer
        selectedTab={selectedTab}
      >
        <button
          className="search-type__button search-type__button--stop"
          onClick={() => this.onClick(SearchWidgetSections.stops)}
        >
          <span className="search-type__layout search-type__layout--stop" />
          <p className="search-type__subtitle">
            {t('button__stop')}
          </p>
        </button>
        <button
          className="search-type__button search-type__button--journey"
          onClick={() => this.onClick(SearchWidgetSections.journey)}
        >
          <span className="search-type__layout search-type__layout--journey" />
          <p className="search-type__subtitle">
            {t('button__journey')}
          </p>
        </button>
      </StyledContainer>
    );
  }
}

type StyledContainerProps = {
  selectedTab?: SearchWidgetSections,
  hidden?: boolean,
}
const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  .search-type {
    &__layout {
      width: 36px;
      height: 36px;
      border-radius: 50%;

      &--stop {
        background: url(${STATIC_URLS.SVG}/widget/stop-search.svg) no-repeat 50% 50%;
        background-color: ${props => props.selectedTab === SearchWidgetSections.stops ? props.theme.colorValues.primary : props.theme.colorValues.greyCircle};
      }
      &--journey {
        background: url(${STATIC_URLS.SVG}/widget/journey-search.svg) no-repeat 50% 50%;
        background-color: ${props => props.selectedTab === SearchWidgetSections.journey ? props.theme.colorValues.primary : props.theme.colorValues.greyCircle};
      }
    }

    &__button {
      position: relative;
      display: flex;
      align-items: center;
      pointer-events: all;
      cursor: pointer;
      padding: 2px;
      border: 1px solid ${props => props.theme.colorValues.lightestgrey};
      border-radius: 20px;
      background-color: ${props => props.theme.colorValues.white};
      overflow: hidden;
      :active {
          background-color: ${props => props.theme.colorValues.aliceBlue};
        }
      ${media.desktop} {
        :hover {
          background-color: ${props => props.theme.colorValues.aliceBlue};
        }
      }
      
      &--stop {
        margin-right: 18px;
        color: ${props => props.selectedTab === SearchWidgetSections.stops ? props.theme.colorValues.primary : props.theme.colorValues.lightgrey};
      }

      &--journey {
        color: ${props => props.selectedTab === SearchWidgetSections.journey ? props.theme.colorValues.primary : props.theme.colorValues.lightgrey};
      }
   }

   &__subtitle {
     padding: 0 18px 0 12px;
     ${props => props.theme.typography.fnMedium};
     ${props => props.theme.typography.fnBody};
   }
  }
`;

export default withTranslation('search-widget')(SearchTypeSelect);