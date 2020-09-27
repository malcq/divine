import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import addHours from 'date-fns/addHours';
import subHours from 'date-fns/subHours';
import isAfter from 'date-fns/isAfter';
import isEqual from 'date-fns/isEqual';
import { AdSlot } from 'react-dfp';

import { PartsOfDay } from '@models/widget';
import { OuterResponse } from '@models/journey';

import OuterStopItem from './StopItem';

import { AdPlaceholder } from '@components/UI/Placeholders';
import NavigateButton from '@components/UI/NavigateButton';
import Skeleton from '@components/Skeleton';

import media from '@utils/media';
import journeyWidgetFilter from '@utils/journeyWidgetFilter';
import { getNewDate } from '@utils/time/getNewDate';
import { ProviderTypes, ADS_DESKTOP, DeviceTypes, ADS_MOBILE, MobileProps, DesktopProps } from '@utils/constants';
import { useDfpInitialize } from '@utils/hooks/useDfpInitialize';
import viewPort from '@utils/viewPort';

import { LinesColorInfo } from '@models/stop';
import { DeviceInfo } from '@models/appSettings';

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
  stops: OuterResponse[],
  changeovers: string,
  price: string,
  isLoading: boolean,
  dayPart: PartsOfDay, // maybe should be enum
  currentDate: Date,
  colorInfo: LinesColorInfo[],
  selectedFilter: ProviderTypes | null,
  setDate: (date: Date) => void,
}

const OuterStopTable: React.FC<Props> = (props) => {
  const { stops, currentDate } = props;
  const { isShowAd } = useDfpInitialize();
  const { deviceInfo } = useContext(SettingsContext);
  const isMobile = React.useMemo(() => deviceInfo.type === DeviceTypes.mobile, [deviceInfo.type]);

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
    const next = addHours(currentDate, 2);
    props.setDate(next);
  };

  // filter by price, changeovers, parts of day
  const filteredStops: OuterResponse[] = React.useMemo(() => {
    let filteredByOptions = journeyWidgetFilter({
      changeovers: props.changeovers,
      dayPart: props.dayPart,
      price: props.price,
      stops
    })
    if (props.selectedFilter) {
      filteredByOptions = filteredByOptions.filter((item) => {
        return item.provider === props.selectedFilter
      });
    }
    return filteredByOptions;
  }, [props.changeovers, stops, props.price, props.dayPart, props.selectedFilter])

  return (
    <StyledWrapper isLoading={props.isLoading}>
      {props.isLoading
        ? (
          <Skeleton />
        ) : (
          <>

            <div
              className="outer-stop-table__header"
            >
              <NavigateButton
                title="button__prev"
                onClick={prevBtnHandler}
              />
            </div>
            <div className="outer-stop-table__stop-list">
              {
                filteredStops.map((stop, index) => {
                  const adsProps: any = getAdsProps(deviceInfo, index);
                  return (
                    <React.Fragment key={index}>
                      <OuterStopItem
                        key={`${index}_${stop.arr_offset}`}
                        stopInfo={stop}
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
                            ]}
                        />)}
                    </React.Fragment>
                  )
                })
              }
            </div>
            <div
              className="outer-stop-table__footer"
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

  .outer-stop-table {

    &__header,
    &__footer {
      :active {
        background-color: ${props => props.theme.colorValues.aliceBlue};
      }

      ${media.desktop} {
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
          z-index: 1;
        }`
  }
    }

    &__result-title {
      text-align: center;
      margin: 125px 0;
    }
  }
`;

export default OuterStopTable;