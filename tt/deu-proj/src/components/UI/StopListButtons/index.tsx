import React from 'react';
import styled from 'styled-components';

import Button from "./buttons";
import { Link, useTranslation } from '../../../../i18n';
import { STATIC_URLS } from '../../../utils/constants';
import subDomainUrl from '../../../utils/subdomain.routes';
import media from '@utils/media';
import { SettingsContext } from '@contexts/Settings';
import { useScreenWidth } from '@utils/hooks/useScreenWidth';
import Ripple from '../Ripple';

type Props = typeof defaultProps & {
  line?: string,
  className?: string,
  buttonTicketOff?: boolean,
  buttonLineOff?: boolean,
  buttonSightOff?: boolean,
  buttonDirectionOff?: boolean,
  swapButtonDisabled?: boolean,
  directionBtnClick?: () => void,
  lineLinkAs?: string,
  lineLinkHref?: string,
  ticketLinkAs?: string,
  ticketLinkHref?: string,
  sightClickHandler?: () => void,
  scheme?: string,
  sightButtonAppUrl?: string,
  sightButtonBrowserUrl?: string,
};

const defaultProps = {
  lineLinkHref: '#',
  ticketLinkHref: '#',
};


function StopListButtons(props: Props) {
  const { t } = useTranslation('common');
  const { screenWidth } = useScreenWidth()

  const sightButton = React.useMemo(() => {
    if (props.sightButtonAppUrl && props.sightButtonBrowserUrl) {
      const isScrollTop = screenWidth && screenWidth < 1090;
      return (
        <Link
          href={props.sightButtonAppUrl}
          as={props.sightButtonBrowserUrl}
          scroll={!!isScrollTop}
        >
          <a>
            <Button
              img={`${STATIC_URLS.SVG}/star.svg`}
              title={t('button__sight')}
              className="stop-button__sight-btn"
              type="default"
            />
          </a>
        </Link>
      )
    }
    return (
      <Button
        img={`${STATIC_URLS.SVG}/star.svg`}
        title={t('button__sight')}
        onClick={props.sightClickHandler}
        className="stop-button__sight-btn"
        type="default"
      />
    )
  }, [
    props.sightButtonAppUrl,
    props.sightButtonBrowserUrl,
    props.sightClickHandler,
    screenWidth,
  ])

  return (
    <StyledWrapper className={props.className}>
      {!props.buttonTicketOff &&
        <Link
          as={props.ticketLinkAs}
          href={props.ticketLinkHref}
        >
          <a>
            <Button
              img={`${STATIC_URLS.SVG}/ticket.svg`}
              title={'Ticket'}
              className="stop-button__ticket-btn"
              type="primary"
            >
              <Ripple />
            </Button>
          </a>
        </Link>
      }
      {!props.buttonLineOff &&
        <Link
          as={props.lineLinkAs}
          href={props.lineLinkHref}
        >
          <a>
            {/* TODO: uncomment when subdomains will be setup */}
            {/* <a href={subDomainUrl({
           action: 'getUrl',
           path: props.lineLinkAs,
           scheme: props.scheme
         })}> */}
            <Button
              img={`${STATIC_URLS.SVG}/line-icon.svg`}
              title={t('button__line-title')}
              line={props.line}
              className="stop-button__line-btn"
              type="default"
            />
          </a>
        </Link>
      }
      {!props.buttonSightOff && sightButton}
      {!props.buttonDirectionOff &&

        <Button
          img={`${STATIC_URLS.SVG}/arrows-next-prev.svg`}
          title={t('button__change-direction')}
          onClick={props.directionBtnClick}
          className="stop-button__direction-btn"
          type={props.swapButtonDisabled ? "disabled" : "default"}
        />
      }
    </StyledWrapper>
  );
};

StopListButtons.defaultProps = defaultProps;

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
      display: none;
  }
  & > * {
    margin-right: 8px;
  }

  & > a {
    -webkit-tap-highlight-color: transparent;
  }

  .stop-button {
    &__ticket-btn {
      :active {
        background-color:${props => props.theme.colorValues.primaryHover};
      }
      ${media.desktop} {
        :hover {
          background-color:${props => props.theme.colorValues.primaryHover};
        }
      }
    }
    &__line-btn,
    &__sight-btn {
      user-select: none;
      :active {
        background-color: ${props => props.theme.colorValues.aliceBlue};
      }
      ${media.desktop} {
        :hover {
          background-color: ${props => props.theme.colorValues.aliceBlue};
        }
      }
    }
  }
`;
export default StopListButtons;