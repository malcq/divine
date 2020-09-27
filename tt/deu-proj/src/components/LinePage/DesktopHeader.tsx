import React from 'react';
import styled from 'styled-components';

import { useTranslation } from '../../../i18n';

import { TransportsTypes } from '../../models/transports';
import { StopLandingPlace } from '../../models/stopLanding';
import { LineScheme } from '@models/linePageInfo';

import Header from './Header';
import StopListButtons from '../UI/StopListButtons';
import BreadCrumbs from '../UI/BreadCrumbs';

type Props = {
  transport: TransportsTypes,
  stopTitle: string,
  short_title: string,
  line: string,
  cityName: string,
  link?: LineScheme,
  lineColor: string,
  lineTextColor: string,
  swapButtonDisabled?: boolean,
  titleAppUrl: string,
  titleBrowserUrl: string,
  onSwapClick: () => void,
};

const DesktopHeader: React.FC<Props> = (props) => {

  const { t } = useTranslation('common');

  const placeInfo: StopLandingPlace = React.useMemo(() => {
    return {
      city_name: props.cityName,
      short_title: props.short_title,
      country_name: '',
      state: '',
      stop_id: '',
      title: `${t('button__line-title')} ${props.line.toUpperCase()}`,
      type: 'stop'
    }
  }, [props.line, props.cityName])
  return (
    <StyledWrapper isLine={!!props.line}>
      <div className="sub-header__additional-info">
        <BreadCrumbs
          placeInfo={placeInfo}
        />
      </div>
      <Header
        transport={props.transport}
        stopTitle={props.stopTitle}
        line={props.line}
        link={props.link}
        lineColor={props.lineColor}
        lineTextColor={props.lineTextColor}
        titleAppUrl={props.titleAppUrl}
        titleBrowserUrl={props.titleBrowserUrl}
      />
      <StopListButtons
        buttonLineOff
        buttonSightOff
        buttonTicketOff
        swapButtonDisabled={props.swapButtonDisabled}
        directionBtnClick={props.onSwapClick}
        className="sub-header__buttons"
      />
    </StyledWrapper>
  )
};

type StylesProps = {
  isLine?: Boolean
};

const StyledWrapper = styled.div<StylesProps>`
  padding-bottom: 17px;

  .sub-header {
    
    &__buttons {
      margin-top: 19px; 
    }

    &__additional-info {
      margin-bottom: ${props => props.isLine ? '34px' : '62px'};
    }
  }
`;

export default DesktopHeader;