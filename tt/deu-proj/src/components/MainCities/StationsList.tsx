import React from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { withTranslation, Link } from 'i18n';

import media from '@utils/media';
import { DeviceTypes } from '@utils/constants';
import { getFederalUrl } from '@utils/router.util';

import KeyboardArrow from '../UI/icons/KeyboardArrowRightLink';
import MoreButton from './MoreButton';

import { SettingsContext } from '../../contexts/Settings';

import { DeviceInfo } from '../../models/appSettings';
import { StopPlace } from '../../models/CityImage';
import { STATIC_URLS } from '@utils/constants';
import { Icon } from '@components/UI/Icon';
import { colors } from '@theme/default/constants';
import CustomLink from '@components/UI/CustomLink';

interface StationsListProps extends WithTranslation {
  stationsList?: StopPlace[],
  moreButton?: boolean,
  buttonTitle?: string,
  stationText?: string,
}

const getCurrentStationsList = (
  isAllList: boolean,
  deviceInfo: DeviceInfo,
  stationsList: StopPlace[],
): StopPlace[] => {
  if (isAllList) {
    return stationsList;
  } else if (deviceInfo.type === DeviceTypes.mobile) {
    return (stationsList && stationsList.slice(0, 10));
  } else {
    return stationsList && stationsList.slice(0, 20);
  }
};

const StationsList: React.FC<StationsListProps> = ({
  t,
  stationsList,
  moreButton,
  buttonTitle,
  stationText
}) => {
  const { deviceInfo } = React.useContext(SettingsContext);

  const [
    isOpenedList,
    setisAllList,
  ] = React.useState(false);

  const currentStations = React.useMemo(() => {
    return getCurrentStationsList(isOpenedList, deviceInfo, stationsList ?? [])
  }, [isOpenedList, deviceInfo, stationsList])

  const currentAllList = () => {
    setisAllList(true)
  }

  return (
    <>
      <StyledList>
        {
          currentStations && currentStations.map((item, index) => (

            <li
              key={index}
              className="station__item"
              itemScope
              itemType="http://schema.org/Place"
            >
              {/* <Link
            {/* <Link
              href={item.link.appUrl}
              as={item.link.browserUrl}
            >
              <a
                className="station__link"
                itemProp="url"
                title={item.title}
              > */}

              <CustomLink
                className="station__link"
                itemProp="url"
                title={item.title}
                to={item.link.appUrl}
                as={item.link.browserUrl}
              >
                <p>{stationText ? stationText : t('station-info__station')}</p>
                <p
                  className="station__city"
                  itemProp="name"
                >
                  {item.title}
                  <Icon
                    className="station__arrow"
                    srcUrl={`${STATIC_URLS.SVG}/keyboard_arrow_left.svg`}
                    width={6}
                    height={8}
                    color={colors.grey}
                    opacity={.5}
                  />
                </p>
              </CustomLink>
              {/* </a>
            </Link> */}
            </li>
          ))
        }
      </StyledList>
      {moreButton && !isOpenedList && <MoreButton currentAllList={currentAllList} title={buttonTitle} />}
    </>
  )
}

const StyledList = styled.ul`
  padding: 0 16px;

  ${media.desktop} {
    margin-left: 2px;
    display: grid;
    grid-template-columns: repeat(5, calc(20% - 24px));
    grid-column-gap: 30px;
    padding: 0;
  }

  .station {
    &__item:not(:last-child) {
      margin-bottom: 8px;
    }

    &__item {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};
      white-space: nowrap;
    }
    
    &__city {
      color: ${props => props.theme.colorValues.grey};
      padding-left: 5px;
      max-height: 20px;
      text-overflow: ellipsis; 
      overflow: hidden;
      white-space: nowrap;
    }

    &__link {
      display: flex;
      ${media.desktop} {
        min-height: auto;
      }
    }

    &__arrow {
      margin-left: 8px;
      transform: rotate(180deg);
    }
  }
`;

export default withTranslation('homepage')(StationsList);
