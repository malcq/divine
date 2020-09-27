import React, { useContext, useMemo } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { WithTranslation } from 'next-i18next';
import styled from 'styled-components';
import { AdSlot } from 'react-dfp';

import { withTranslation } from 'i18n';

// COMPONENTS IMPORT
import Header from '../components/Headers/HomepageHeader';
import {
  BaseContentLayout,
  BaseSection,
} from '../components/UI/Layouts';
import MetaInfo from '../components/UI/MetaInfo';
import AdditionalInfo from '../components/Homepage/AdditionalInfo';
import HeadlineLogo from '../components/Homepage/HeadlineLogo';
import FromToInfo from '../components/Homepage/FromToInfo';
import SearchWidget from '../components/SearchWidget/BigWidget';
import Benefits from '../components/Benefits';
import Footer from '../components/Footer';
import PlacesInfo from '../components/MainCities';

// API IMPORT
import { getPlaces } from '../api/homePage';

// MODELS IMPORT
import { PlacesResponse } from '../models/CityImage';

// UTILS IMPORT
import { homepageMeta } from '@utils/meta.constants';
import { useScrollToTopPage } from '@utils/hooks/useScrollToTopPage';
import { SearchWidgetSections, ADS_MOBILE, ADS_DESKTOP, DeviceTypes, AD_NETWORK_ID } from '@utils/constants';
import { useDfpInitialize } from '@utils/hooks/useDfpInitialize';
import media from '@utils/media';
import viewPort from '@utils/viewPort';

import { SettingsContext } from '@contexts/Settings';

const SearchBar = dynamic(() => import('@components/SearchWidget/BigWidget/Mobile/SearchBar'));

interface HomeProps extends WithTranslation {
  places?: PlacesResponse,
}

