import React from 'react';
import ReactDOM from 'react-dom';
import styled, { ThemeContext } from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from 'i18n';

import { SearchWidgetSections, STATIC_URLS } from '@utils/constants';

interface Props extends WithTranslation {
  selectedTab: SearchWidgetSections,
  hidden?: boolean,

  onSetSearchType?: (tab: SearchWidgetSections) => void,
}
class SearchTypeSelect extends React.Component<Props> {
  static contextType = ThemeContext;

  context!: React.ContextType<typeof ThemeContext>;

  private element: HTMLElement;

  constructor(props: Props) {
    super(props);
    this.element = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(
      this.element
    );
  }

  componentWillUnmount() {
    document.body.removeChild(
      this.element,
    );
  }

  onClick = (type: SearchWidgetSections) => {
    if (type === this.props.selectedTab) {
      return;
    }
    window.scrollTo(0, 0);
    this.props?.onSetSearchType?.(type);
  }

  renderTabs = () => {
    const {
      t,
      selectedTab,
      hidden,
    } = this.props;

    const { colorValues } = this.context;

    return (
      <StyledContainer
        selectedTab={selectedTab}
        hidden={hidden}
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
    )
  }

  render() {
    return ReactDOM.createPortal(
      this.renderTabs(),
      this.element,
    );
  }
}

type StyledContainerProps = {
  selectedTab?: SearchWidgetSections,
  hidden?: boolean,
}
const StyledContainer = styled.div<StyledContainerProps>`
  display: ${props => props.hidden ? 'none' : 'flex'};
  align-items: flex-end;

  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 60px;
  height: 177px;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.94) 45%,
    #FFF 0%
  );
  pointer-events: none;
  position: fixed;

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
    pointer-events: all;
     width: 50%;
     cursor: pointer;

     &--stop {
      color: ${props => props.selectedTab === SearchWidgetSections.stops ? props.theme.colorValues.primary : props.theme.colorValues.lightgrey};
     }

     &--journey {
      color: ${props => props.selectedTab === SearchWidgetSections.journey ? props.theme.colorValues.primary : props.theme.colorValues.lightgrey};
     }
   }

   &__subtitle {
     margin-top: 6px;
     ${props => props.theme.typography.fnMedium};
     ${props => props.theme.typography.fnBody};
   }
  }
`;

export default withTranslation('search-widget')(SearchTypeSelect);