import React, { useContext, useMemo } from 'react';
import { AdSlot } from 'react-dfp';
import styled from 'styled-components';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { useTranslation } from '../../i18n';

import { getJourneyLandingData } from '../api/journeyLanding';

// COMPONENTS IMPORT
import Header from '../components/Headers/HomepageHeader';
import Footer from '../components/Footer';
import { JourneyLandingLayout } from '../components/UI/Layouts';
import SubHeader from '../components/JourneyLandingPage/SubHeader';
import ReiseWidget from '../components/SearchWidget/ReiseWidget';
import RouteList from '../components/JourneyLandingPage/RouteList';
import MetaInfo from '../components/UI/MetaInfo';
// import ErrorPage from '../components/UI/ErrorPage';

// MODELS IMPORT
import { AutocompleteItem } from '../models/autocomplete';
import { JourneyLandingExtended } from '../models/journeyLanding';

// UTILS IMPORTS
import { ADS_DESKTOP, ADS_MOBILE, DeviceTypes } from '@utils/constants';
import { createAutocompleteItem } from '@utils/factories';
import { journeyLandingPageMeta } from '@utils/meta.constants';
import { useScrollToTopPage } from '@utils/hooks/useScrollToTopPage';
import { useDfpInitialize } from '@utils/hooks/useDfpInitialize';
import media from '@utils/media';
import viewPort from '@utils/viewPort';

import { SettingsContext } from '../contexts/Settings';


const ErrorPage = dynamic(() => import('@components/UI/ErrorPage'));


interface LandingProps {
  cityName: string,
  initialAutocompleteTo: AutocompleteItem,
  responseData?: JourneyLandingExtended
}

const Landing: NextPage<LandingProps> = (props) => {
  const { deviceInfo } = useContext(SettingsContext);
  const isMobile = useMemo(() => deviceInfo.type === DeviceTypes.mobile, [deviceInfo.type]);
  const { isShowAd } = useDfpInitialize();

  if (!props.responseData) {
    return <ErrorPage />
  };

  const {
    arrival_info,
    bus_journey_text: {
      price: busPrice,
      city_name: busDepName
    },
    train_journey_text: {
      price: trainPrice,
      city_name: trainDepName
    },
    weather,
    bus_available_route,
    train_available_route
  } = props.responseData

  const { t } = useTranslation('journeypage')
  const pageTitle = React.useMemo((): string => {
    return t(`journey-landing__title`, { title: props.cityName });
  }, [t, props.cityName]);

  useScrollToTopPage([]);
  const city = React.useMemo(() => {
    return {
      city_name: arrival_info.city_name
    }
  }, [arrival_info.city_name])

  const topWidgetTexts = React.useMemo(() => {
    const price = (typeof trainPrice === 'number') ? (trainPrice / 100).toFixed(2) : '';
    const additionalInfo = {
      ...city,
      price: price.replace('.', ','),
      dep_name: trainDepName
    }
    return {
      subtitle: t('reise-widget__subtitle-a', city),
      description: t('reise-widget__description-a', additionalInfo),
    }
  }, [props.responseData.train_journey_text, city]);

  const bottomWidgetTexts = React.useMemo(() => {
    const price = (typeof busPrice === 'number') ? (busPrice / 100).toFixed(2) : '';
    const additionalInfo = {
      ...city,
      price: price.replace('.', ','),
      dep_name: busDepName
    }
    return {
      subtitle: t('reise-widget__subtitle-b', city),
      description: t('reise-widget__description-b', additionalInfo),
    }
  }, [props.responseData.bus_journey_text, city]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <MetaInfo
        info={journeyLandingPageMeta}
      />

      <Header />

      <JourneyLandingLayout>
        <div className="journey-landing__inner">

          <SubHeader
            cityName={arrival_info.city_name}
            weatherInfo={weather}
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
              {t('reise-widget__title-a', city)}
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
                    { viewport: viewPort.tablet[0], sizes: [ADS_DESKTOP.FG_Billboard.sizes[0]]},
                    { viewport: viewPort.tablet[1], sizes: [ADS_DESKTOP.FG_Billboard.sizes[1]]}
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
                    { viewport: viewPort.tablet[0], sizes: [ADS_DESKTOP.FG_Billboard.sizes[0]]},
                    { viewport: viewPort.tablet[1], sizes: [ADS_DESKTOP.FG_Billboard.sizes[1]]}
                  ]}
                />)
                : (<AdSlot
                  adUnit={ADS_MOBILE.FG_Center3.slotName}
                  sizes={ADS_MOBILE.FG_Center3.sizes}
                  sizeMapping={[
                    { viewport: viewPort.mobile, sizes: [ADS_MOBILE.FG_Center3.sizes[0], ADS_MOBILE.FG_Center3.sizes[1]]}
                  ]}
                />)
              }
            </>
          }

          {(bus_available_route.length > 0) &&
            <RouteList
              routes={bus_available_route}
              cityName={arrival_info.city_name}
              type="bus"
            />
          }
          {(train_available_route.length > 0) &&
            <RouteList
              type='train'
              routes={train_available_route}
              cityName={arrival_info.city_name}
            />}
        </div>
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

const AdWrapperCenter = styled(AdSlot)`
  .adBox {
    padding-top: 32px;
  }
`;


const AdWrapperHeader = styled(AdSlot)`
  .adBox {
    display: flex;
    justify-content: center;
    margin-top: 36px;
  }
`;

Landing.getInitialProps = async (ctx: NextPageContext) => {
  const {
    name,
    userAgent
  } = ctx.query;

  const nameStr = Array.isArray(name) ? name.join('_') : name;
  const cityName = nameStr[0].toLocaleUpperCase() + nameStr.slice(1);

  let response;

  try {
    response = await getJourneyLandingData({
      name,
      userAgent
    });

  } catch (e) {
    console.log('Journey landing fetching error', e.message);
  }

  const initialAutocompleteTo: AutocompleteItem = createAutocompleteItem({
    title: response?.arrival_info.title ?? '',
    city: response?.arrival_info.city_name,
    placeType: response?.arrival_info.type,
    stateName: response?.arrival_info.state,
    stopId: response?.arrival_info.stop_id
  })

  return {
    namespacesRequired: ['common', 'search-widget', 'journeypage'],
    cityName,
    initialAutocompleteTo,
    responseData: response
  };
}

export default Landing;