const Home: React.FC<HomeProps> = ({
  t,
  places
}) => {
  const { deviceInfo } = useContext(SettingsContext);
  const [widgetType, setWidgetType] = React.useState<SearchWidgetSections>(SearchWidgetSections.journey);
  useScrollToTopPage([]);
  const { isShowAd } = useDfpInitialize();

  const onWidgetSwitchHandler = (tab: SearchWidgetSections) => {
    setWidgetType(tab)
  };

  const isMobile = useMemo(() => deviceInfo.type === DeviceTypes.mobile, [deviceInfo.type]);

  const searchBarPosition = React.useMemo(() => {
    return widgetType === SearchWidgetSections.stops ? 500 : 611;
  }, [widgetType]);

  const moreBtnOptions: {
    cities: boolean,
    federalStates: boolean,
    europeStops: boolean,
    beautifulCities: boolean,
  } = React.useMemo(() => {
    if (!places) {
      return {
        cities: false,
        federalStates: false,
        europeStops: false,
        beautifulCities: false,
      }
    }
    if (deviceInfo.type === DeviceTypes.mobile) {
      return {
        cities: places.cities.stop_list.length > 10,
        federalStates: places.federal_states.stop_list.length > 10,
        europeStops: places.europe_stops.stop_list.length > 10,
        beautifulCities: places.beautiful_cities.stop_list.length > 10,
      }
    }
    return {
      cities: places.cities.stop_list.length > 20,
      federalStates: places.federal_states.stop_list.length > 20,
      europeStops: places.europe_stops.stop_list.length > 20,
      beautifulCities: places.beautiful_cities.stop_list.length > 20,
    }
  }, [places, deviceInfo]);

  return (
    <>
      <Head>
        <title>{t('home_page_title')}</title>
      </Head>
      <MetaInfo
        info={homepageMeta}
      />
      <Header />
      <BaseContentLayout>
        <HeadlineLogo />
        <SearchWidgetSection>
          <SearchWidget onTypeSwitch={onWidgetSwitchHandler} />
        </SearchWidgetSection>

       {/*  Ad slot 1 M/D */}
        {isShowAd &&
          <>
            {!isMobile ?
              (<AdSlot
                adUnit={ADS_DESKTOP.FG_Header.slotName}
                sizes={ADS_DESKTOP.FG_Header.sizes}
                sizeMapping={[
                  { viewport: viewPort.tablet[0], sizes: [ADS_DESKTOP.FG_Header.sizes[0]]},
                  { viewport: viewPort.tablet[1], sizes: [ADS_DESKTOP.FG_Header.sizes[1]]}
                ]}
              />)
              :
              (<AdSlot
                adUnit={ADS_MOBILE.FG_Center1.slotName}
                sizes={ADS_MOBILE.FG_Center1.sizes}
                sizeMapping={[
                  { viewport: viewPort.tablet, sizes: [ADS_MOBILE.FG_Center1.sizes[0], ADS_MOBILE.FG_Center1.sizes[1]]}
                ]}
              />)
            }
          </>
        }

        <FromToSection>
          <FromToInfo />
        </FromToSection>

        <PlacesInfo
          title={t('homepage:place-info__largest-cities-title')}
          subtitle={t('homepage:place-info__largest-cities-subtitle')}
          imagesForCities={places?.cities.slider}
          stationsList={places?.cities.stop_list}
          moreButton={moreBtnOptions.cities}
        />
        <SearchBar positionY={searchBarPosition} />
        {/* AD Slot 2 M/D */}
        {isShowAd &&
          <>
            {!isMobile
              ? (<AdSlot
                adUnit={ADS_DESKTOP.FG_Billboard.slotName}
                sizes={ADS_DESKTOP.FG_Billboard.sizes}
                sizeMapping={[
                  { viewport: viewPort.tablet[0], sizes: [ADS_DESKTOP.FG_Billboard.sizes[0]]},
                  { viewport: viewPort.tablet[1], sizes: [ADS_DESKTOP.FG_Billboard.sizes[1]]}
                ]}
              />)
              : (
              <AdSlot
                adUnit={ADS_MOBILE.FG_Center2.slotName}
                sizes={ADS_MOBILE.FG_Center2.sizes}
                sizeMapping={[
                  { viewport: viewPort.mobile, sizes: [ADS_MOBILE.FG_Center2.sizes[0], ADS_MOBILE.FG_Center2.sizes[1]]}
                ]}
              />)
            }
          </>
        }

        <BaseSection>
          <Benefits />
        </BaseSection>

        {/* AD slot 3 M */}
        {isShowAd && isMobile &&
          (
          <AdSlot
            adUnit={ADS_MOBILE.FG_Center3.slotName}
            sizes={ADS_MOBILE.FG_Center3.sizes}
            sizeMapping={[
              { viewport: viewPort.mobile, sizes: [ADS_MOBILE.FG_Center3.sizes[0], ADS_MOBILE.FG_Center3.sizes[1]]}
            ]}
          />)
        }

        <PlacesInfo
          title={t('homepage:place-info__federal-states-title')}
          subtitle={t('homepage:place-info__federal-states-subtitle')}
          imagesForCities={places?.federal_states.slider}
          stationsList={places?.federal_states.stop_list}
          moreButton={moreBtnOptions.federalStates}
          buttonTitle={t('homepage:station-info__show-all-states')}
        />

        {/* AD slot 3 D */}
        {isShowAd && !isMobile &&
          (<AdSlot
            adUnit={ADS_DESKTOP.FG_Billboard.slotName}
            sizes={ADS_DESKTOP.FG_Billboard.sizes}
            sizeMapping={[
              { viewport: viewPort.tablet[0], sizes: [ADS_DESKTOP.FG_Billboard.sizes[0]]},
              { viewport: viewPort.tablet[1], sizes: [ADS_DESKTOP.FG_Billboard.sizes[1]]}
            ]}
          />)
        }
        
        <PlacesInfo
          title={t('homepage:place-info__europe-stops-title')}
          subtitle={t('homepage:place-info__europe-stops-subtitle')}
          imagesForCities={places?.europe_stops.slider}
          stationsList={places?.europe_stops.stop_list}
          moreButton={moreBtnOptions.europeStops}
          buttonTitle={t('homepage:place-info__europe-stops-more-button')}
        />

        {/* AD slot 4 M */}
        {isShowAd && isMobile &&
          (<AdSlot
            adUnit={ADS_MOBILE.FG_Center4.slotName}
            sizes={ADS_MOBILE.FG_Center4.sizes}
            sizeMapping={[
              { viewport: viewPort.mobile, sizes: [ADS_MOBILE.FG_Center4.sizes[0], ADS_MOBILE.FG_Center4.sizes[1]]}
            ]}
          />)
        }

        <PlacesInfo
          title={t('homepage:place-info__beautiful-cities-title')}
          subtitle={t('homepage:place-info__beautiful-cities-subtitle')}
          imagesForCities={places?.beautiful_cities.slider}
          stationsList={places?.beautiful_cities.stop_list}
          moreButton={moreBtnOptions.beautifulCities}
          stationText={t('homepage:station-info__station--beautiful-cities')}
        />

        <BaseSection>
          <AdditionalInfo />
        </BaseSection>

      </BaseContentLayout>

      <Footer />
    </>
  );
}

const SearchWidgetSection = styled.section`
  padding-top: 14px;
  padding-bottom: 37px;

  ${media.desktop} {
    padding-top: 15px;
    padding-bottom: 65px;
  }
`;

const FromToSection = styled(BaseSection)`
  ${media.desktop} {
    display: none;
  }
`;

/**
 * Wrapping page into hocs
 */
const FinalPage: NextPage = withTranslation(['common', 'homepage'])(Home);

/**
 * Using wrapped page as final one and provide initialProps here
 */
FinalPage.getInitialProps = async (ctx) => {
  let places;
  const {
    userAgent
  } = ctx.query
  try {
    places = await getPlaces(userAgent);
  } catch (err) {
    console.log(err)
  }
  return {
    namespacesRequired: [
      'common',
      'benefits',
      'homepage',
      'search-widget',
    ],
    places
  };
}

export default FinalPage;
