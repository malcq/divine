import React, { useReducer, useMemo } from 'react';
import { AdSlot } from 'react-dfp';
import { NextRouter } from 'next/router';
import styled from 'styled-components';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { useTranslation } from '../../i18n';

import media from '../utils/media';
import { useScrollToTopPage } from '../utils/hooks/useScrollToTopPage';
import { ADS_DESKTOP, DeviceTypes, ADS_MOBILE } from '@utils/constants';
import { getStopLandingPageMeta } from '../utils/meta.constants';

import { SettingsContext } from '../contexts/Settings';

import { FederalPageLayout } from '@components/UI/Layouts';
import Header from '../components/Headers/HomepageHeader';
import InfoHeader from '../components/Federalpage/InfoHeader';
import Footer from '../components/Footer';
import StationList from '../components/Federalpage/StationList';
import MetaInfo from '../components/UI/MetaInfo';


import getStopLandingData from '../api/stopLanding';

import { StopLandingResponse } from '../models/stopLanding';
import { ErrorObj } from '../models/common';

import { stopLandingReducer, initStopLandingState } from '../reducers/stopLanding';
import SchemeSection from '@components/Federalpage/SchemeSection';
import serviceCompanies from '@api/mocks/federalstoplist';
import { getFilteredSchemeName } from '@utils/getFilteredSchemeName';
import { useSeparatedScroll } from '@utils/hooks/useSeparatedScroll';
import CustomBar from '@components/UI/CustomBar';
import { useDfpInitialize } from '@utils/hooks/useDfpInitialize';
import viewPort from '@utils/viewPort';

const SearchBar = dynamic(() => import('@components/SearchWidget/BigWidget/Mobile/SearchBar'));

interface FederalProps {
  headName: string,
  landingResponse?: StopLandingResponse,
  errObj: ErrorObj
}

