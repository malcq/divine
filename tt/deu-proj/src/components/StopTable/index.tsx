import React, { useState, useEffect, useContext, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { AdSlot } from 'react-dfp';

import subHours from 'date-fns/subHours';
import addHours from 'date-fns/addHours';
import isAfter from 'date-fns/isAfter';
import isEqual from 'date-fns/isEqual';

import { SettingsContext } from '@contexts/Settings';

import { StopResponse, LinesColorInfo } from '@models/stop';
import { DeviceInfo } from '@models/appSettings';

import { StopInfoFilter } from '../../reducers/stopPage/stopInfoReducer';

import media from '@utils/media';
import { ADS_MOBILE, DeviceTypes, ADS_DESKTOP, DesktopProps, MobileProps } from '@utils/constants';
import { stopFilter } from '@utils/stopFilter';
import { getNewDate } from '@utils/time/getNewDate';
import { getRelativeTime } from '@utils/time/getRelativeTime';
import { useDfpInitialize } from '@utils/hooks/useDfpInitialize';

import StopItem from './StopItem';

import NavigateButton from '../UI/NavigateButton';
import viewPort from '@utils/viewPort';
import Skeleton from '@components/Skeleton';


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

interface Props {
  stops: StopResponse[],
  filterInfo: StopInfoFilter,
  currentDate: Date,
  lineColorInfo?: LinesColorInfo[],
  setDate: (date: Date) => void;
  isLoading: boolean;
  isShowSightseeingButton: boolean;
  selectedDate: Date;
};
const StopTable: React.FC<Props> = (props) => {
  const {
    filterInfo,
    currentDate,
    stops
  } = props;

  const [finalStops, setFinalStops] = useState<StopResponse[]>(stops);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const { deviceInfo } = useContext(SettingsContext);
  const isMobile = useMemo(() => deviceInfo.type === DeviceTypes.mobile, [deviceInfo.type]);
  const { isShowAd } = useDfpInitialize();
  const stopTableRef = React.useRef<HTMLDivElement>(null)

  const nowDate: Date = React.useMemo(() => {
    return getNewDate();
  }, [props.stops]);

  if (!props.stops) {
    return (
      <h1
        style={{ textAlign: 'center', marginTop: '50px' }}
      >
        Keine Einträge gefunden
      </h1>
    )
  };

  useEffect(() => {
    const filteredStops = stops.filter((item) => stopFilter(item.transport_info, filterInfo));
    setFinalStops(filteredStops);
  }, [stops, filterInfo]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [filterInfo, stops]);

  const prevBtnHandler = (): void => {
    const prevHour = subHours(currentDate, 1);
    const curDate = getNewDate();
    const isValidTime =
      isAfter(prevHour, curDate)
      ||
      isEqual(prevHour, curDate);
    if (!isValidTime) return props.setDate(curDate);
    props.setDate(prevHour);
  };

  const nextBtnHandler = (): void => {
    const nextHour = addHours(currentDate, 1);
    props.setDate(nextHour);
  }

  const swapButtonHandler = (id: string, opposite_id: string, time: string) => {
    if (!id || !opposite_id) return;
    const currentIdx = finalStops.findIndex((item) => item.stop_id === id && time === item.nearest_trip_time);
    const dateForCompare = isAfter(props.selectedDate, getNewDate()) ? props.selectedDate : getNewDate();
    const backIdx = finalStops.findIndex((item) => {
      const { isAfter: isTimeAfter } = getRelativeTime(dateForCompare, item.nearest_trip_time, 'Europe/Berlin');
      return item.stop_id === opposite_id && isTimeAfter
    });

    if (currentIdx === -1 || backIdx === -1) return;
    const tmpArr = finalStops.slice();
    tmpArr[currentIdx] = finalStops[backIdx];
    tmpArr[backIdx] = finalStops[currentIdx];
    setSelectedIdx(currentIdx);
    setFinalStops(tmpArr);
  }

  return (
    <StyledContainer isLoading={props.isLoading}>
      {props.isLoading
        ? (
          <Skeleton />
        ) : (
          <>
            <div
              className="stop-table__header"
            >
              <NavigateButton
                title="button__prev"
                onClick={prevBtnHandler}
              />
            </div>
            <div className="stop-table__stop-list" ref={stopTableRef}>
              {!finalStops.length
                ? <div className="stop-list--empty" />
                : finalStops.map((stop, index, arr) => {
                  const adsProps = getAdsProps(deviceInfo, index);
                  let isCardOpen = false;
                  if (selectedIdx === index) isCardOpen = true;

                  return (
                    <React.Fragment key={`${index}_${stop.nearest_trip_time}_${stop.stop_title}`}>
                      <StopItem
                        selectedDate={props.currentDate}
                        isCardOpen={isCardOpen}
                        onSwapHandler={swapButtonHandler}
                        scheme={stop.transport_info.scheme}
                        stop={stop}
                        nowDate={nowDate}
                        lineColorInfo={props.lineColorInfo}
                        isShowSightseeingButton={props.isShowSightseeingButton}
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
                              { viewport: viewPort.mobile, sizes: adsProps.sizes }
                            ]
                          }
                        />
                      )}
                    </React.Fragment>
                  )
                })
              }
            </div>
            <div
              className="stop-table__footer"
            >
              <NavigateButton
                title="button__next"
                onClick={nextBtnHandler}
              />
            </div>
          </>
        )
      }

    </StyledContainer>
  );
}

type StyledContainerProps = {
  isLoading: boolean,
}

const AdTableWrapper = styled(AdSlot)`
  .adBox {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid ${props => props.theme.colorValues.lightestgrey};
  }
`;

const StyledContainer = styled.div<StyledContainerProps>`
  border-bottom: 1px solid ${props => props.theme.colorValues.lightestgrey};
  ${media.desktop} {
    border-top: 1px solid rgba(0,0,0,0.12);
    border-radius: 5px;
  }
  ${media.ld} {
    max-width: 730px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colorValues.lightestgrey}; 
  }
  .stop-table {
    &__header,
    &__footer {
      :active {
        background-color: ${props => props.theme.colorValues.aliceBlue};
      }
      ${media.desktop} {
        height: 40px;

        :hover {
          background-color: ${props => props.theme.colorValues.aliceBlue};
        }
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
      border-bottom: 1px solid ${props => props.theme.colorValues.lightestgrey};
      border-top: 1px solid ${props => props.theme.colorValues.lightestgrey};
      ${props => props.isLoading
    && css`
        min-height: 270px;
        position: relative;
          :before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: ${props => props.theme.colorValues.white};
            z-index: 10;
          }`
  }
    }
  }

  .stop-list {

    &--empty {
      height: 150px;
      ${media.desktop} {
        height: 350px;
      }
    }
  }
`;

export default StopTable;