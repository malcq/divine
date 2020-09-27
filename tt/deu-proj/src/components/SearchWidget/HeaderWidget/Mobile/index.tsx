import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { WithTranslation } from 'next-i18next';
import { withTranslation } from 'i18n';

import StopInputs from '../../Common/Mobile/StopInputs';
import {
  MobileSelect
} from '../../Common/Mobile/Selects';

import {
  bahnCards,
  personList,
  changeoverOptions,
  departureOptions,
  pricesOptions,
} from '../../options';

import { AutocompleteItem } from '@models/autocomplete';
import { DoneSelectionType } from '../../../Modals/TimePickerMobile/models';

import PlacesAutocompleteMobile from '../../../Modals/PlacesAutocompleteMobile';
import TimePickerMobile from '../../../Modals/TimePickerMobile';

import { DepartureTypes, DeviceTypes, STATIC_URLS } from '@utils/constants';
import PreviewDestination from './PreviewDestination';
import { PillButton } from '../../../UI/Button';

import {
  PersonItem,
  BahncardItem,
  DepartureTimeItem,
  PriceItem,
  ChangeoverItem,
  HeaderWidgetErrors
} from '@models/widget';
import { useDeactivetedWidget } from '@utils/hooks/useDeactivetedWidget';
import { useCollapseAnimation } from '@utils/hooks/useCollapseAnimation';

import headerReducer, { initialHeaderState } from './HeaderRedudcer';
import { CSSTransition } from 'react-transition-group';
import { Icon } from '@components/UI/Icon';
import media from '@utils/media';

interface Props extends WithTranslation {
  fromInputTitle?: string,
  toInputTitle?: string,
  timepickerTouched: boolean,
  selectedDate: Date,
  selectedDeparture: DepartureTypes,
  mobileSearchActivated: boolean,

  showPersonSelector?: boolean,
  selectedPersons?: PersonItem,
  setPersons?: (person: PersonItem) => void,

  showCardSelector?: boolean,
  selectedCard?: BahncardItem,
  setCard?: (card: BahncardItem) => void,

  showTimeRange?: boolean,
  selectedTimeRange?: DepartureTimeItem,
  setTimeRange?: (departure: DepartureTimeItem) => void,

  showPriceFilter?: boolean,
  selectedPrice?: PriceItem,
  setPrice?: (price: PriceItem) => void,

  showChangeovers?: boolean,
  selectedChangeovers?: ChangeoverItem,
  setChangeovers?: (changeover: ChangeoverItem) => void,

  swapDisabled?: boolean,
  swapJourneys: () => void,

  setJourneyFrom: (item: AutocompleteItem) => void,
  setJourneyTo: (item: AutocompleteItem) => void,
  setDateAndDeparture: (departure: DepartureTypes, date: Date) => void,
  setMobileSearchActivated: (state: boolean) => void,

  errors?: HeaderWidgetErrors,
  timeError?: boolean
}

