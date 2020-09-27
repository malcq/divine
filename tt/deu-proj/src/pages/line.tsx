import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { AdSlot } from 'react-dfp';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useTranslation } from 'i18n';
import parse from 'date-fns/parse';

// GLOBAL UTILS AND CONTEXTS
import { SettingsContext } from '../contexts/Settings';

// COMPONENTS IMPORT
import { LinePageLayout, BaseContentLayout } from '../components/UI/Layouts';
import DesktopHeader from '../components/LinePage/DesktopHeader';
import LinePage from '../components/LinePage';
import CrossButton from '../components/UI/CrossButton';
import Header from '../components/Headers/HomepageHeader';
import { AdPlaceholder } from '../components/UI/Placeholders';
import LinePageWidget from '../components/SearchWidget/Wrappers/LinePageWidget';
import Faq from '../components/FAQ';
import Footer from '../components/Footer';

// REDUCERS IMPORT
import {
  reducer as widgetReducer,
  getInitialState as getWidgetReducerInitState,
} from '../reducers/linePage/linePageReducer';


// UTILS IMPORT
import media, { mediaValues } from '../utils/media';
import { useScrollToTopPage } from '../utils/hooks/useScrollToTopPage';
import { getWidgetInitialProps } from '../utils';
import { getStringFromQuery } from '../utils/getStringFromQuery';

// MODELS IMPORT
import { WidgetInitialProps } from '../models/widget';
import { LineResponse } from '../models/linePageInfo';

// API IMPORTS
import { LineFaqResponse } from '../models/linefaq';
import getLinePage from '../api/linePage';
import LineMap from '@components/LinePage/LineMap';
import MetaInfo from '@components/UI/MetaInfo';
import CustomBar from '@components/UI/CustomBar';
import SkeletonLineHeader from '@components/Skeleton/skeletonLineHeader';
import SkeletonLineStops from '@components/Skeleton/skeletonLineStops';
import LoadingLine from '@components/UI/LoadingLine';

import { lineFaqBuilder } from '@utils/faqContent';
import { getStopPageMeta } from '@utils/meta.constants';
import { getRelevantTime } from '@utils/time/getRelevantTime';
import { useScreenWidth } from '@utils/hooks/useScreenWidth';
import { useDragScroll } from '@utils/hooks/useDragScroll';
import { getNewDate } from '@utils/time/getNewDate';
import { useSeparatedScroll } from '@utils/hooks/useSeparatedScroll';

import { useDfpInitialize } from '@utils/hooks/useDfpInitialize';
import { DeviceTypes, ADS_DESKTOP } from '@utils/constants';
import { createAutocompleteItem } from '@utils/factories';
import viewPort from '@utils/viewPort';
import { TransportsTypes } from '@models/transports';
import SkeletonLineHeaderMobile from '@components/Skeleton/skeletonLineHeaderMobile';
import { getStopUrl } from '@utils/router.util';
import { getSlug } from '@utils/getSlug';

