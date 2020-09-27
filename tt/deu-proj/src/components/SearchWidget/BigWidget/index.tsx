import React from 'react';
import styled from 'styled-components';
import { withRouter, Router } from 'next/router';
import dynamic from 'next/dynamic';

import Headline from './Headline';

import {
  SearchWidgetSections,
  DepartureTypes,
  DeviceTypes,
} from '../../../utils/constants';
import * as routerFactories from '../../../utils/router.util';
import { divideDateIntoTimeAndDate } from '../../../utils/time/divideDateIntoTimeAndDate';
import media from '../../../utils/media';

import {
  personList,
  bahnCards,
} from '../options';
import {
  SubmitStopData,
  PersonItem,
  BahncardItem,
  SubmitJourneyData,
} from '../../../models/widget';
import { AutocompleteItem, AutocompleteItemTypes } from '../../../models/autocomplete';
import { SettingsContext } from '../../../contexts/Settings';
import { AdPlaceholder } from '../../UI/Placeholders';
import { getNewDate } from '@utils/time/getNewDate';


const DesktopSearchWidget = dynamic(() => import('./Desktop'));
const MobileSearchWidget = dynamic(() => import('./Mobile'));

type Props = {
  router: Router,
  headLineOff?: boolean,
  onTypeSwitch?: (tab: SearchWidgetSections) => void,
};
type State = {
  selectedTab: SearchWidgetSections,
  selectedDate: Date,
  selectedDeparture: DepartureTypes,
  selectedStop?: AutocompleteItem,
  selectedJourneyFrom?: AutocompleteItem,
  selectedJourneyTo?: AutocompleteItem,
  selectedPerson: PersonItem,
  selectedBahnCard: BahncardItem,
  timepickerTouched: boolean,
}
class SearchWidget extends React.Component<Props, State> {
  static contextType = SettingsContext;

  context!: React.ContextType<typeof SettingsContext>;

  state: State = {
    selectedStop: undefined,
    selectedJourneyFrom: undefined,
    selectedJourneyTo: undefined,
    selectedTab: SearchWidgetSections.journey,
    selectedDate: getNewDate(),
    selectedDeparture: DepartureTypes.from,
    selectedPerson: personList[0],
    selectedBahnCard: bahnCards[0],

    timepickerTouched: false,
  }

  onStopSearch = (ev: SubmitStopData) => {
    const {
      date,
      departure,
      stop,
    } = ev;

    const {
      date: dateStr,
      time: timeStr,
    } = divideDateIntoTimeAndDate(date);

    const {
      appUrl,
      browserUrl,
    } = routerFactories.getStopUrl({
      city: stop.slugs.city_name,
      state: stop.slugs.state_name,
      stop: stop.slugs.title,
      date: dateStr,
      direction: departure,
      time: timeStr,
    })


    this.props.router.push(appUrl, browserUrl);
  }

  onJourneySearch = (ev: SubmitJourneyData) => {
    const {
      bahncard,
      date,
      departure,
      fromStop,
      persons,
      toStop,
    } = ev;

    const {
      date: dateStr,
      time: timeStr,
    } = divideDateIntoTimeAndDate(date);

    const {
      appUrl,
      browserUrl,
    } = routerFactories.getJourneysUrl({
      date: dateStr,
      time: timeStr,
      destinName: toStop.title,
      originName: fromStop.title,
      person: persons.value,
      passengersTrainCard: bahncard.value,
      direction: departure,
      destinType: toStop.place_type ?? AutocompleteItemTypes.unknown,
      originType: fromStop.place_type ?? AutocompleteItemTypes.unknown
    });

    this.props.router.push(appUrl, browserUrl);
  }

  setSearchTab = (tab: SearchWidgetSections) => {
    this.setState({
      selectedTab: tab,
    });
    if (this.props.onTypeSwitch) {
      this.props.onTypeSwitch(tab);
    }
  }

