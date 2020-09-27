import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import addHours from 'date-fns/addHours';
import subHours from 'date-fns/subHours';
import isAfter from 'date-fns/isAfter';
import isEqual from 'date-fns/isEqual';
import parse from 'date-fns/parse';
import { AdSlot } from 'react-dfp';

import media from '@utils/media';

import InnerStopItem from './InnerStopItem';
import NavigateButton from '@components/UI/NavigateButton';
import { AdPlaceholder } from '@components/UI/Placeholders';
import Skeleton from '@components/Skeleton';

import { InnerResponse } from '@models/journey';
import { LinesColorInfo } from '@models/stop';
import { DeviceInfo } from '@models/appSettings';

import { getNewDate } from '@utils/time/getNewDate';
import { useDfpInitialize } from '@utils/hooks/useDfpInitialize';
import { DeviceTypes, ADS_DESKTOP, MobileProps, ADS_MOBILE, DesktopProps } from '@utils/constants';
import viewPort from '@utils/viewPort';

import { SettingsContext } from '@contexts/Settings';

const adsMobile: MobileProps = {
  0: ADS_MOBILE.FG_Center2,
  4: ADS_MOBILE.FG_Center3,
  8: ADS_MOBILE.FG_Center4,
};

const adsDesktop: DesktopProps = {
  0: ADS_DESKTOP.FG_Header,
  3: ADS_DESKTOP.FG_Billboard,
  7: ADS_DESKTOP.FG_Billboard2,
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

type Props = {
  stops: InnerResponse[],
  currentDate: Date,
  colorInfo: LinesColorInfo[],
  setDate: (date: Date) => void,
  isLoading: boolean,
}

const InnerStopTable: React.FC<Props> = (props) => {
  const { stops = [], currentDate } = props;
  const { isShowAd } = useDfpInitialize();
  const { deviceInfo } = useContext(SettingsContext);
  const isMobile = React.useMemo(() => deviceInfo.type === DeviceTypes.mobile, [deviceInfo.type]);

  const nowDate: Date = React.useMemo(() => {
    return getNewDate();
  }, [props.stops]);

  const prevBtnHandler = (): void => {
    const prev = subHours(currentDate, 2);
    const curDate = getNewDate();
    const isValidTime =
      isAfter(prev, curDate)
      ||
      isEqual(prev, curDate);

    if (!isValidTime) return props.setDate(curDate);
    props.setDate(prev);
  };

  const nextBtnHandler = (): void => {
    const nextDay = addHours(currentDate, 2);
    props.setDate(nextDay);
  };

  return (
    <StyledWrapper
      isLoading={props.isLoading}
      isEmptyTable={!stops.length}
    >
      {props.isLoading
        ? (
          <Skeleton />
        ) : (
          <>
            <div
              className="inner-stop-table__header"
            >
              <NavigateButton
                title="button__prev"
                onClick={prevBtnHandler}
              />
            </div>
            <div className="inner-stop-table__stop-list">

              {
                stops.map((stop, index) => {
                  const adsProps: any = getAdsProps(deviceInfo, index);

                  return (
                    <React.Fragment key={`${index}_${stop.dep_offset}`}>
                      <InnerStopItem
                        currentDate={currentDate}
                        nowDate={nowDate}
                        responseStopInfo={stop}
                        colorInfo={props.colorInfo}
                      />
                      {isShowAd && adsProps && (
                        <AdTableWrapper
                          adUnit={adsProps.slotName}
                          sizes={adsProps.sizes}
                          sizeMapping={!isMobile
                            ?
                            [
                              { viewport: viewPort.desktop, sizes: [adsProps.sizes[1]] },
                              { viewport: viewPort.tablet[0], sizes: [adsProps.sizes[0]] },
                              { viewport: viewPort.tablet[1], sizes: [adsProps.sizes[1]] }
                            ]
                            : [
                              { viewport: viewPort.mobile, sizes: [adsProps.sizes[0], adsProps.sizes[1]] }
                            ]
                          }
                        />)
                      }
                    </React.Fragment>
                  )
                })

              }
            </div>
            <div
              className="inner-stop-table__footer"
            >
              <NavigateButton
                title="button__next"
                onClick={nextBtnHandler}
              />
            </div>
          </>
        )}
    </StyledWrapper>
  )
}

type StyledContainerProps = {
  isLoading: boolean,
  isEmptyTable: boolean,
}

const AdTableWrapper = styled(AdSlot)`
  .adBox {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid ${props => props.theme.colorValues.lightestgrey};
  }
`;

const StyledWrapper = styled.div<StyledContainerProps>`
  ${media.desktop} {
    border-top: 1px solid ${props => props.theme.colorValues.lightestgrey};
    border-bottom: 1px solid ${props => props.theme.colorValues.lightestgrey};
    border-radius: 8px;
  }
 
  ${media.ld} {
    border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  }

  .inner-stop-table {
    &__header,
    &__footer {
      
      :hover {
        background-color: ${props => props.theme.colorValues.aliceBlue};
      }
    }

    &__header {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    
    &__footer {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    &__stop-list {
      border-bottom: .5px solid ${props => props.theme.colorValues.lightestgrey};
      border-top: .5px solid ${props => props.theme.colorValues.lightestgrey};
      ${props => props.isLoading
    && css`
        min-height: 270px;
        position: relative;
          :before {
            content: '';
            position: absolute;
            min-height: 270px;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: ${props => props.theme.colorValues.white};
            z-index: 10;
        }`
  }

      ${props => props.isEmptyTable && css`
        padding-top: 300px;
        
        ${media.ld} {
          padding-top: 390px
        }
      `}
    }
  }
`;

export default InnerStopTable;