import React from 'react';
import styled, { css } from 'styled-components';
import { WithTranslation } from 'next-i18next';
import format from 'date-fns/format';

import { InputButton, ButtonSizes, SearchButton } from '../../../../UI/Button';

import { withTranslation } from 'i18n';

import PlacesAutocompleteMobile from '../../../../Modals/PlacesAutocompleteMobile';
import TimePickerMobile from '../../../../Modals/TimePickerMobile';

import { AutocompleteItem } from '../../../../../models/autocomplete';
import { DoneSelectionType } from '../../../../Modals/TimePickerMobile/models';
import { DepartureTypes, STATIC_URLS } from '@utils/constants';
import { SubmitStopData, HeaderWidgetErrors } from '../../../../../models/widget';
import TimepickerButton from '../TimpickerButton';
import { getNewDate } from '@utils/time/getNewDate';

interface Props extends WithTranslation {
  selectedDate: Date,
  selectedStop?: AutocompleteItem,
  selectedDeparture: DepartureTypes,
  timepickerTouched: boolean,

  onSearch?: (ev: SubmitStopData) => void,
  setDateAndDeparture?: (departure: DepartureTypes, date: Date) => void,
  setStop?: (stop: AutocompleteItem) => void,

  setWidgetErr?: (opt: HeaderWidgetErrors) => void,
  errors?: HeaderWidgetErrors,
}
type State = {
  searchModalOpen: boolean,
  timePickerModalOpen: boolean,
}
class StopSearch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchModalOpen: false,
      timePickerModalOpen: false,
    }
  }

  onTimeChange = (ev: DoneSelectionType) => {
    const { date, departure } = ev;

    this.setState({
      timePickerModalOpen: false,
      // timepickerTouched: true,
    });

    this.props?.setDateAndDeparture?.(departure, date);
  }

  onSearchStopToggle = () => {
    if (this.props.setWidgetErr) {
      this.props.setWidgetErr({
        from: false,
        to: false,
      })
    }
    this.setState(
      prevState => ({
        searchModalOpen: !prevState.searchModalOpen
      })
    );
  }

  onTimepickerModalToggle = () => {
    this.setState(
      prevState => ({
        timePickerModalOpen: !prevState.timePickerModalOpen
      })
    );
  }

  onStopSelect = (item: AutocompleteItem) => {
    this.setState({
      searchModalOpen: false,
    });

    this.props?.setStop?.(item);
  }

  onSubmitSearch = () => {
    if (!this.props.selectedStop) {
      if (this.props.setWidgetErr) {
        this.props.setWidgetErr({
          from: false,
          to: !this.props.selectedStop,
        })
      }
      return;
    }

    const date = this.props.timepickerTouched
      ? this.props.selectedDate
      : getNewDate();

    const result: SubmitStopData = {
      date,
      stop: this.props.selectedStop,
      departure: this.props.selectedDeparture,
    }
    return this.props?.onSearch?.(result);
  }

  render() {
    const {
      t,
      selectedDate,
      selectedStop,
      selectedDeparture,
      setDateAndDeparture,
    } = this.props;

    const {
      searchModalOpen,
      timePickerModalOpen
    } = this.state;

    const timepickerButtonText = this.props.timepickerTouched
      ? format(selectedDate, 'dd.MM.yyyy HH:mm')
      : t(`time__now`);

    return (
      <StyledContainer
        showToError={this.props.errors?.to}
      >
        <InputButton
          className="stop-input"
          onClick={this.onSearchStopToggle}
        >
          <StopInputContainer>
            <span className="stop-input--stop-icon" />
            {!selectedStop &&
              <div className="stop-input__placeholder">
                {t(`destination__stop-placeholder`)}
              </div>
            }
            {selectedStop &&
              <div className="stop-input__content">
                {selectedStop.title}
              </div>
            }
          </StopInputContainer>
        </InputButton>

        <TimepickerButton
          title={timepickerButtonText}
          className="time-input"
          onClick={this.onTimepickerModalToggle}
        />

        <SearchButton
          fullWidth
          size={ButtonSizes.large}
          icon={<span className="button-icon" />}
          title={t(`button__search`)}
          onClick={this.onSubmitSearch}
        />


        {/* Modals goes there */}
        <PlacesAutocompleteMobile
          isOpen={searchModalOpen}
          onClose={this.onSearchStopToggle}
          onPlaceSelect={this.onStopSelect}
          filterAutocompleteType="stops-only"
        />

        <TimePickerMobile
          isOpen={timePickerModalOpen}
          onClose={this.onTimepickerModalToggle}
          onConfirm={this.onTimeChange}
          initialDate={selectedDate}
          initialDeparture={selectedDeparture}
        />

      </StyledContainer>
    )
  }

};

type StylesProps = {
  showToError?: boolean,
}
const StyledContainer = styled.div<StylesProps>`
  .stop-input {
    margin-bottom: 16px;
    position: relative;

    &::before {
        border-radius: 8px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        content: "";

       ${props => props.showToError
          ? css` border: 2px solid ${props => props.theme.colorValues.primary};`
          : css` border: 1px solid ${props => props.theme.colorValues.lightestgrey};`
        }
      }
  }

  .time-input {
    margin-bottom: 24px;
  }

  .button-icon {
    background: url(${STATIC_URLS.SVG}/widget/search-icon.svg) no-repeat 50% 50%;
    width: 16px;
    height: 16px;
    margin-right: 8px;

  }
`;

const StopInputContainer = styled.div`
  display: flex;
  align-items: center;

  .stop-input {
    &--stop-icon {
      width: 12px;
      height: 12px;
      background: url(${STATIC_URLS.SVG}/widget/circle-icon.svg) no-repeat 50% 50%;
    }

    &__dest,
    &__placeholder,
    &__content {
      margin-left: 15px;
      margin-right: 4px;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnTitle2};
    }

    &__placeholder,
    &__content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
   
    &__placeholder {
      color: rgba(0,0,0,0.32);
    }

    &__content {
      color: ${props => props.theme.colorValues.grey};
    }
  }
`;



export default withTranslation('search-widget')(StopSearch);