const NetworkSection = dynamic(() => import('../components/NetworkSection'));
const LinksSection = dynamic(() => import('../components/LinksSection'));
interface LineProps {
  initialWidgetProps: WidgetInitialProps,
  lineInfoProps?: LineResponse,
  lineContentProps?: LineFaqResponse,
  isServer: boolean
}
const Line: NextPage<LineProps> = (props) => {
  const { t } = useTranslation('stoppage');
  const { lineInfoProps, lineContentProps } = props;

  const [isReverse, setIsReverse] = React.useState(false);
  const [lineInfo, setLineInfo] = useState(lineInfoProps);
  const [lineContent, setLineContent] = useState(lineContentProps);

  const { screenWidth } = useScreenWidth();
  const { isShowAd } = useDfpInitialize();

  const router = useRouter();
  const { deviceInfo } = useContext(SettingsContext);

  const sightRef = React.useRef<HTMLElement>();
  const fakeSightRef = React.useRef<HTMLElement>();
  const asideContentRef = React.useRef<HTMLDivElement>(null);
  const faqRef = React.useRef<HTMLElement>();

  const {
    line,
    scheme,
    type,
    current_stop,
    show_sight
  } = router.query;

  const isMobile = React.useMemo(() => deviceInfo.type === DeviceTypes.mobile, [deviceInfo.type]);
  const lineStopInfo = React.useMemo(() => {

    return {
      line: getStringFromQuery(line) ?? '',
      scheme: getStringFromQuery(scheme) ?? '',
      type: getStringFromQuery(type) ?? '',
      current_stop: getStringFromQuery(current_stop) ?? ''
    }
  }, [
    line,
    scheme,
    type,
    current_stop
  ]);

  const swapButtonDisabled = React.useMemo(() => {
    if (!lineInfo?.line_stops) return;
    const noBackDirection: boolean = lineInfo?.line_stops.every(stop => !stop.back_direction.stop_arrival_date) || false;
    const isCurrentFirst: boolean = lineInfo?.line_stops[0].current || lineInfo?.line_stops[lineInfo?.line_stops.length - 1].current || false;

    return noBackDirection || isCurrentFirst;
  }, [lineInfo?.line_stops]);

  const onSwapClick = () => {
    if (swapButtonDisabled) {
      return;
    }
    setIsReverse(!isReverse)
  }

  const crossBtnOnClick = () => {
    router.back()
  };

  const initialWidgetState = React.useMemo(() => {
    return getWidgetReducerInitState({
      initialDate: parse(props.initialWidgetProps.date, 'MM dd yyyy HH:mm', getNewDate()),
      initialDeparture: props.initialWidgetProps.departure,
      initialJourneyFrom: props.initialWidgetProps.stopFrom,
    });
  }, []);
  const [
    widgetState,
    widgetDispatch,
  ] = React.useReducer(widgetReducer, initialWidgetState);

  const metaInfo = React.useMemo(() => {
    const city = lineInfo?.departure_info?.city_name;
    const title = lineInfo?.departure_info?.stop_name;
    const state = lineInfo?.departure_info?.state_name;

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
  }, [lineInfo, t]);

  const {
    stopTitle,
    titleAppUrl,
    titleBrowserUrl
  } = React.useMemo(() => {
    if (!lineInfo?.line_stops) return {
      stopTitle: '',
      titleAppUrl: '',
      titleBrowserUrl: '',
    };

    const firstStop = lineInfo?.line_stops[0];
    const lastStop = lineInfo?.line_stops[lineInfo?.line_stops.length - 1];
    const currentEndStop = isReverse ? firstStop : lastStop;

    const { appUrl, browserUrl } = getStopUrl({
      city: getSlug(currentEndStop.city_name ?? ''),
      state: getSlug(currentEndStop.state_name ?? ''),
      stop: getSlug(currentEndStop.short_title)
    });

    return {
      stopTitle: currentEndStop.stop_name,
      titleAppUrl: appUrl,
      titleBrowserUrl: browserUrl
    };
  }, [isReverse, lineInfo?.line_stops]);

  const setSightRef = (elem: HTMLLIElement) => {
    sightRef.current = elem;
  };
  const setFakeSightRef = (elem: HTMLElement) => {
    fakeSightRef.current = elem;
  };

  const scrollTosightseeing = React.useCallback(() => {
    if (!sightRef.current || !fakeSightRef.current) return;
    fakeSightRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
    sightRef.current.click()
  }, [screenWidth]);

  const isDoneScroll = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (lineContent && lineInfo?.line_stops) {
      if (!show_sight || isDoneScroll.current) return;
      if (screenWidth && screenWidth < 1090) {
        // timeout is using for the time table render
        // and FAQ section will update its position 
        setTimeout(scrollTosightseeing, 0)
      } else {
        scrollTosightseeing()
      }
      isDoneScroll.current = true;
    }
  }, [
    lineContent,
    lineInfo?.line_stops,
    screenWidth
  ])

  React.useEffect(() => {

    const getLineData = async () => {
      const {
        scheme,
        type,
        line,
        current_stop,
        time,
        date,
        direction,
        userAgent
      } = router.query;
      const { dateParam, timeParam } = getRelevantTime({
        date: getStringFromQuery(date),
        time: getStringFromQuery(time)
      });

      try {
        widgetDispatch({ type: 'set_start_loading' });
        var [lineInfo, lineContent] = await getLinePage({
          type,
          scheme,
          name: line,
          date: dateParam,
          time: timeParam,
          current_stop,
          userAgent
        })

        const journeyFrom = createAutocompleteItem({
          title: lineInfo?.departure_info.stop_name ?? '',
          city: lineInfo?.departure_info.city_name,
          placeType: lineInfo.departure_info.place_type,
          stateName: lineInfo?.departure_info.state_name,
          stopId: lineInfo?.departure_info.stop_id,
          short_title: lineInfo?.departure_info.short_title
        });

        widgetDispatch({
          type: 'set_journey_from',
          journey: journeyFrom,
        });
        setLineInfo(lineInfo);
        lineContent = lineFaqBuilder(lineInfo, lineContent);
        setLineContent(lineContent);
      } catch (e) {
        console.log('Line page data fetching error >>', e)
        /*  widgetDispatch({ type: 'set_error', message: e.message }); */
      } finally {
        widgetDispatch({ type: 'set_stop_loading' });
      }
    }

    if (!props.isServer) {
      getLineData()
    }
  }, [])
  const isMobileSkeleton = widgetState.isLoading && isMobile;
  const isDesktopSkeleton = widgetState.isLoading && !isMobile;
  return (
    <>
      <Head>
        <title>{metaInfo.title}</title>
      </Head>
      <MetaInfo
        info={metaInfo.metas}
      />
      <StyledSubHeader>
        <Header />
        <Sticky top={0} innerZ={15}>
          <div className="widget">
            <BaseContentLayout>
              <LinePageWidget
                widgetState={widgetState}
                dispatch={widgetDispatch}
              />
            </BaseContentLayout>
          </div>
        </Sticky>

        <Sticky
          innerZ={10}
          top={-80}
        >
          <div className="line-page__sub-header">
            <BaseContentLayout>
              {widgetState.isLoading
                ? <>
                  <SkeletonLineHeader />
                  <LoadingLine />
                </>
                : (lineInfo &&
                  <DesktopHeader
                    transport={lineInfo.transfer_provider}
                    stopTitle={stopTitle}
                    line={lineInfo.line}
                    swapButtonDisabled={swapButtonDisabled}
                    onSwapClick={onSwapClick}
                    cityName={lineInfo.departure_info.city_name}
                    short_title={lineInfo.departure_info.short_title}
                    link={lineInfo.scheme}
                    lineColor={lineInfo.color}
                    lineTextColor={lineInfo.text_color}
                    titleAppUrl={titleAppUrl}
                    titleBrowserUrl={titleBrowserUrl}
                  />)
              }

            </BaseContentLayout>
          </div>
        </Sticky>

      </StyledSubHeader>
      <LinePageLayout>
        <CrossButton
          top={22}
          left={12}
          onClick={crossBtnOnClick}
        />
        <div className="line-page__content">
          <LineMap
            line={lineStopInfo.line}
            scheme={lineStopInfo.scheme}
            type={lineStopInfo.type}
            current_stop={lineStopInfo.current_stop}
            isReverse={isReverse}
          />
          {isMobileSkeleton && (
            <Sticky
              top={0}
              innerZ={15}
            >
              <SkeletonLineHeaderMobile />
            </Sticky>)
          }
          {widgetState.isLoading && <SkeletonLineStops />}
          {!isMobileSkeleton && (lineInfo &&
            <LinePage
              lineColor={lineInfo.color}
              lineTextColor={lineInfo.text_color}
              stopTitle={stopTitle}
              stopInfoResponse={lineInfo}
              isReverse={isReverse}
              swapButtonDisabled={swapButtonDisabled}
              onSwapClick={onSwapClick}
              sightClickHandler={scrollTosightseeing}
              titleAppUrl={titleAppUrl}
              titleBrowserUrl={titleBrowserUrl}
            />)
          }
        </div>
        <div className="line-page__additional-info">
          <div className="line-page__aside-content" >
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
            {/* {(deviceInfo.type === DeviceTypes.mobile) &&
              <NetworkSection
            plansInfo={plansInfoMocks} */}

            {lineContent &&
              <Faq
                type="line"
                faq={lineContent}
                className="line-page__faq"
                setSightRef={setSightRef}
                setFakeSightRef={setFakeSightRef}
                colorInfo={[{
                  color: lineInfo?.color ?? '',
                  line: lineInfo?.line ?? '',
                  text_color: lineInfo?.text_color ?? '',
                  transport: lineInfo?.transfer_provider ?? '' as TransportsTypes
                }]}
              />
            }
            {/* {(deviceInfo.type === DeviceTypes.mobile) &&
            <LinksSection links={links} />
          } */}
          </div>
        </div>
      </LinePageLayout>
      <Footer />
    </>
  )
}

