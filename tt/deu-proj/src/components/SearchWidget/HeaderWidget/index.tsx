import React from 'react';
import { WithTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import { AutocompleteItem } from '../../../models/autocomplete';
import { DepartureTypes, DeviceTypes } from '../../../utils/constants';
import { withTranslation } from '../../../../i18n';

import { SettingsContext } from '../../../contexts/Settings';
import {
  PersonItem,
  BahncardItem,
  DepartureTimeItem,
  PriceItem,
  ChangeoverItem,
  HeaderWidgetErrors,
} from '../../../models/widget';

const MobileWidget = dynamic(() => import('./Mobile'));
const DesktopWidget = dynamic(() => import('./Desktop'));

interface Props extends WithTranslation {
  journeyFrom?: AutocompleteItem,
  journeyTo?: AutocompleteItem,
  selectedDate: Date,
  selectedDeparture: DepartureTypes,
  timepickerTouched: boolean,
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

  setDateAndDeparture: (departure: DepartureTypes, date: Date) => void,
  setJourneyTo: (journey: AutocompleteItem) => void,
  setJourneyFrom: (journey: AutocompleteItem) => void,
  setDate: (date: Date) => void,
  setDeparture: (departure: DepartureTypes) => void,
  setMobileSearchActivated: (state: boolean) => void,

  errors?: HeaderWidgetErrors,
  timeError?: boolean,
}
const HeaderSearchWidget: React.FC<Props> = (props) => {

  const { deviceInfo } = React.useContext(SettingsContext);

  if (deviceInfo.type === DeviceTypes.mobile) {
    return (
      <MobileWidget
        fromInputTitle={props?.journeyFrom?.title}
        toInputTitle={props?.journeyTo?.title}
        mobileSearchActivated={props.mobileSearchActivated}
        selectedDate={props.selectedDate}
        selectedDeparture={props.selectedDeparture}
        timepickerTouched={props.timepickerTouched}
        setDateAndDeparture={props.setDateAndDeparture}
        setJourneyTo={props.setJourneyTo}
        setJourneyFrom={props.setJourneyFrom}
        setMobileSearchActivated={props.setMobileSearchActivated}

        swapDisabled={props.swapDisabled}
        swapJourneys={props.swapJourneys}

        showPersonSelector={props.showPersonSelector}
        setPersons={props.setPersons}
        selectedPersons={props.selectedPersons}

        showCardSelector={props.showCardSelector}
        selectedCard={props.selectedCard}
        setCard={props.setCard}

        showChangeovers={props.showChangeovers}
        selectedChangeovers={props.selectedChangeovers}
        setChangeovers={props.setChangeovers}

        showTimeRange={props.showTimeRange}
        selectedTimeRange={props.selectedTimeRange}
        setTimeRange={props.setTimeRange}

        showPriceFilter={props.showPriceFilter}
        selectedPrice={props.selectedPrice}
        setPrice={props.setPrice}

        errors={props.errors}
        timeError={props.timeError}
      />
    )
  }

  return (
    <DesktopWidget
      selectedJourneyFrom={props.journeyFrom}
      setJourneyFrom={props.setJourneyFrom}

      selectedJourneyTo={props.journeyTo}
      setJourneyTo={props.setJourneyTo}

      showPersonSelector={props.showPersonSelector}
      selectedPersons={props.selectedPersons}
      setPersons={props.setPersons}

      showCardSelector={props.showCardSelector}
      selectedCard={props.selectedCard}
      setCard={props.setCard}

      showChangeovers={props.showChangeovers}
      selectedChangeovers={props.selectedChangeovers}
      setChangeovers={props.setChangeovers}

      showPriceFilter={props.showPriceFilter}
      selectedPrice={props.selectedPrice}
      setPrice={props.setPrice}

      showTimeRange={props.showTimeRange}
      selectedTimeRange={props.selectedTimeRange}
      setTimeRange={props.setTimeRange}

      selectedDate={props.selectedDate}
      setDate={props.setDate}

      swapDisabled={props.swapDisabled}
      swapJourneys={props.swapJourneys}

      setDeparture={props.setDeparture}
      selectedDeparture={props.selectedDeparture}

      errors={props.errors}
      timeError={props.timeError}
    />
  )
}

export default withTranslation('search-widget')(HeaderSearchWidget);