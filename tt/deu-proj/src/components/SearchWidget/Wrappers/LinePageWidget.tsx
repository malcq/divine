import React from 'react';
import { useRouter } from 'next/router';

import { LineHeaderWidgetState, LineWidgetAction } from '../../../reducers/linePage/linePageReducer';

import { DepartureTypes } from '../../../utils/constants';
import * as routerFactory from '../../../utils/router.util';

import { AutocompleteItem, AutocompleteItemTypes } from '../../../models/autocomplete';

import DesktopHeaderWidget from '../HeaderWidget/Desktop';
import { divideDateIntoTimeAndDate } from '../../../utils/time/divideDateIntoTimeAndDate';
import subDomainUrl from '../../../utils/subdomain.routes';


/**
 * Because search widget has a lot of props,
 * we wrapping it in additional component
 */
type Props = {
  widgetState: LineHeaderWidgetState,
  dispatch: (action: LineWidgetAction) => void,
}
const LinePageWidget: React.FC<Props> = (props) => {
  const router = useRouter();

  const {
    widgetState,
    dispatch
  } = props;

  function setJourneyFrom(journey: AutocompleteItem) {
    
    dispatch({
      type: 'set_journey_from',
      journey,
    });
    if (journey.place_type === AutocompleteItemTypes.city) return;
    const { date, time } = divideDateIntoTimeAndDate(widgetState.selectedDate);

    const { appUrl, browserUrl } = routerFactory.getStopUrl({
      city: journey.slugs.city_name,
      state: journey.slugs.state_name,
      stop: journey.slugs.title,
      direction: widgetState.selectedDeparture,
      date,
      time,
    })

    router.push(appUrl, browserUrl, { shallow: true });
    //TODO: uncomment when subdomains will be setup
    // subDomainUrl({
    //   action: 'pushUrl',
    //   path: browserUrl
    // })
  }

  function setJourneyTo(journey: AutocompleteItem) {
    dispatch({
      type: 'set_journey_to',
      journey,
    });

    if (!widgetState.selectedJourneyFrom) { return; }

    const { date, time } = divideDateIntoTimeAndDate(widgetState.selectedDate);

    const { appUrl, browserUrl } = routerFactory.getJourneysUrl({
      date,
      time,
      destinName: journey.title,
      originName: widgetState.selectedJourneyFrom.title,
      direction: widgetState.selectedDeparture,
      destinType: journey.place_type,
      originType: widgetState.selectedJourneyFrom.place_type,
    })

    router.push(appUrl, browserUrl, { shallow: true });
    //TODO: uncomment when subdomains will be setup
    // subDomainUrl({
    //   action: 'pushUrl',
    //   path: browserUrl
    // })
  }

  function setDeparture(departure: DepartureTypes) {
    dispatch({
      type: 'set_departure',
      departure,
    });
  };

  function setDate(date: Date) {
    dispatch({
      type: 'set_date',
      date,
    })
  }

  return (
    <DesktopHeaderWidget
      selectedJourneyTo={widgetState.selectedJourneyTo}
      setJourneyTo={setJourneyTo}

      selectedJourneyFrom={widgetState.selectedJourneyFrom}
      setJourneyFrom={setJourneyFrom}

      selectedDeparture={widgetState.selectedDeparture}
      setDeparture={setDeparture}

      selectedDate={widgetState.selectedDate}
      setDate={setDate}


      swapDisabled={true}
    />
  )
};

export default LinePageWidget;