const StyledSubHeader = styled.div`
  display: none;

  ${media.desktop} {
    display: block;
  }

  .widget {
    box-shadow: 0 1px 1px 0px ${props => props.theme.colorValues.lightestgrey};
    background-color: ${props => props.theme.colorValues.white};
    padding: 16px 0 8px 1px;
  }

  .line-page {

    &__sub-header {
      padding-top: 15px;
      ${props => props.theme.stickShadow};
      background-color: ${props => props.theme.colorValues.white};
    }

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

Line.getInitialProps = async (ctx: NextPageContext) => {
  const { query, req } = ctx;
  const namespacesRequired = ['common', 'search-widget', 'stoppage', 'faqcontent'];
  const isServer = !!req;

  const {
    scheme,
    type,
    line,
    current_stop,
    time,
    date,
    direction,
    userAgent
  } = query;

  const { dateParam, timeParam } = getRelevantTime({
    date: getStringFromQuery(date),
    time: getStringFromQuery(time)
  });
  if (!isServer) {
    try {
    } catch (err) {
      console.log('Line page data fetching error >>', err)
    };

    const initialWidgetProps = getWidgetInitialProps({
      stopFrom: {
        title: '',
        city: '',
        state: '',
        stop_id: ''
      },
      departure: direction,
      date: dateParam,
      time: timeParam,
    });
    return {
      namespacesRequired,
      initialWidgetProps,
      isServer
    };
  }

  try {
    var [lineInfo, lineContent] = await getLinePage({
      type,
      scheme,
      name: line,
      date: dateParam,
      time: timeParam,
      current_stop,
      userAgent
    })
    lineContent = lineFaqBuilder(lineInfo, lineContent);
  } catch (err) {
    console.log('Line page data fetching error >>', err)
  };

  const initialWidgetProps = getWidgetInitialProps({
    stopFrom: {
      title: lineInfo?.departure_info.stop_name ?? '',
      city: lineInfo?.departure_info.city_name,
      place_type: lineInfo?.departure_info.place_type,
      state: lineInfo?.departure_info.state_name,
      stop_id: lineInfo?.departure_info.stop_id
    },
    departure: direction,
    date: dateParam,
    time: timeParam,
  });
  return {
    namespacesRequired,
    initialWidgetProps,
    lineInfoProps: lineInfo,
    lineContentProps: lineContent,
    isServer
  };
}

export default Line;