const Federal: NextPage<FederalProps> = (props) => {

  const { deviceInfo } = React.useContext(SettingsContext);
  const initial = React.useRef(true);
  const asideContentRef = React.useRef<HTMLDivElement>(null);

  const isMobile = useMemo(() => deviceInfo.type === DeviceTypes.mobile, [deviceInfo.type]);
  const { isShowAd } = useDfpInitialize();
  const [stopState, stopDispatch] = useReducer(stopLandingReducer, initStopLandingState({
    response: props.landingResponse,
    error: props.errObj
  }));

  useScrollToTopPage([]);

  React.useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    if (props.landingResponse) {
      stopDispatch({
        type: 'set_clear_info',
        pagination: props.landingResponse.pagination,
        placeInfo: props.landingResponse.place_info,
        stopList: props.landingResponse.stop_list,
        availableSchemes: props.landingResponse.available_schemes,
        serviceCompanies: props.landingResponse.service_companies
      })
    }
    if (props.errObj.status) {
      stopDispatch({ type: 'set_error', message: props.errObj.message })
    }
  }, [props.landingResponse, props.errObj]);

  async function moreBtnHandler(router: NextRouter, page: number | null) {
    const {
      title,
      type
    } = router.query;
    if (page !== null) {
      stopDispatch({ type: 'set_start_loading' })
      try {
        const response = await getStopLandingData({
          name: title,
          type,
          page: page.toString(),
        });

        stopDispatch({
          type: 'set_info',
          pagination: response.pagination,
          placeInfo: response.place_info,
          stopList: response.stop_list
        })

      } catch (err) {
        console.log(err);
        stopDispatch({ type: 'set_error', message: err.message })
      } finally {
        stopDispatch({ type: 'set_stop_loading' })
      }
    }
  }
  const { t } = useTranslation('journeypage')
  useScrollToTopPage([]);

  // TODO: CHANGE DEPENDENCY TO REAL ONE
  const metas = React.useMemo(() => {
    const title = t(`journey-landing__title`, {
      title: props.headName
    });

    const metas = getStopLandingPageMeta({ title: props.headName });

    return {
      title,
      metas,
    }

  }, [props.headName, t]);

  const isCountryType = React.useMemo(() => {
    return stopState.placeInfo?.type === 'country'
  }, [stopState.placeInfo])

  return (
    <>
      <Head>
        <title>{metas.title}</title>
      </Head>
      <MetaInfo
        info={metas.metas}
      />

      {!isMobile &&
        <Header />
      }

      {isShowAd && isMobile && (
        <CenterAdWrapper
          adUnit={ADS_MOBILE.FG_Center1.slotName}
          sizes={ADS_MOBILE.FG_Center1.sizes}
          sizeMapping={[
            { viewport: viewPort.mobile, sizes: [ADS_MOBILE.FG_Center1.sizes[0], ADS_MOBILE.FG_Center1.sizes[1]] },
          ]}
        />
      )}
      {stopState?.placeInfo &&
        <InfoHeader
          placeInfo={stopState.placeInfo}
          cityName={stopState.placeInfo.title}
        />
      }

      <FederalPageLayout>
        <div className="widget">
          <SearchBar positionY={0} />
        </div>
        <div className="federal-page__content">
          <div className="federal-page__stations">
            {(stopState?.stopList && stopState?.pagination && stopState?.placeInfo) &&
              <StationList
                moreBtnHandler={moreBtnHandler}
                nextPage={stopState.pagination.nextPage}
                stopInfo={stopState.placeInfo}
                hasNextPage={stopState.pagination.hasNextPage}
                stopList={stopState?.stopList}
              />}
          </div>
          <div className="federal-page__aside">
              <div
                className="federal-page__aside-content"
              >
                {isShowAd && !isMobile && (
                  <SkyAdWrapper
                    adUnit={ADS_DESKTOP.FG_Sky.slotName}
                    sizes={ADS_DESKTOP.FG_Sky.sizes}
                    sizeMapping={[
                      { viewport: viewPort.desktop, sizes: [ADS_DESKTOP.FG_Sky.sizes[0]] },
                      { viewport: viewPort.tablet[1], sizes: [ADS_DESKTOP.FG_Sky.sizes[1]] }
                    ]}
                  />
                )}
                <div className="federal-page__scheme-section">
                  {!!stopState.availableSchemes?.length &&
                    <SchemeSection
                      schemes={stopState.availableSchemes}
                      place={stopState.placeInfo?.title ?? ''}
                    />
                  }
                </div>
                {!isCountryType &&
                  <div className="federal-page__sub-scheme-section">
                    {!!stopState.serviceCompanies?.length &&
                      stopState.serviceCompanies.map((item, idx) => {
                        const place = getFilteredSchemeName(item.scheme);
                        return (
                          <SchemeSection
                            key={idx}
                            schemes={item.sub_schemes}
                            place={place}
                          />
                        )
                      })
                    }
                  </div>
                }
              </div>
          </div>
        </div>
      </FederalPageLayout>
      <Footer />
    </>
  )
}

const CenterAdWrapper = styled(AdSlot)`
  .adBox {
    padding: 124px 20px 0 16px;
    display: flex;
    justify-content: center;
  }
`;

const SkyAdWrapper = styled(AdSlot)`
  .adBox {
    margin-bottom: 40px;
  }
`;

Federal.getInitialProps = async (ctx: NextPageContext) => {
  let headName = ctx.query.title ?? '';

  if (Array.isArray(headName)) {
    headName = headName.join('-');
  };

  const {
    title,
    type,
    userAgent
  } = ctx.query

  const errObj: ErrorObj = {
    status: false,
    message: '',
  };

  let landingResponse;
  try {
    landingResponse = await getStopLandingData({
      type,
      name: title,
      userAgent
    })
  } catch (err) {
    console.log('Initial data fetching err', err);
    errObj.status = true;
    errObj.message = err.message;
  }

  return {
    namespacesRequired: ['common', 'search-widget', 'journeypage'],
    landingResponse,
    headName,
    errObj
  };
}


export default Federal;
