import React, { useEffect, useContext } from 'react';
import { NextPage, NextPageContext } from 'next';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import styled, { css } from 'styled-components';
import Sticky from 'react-stickynode';
import dynamic from 'next/dynamic';
import parse from 'date-fns/parse';
import { AdSlot } from 'react-dfp';
import axios, { CancelTokenSource } from 'axios';

// GLOBAL UTILS AND CONTEXTS
import { useTranslation } from 'i18n';

// REDUCERS IMPORT
import {
  reducer as widgetReducer,
  getInitialState as getWidgetInitialState,
} from '../reducers/journeyPage/widgetReducer';
import {
  journeyInfoReducer,
  initJourneyInfoState
} from '../reducers/journeyPage/journeyInfoReducer';

// COMPONENTS IMPORT
import {
  BaseContentLayout,
  JourneysPageLayout
} from '../components/UI/Layouts';
import LoadingLine from '@components/UI/LoadingLine';
import Header from '../components/Headers/JourneyHeader';
import SearchWidget from '../components/SearchWidget/Wrappers/JourneyPageWidget';
import TransportFilter from '../components/SearchWidget/Common/Mobile/TransportFilter';
import Footer from '../components/Footer';
import MetaInfo from '../components/UI/MetaInfo';
// API IMPORT
import { getJourneysTable } from '../api/journeys';

// MODELS IMPORT
import { WidgetInitialProps, PartsOfDay, ButtonTransportTypes } from '../models/widget';
import { ErrorObj } from '../models/common';
import { AutocompleteItemTypes } from '../models/autocomplete';
import { OuterResponse, InnerResponse } from '../models/journey';
import { LinesColorInfo } from '@models/stop';

// UTILS IMPORT
import { useScrollToTopPage } from '../utils/hooks/useScrollToTopPage';
import { useErrorHandler } from '../utils/hooks/useErrorHandler';
import * as routerFactory from '../utils/router.util';
import media from '../utils/media';
import { getWidgetInitialProps } from '../utils';
import { getStringFromQuery } from '../utils/getStringFromQuery';
import { getTimeValidStatus } from '../utils/time/getTimeValidStatus';
import { divideDateIntoTimeAndDate } from '../utils/time/divideDateIntoTimeAndDate';
import routerHistory from '../utils/routerHistory';
import { getJourneyPageMeta } from '../utils/meta.constants';
import transportFilterConverter from '../utils/transportFilterConverter';
import { getNewDate } from '@utils/time/getNewDate';
import { SERVER_ERRORS, ADS_DESKTOP, DeviceTypes, ProviderTypes, CANCEL_ERR_MSG } from '@utils/constants';
import { getRelevantTime } from '@utils/time/getRelevantTime';
import { createAutocompleteItem } from '@utils/factories';
import { useDfpInitialize } from '@utils/hooks/useDfpInitialize';
import { SettingsContext } from '@contexts/Settings';
import viewPort from '@utils/viewPort';
import CustomBar from '@components/UI/CustomBar';

const OuterStopTable = dynamic(() => import('@components/OuterStopTable'));
const InnerStopTable = dynamic(() => import('@components/InnerStopTable'));
const CallToJourneyPage = dynamic(() => import('@components/UI/Placeholders/CallToJourneyPage'));
const ErrorPage = dynamic(() => import('@components/UI/ErrorPage'));

