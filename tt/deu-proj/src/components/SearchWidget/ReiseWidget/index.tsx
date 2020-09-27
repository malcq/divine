import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { SettingsContext } from '../../../contexts/Settings';

import TransportShape from '../../UI/TransportShape';

import { reducer, getInitialState } from './reducer';

import { AutocompleteItem } from '@models/autocomplete';
import { SubmitJourneyData } from '@models/widget';

import * as routerUtil from '@utils/router.util';
import { divideDateIntoTimeAndDate } from '@utils/time/divideDateIntoTimeAndDate';
import { DeviceTypes } from '@utils/constants';
import media from '@utils/media';

const JourneySearchMobile = dynamic(() => import('../BigWidget/Mobile/JourneySearch'));
const JourneySearchDesktop = dynamic(() => import('../BigWidget/Desktop/JourneyInputs'));

type Props = {
  initialJounrneyTo: AutocompleteItem,
  icon: 'train' | 'bus',
  subtitle: string,
  description: string,
  transport_type? : string,
}

const ReiseWidget: React.FC<Props> = (props) => {
  const router = useRouter();
  const { deviceInfo } = React.useContext(SettingsContext)

  const [state, dispatch] = React.useReducer(reducer, getInitialState({
    initialJourneyTo: props.initialJounrneyTo,
  }));

  const navigateToReise = (data: SubmitJourneyData) => {
    const {
      bahncard,
      date,
      departure,
      fromStop,
      persons,
      toStop,
      transport_type,
    } = data;
    const {
      date: dateStr,
      time: timeStr,
    } = divideDateIntoTimeAndDate(date);

    const {
      appUrl,
      browserUrl,
    } = routerUtil.getJourneysUrl({
      date: dateStr,
      time: timeStr,
      destinName: toStop.title,
      originName: fromStop.title,
      person: persons.value,
      passengersTrainCard: bahncard.value,
      direction: departure,
      destinType: toStop.place_type,
      originType: fromStop.place_type,
      transport_type,
    });

    router.push(appUrl, browserUrl);
  }

  const isMobile = deviceInfo.type === DeviceTypes.mobile;
  return (
    <StyledContainer>
      <TransportShape
        className="reise-widget__icon"
        icon={props.icon}
      />
      <p className="reise-widget__subtitle">
        {props.subtitle}
      </p>

        {isMobile
          ? (
            <div className="reise-widget__widget reise-widget__widget--mobile">
              <JourneySearchMobile
                onSearchJourney={navigateToReise}
        
                selectedJourneyFrom={state.selectedJourneyFrom}
                setJourneyFrom={(journey) => dispatch({ type: 'set_journey_from', journey})}
        
                selectedJourneyTo={state.selectedJourneyTo}
                
                selectedPerson={state.selectedPerson}
                setPerson={(person) => dispatch({ type: 'set_persons', person })}
                
                timepickerTouched={state.timepickerTouched}
                
                selectedDate={state.selectedDate}
                selectedDeparture={state.selectedDeparture}
                setDateAndDeparture={
                  (departure, date) => dispatch({ type: 'set_date_and_departure', departure, date })
                }
        
                selectedBahnCard={state.selectedBahnCard}
                setBahnCard={(card) => dispatch({ type: 'set_card', card })}

                transport_type={props.transport_type}
   
                swapDisabled={true}
                journeyToDisabled={true}
              />
            </div>
          )
          : (
            <div className="reise-widget__widget reise-widget__widget--desktop">
              <JourneySearchDesktop
                onSearchJourney={navigateToReise}
      
                selectedJourneyFrom={state.selectedJourneyFrom}
                setJourneyFrom={(journey) => dispatch({ type: 'set_journey_from', journey})}
      
                selectedJourneyTo={state.selectedJourneyTo}
                
                selectedPerson={state.selectedPerson}
                setPerson={(person) => dispatch({ type: 'set_persons', person })}
                
                timepickerTouched={state.timepickerTouched}
                
                selectedDate={state.selectedDate}
                setDate={(date) => dispatch({ type: 'set_date', date })}
                
      
                selectedDeparture={state.selectedDeparture}
                setDeparture={(departure) => dispatch({ type: 'set_departure', departure })}
      
                selectedBahnCard={state.selectedBahnCard}
                setBahnCard={(card) => dispatch({ type: 'set_card', card })}

                transport_type={props.transport_type}
    
                disableSwap={true}
                disableJourneyTo={true}
              />
            </div>
          )
        }

      <p className="reise-widget__description">
        {props.description}
      </p>

    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  .reise-widget {
    &__icon {
      margin-bottom: 12px;

      ${media.desktop} {
        margin-bottom: 16px;
      }
    }

    &__subtitle {
      ${props => props.theme.typography.fnTitle2};
      ${props => props.theme.typography.fnRegular};
      color: ${props => props.theme.colorValues.grey};
     /* ${props => props.theme.typography.fnText};
      color: ${props => props.theme.colorValues.lightgrey}; */
    }

    &__description {
      ${props => props.theme.typography.fnBody};
      ${props => props.theme.typography.fnText};
      color: ${props => props.theme.colorValues.lightgrey};
    }
    
    &__subtitle {
      text-align: center;
      padding: 0 16px;
      margin-bottom: 24px;

      ${media.desktop} {
        margin-bottom: 32px;
      }
    }

    &__widget {
      width: 100%;

      &--desktop {
        position: relative;
        border: 1px solid ${props => props.theme.colorValues.lightestgrey};
        border-radius: 8px;
      }
    }


    &__description {
      margin-top: 32px;

      ${media.desktop} {
        text-align: center;
        margin-top: calc(27px + 32px); /* 27px is bottom of the find button */
      }
    }

  }
`;

export default ReiseWidget;
