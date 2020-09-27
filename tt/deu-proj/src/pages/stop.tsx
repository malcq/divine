import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NextPage, NextPageContext } from 'next';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import dynamic from 'next/dynamic';
import parse from 'date-fns/parse';
import { AdSlot } from 'react-dfp';
import axios, { CancelTokenSource } from 'axios';

// GLOBAL UTILS AND CONTEXTS
import { SettingsContext } from '../contexts/Settings';
import { useTranslation } from 'i18n';

// COMPONENTS IMPORT
import { BaseContentLayout, StopPageLayout } from '../components/UI/Layouts';

import StopInfo from '../components/Stoppage/StopInfo';
import Header from '../components/Headers/StopHeader';
import Footer from '../components/Footer';
import SearchWidget from '../components/SearchWidget/HeaderWidget';
import Faq from '../components/FAQ';
import StopTable from '../components/StopTable';
import MetaInfo from '../components/UI/MetaInfo';
import LoadingLine from '@components/UI/LoadingLine';

// REDUCERS IMPORT
import {
  reducer as widgetReducer,
  getInitialState as getWidgetReducerInitState,
} from '../reducers/stopPage/widgetReducer';
import {
  stopInfoReducer,
  initStopInfoState,
} from '../reducers/stopPage/stopInfoReducer';

// UTILS IMPORT
import { getWidgetInitialProps } from '@utils/index';
import {
  DepartureTypes,
  DeviceTypes,
  ADS_DESKTOP,
  ADS_MOBILE,
  CANCEL_ERR_MSG,
  SERVER_ERRORS,
} from '@utils/constants';
import { useDfp } from '@utils/hooks/useDfp';
import { useDfpInitialize } from '@utils/hooks/useDfpInitialize';
import { getStringFromQuery } from '@utils/getStringFromQuery';
import { getStopPageMeta } from '@utils/meta.constants';
import media, { mediaValues } from '@utils/media';
import * as routerFactory from '@utils/router.util';
import { useScrollToTopPage } from '@utils/hooks/useScrollToTopPage';
import { useScreenWidth } from '@utils/hooks/useScreenWidth';
import { useErrorHandler } from '@utils/hooks/useErrorHandler';
import { getTimeValidStatus } from '@utils/time/getTimeValidStatus';
import { divideDateIntoTimeAndDate } from '@utils/time/divideDateIntoTimeAndDate';
import routerHistory from '@utils/routerHistory';
import { faqContentBuilder } from '@utils/faqContent';
import StopService from '@utils/stopService';
import { getRelevantTime } from '@utils/time/getRelevantTime';
import { useDragScroll } from '@utils/hooks/useDragScroll';
import { getNewDate } from '@utils/time/getNewDate';

// MODELS IMPORT
import { FaqResponse, ContentTypes } from '../models/stopfaq';
import { AutocompleteItem, AutocompleteItemTypes } from '../models/autocomplete';
import { TransportsTypes } from '../models/transports';
import { WidgetInitialProps } from '../models/widget';
import { StopListResponse, StopInfoResponse, StopAdditionalInfo, StopResponse, LinesColorInfo } from '../models/stop';
import { ErrorObj } from '../models/common';

// API IMPORTS
import { getStopPage, AllAvailableOptions, getStopInfo, getStopTable, getFaq } from '../api/stops';
import CustomBar from '@components/UI/CustomBar';
import initialStopData from '@api/mocks/initialStop';
import viewPort from '@utils/viewPort';
import { createAutocompleteItem } from '@utils/factories';

const CallToStopPage = dynamic(() => import('@components/UI/Placeholders/CallToStopPage'));
const ErrorPage = dynamic(() => import('@components/UI/ErrorPage'));
const LinksSection = dynamic(() => import('@components/LinksSection'));
const NetworkSection = dynamic(() => import('@components/NetworkSection'));
interface StopsProps {
  stopList?: StopListResponse,
  stopInfo?: StopInfoResponse,
  additionalInfo?: StopAdditionalInfo,
  initialWidgetProps: WidgetInitialProps,
  statusCode?: number,
  faqContent: FaqResponse,
  errObj: ErrorObj,
  isServer: boolean,
}