interface JourneysProps {
  initialWidgetProps: WidgetInitialProps,
  journeys?: OuterResponse[] | InnerResponse[],
  errorObj: ErrorObj,
  type?: 'inner' | 'outer',
  linesColorInfo: LinesColorInfo[],
  isServer: boolean,
}
const Journeys: NextPage<JourneysProps> = (props) => {
  const { t } = useTranslation('common');
  const { t: journeyT } = useTranslation('journeypage');
  const { isShowAd } = useDfpInitialize();
  const { deviceInfo } = useContext(SettingsContext);
  const isMobile = deviceInfo.type === DeviceTypes.mobile;
  const asideContentRef = React.useRef<HTMLDivElement>(null);

  const initialWidgetState = React.useMemo(() => {
    return getWidgetInitialState({
      initialJourneyFrom: props.initialWidgetProps.stopFrom,
      initialJourneyTo: props.initialWidgetProps.stopTo,
      initialDate: parse(props.initialWidgetProps.date, 'MM dd yyyy HH:mm', getNewDate()),
      initialPrice: props.initialWidgetProps.price,
      initialCard: props.initialWidgetProps.card,
      initialPerson: props.initialWidgetProps.person,
      initialChangeover: props.initialWidgetProps.changeover,
      initialDeparture: props.initialWidgetProps.departure,
      initialDepartureTime: props.initialWidgetProps.departureTime,
    });
  }, [])

  const [
    widgetState,
    widgetDispatch
  ] = React.useReducer(widgetReducer, initialWidgetState);

  const [
    journeyState,
    journeyDispatch
  ] = React.useReducer(journeyInfoReducer, initJourneyInfoState({
    journeyList: props.journeys,
    error: props.errorObj,
    type: props.type,
    linesColorInfo: props.linesColorInfo
  }))

  const router = useRouter();

  const metas = React.useMemo(() => {
    const origin = widgetState.selectedJourneyFrom?.title;
    const destination = widgetState.selectedJourneyTo?.title;

    const metaInfo = getJourneyPageMeta({
      destination,
      origin,
    });

    const title = journeyT(`journey-page__title`, {
      origin,
      destination,
    });

    return {
      metaInfo,
      title,
    }
  }, [
    widgetState.selectedJourneyFrom,
    widgetState.selectedJourneyTo,
    journeyT,
  ]);
  const initialized = React.useRef<boolean>(false);
  let cancelToken = React.useRef<CancelTokenSource | null>(axios.CancelToken.source());

  useScrollToTopPage([journeyState.journeyList, journeyState.isLoading]);
  useEffect(() => {
   
    const journeyService = async () => {
      const {
        passengers_train_card: card,
        person,
        date,
        destinname,
        originname,
        destination_type,
        origin_type,
        transport_type,
        time
      } = Router.query;
      journeyDispatch({ type: 'set_start_loading' });

      const { dateParam, timeParam } = getRelevantTime({
        date: getStringFromQuery(date),
        time: getStringFromQuery(time)
      });
      try {
        const { journeyList, type, linesColorInfo, arrival_info, departure_info } = await getJourneysTable({
          card: card,
          person: getStringFromQuery(person) ?? '1',
          destination_name: destinname,
          destination_type,
          origin_name: originname,
          origin_type,
          date: dateParam,
          time: timeParam,
          transport_type,
        }, cancelToken.current);

        const stopFrom = createAutocompleteItem({
          title: departure_info.title,
          placeType: departure_info.type ?? AutocompleteItemTypes.unknown,
          city: departure_info.city_name,
          stateName: departure_info.state,
          stopId: departure_info.stop_id
        });

        const stopTo = createAutocompleteItem({
          title: arrival_info.title ?? '',
          placeType: arrival_info.type ?? AutocompleteItemTypes.unknown,
          city: arrival_info.city_name,
          stateName: arrival_info.state,
          stopId: arrival_info.stop_id
        });

        widgetDispatch({
          type: 'update_journey_from_&_to',
          journeyFrom: stopFrom,
          journeyTo: stopTo,
        });

        journeyDispatch({
          type: 'set_journey_list',
          journeyList,
          repType: type,
          linesColorInfo
        });
        journeyDispatch({ type: 'set_stop_loading' });
      } catch (e) {
        if (e.message !== CANCEL_ERR_MSG.cancel_msg) {
          journeyDispatch({ type: 'set_error', message: e.message });
          journeyDispatch({ type: 'set_stop_loading' });
        }
      }
    }

    if (!props.isServer) {
      journeyService()
    }

  }, []);

  useEffect(() => {
    const fetchingJourneyList = async () => {
      if (!routerHistory.comparedJourneyUrl) return;
     
      const {
        passengers_train_card: card,
        person,
        date,
        destinname,
        originname,
        destination_type,
        origin_type,
        transport_type,
        time
      } = Router.query;
      journeyDispatch({ type: 'set_start_loading' });

      const { dateParam, timeParam } = getRelevantTime({
        date: getStringFromQuery(date),
        time: getStringFromQuery(time)
      });

      widgetDispatch({
        type: 'set_widget_errors',
        errors: {
          from: false,
          to: false,
        }
      });
      try {
        if (cancelToken.current) {
          cancelToken.current.cancel(CANCEL_ERR_MSG.cancel_msg)
        }
        cancelToken.current = axios.CancelToken.source();
        const { journeyList, type, linesColorInfo } = await getJourneysTable({
          card: card,
          person: getStringFromQuery(person) ?? '1',
          destination_name: destinname,
          destination_type,
          origin_name: originname,
          origin_type,
          date: dateParam,
          time: timeParam,
          transport_type
        }, cancelToken.current);

        journeyDispatch({
          type: 'set_journey_list',
          journeyList,
          repType: type,
          linesColorInfo
        });
        journeyDispatch({ type: 'set_stop_loading' });
      } catch (e) {
        if (e.message !== CANCEL_ERR_MSG.cancel_msg) {
          journeyDispatch({ type: 'set_error', message: e.message });
          journeyDispatch({ type: 'set_stop_loading' });
        }
      }
    };
    Router.events.on('routeChangeComplete', fetchingJourneyList);

    return () => {
      Router.events.off('routeChangeComplete', fetchingJourneyList)
    }
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized!.current = true;
      return;
    }
    const { time, date } = divideDateIntoTimeAndDate(widgetState.selectedDate);

    const { appUrl, browserUrl } = routerFactory.getJourneysUrl({
      date,
      time,
      destinName: getStringFromQuery(router.query.destinname) ?? '',
      originName: getStringFromQuery(router.query.originname) ?? '',
      changeovers: widgetState.selectedChangeover.value,
      direction: widgetState.selectedDeparture,
      price: widgetState.selectedPrice.value,
      person: widgetState.selectedPerson.value,
      passengersTrainCard: widgetState.selectedBahnCard.value,
      zeitFrom: widgetState.selectedDepartureTime.value,
      destinType: widgetState.selectedJourneyTo?.place_type ?? AutocompleteItemTypes.unknown,
      originType: widgetState.selectedJourneyFrom?.place_type ?? AutocompleteItemTypes.unknown
    })
    router.push(appUrl, browserUrl, { shallow: true });
  }, [
    widgetState.selectedDate,
    widgetState.selectedDeparture,
    widgetState.selectedBahnCard,
    // widgetState.selectedChangeover,
    widgetState.selectedDepartureTime,
    widgetState.selectedPerson,
    // widgetState.selectedPrice,
  ]);

  function setDate(date: Date) {
    widgetDispatch({
      type: 'set_date',
      date,
    });
  }

  const isOuter: boolean = React.useMemo(() => journeyState.type === 'outer', [journeyState.type]);

  function setTransportFilter(type: ButtonTransportTypes) {
    widgetDispatch({
      type: 'set_transport_filter',
      filterBy: type === 'bus' ? ProviderTypes.flixbus : ProviderTypes.deutsche_bahn,
    });
  };

  useEffect(() => {
    if (!journeyState?.journeyList?.length && journeyState.isLoading) {
      journeyDispatch({ type: 'set_error', message: SERVER_ERRORS.NO_RESULTS_IN_TIME });
    }
  }, [journeyState.journeyList]);

  function setErrors() {
    const { selectedJourneyFrom, selectedJourneyTo } = widgetState;

    if (journeyState.error.message === SERVER_ERRORS.NO_RESULTS_IN_TIME) {
    return widgetDispatch({
        type: 'set_widget_time_err',
      });
    }

    const isJourneyFrom = Boolean(selectedJourneyFrom);
    const isJourneyTo = Boolean(selectedJourneyTo);

    widgetDispatch({
      type: 'set_widget_errors',
      errors: {
        from: !isJourneyFrom,
        to: !isJourneyTo
      }
    });
  }

  const showTransportFilter = isOuter &&
    (journeyState.journeyList && journeyState.journeyList?.length > 0);

  const selectedTransport = widgetState.transportFilter;

  const {
    showEmptyStatePage,
    showErrorPage
  } = useErrorHandler(journeyState.error);

  useEffect(() => {
    if (journeyState.type === 'inner') return;
    const transports = new Set<ProviderTypes>();
    journeyState.journeyList?.forEach((item: OuterResponse) => {
      transports.add(item.provider)
    });
    const transportsArr = Array.from(transports)
      .map((item) => {
        if (item === ProviderTypes.flixbus) {
          return 'bus'
        }
        if (item === ProviderTypes.deutsche_bahn) {
          return 'train'
        }
        return 'N/A'
      });
    widgetDispatch({ type: 'set_transport_filter', filterBy: null })
    widgetDispatch({ type: 'set_available_filter_types', types: transportsArr });

  }, [journeyState.journeyList, journeyState.type]);

  if (showErrorPage) {
    return <ErrorPage message={journeyState.error.message} />
  }

  return (
    <>
      <Head>
        <title>{metas.title}</title>
      </Head>
      <MetaInfo
        info={metas.metaInfo}
      />

      <Header />
      <StyledSubHeader>
        <Sticky top={0} innerZ={15}>
          <div className="widget">
            <BaseContentLayout>
              <SearchWidget
                dispatch={widgetDispatch}
                isOuterJourneys={isOuter}
                widgetState={widgetState}
              />
            </BaseContentLayout>

            {showTransportFilter &&
              (
                <div className="widget__transport">
                  <TransportFilter
                    state={selectedTransport}
                    onChange={setTransportFilter}
                    availableFilters={widgetState.availableFilter}
                  />
                </div>
              )
            }
          </div>
          {journeyState.isLoading && <LoadingLine />}
        </Sticky>
      </StyledSubHeader>
      {showEmptyStatePage &&
        <CallToActionContainer>
          <CallToJourneyPage
            errorMessage={journeyState.error.message}
            onActionClick={setErrors}
          />
        </CallToActionContainer>
      }
      {!showEmptyStatePage &&
        <JourneysPageLayout>
          <div className="reise-page__stops">
            {!isOuter
              ? (
                <InnerStopTable
                  stops={journeyState.journeyList as InnerResponse[]}
                  currentDate={widgetState.selectedDate}
                  setDate={setDate}
                  colorInfo={journeyState.linesColorInfo}
                  isLoading={journeyState.isLoading}
                />
              )
              : (
                <OuterStopTable
                  dayPart={widgetState.selectedDepartureTime.value as PartsOfDay}
                  stops={journeyState.journeyList as OuterResponse[]}
                  currentDate={widgetState.selectedDate}
                  setDate={setDate}
                  price={widgetState.selectedPrice.value}
                  changeovers={widgetState.selectedChangeover.value}
                  isLoading={journeyState.isLoading}
                  colorInfo={journeyState.linesColorInfo}
                  selectedFilter={widgetState.transportFilter}
                />
              )
            }
          </div>
            <div className="aside__content">
              {isShowAd && !isMobile && (
                <AdSkyWrapper
                  adUnit={ADS_DESKTOP.FG_Sky.slotName}
                  sizes={ADS_DESKTOP.FG_Sky.sizes}
                  sizeMapping={[
                    { viewport: viewPort.desktop, sizes: [ADS_DESKTOP.FG_Sky.sizes[0]] },
                    { viewport: viewPort.tablet[1], sizes: [ADS_DESKTOP.FG_Sky.sizes[1]] }
                  ]}
                />
              )
              }
            </div>
        </JourneysPageLayout>}
      <Footer />
    </>
  )
}

