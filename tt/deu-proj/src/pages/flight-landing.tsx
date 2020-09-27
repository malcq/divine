import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { AdSlot } from 'react-dfp';

import { useTranslation } from '../../i18n';

import { getJourneyLandingData } from '../api/journeyLanding';

// COMPONENTS IMPORT
import Header from '../components/Headers/HomepageHeader';
import Footer from '../components/Footer';
import { JourneyLandingLayout } from '../components/UI/Layouts';
import SubHeader from '../components/JourneyLandingPage/SubHeader';
import ReiseWidget from '../components/SearchWidget/ReiseWidget';
import RouteList from '../components/JourneyLandingPage/RouteList';
import { AdPlaceholder } from '../components/UI/Placeholders';
import MetaInfo from '../components/UI/MetaInfo';

// MODELS IMPORT
import { AutocompleteItem } from '../models/autocomplete';

// UTILS IMPORTS
import { createAutocompleteItem } from '../utils/factories';
import media from '../utils/media';
import { journeyLandingPageMeta } from '../utils/meta.constants';
import { useScrollToTopPage } from '../utils/hooks/useScrollToTopPage';
import { JourneyLandingExtended } from '../models/journeyLanding';
import ErrorPage from '@components/UI/ErrorPage';
import { useDfpInitialize } from '@utils/hooks/useDfpInitialize';
import { SettingsContext } from '@contexts/Settings';
import { DeviceTypes, ADS_DESKTOP, ADS_MOBILE } from '@utils/constants';
import viewPort from '@utils/viewPort';

interface Props {
  cityName: string,
  airportName: string,
  responseData?: JourneyLandingExtended,
  initialAutocompleteTo: AutocompleteItem,
}