const MobileHeaderWidget: React.FC<Props> = (props) => {
  const [headerState, headerDispatch] = React.useReducer(headerReducer, initialHeaderState)
  const {
    fromInputTitle,
    toInputTitle,
    selectedDate,
    selectedDeparture,
    t,
    timepickerTouched,
    showPersonSelector,
    swapDisabled
  } = props;

  const animationBoxRef = React.useRef<HTMLDivElement>(null);
  const initialize = React.useRef(false);

  React.useEffect(() => {
    if (!initialize.current) {
      initialize.current = true;
      return;
    }
    headerDispatch({type: 'set_time_modal', state: true});
  }, [props.timeError]);

  const onTimepickerModalToggle = () => {
    headerDispatch({ type: 'set_time_modal', state: !headerState.timePickerModalOpen })
  }

  const onPreviewClick = () => {
    headerDispatch({ type: 'set_show_mobile_widget', state: true });
    headerDispatch({ type: 'set_mount_search_widget', state: true });
    props.setMobileSearchActivated(true)
  }


  const setMobileSearchDeactivated = React.useCallback(() => {
    headerDispatch({ type: 'set_show_mobile_widget', state: false })
    props.setMobileSearchActivated(false)
  }, [props.setMobileSearchActivated])

  const onAutocompleteToggle = (input?: string) => {
    if (headerState.autocompleteModalOpen) {
      setMobileSearchDeactivated()
    }

    headerDispatch({ type: 'set_autocomplite_modal', state: !headerState.autocompleteModalOpen })
    headerDispatch({ type: 'set_selected_type', selectedType: input ?? '' })
  };


  const onPersonChange = (person: PersonItem) => {
    props?.setPersons?.(person);
  }

  const onCardChange = (card: BahncardItem) => {
    props?.setCard?.(card);
  }

  const onChangeoverChange = (changeover: ChangeoverItem) => {
    props?.setChangeovers?.(changeover);
  }

  const onPriceChange = (price: PriceItem) => {
    props?.setPrice?.(price);
  }

  const onDepartureTimeChange = (departureTime: DepartureTimeItem) => {
    props?.setTimeRange?.(departureTime);
  }

  const onTimpickerChange = (ev: DoneSelectionType) => {
    headerDispatch({ type: 'set_time_modal', state: false })
    props.setDateAndDeparture(
      ev.departure,
      ev.date,
    )
  }

  const onAutocompleteChange = (item: AutocompleteItem) => {
    if (headerState.selectedAutocompleteType === 'from') {
      props.setJourneyFrom(item);
    } else if (headerState.selectedAutocompleteType === 'to') {
      props.setJourneyTo(item);
    }

    setMobileSearchDeactivated();
    headerDispatch({ type: 'set_selected_type', selectedType: '' });
    headerDispatch({ type: 'set_autocomplite_modal', state: false });
  }


  const setUnmount = React.useCallback(() => {
    headerDispatch({ type: 'set_mount_search_widget', state: false })
  }, []);

  useCollapseAnimation({
    animationIn: headerState.showMobile,
    ref: animationBoxRef,
    minHeight: 52,
    onAnimationEnd: setUnmount
  }, []);

  useDeactivetedWidget(
    setMobileSearchDeactivated,
    headerState.showMobile
  )

  return (
    <>
      <StyledContainer>
        <div className="search-widget-mobile__destination">
          <CSSTransition
            in={!headerState.isMountMaxContent}
            classNames="preview-animation"
            unmountOnExit={true}
            timeout={{
              appear: 0,
              enter: 300,
              exit: 0
            }}
          >
            <PreviewDestination
              fromTitle={fromInputTitle}
              toTitle={toInputTitle}
              onPreviewClick={onPreviewClick}
              errors={props.errors}
              isHeaderMobileWidget={true}
            />
          </CSSTransition>
          {headerState.isMountMaxContent &&
            <div className="animation-content" ref={animationBoxRef}>
              <StopInputs
                onFromClick={() => onAutocompleteToggle('from')}
                onToClick={() => onAutocompleteToggle('to')}
                fromInputTitle={fromInputTitle}
                toInputTitle={toInputTitle}
                swapDisabled={swapDisabled}
                onSwapClick={props.swapJourneys}
                errors={props.errors}
              />
            </div>
          }
        </div>

        <div className="search-widget-mobile__selects">
          <PillButton
            className="search-widget-mobile__picker"
            onClick={onTimepickerModalToggle}
          >
            <span>
              {timepickerTouched
                ? format(selectedDate, 'dd.MM.yyyy HH:mm')
                : t('time__now')
              }
            </span>

            <Icon
              srcUrl={`${STATIC_URLS.SVG}/widget/arrow-dropdown.svg`}
              width={8}
              height={12}
              />
          </PillButton>

          {showPersonSelector && props.selectedPersons && (
            <MobileSelect
              value={props.selectedPersons}
              options={personList}
              onChange={onPersonChange}
              className="search-widget-mobile__select search-widget-mobile__select--person"
              selectClassName="search-widget-mobile__select-input"
            />
          )}

          {props.showCardSelector && props.selectedCard && (
            <MobileSelect
              value={props.selectedCard}
              options={bahnCards}
              onChange={onCardChange}
              className="search-widget-mobile__select search-widget-mobile__select--card"
              selectClassName="search-widget-mobile__select-input"
            />
          )}

          {props.showChangeovers && props.selectedChangeovers && (
            <MobileSelect
              value={props.selectedChangeovers}
              options={changeoverOptions}
              onChange={onChangeoverChange}
              className="search-widget-mobile__select search-widget-mobile__select--changeover"
              selectClassName="search-widget-mobile__select-input"
            />
          )}

          {props.showTimeRange && props.selectedTimeRange && (
            <MobileSelect
              value={props.selectedTimeRange}
              options={departureOptions}
              onChange={onDepartureTimeChange}
              className="search-widget-mobile__select search-widget-mobile__select--timerange"
              selectClassName="search-widget-mobile__select-input"
            />
          )}

          {props.showPriceFilter && props.selectedPrice && (
            <MobileSelect
              value={props.selectedPrice}
              options={pricesOptions}
              onChange={onPriceChange}
              className="search-widget-mobile__select search-widget-mobile__select--price"
              selectClassName="search-widget-mobile__select-input"
            />
          )}
        </div>
      </StyledContainer>

      {/** Modals go there */}
      <TimePickerMobile
        isOpen={headerState.timePickerModalOpen}
        onClose={onTimepickerModalToggle}
        onConfirm={onTimpickerChange}
        initialDate={selectedDate}
        initialDeparture={selectedDeparture}
      />

      <PlacesAutocompleteMobile
        isOpen={headerState.autocompleteModalOpen && headerState.selectedAutocompleteType === 'to'}
        onClose={onAutocompleteToggle}
        onPlaceSelect={onAutocompleteChange}
      />
      <PlacesAutocompleteMobile
        isOpen={headerState.autocompleteModalOpen && headerState.selectedAutocompleteType === 'from'}
        onClose={onAutocompleteToggle}
        onPlaceSelect={onAutocompleteChange}
      />
    </>
  )

}

