import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { useRouter, NextRouter } from 'next/router';
import { AdSlot } from 'react-dfp';

import { Link } from 'i18n';

import Station from './Station';

import NavigateButton from '../../UI/NavigateButton';

import media from '@utils/media';
import { ADS_DESKTOP, ADS_MOBILE, DeviceTypes, DesktopProps, MobileProps, SCHEMA_URL } from '@utils/constants';

import { DeviceInfo } from '@models/appSettings';
import { StopLandingList, StopLandingPlace } from '@models/stopLanding';
import { useDfpInitialize } from '@utils/hooks/useDfpInitialize';

import { SettingsContext } from '@contexts/Settings';
import viewPort from '@utils/viewPort';

type Props = {
  stopList: StopLandingList[],
  hasNextPage: boolean,
  nextPage: number | null,
  stopInfo: StopLandingPlace,
  moreBtnHandler: (router: NextRouter, page: number | null) => void
};

// const adsIndexes = [1];

const adsMobile: MobileProps = {
  /* 0: ADS.FG_Center1, */
  2: ADS_MOBILE.FG_Center2,
  7: ADS_MOBILE.FG_Center3,
  12: ADS_MOBILE.FG_Center4,
};

const adsDesktop: DesktopProps = {
  2: ADS_DESKTOP.FG_Header,
  8: ADS_DESKTOP.FG_Billboard,
  15: ADS_DESKTOP.FG_Billboard2,
};

function getAdsProps(deviceInfo: DeviceInfo, index?: number) {
  if (index === undefined) { return undefined; }
  const isMobile = deviceInfo.type === DeviceTypes.mobile;
  const fieldName: string = `${index}`;

  if (isMobile) {
    return adsMobile[fieldName];
  }

  return adsDesktop[fieldName];
}

const StationList: React.FC<Props> = (props) => {
  const { deviceInfo } = useContext(SettingsContext);
  const { isShowAd } = useDfpInitialize();
  const router = useRouter();
  const isMobile = useMemo(() => deviceInfo.type === DeviceTypes.mobile, [deviceInfo.type]);

  return (
    <StyledWrapper
      itemScope
      itemType={`${SCHEMA_URL}/Trip`}
    >
      {
        props.stopList.map((stop, index, arr) => {
          const adsProps: any = getAdsProps(deviceInfo, index);

          return (
            <React.Fragment key={index}>
              <li>
                <Link href={stop.url.appUrl} as={stop.url.browserUrl}>
                  <a>
                    <Station
                      key={index}
                      station={stop.departure_info.title}
                      providers={stop.available_provider}
                    />
                  </a>
                </Link>
              </li>
              {isShowAd && adsProps && (
                <AdTableWrapper
                  adUnit={adsProps.slotName}
                  sizes={adsProps.sizes}
                  sizeMapping={!isMobile
                    ? 
                      [
                        {viewport: viewPort.desktop, sizes: [adsProps.sizes[1]]},
                        {viewport: viewPort.tablet[0], sizes: [adsProps.sizes[0]]},
                        {viewport: viewPort.tablet[1], sizes: [adsProps.sizes[1]]}
                      ]
                    : [
                        {viewport: viewPort.mobile, sizes: [adsProps.sizes[0], adsProps.sizes[1]]}
                      ]
                  }
                />)
              }
            </React.Fragment>
          )
        })
      }
      {props.hasNextPage &&
        <NavigateButton
          title='federal__show-more'
          onClick={() => props.moreBtnHandler(router, props.nextPage)}
        />}
    </StyledWrapper>
  )
};

const AdTableWrapper = styled(AdSlot)`
  .adBox {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid ${props => props.theme.colorValues.lightestgrey};
  }
`;

const StyledWrapper = styled.ul`
  border-top: .5px solid ${props => props.theme.colorValues.lightestgrey};
  border-bottom: .5px solid ${props => props.theme.colorValues.lightestgrey};
  margin-bottom: 40px;

  ${media.desktop} {
    margin-bottom: 0;
    border: .5px solid ${props => props.theme.colorValues.lightestgrey};
    border-radius: 8px;
    overflow: hidden;
  }

  .station-list {
    ${media.ld} {
      border-radius: 8px;
      border: .5px solid ${props => props.theme.colorValues.lightestgrey};
    }
  }
`;

export default StationList;