const FlightLanding: NextPage<Props> = (props) => {

  const { deviceInfo } = useContext(SettingsContext);
  const isMobile = useMemo(() => deviceInfo.type === DeviceTypes.mobile, [deviceInfo.type]);
  const { isShowAd } = useDfpInitialize();

  if (!props.responseData) {
    return <ErrorPage />
  };

  const {
    arrival_info,
    weather,
    bus_available_route,
    train_available_route,
    bus_journey_text: {
      price: busPrice,
      city_name: busDepName
    },
    train_journey_text: {
      price: trainPrice,
      city_name: trainDepName
    },
  } = props.responseData

  const { t } = useTranslation('journeypage')

  const widgetLocaleContext = React.useMemo(() => {
    return {
      city_name: `${props.cityName} ${props.airportName}`
    }
  }, [props.cityName]);

  useScrollToTopPage([]);

  const topWidgetTexts = React.useMemo(() => {
    const price = (typeof trainPrice === 'number') ? (trainPrice / 100).toFixed(2) : '';
    const additionalInfo = {
      ...widgetLocaleContext,
      price: price.replace('.', ','),
      dep_name: trainDepName
    }
    return {
      subtitle: t('reise-widget__subtitle-a', widgetLocaleContext),
      description: t('reise-widget__description-a', additionalInfo),
    }
  }, [t, widgetLocaleContext, props.responseData.train_journey_text]);

  const bottomWidgetTexts = React.useMemo(() => {
    const price = (typeof busPrice === 'number') ? (busPrice / 100).toFixed(2) : '';
    const additionalInfo = {
      ...widgetLocaleContext,
      price: price.replace('.', ','),
      dep_name: trainDepName
    }
    return {
      subtitle: t('reise-widget__subtitle-b', widgetLocaleContext),
      description: t('reise-widget__description-b', additionalInfo),
    }
  }, [t, widgetLocaleContext, props.responseData.bus_journey_text]);

  return (
    <>
      <Head>
        <title>Reise nach {props.cityName} {props.airportName} mit Bus oder Bahn</title>
      </Head>
      <MetaInfo
        info={journeyLandingPageMeta}
      />

      <Header />
      <JourneyLandingLayout>

        <SubHeader
          cityName={arrival_info.city_name}
          weatherInfo={weather}
          airportName={props.airportName}
          type='flight'
        />
        {isShowAd &&
          <>
            {!isMobile ?
              (<AdWrapperHeader
                adUnit={ADS_DESKTOP.FG_Header.slotName}
                sizes={ADS_DESKTOP.FG_Header.sizes}
                sizeMapping={[
                  { viewport: [1075, 768], sizes: [ADS_DESKTOP.FG_Header.sizes[0]] },
                  { viewport: [705, 480], sizes: [ADS_DESKTOP.FG_Header.sizes[1]] }
                ]}
              />)
              :
              (<AdWrapperCenter
                adUnit={ADS_MOBILE.FG_Center1.slotName}
                sizes={ADS_MOBILE.FG_Center1.sizes}
                sizeMapping={[
                  { viewport: [705, 480], sizes: [ADS_MOBILE.FG_Center1.sizes[0], ADS_MOBILE.FG_Center1.sizes[1]] }
                ]}
              />)
            }
          </>
        }
        <ReiseContainer>
          <h2 className="journey-landing__reise-title">
            {t('reise-widget__title-a', widgetLocaleContext)}
          </h2>
          <ReiseWidget
            initialJounrneyTo={props.initialAutocompleteTo}
            icon="train"
            subtitle={topWidgetTexts.subtitle}
            description={topWidgetTexts.description}
          />

        </ReiseContainer>
        {isShowAd &&
          <>
            {!isMobile
              ?
              (<AdSlot
                adUnit={ADS_DESKTOP.FG_Billboard.slotName}
                sizes={ADS_DESKTOP.FG_Billboard.sizes}
                sizeMapping={[
                  { viewport: viewPort.desktop, sizes: [ADS_DESKTOP.FG_Billboard.sizes[0]] },
                  { viewport: viewPort.tablet, sizes: [ADS_DESKTOP.FG_Billboard.sizes[1]] }
                ]}
              />)
              :
              (<AdSlot
                adUnit={ADS_MOBILE.FG_Center2.slotName}
                sizes={ADS_MOBILE.FG_Center2.sizes}
                sizeMapping={[
                  { viewport: viewPort.mobile, sizes: [ADS_MOBILE.FG_Center2.sizes[0], ADS_MOBILE.FG_Center2.sizes[1]] }
                ]}
              />)
            }
          </>
        }
        <ReiseContainer>
          <ReiseWidget
            initialJounrneyTo={props.initialAutocompleteTo}
            icon="bus"
            subtitle={bottomWidgetTexts.subtitle}
            description={bottomWidgetTexts.description}
          />
        </ReiseContainer>
        {isShowAd &&
          <>
            {!isMobile
              ?
              (<AdSlot
                adUnit={ADS_DESKTOP.FG_Billboard.slotName}
                sizes={ADS_DESKTOP.FG_Billboard.sizes}
                sizeMapping={[
                  { viewport: viewPort.desktop, sizes: [ADS_DESKTOP.FG_Billboard.sizes[0]] },
                  { viewport: viewPort.tablet, sizes: [ADS_DESKTOP.FG_Billboard.sizes[1]] }
                ]}
              />)
              : (<AdSlot
                adUnit={ADS_MOBILE.FG_Center3.slotName}
                sizes={ADS_MOBILE.FG_Center3.sizes}
                sizeMapping={[
                  { viewport: viewPort.tablet, sizes: [ADS_MOBILE.FG_Center3.sizes[0], ADS_MOBILE.FG_Center3.sizes[1]] }
                ]}
              />)
            }
          </>
        }
        {(bus_available_route.length > 0) &&
          <RouteList
            routes={bus_available_route}
            cityName={arrival_info.city_name}
            airportName={props.airportName}
            type="bus"
          />
        }
        {(train_available_route.length > 0) &&
          <RouteList
            type='train'
            routes={train_available_route}
            cityName={arrival_info.city_name}
            airportName={props.airportName}
          />
        }
      </JourneyLandingLayout>
      <Footer />
    </>
  )
};

const ReiseContainer = styled.div`
  padding: 32px 16px;

  ${media.desktop} {
    padding: 56px 0;
  } 
`;

const AdWrapperHeader = styled(AdSlot)`
  .adBox {
    display: flex;
    justify-content: center;
    margin-top: 36px;
  }
`;

const AdWrapperCenter = styled(AdSlot)`
  .adBox {
    padding-top: 32px;
  }
`;

FlightLanding.getInitialProps = async (ctx: NextPageContext) => {
  const {
    name,
    airport,
    userAgent
  } = ctx.query


  const nameStr = Array.isArray(name) ? name.join('_') : name;
  const airportStr = Array.isArray(airport) ? airport.join('_') : airport;
  const airportName = airportStr[0].toLocaleUpperCase() + airportStr.slice(1);
  const cityName = nameStr[0].toLocaleUpperCase() + nameStr.slice(1);

  let response;

  try {
    response = await getJourneyLandingData({
      name: nameStr[0].toLocaleUpperCase() + nameStr.slice(1),
      userAgent
    });

  } catch (e) {
    console.log('Journey landing fetching error', e.message);
  }

  const initialAutocompleteTo: AutocompleteItem = createAutocompleteItem({
    title: `${cityName} ${airportName}`
  })

  return {
    namespacesRequired: ['common', 'search-widget', 'journeypage'],
    cityName,
    airportName,
    responseData: response,
    initialAutocompleteTo,
  };
}

export default FlightLanding;