const Stops: NextPage<StopsProps> = (props) => {
  const router = useRouter();

  const {
    stopInfo,
    stopList,
    additionalInfo,
    errObj,
    faqContent
  } = props;
  const { t } = useTranslation('stoppage');
  const sightRef = React.useRef<HTMLElement>();
  const [shouldAnimateInfo, setShouldAnimateInfo] = useState(false);
  const asideContentRef = React.useRef<HTMLDivElement>(null);
  const [
    widgetState,
    widgetDispatch,
  ] = React.useReducer(widgetReducer, getWidgetReducerInitState({
    initialDate: parse(props.initialWidgetProps.date, 'MM dd yyyy HH:mm', getNewDate()),
    initialDeparture: props.initialWidgetProps.departure,
    initialJourneyFrom: props.initialWidgetProps.stopFrom.title ? props.initialWidgetProps.stopFrom : undefined,
  }));

  const [
    stopInfoState,
    stopInfoDispatch
  ] = React.useReducer(stopInfoReducer, initStopInfoState({
    // transportSelected: TransportsTypes.sBahn,
    faqContent,
    stopList,
    stopInfo,
    additionalInfo,
    error: errObj
  }));

  const metaInfo = React.useMemo(() => {
    const city = stopInfoState.stopInfo?.city;
    const title = stopInfoState.stopInfo?.stop_name;
    const state = stopInfoState.stopInfo?.state;

    const metas = getStopPageMeta({
      city,
      state,
      title
    });

    const pageTitle = t(`page__title`, {
      city,
      title,
    });

    return {
      metas,
      title: pageTitle
    }
  }, [stopInfoState.stopInfo, t]);

  const { deviceInfo } = React.useContext(SettingsContext);
  const { screenWidth } = useScreenWidth();
  const { isShowAd } = useDfpInitialize()
  const initialized = React.useRef<boolean>(false);
  let cancelToken = React.useRef<CancelTokenSource | null>(axios.CancelToken.source());
  const prevDeparture = React.useRef(widgetState.selectedJourneyFrom?.slugs.title);
  const isFaqShouldScroll = React.useRef(false);
  useScrollToTopPage([stopInfoState.isLoading]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    const { date, time } = divideDateIntoTimeAndDate(widgetState.selectedDate);

    const {
      appUrl,
      browserUrl,
    } = routerFactory.getStopUrl({
      city: getStringFromQuery(router.query.city) ?? '',
      state: getStringFromQuery(router.query.state) ?? '',
      stop: getStringFromQuery(router.query.stop) ?? '',
      date,
      time,
      direction: widgetState.selectedDeparture,
    });

    router.push(appUrl, browserUrl, {
      shallow: true,
    })
  }, [
    widgetState.selectedDate,
    widgetState.selectedDeparture,
  ])


  function setDateAndDeparture(departure: DepartureTypes, date: Date) {
    widgetDispatch({
      type: 'set_date_and_departure',
      departure,
      date,
    });
  }

  function setDate(date: Date) {
    widgetDispatch({
      type: 'set_date',
      date,
    });
  }

  function setDeparture(departure: DepartureTypes) {
    widgetDispatch({
      type: 'set_departure',
      departure,
    })
  }

  function setJourneyTo(destination: 'to', journey: AutocompleteItem) {
    const { date, time } = divideDateIntoTimeAndDate(widgetState.selectedDate);

    widgetDispatch({
      type: 'set_journey_to',
      journey,
    });
    if (!widgetState.selectedJourneyFrom) return;
    const {
      appUrl,
      browserUrl,
    } = routerFactory.getJourneysUrl({
      date,
      time,
      destinName: journey.title,
      originName: widgetState.selectedJourneyFrom?.title ?? '',
      direction: widgetState.selectedDeparture,
      destinType: journey.place_type,
      originType: widgetState.selectedJourneyFrom?.place_type ?? AutocompleteItemTypes.unknown,
    });

    router.push(appUrl, browserUrl);
  }

  function setJourneyFrom(destination: 'from', journey: AutocompleteItem) {
    const { date, time } = divideDateIntoTimeAndDate(widgetState.selectedDate);

    widgetDispatch({
      type: 'set_journey_from',
      journey,
    });

      if (journey.place_type === AutocompleteItemTypes.city) return;
     
      if (widgetState.selectedJourneyTo) {
        const {
          appUrl,
          browserUrl,
        } = routerFactory.getJourneysUrl({
          date,
          time,
          destinName: widgetState.selectedJourneyTo?.title ?? '',
          originName: journey.title,
          direction: widgetState.selectedDeparture,
          destinType: widgetState.selectedJourneyTo?.place_type ?? AutocompleteItemTypes.unknown,
          originType: journey.place_type,
        });
    
        router.push(appUrl, browserUrl);
        
      } else {
        
        const {
          appUrl,
          browserUrl
        } = routerFactory.getStopUrl({
          city: journey.slugs.city_name,
          state: journey.slugs.state_name,
          stop: journey.slugs.title,
          direction: widgetState.selectedDeparture,
          // lines: stopInfoState.stopInfoFilter.lineSelected?.join(','),
          // transports: stopInfoState.stopInfoFilter.transportSelected ?? undefined,
          date,
          time,
        });

        widgetDispatch({
          type: 'clear_errors',
        });

        router.push(appUrl, browserUrl, {
          shallow: true,
        });

      }

  }
  function setMobileWidgetActivation(state: boolean) {
    setShouldAnimateInfo(state)
  }

  const [top, setTop] = useState(0);
  useEffect(() => {
    function getTopStopInfoPosition(): number {
      if (deviceInfo.type === DeviceTypes.mobile) {
        return widgetState.mobileSearchActivated ? 16 : -52;
      } else {
        return -78;
      }
    }
    setTop(getTopStopInfoPosition())
  }, [widgetState.mobileSearchActivated, screenWidth])

  const setLineSelection = React.useCallback((
    line: string,
    state: boolean,
    provider: TransportsTypes,
  ) => {
    if (!state) {
      return stopInfoDispatch({
        type: 'set_line',
        line,
        provider
      })
    }
    return stopInfoDispatch({
      type: 'remove_line',
      line
    });

  }, []);

  const setTransportSelection = (
    transport: TransportsTypes,
    state: boolean,
    cb?: () => void
  ) => {
    if (!state) {
      stopInfoDispatch({
        type: 'set_transport',
        transport,
      });
    } else {
      stopInfoDispatch({
        type: 'set_default'
      })
    }
    if (cb) cb();
  }

  function setErrors() {
    const { selectedJourneyFrom, selectedJourneyTo } = widgetState;
    if (stopInfoState.error.message === SERVER_ERRORS.INVALID_TIME) {
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
        to: !isJourneyTo,
      }
    });
  }
  useEffect(() => {
 
      const getStopData = async () => {
        const {
          state,
          city,
          stop,
          date,
          time,
          direction,
          transports,
          lines,
          card,
        } = Router.query;
        const { dateParam, timeParam } = getRelevantTime({
          date: getStringFromQuery(date),
          time: getStringFromQuery(time)
        });
       
        try {
          stopInfoDispatch({ type: 'set_start_loading' });
 
          cancelToken.current = axios.CancelToken.source();

          const stopTableOpt: AllAvailableOptions = {
            name: stop,
            city,
            state,
            date: dateParam,
            dir: direction,
            lines,
            time: timeParam,
            transports,
            cancelSource: cancelToken.current,
          };

          getFaq({
            name: stopTableOpt.name,
            city: stopTableOpt.city,
            cancelSource: stopTableOpt.cancelSource
          })
          .then((faq) => {
            const faqSectionsContent = faqContentBuilder({
              apiFaq: faq
            });

            stopInfoDispatch({
              type: 'set_api_faq',
              content: faqSectionsContent
            });
          }).catch((e) => {
            stopInfoDispatch({
              type: 'set_api_faq',
              content: []
            });
          });
          
          const stopList = await getStopTable(stopTableOpt);
          stopInfoDispatch({
            type: 'set_stop_page_stop-list',
            stopList,
          });
          stopInfoDispatch({ type: 'set_stop_loading' })
        } catch (e) {
          if (e.message !== CANCEL_ERR_MSG.cancel_msg) {
            stopInfoDispatch({ type: 'set_error', message: e.message });
            stopInfoDispatch({ type: 'set_stop_loading' });
          }
        }
    }

    if (!props.isServer) {          
      getStopData()
    }
  }, []);

  useEffect(() => {
    const stopListStateHandler = async () => {
     
      if (!routerHistory.comparedStopUrl) return;

      if (cancelToken.current) {  
        cancelToken.current.cancel(CANCEL_ERR_MSG.cancel_msg)
      }

      const {
        state,
        city,
        stop,
        date,
        time,
        direction,
        transports,
        lines,
      } = Router.query;
      if (!stop) {
        throw new Error(SERVER_ERRORS.STOP_NOT_FOUND)
      }

      let shouldFaqUpdate = false;
      
      if (prevDeparture.current !== stop) {
        prevDeparture.current = getStringFromQuery(stop) || '';
        shouldFaqUpdate = true;
        isFaqShouldScroll.current = true;
      }
      stopInfoDispatch({ type: 'set_start_loading' });

      const { dateParam, timeParam } = getRelevantTime({
        date: getStringFromQuery(date),
        time: getStringFromQuery(time)
      });

      try {
        cancelToken.current = axios.CancelToken.source();
        const [{
          stopInfo,
          additionalInfo,
        },
          stopList,
          faq
        ] = await getStopPage({
          name: stop,
          city,
          state,
          date: dateParam,
          dir: direction,
          lines,
          time: timeParam,
          transports,
          cancelSource: cancelToken.current
        });

        if (shouldFaqUpdate) {
          const faqSectionsContent = faqContentBuilder({
            apiFaq: faq
          });
          stopInfoDispatch({
            type: 'set_faq',
            content: faqSectionsContent,
          });
        }

        const stopFrom = createAutocompleteItem({
          title: stopInfo?.stop_name ?? '',
          city: stopInfo?.city,
          stateName: stopInfo?.state,
          placeType: AutocompleteItemTypes.place,
          stopId: stopInfo?.stop_id,
        });

        widgetDispatch({
          type: 'set_journey_from',
          journey: stopFrom,
        });

        stopInfoDispatch({
          type: 'set_stop_page_stop-list',
          stopList,
        });

        stopInfoDispatch({
          type: 'set_stop_page_info',
          stopInfo,
          additionalInfo
        });

        stopInfoDispatch({ type: 'set_stop_loading' });
      } catch (e) {
        if (e.message !== CANCEL_ERR_MSG.cancel_msg) {
          stopInfoDispatch({ type: 'set_error', message: e.message });
          stopInfoDispatch({ type: 'set_stop_loading' });
        }
      }
    }

    Router.events.on('routeChangeComplete', stopListStateHandler);

    return () => {
      Router.events.off('routeChangeComplete', stopListStateHandler);
    }
  }, []);

  useEffect(() => {
    if (!isFaqShouldScroll.current || !asideContentRef.current) return;
    isFaqShouldScroll.current = false;
    asideContentRef.current.scrollTo(0, 0);
  }, [stopInfoState.isLoading])

  useEffect(() => {
    if (!stopInfoState.stopList?.transports.length && stopInfoState.isLoading) {
      stopInfoDispatch({ type: 'set_error', message: SERVER_ERRORS.NO_RESULTS_IN_TIME });
    }
  }, [stopInfoState.stopList?.transports]);

  const setSightRef = (elem: HTMLElement) => {
    sightRef.current = elem;
  };

  const {
    showEmptyStatePage,
    showErrorPage
  } = useErrorHandler(stopInfoState.error);


  const isMobile = deviceInfo.type === DeviceTypes.mobile;

  const isShowSightseeingButton = React.useMemo(() => {
    const isExistType = stopInfoState.faqContent.findIndex((item) => item.type === ContentTypes.pointsOfInterests);
    return isExistType >= 0
  }, [stopInfoState.faqContent]);

  return (
    <>
      <Head>
        <title>{metaInfo.title}</title>
      </Head>
      <MetaInfo
        info={metaInfo.metas}
      />

      <Header />
      <StyledSubHeader>
        <Sticky top={0} innerZ={15}>
          <div className="widget">
            <BaseContentLayout>
              <SearchWidget
                selectedDeparture={widgetState.selectedDeparture}
                selectedDate={widgetState.selectedDate}
                mobileSearchActivated={widgetState.mobileSearchActivated}
                setJourneyFrom={(journey) => setJourneyFrom('from', journey)}
                setJourneyTo={(journey) => setJourneyTo('to', journey)}
                journeyTo={widgetState.selectedJourneyTo}
                journeyFrom={widgetState.selectedJourneyFrom}
                timepickerTouched={widgetState.timepickerTouched}
                setDateAndDeparture={setDateAndDeparture}
                swapJourneys={() => null}
                setDeparture={setDeparture}
                setDate={setDate}
                setMobileSearchActivated={setMobileWidgetActivation}
                errors={widgetState.errors}
                timeError={widgetState.timeError}
              />
            </BaseContentLayout>
          </div>
        </Sticky>
        {!showEmptyStatePage && stopInfoState && stopInfoState.stopInfo && stopInfoState.stopList &&
          <Sticky top={top} innerZ={10}>
            <StopInfo
              isAnimate={shouldAnimateInfo}
              stopInfo={stopInfoState.stopInfo}
              stopInfoState={stopInfoState.stopInfoFilter}
              transports={stopInfoState.stopList.available_transports_filter}
              lines={stopInfoState.stopList.available_line_filter}
              setTransportSelection={setTransportSelection}
              setLineSelection={setLineSelection}
              lineColorInfo={stopInfoState.stopList.linesColorInfo}
            />
            {stopInfoState.isLoading && <LoadingLine />}
          </Sticky>
        }
      </StyledSubHeader>
      {isShowAd && isMobile && (
        <AdSkyWrapper
          adUnit={ADS_MOBILE.FG_Center1.slotName}
          sizes={ADS_MOBILE.FG_Center1.sizes}
          sizeMapping={[
            { viewport: viewPort.tablet, sizes: [ADS_MOBILE.FG_Center1.sizes[0], ADS_MOBILE.FG_Center1.sizes[1]] }
          ]}
        />)
      }

      {showEmptyStatePage &&
        <CallToActionContainer>
          <CallToStopPage
            errorMessage={stopInfoState.error.message}
            onActionClick={setErrors}
          />
        </CallToActionContainer>
      }
      {!showEmptyStatePage && stopInfoState && stopInfoState.stopList &&
        (
          <StopPageLayout>
            <div className="stop-page__stops">
              <StopTable
                setDate={setDate}
                currentDate={widgetState.selectedDate}
                stops={stopInfoState.stopList.transports}
                filterInfo={stopInfoState.stopInfoFilter}
                lineColorInfo={stopInfoState.stopList.linesColorInfo}
                isLoading={stopInfoState.isLoading}
                isShowSightseeingButton={isShowSightseeingButton}
                selectedDate={widgetState.selectedDate}
              />
            </div>
            <div className="stop-page__aside">
                <div
                  className="aside__content"
                >
                  {isShowAd && !isMobile && (
                    <AdSkyWrapper
                      adUnit={ADS_DESKTOP.FG_Sky.slotName}
                      sizes={ADS_DESKTOP.FG_Sky.sizes}
                      sizeMapping={[
                        { viewport: viewPort.desktop, sizes: [ADS_DESKTOP.FG_Sky.sizes[0]] },
                        { viewport: viewPort.tablet[1], sizes: [ADS_DESKTOP.FG_Sky.sizes[1]] }
                      ]}
                    />)
                  }
                  {/* <NetworkSection plansInfo={plansInfoMocks} /> */}
                  {stopInfoState.faqContent.length > 0 &&
                    <Faq
                      type='stop'
                      faq={stopInfoState.faqContent}
                      className="stop-page__faq"
                      setSightRef={setSightRef}
                      colorInfo={stopInfoState.stopList.linesColorInfo}
                    />}
                  {/* TODO: uncommet when schema pages will be done */}
                  {/* {(deviceInfo.type === DeviceTypes.mobile) &&
                <LinksSection links={links} />
              } */}
                </div>
            </div>
          </StopPageLayout>
        )
      }
      <Footer />
    </>
  )
}