type AdblockProps = {
  isInner: boolean,
}

const StyledSubHeader = styled.div`
  .widget {
    ${props => props.theme.stickShadow};
    background-color: ${props => props.theme.colorValues.white};
    padding: 8px 0 1px;

    ${media.desktop} {
      padding-top: 16px;
    }
    &__transport {
      border-top: 1px solid ${props => props.theme.colorValues.lightestgrey};
      ${media.desktop} {
        padding: 0 11px;
      }
    }
  }
`;

const StyledAdBlock = styled.div<AdblockProps>`
  display: none;
  ${media.desktop} {
    margin: 32px auto 0;
    display: block;
    min-width: 305px;
    height: 170px;
    background-color: rgba(255,0,0,0.1);
  }
  ${media.ld} {
    margin: 0 0 0 45px;
    height: 474px;
    position: sticky;
    ${props => props.isInner
    ? css`
        top: 120px;
      `
    : css`
        top: 210px;
      `
  }
  }
`;
/**
 * Using wrapped page as final one and provide initialProps here
 */
Journeys.getInitialProps = async (ctx: NextPageContext) => {
  const { query, req } = ctx;
  const namespacesRequired = ['common', 'search-widget', 'journeypage'];
  const isServer = !!req;

  const {
    passengers_train_card: card,
    person,
    date,
    destinname,
    originname,
    destination_type,
    origin_type,
    transport_type,
    time,
    userAgent
  } = query;

  let journeys;
  const errorObj: ErrorObj = {
    status: false,
    message: ''
  };

  const { dateParam, timeParam } = getRelevantTime({
    date: getStringFromQuery(date),
    time: getStringFromQuery(time)
  });

  const addWidgetInfo = {
    date: dateParam,
    time: timeParam,
    departure: query.direction,
    person: query.person,
    card: query.passengers_train_card,
    departureTime: query.zeit_from,
    changeover: query.changeovers,
    price: query.price,
    // transportSelected: query.transport_type,
  }
  if (!isServer) {
    const widgetProps = getWidgetInitialProps({
      stopFrom: {
        title: getStringFromQuery(originname) ?? '',
        place_type: getStringFromQuery(origin_type) as AutocompleteItemTypes,
      },
      stopTo: {
        title: getStringFromQuery(destinname) ?? '',
        place_type: getStringFromQuery(destination_type) as AutocompleteItemTypes,
      },
      ...addWidgetInfo,
    })

    return {
      namespacesRequired,
      initialWidgetProps: widgetProps,
      journeys: [],
      linesColorInfo: [],
      type: undefined,
      errorObj,
      isServer,
    };
  }

  try {
    journeys = await getJourneysTable({
      card: card,
      person: getStringFromQuery(person) ?? '1',
      destination_name: destinname,
      destination_type,
      origin_name: originname,
      origin_type,
      date: dateParam,
      transport_type,
      time: timeParam,
      userAgent
    })
    if (!journeys.journeyList.length) {
      throw new Error(SERVER_ERRORS.NO_RESULTS_IN_TIME)
    }
  } catch (e) {
    console.log(e.message)
    errorObj.status = true;
    errorObj.message = e.message
  }

  const widgetProps = getWidgetInitialProps({
    stopFrom: {
      title: journeys?.departure_info.title ?? '',
      place_type: journeys?.departure_info.type,
      city: journeys?.departure_info.city_name,
      state: journeys?.departure_info.state,
      stop_id: journeys?.departure_info.stop_id
    },
    stopTo: {
      title: journeys?.arrival_info.title ?? '',
      place_type: journeys?.arrival_info.type,
      city: journeys?.arrival_info.city_name,
      state: journeys?.arrival_info.state,
      stop_id: journeys?.arrival_info.stop_id
    },
    ...addWidgetInfo,
  })

  return {
    namespacesRequired,
    initialWidgetProps: widgetProps,
    journeys: journeys?.journeyList,
    linesColorInfo: journeys?.linesColorInfo ?? [],
    type: journeys?.type,
    errorObj,
    isServer,
  };
};

const CallToActionContainer = styled.section`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: calc(100vh - 56px - 109px - 96px);

  ${media.desktop} {
    min-height: calc(100vh - 70px - 88px - 76px);
  }
`;

const AdSkyWrapper = styled(AdSlot)`
  .adBox {
    display: none;
    ${media.desktop} {
      display: flex;
      justify-content: center;
      margin-left: 44px;
    }
    ${media.ld} {
      margin-left: 0;
      margin-bottom: 40px;
    }
  }
`;

export default Journeys;