  setDateAndDeparture = (departure: DepartureTypes, date: Date) => {
    this.setState({
      selectedDeparture: departure,
      selectedDate: date,
      timepickerTouched: true,
    });
  }

  setDate = (date: Date) => {
    this.setState({
      selectedDate: date,
    });
  }

  setDeparture = (departure: DepartureTypes) => {
    this.setState({
      selectedDeparture: departure,
    });
  }

  setStop = (stop: AutocompleteItem) => {
    this.setState({
      selectedStop: stop,
    });
  }

  setPerson = (item: PersonItem) => {
    this.setState({
      selectedPerson: item,
    });
  }

  setBahnCard = (item: BahncardItem) => {
    this.setState({
      selectedBahnCard: item,
    });
  }

  setJourneyFrom = (item: AutocompleteItem) => {
    this.setState({
      selectedJourneyFrom: item,
    })
  }

  setJourneyTo = (item: AutocompleteItem) => {
    this.setState({
      selectedJourneyTo: item,
    })
  }

  swapJourneys = () => {
    this.setState((prevState) => {
      return {
        selectedJourneyFrom: prevState.selectedJourneyTo,
        selectedJourneyTo: prevState.selectedJourneyFrom,
      }
    })
  }

  render() {
    const {
      selectedTab,
      selectedDate,
      selectedDeparture,
      selectedStop,
      selectedBahnCard,
      selectedPerson,
      timepickerTouched,
      selectedJourneyFrom,
      selectedJourneyTo,
    } = this.state;

    return (
      <StyledContainer>
        {!this.props.headLineOff && 
        <Headline
          section={selectedTab}
        />}

        {
          (this.context.deviceInfo.type === DeviceTypes.mobile) ?
            (
              <MobileSearchWidget
                section={selectedTab}
                setSearchTab={this.setSearchTab}

                timepickerTouched={timepickerTouched}
                
                selectedDate={selectedDate}
                selectedDeparture={selectedDeparture}
                setDateAndDeparture={this.setDateAndDeparture}
                
                selectedStop={selectedStop}
                setStop={this.setStop}
                
                selectedBahnCard={selectedBahnCard}
                setBahnCard={this.setBahnCard}
                
                selectedPerson={selectedPerson}
                setPerson={this.setPerson}
                
                onSearchJourney={this.onJourneySearch}
                onStopSearch={this.onStopSearch}
                
                selectedJourneyFrom={selectedJourneyFrom}
                setJourneyFrom={this.setJourneyFrom}

                selectedJourneyTo={selectedJourneyTo}
                setJourneyTo={this.setJourneyTo}

                swapJourneys={this.swapJourneys}
              />
            )
            : (
              <DesktopSearchWidget
                section={selectedTab}
                setSearchTab={this.setSearchTab}

                timepickerTouched={timepickerTouched}

                selectedDate={selectedDate}
                setDate={this.setDate}

                selectedDeparture={selectedDeparture}
                setDeparture={this.setDeparture}

                selectedStop={selectedStop}
                setStop={this.setStop}

                selectedBahnCard={selectedBahnCard}
                setBahnCard={this.setBahnCard}

                selectedPerson={selectedPerson}
                setPerson={this.setPerson}

                onStopSearch={this.onStopSearch}
                onSearchJourney={this.onJourneySearch}

                selectedJourneyFrom={selectedJourneyFrom}
                setJourneyFrom={this.setJourneyFrom}

                selectedJourneyTo={selectedJourneyTo}
                setJourneyTo={this.setJourneyTo}
                
                swapJourneys={this.swapJourneys}
              />
            )
        }

      </StyledContainer>
    );
  }
};

const StyledContainer = styled.div`

`;

const StyledAdPlaceholder = styled(AdPlaceholder)`
  margin-top: 37px;
  
  ${media.desktop} {
    margin-top: 40px;
  }
`;

export default withRouter(SearchWidget);