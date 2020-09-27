import React from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import { withTranslation } from '../../../../i18n';

import media from '../../../utils/media';

import { LinesItemResponse, AvailableFacilities, StopInfoResponse, LinesColorInfo } from '../../../models/stop';
import { TransportsTypes } from '../../../models/transports';
import { StopLandingPlace } from '../../../models/stopLanding';

import { StopInfoFilter } from '../../../reducers/stopPage/stopInfoReducer';

import { BaseContentLayout } from '../../UI/Layouts';
import BreadCrumbs from '../../UI/BreadCrumbs';

import LinkAndFacilities from './LinkAndFacilities';
import TransportsAndLines from './TransportsAndLines';

interface Props extends WithTranslation {
  stopInfo: StopInfoResponse,
  transports: TransportsTypes[],
  lines: LinesItemResponse[],
  stopInfoState: StopInfoFilter,
  lineColorInfo?: LinesColorInfo[],
  setTransportSelection: (
    transport: TransportsTypes,
    state: boolean,
    cb?: () => void
  ) => void;
  setLineSelection: (
    line: string,
    state: boolean,
    provider: TransportsTypes,
  ) => void;
  isAnimate: boolean;
}


const StopInfo: React.FC<Props> = ({
  t,
  transports,
  lines,
  setTransportSelection,
  setLineSelection,
  stopInfoState,
  stopInfo: {
    city,
    country,
    state,
    stop_id,
    stop_name: title,
    short_title,
    available_facilities,
    link_to_search_provider,
    scheme_info = [],
    scheme_name_long,
    scheme_name_short
  },
  lineColorInfo,
  isAnimate
}) => {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const placeInfo: StopLandingPlace = React.useMemo(() => {
    return {
      city_name: city,
      country_name: country,
      short_title: short_title,
      state,
      stop_id,
      title,
      type: 'stop',
    }
  }, [city, country, state, stop_id, title]);
  const [shouldAnimate, setShouldAnimate] = React.useState(false);
  
  React.useEffect(() => {
    if (boxRef.current) {
      const elem = boxRef.current;
      if (elem.getBoundingClientRect().top < 105 && isAnimate) {
        setShouldAnimate(true)
      }
    }
    if (!isAnimate) {
      setShouldAnimate(false)
    }
  }, [isAnimate])
  return (
    <StyledContainer isAnimate={shouldAnimate} ref={boxRef}>
      <BaseContentLayout>
        <BreadCrumbs
          placeInfo={placeInfo}
          className="stop-info__header"
        />
        <h1 className="stop-info__stop">
          <span className="stop-info__timetable">
            {t('timetable-for')}
          </span>
          {title}
        </h1>
        <LinkAndFacilities
          link_to_search_provider={link_to_search_provider}
          available_facilities={available_facilities}
          scheme_info={scheme_info}
        />

        <TransportsAndLines
          stopInfoState={stopInfoState}
          transports={transports}
          lines={lines}
          setTransportSelection={setTransportSelection}
          setLineSelection={setLineSelection}
          lineColorInfo={lineColorInfo}
        />
      </BaseContentLayout>

    </StyledContainer>
  )
};
type StylesProps = {
  isAnimate: boolean,
}
const StyledContainer = styled.section<StylesProps>`
  padding: ${props => props.isAnimate ? 78 : 12}px 0 8px;
  width: 100%;
  color: ${props => props.theme.colorValues.lightgrey};
  ${props => props.theme.stickShadow};
  background-color: ${props => props.theme.colorValues.white};
  transition: all 300ms cubic-bezier(0.8, 0, 0.6, 1) 0ms;
  ${media.desktop} {
    padding: 16px 11px;
    height: 235px;
  }

  ${media.ld} {
    padding: 16px 0;
  }
 
  .stop-info {
    &__header {
      margin-bottom: 29px;
      padding: 0 16px;

      ${media.desktop} {
        padding: 0;
        margin-bottom: 34px;
      }
    }

    &__timetable {
      display: block;
      color: ${props => props.theme.colorValues.lightgrey};
      ${props => props.theme.typography.fnBody};
      ${props => props.theme.typography.fnText};
      margin-bottom: 7px;

      ${media.desktop} {
        margin-bottom: 8px;
      }
    }

    &__stop {
      padding: 0 16px;
      margin-bottom: 8px;
      ${props => props.theme.typography.fnTitle1};
      ${props => props.theme.typography.fnRegular};
      color: ${props => props.theme.colorValues.grey};
      text-overflow: ellipsis; 
      overflow: hidden;
      white-space: nowrap;
      height: 55px;

      ${media.desktop} {
        padding: 0;
        margin-bottom: 10px;
        height: 65px;
      }
    }
  }
`;

export default withTranslation('stoppage')(StopInfo);