/**
 * Using wrapped page as final one and provide initialProps here
 */
Stops.getInitialProps = async (ctx: NextPageContext) => {
  const { query, req } = ctx;
  const namespacesRequired = ['common', 'search-widget', 'stoppage', 'faqcontent'];
  const isServer = !!req;

  const errObj: ErrorObj = {
    status: false,
    message: '',
  };

  if (!isServer) {
    try {
      var { stopInfo, additionalInfo } = await getStopInfo({
        name: query.stop,
        city: query.city,
        state: query.state,
        country: query.country,
        userAgent: query.userAgent
      });
    } catch (e) {
      errObj.status = true;
      errObj.message = e.message
    }

    const widgetProps = getWidgetInitialProps(
      {
        stopFrom: {
          title: stopInfo?.stop_name,
          city: stopInfo?.city,
          state: stopInfo?.state,
          place_type: AutocompleteItemTypes.place,
          stop_id: stopInfo?.stop_id,
          short_title: stopInfo?.short_title
        },
        departure: query.direction,
        time: query.time,
        date: query.date,
        card: query.card,
      }
    );

    return {
      namespacesRequired,
      ...initialStopData(query, errObj),
      initialWidgetProps: widgetProps,
      stopInfo,
      additionalInfo,
      isServer
    }
  }

  const stopServerData = await StopService(
    query,
    errObj,
  );

  return {
    namespacesRequired,
    ...stopServerData,
    isServer,
  }
}

const StyledSubHeader = styled.div`
  color: ${props => props.theme.colorValues.black};

  .widget {
    box-shadow: 0 1px 1px 0px ${props => props.theme.colorValues.lightestgrey};
    background-color: ${props => props.theme.colorValues.white};
    padding: 8px 0 1px;

    ${media.desktop} {
      padding-top: 16px;
    }
  }
`;

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

export default Stops;