const StyledContainer = styled.div`
  .search-widget-mobile {
    &__destination {
      margin: 0 8px;
      min-height: 52px;
      position: relative;
    }

    &__selects {
      display: flex;
      align-items: center;
      margin: 8px 0;
      overflow-y: auto;

      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
      
      & > button,
      & > div {
        margin-right: 4px;
      }

      & > button:first-child {
        margin-left: 8px;
      }

      & > button:last-child {
        margin-right: 0px;
      }

      &::after {
        content: "";
        display: block;
        width: 8px;
        height: 1px;
        min-width: 8px;
      }
    }

    &__picker {
      display: flex;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      flex-shrink: 0;
      
      & > span {
        white-space: nowrap;
        display: inline-block;
        margin-right: 8px;
      }

      & > svg {

      }

    }

    &__select {
      :active {
        background-color: ${props => props.theme.colorValues.aliceBlue};
      }
      
      ${media.desktop} {
        :hover {
          background-color: ${props => props.theme.colorValues.aliceBlue};
        }
      }
      &--person {
        width: 97px;
        min-width: 97px;
      }

      &--card {
        width: 140px;
        min-width: 140px;
      }

      &--changeover {
        width: 105px;
        min-width: 105px;
      }

      &--timerange {
        width: 85px;
        min-width: 85px;
      }

      &--price {
        width: 70px;
        min-width: 70px;
      }
    }

    &__select-input {
      width: calc(100% - 10px);
    }
  }
  .animation-content {
    overflow: hidden;
    max-height: 52px;
    opacity: 0;
    transition: all 300ms cubic-bezier(0.8, 0, 0.6, 1) 0ms;
  }

  .preview-animation {

    &-enter {
      opacity: 0;
    }
    &-enter-active {
      opacity: 1;
      transition: all 300ms cubic-bezier(0.8, 0, 0.6, 1) 0ms;
    }
  }
`;


export default withTranslation('search-widget')(MobileHeaderWidget);