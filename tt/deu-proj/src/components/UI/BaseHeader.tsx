import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import classNames from 'classnames';

import * as routerFactory from '../../utils/router.util';
import {
  STATIC_URLS, DeviceTypes, SCHEMA_URL, BASE_URL,
} from '../../utils/constants';
import media from '../../utils/media';

import { Icon } from './Icon';
import MenuButton from './MenuButton';
import { SettingsContext } from '../../contexts/Settings';

type Props = {
  className?: string,
}
const BaseHeader: React.FC<Props> = (props) => {
  const homeRoutes = routerFactory.HOME_URL;
  const { className } = props;

  const { deviceInfo } = useContext(SettingsContext);

  const containerClass = classNames("header__container", className);

  const logoSize = useMemo(() => {
    if (deviceInfo.type === DeviceTypes.mobile) {
      return {
        width: 130,
        height: 24
      }
    }
    return {
      width: 159,
      height: 30
    }
  }, [deviceInfo]);

  return (
    <Container
      className={containerClass}
      itemScope
      itemType={`${SCHEMA_URL}/Organization`}
    >
      <meta itemProp="url" content={BASE_URL} />
      <div className="header__logo-container">
        <Link
          href={homeRoutes.appUrl}
          as={homeRoutes.browserUrl}
        >
          <a className="header__link">
            <meta itemProp="logo" content={`${BASE_URL}${STATIC_URLS.SVG}/main-logotype.svg`} />
            <meta itemProp="name" content="fahrplan.guru" />
            <Icon
              srcUrl={`${STATIC_URLS.SVG}/main-logotype.svg`}
              width={logoSize.width}
              height={logoSize.height}
              className="header__logo"
            />
          </a>
        </Link>
      </div>
      <div className="header__right-side-container">
        <div className="header__partner-container ">
          <img
            className="header__partner"
            src={`${STATIC_URLS.IMAGES}/partner_2x.png`}
            alt="Partner von Marco Polo"
          />
        </div>
        {/* <MenuButton className="header__menu-button" /> */}
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: ${props => props.theme.gridValues.maxContentWidth + 1}px;
  margin: 0;
  padding: 16px 16px 16px 17px;

  ${media.desktop} {
    padding: 20px 0;
  }

  .header {
    &__link {
      display: flex;
    }

    &__right-side-container {
      display: flex;
      flex-direction: row;
    }

    &__partner-container {
      /* margin: 2px 16px 0 0; */
      margin: 2px 0 0 0;
      width: 68px;
      height: 20px;
      
      ${media.desktop} {
        margin-top: 4px;
      }
    }

    &__partner {
      width: 100%;
    }

    &__menu-button {
      ${media.desktop} {
        margin-top: 2px;
      }
    } 
  }
`;

export default BaseHeader;