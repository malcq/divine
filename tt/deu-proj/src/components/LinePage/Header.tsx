import React from 'react';
import styled, { ThemeContext } from 'styled-components';

import { useTranslation, Link } from '../../../i18n';

import { TransportsTypes } from '../../models/transports';

import { STATIC_URLS } from '../../utils/constants';
import media from '../../utils/media';

import { Icon } from '../UI/Icon';
import TransportLabel from '../UI/Labels/TransportLabel';
import LineLabel from '../UI/Labels/LineLabel';
import { LineScheme } from '@models/linePageInfo';

interface Props {
  transport: TransportsTypes,
  stopTitle: string,
  line: string,
  link?: LineScheme,
  lineColor?: string,
  lineTextColor?: string
  swapButtonDisabled?: boolean,
  titleAppUrl: string,
  titleBrowserUrl: string,
  onSwapClick?: () => void,
}

const Header: React.FC<Props> = (props) => {
  const { colorValues } = React.useContext(ThemeContext);
  const isWhiteSpace = React.useMemo(() => {
    return !(props.link?.scheme_name_long && props.link.scheme_name_short)
  }, [props.link]);

  const { t } = useTranslation('common');

  return (
    <StyledContainer
      isWhiteSpace={isWhiteSpace}
    >
      {(props.line) &&
        <span className="sub-header__sub-title">
          {t('line__information-for')} {props.line.toUpperCase()}
        </span>
      }
      <div className="stop-item-header__content">
        <div className="stop-item-header__left-header">
          <TransportLabel
            transport={props.transport}
            className="stop-item-header__transport"
            isBig={true}
          />
          <LineLabel
            isBig={true}
            line={props.line}
            colorInfo={[{
              color: props.lineColor ?? '',
              text_color: props.lineTextColor ?? '',
              line: props.line,
              transport: props.transport
            }]}
            className="stop-item-header__line"
          />
          <h1 className="stop-item-header__title">
            <Link href={props.titleAppUrl} as={props.titleBrowserUrl}>
              <a>
                {props.stopTitle}
              </a>
            </Link>
          </h1>
        </div>

        <div className="stop-item-header__right-header">
          <Icon
            srcUrl={`${STATIC_URLS.SVG}/arrows-next-prev.svg`}
            color={props.swapButtonDisabled ? colorValues.greyCircle : colorValues.primary}
            width={15}
            height={15}
            className="stop-item-header__swap-button"
            onClick={props.onSwapClick}
          />
        </div>
      </div>
      {(props.link?.scheme_name_long && props.link.scheme_name_short) &&
        <p
          className="stop-item-header__provider-link"
        >
          {`${props.link.scheme_name_short} ${props.link.scheme_name_long}`}
        </p>
      }
    </StyledContainer>
  );
}

type StyledContainerProps = {
  isWhiteSpace?: boolean
}
const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: column;

  ${media.desktop} {
    padding-bottom: ${props => props.isWhiteSpace ? 33 : 0}px;
  }

  .sub-header {
    &__sub-title {
      display: block;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.lightgrey};

      padding: 18px 21px 8px 16px;

      ${media.desktop} {
        padding: 0px 0px 8px;
      }
    }
  }

  .stop-item-header {

    &__content {
      padding-top: 18px;
      padding-left: 16px;
      padding-right: 21px;
      padding-bottom: 8px;
      background-color: transparent;
      display: flex;
      align-items: center;
      min-height: 48px;

      ${media.desktop} {
        padding: 0;
      }
    }

    &__left-header,
    &__right-header {
      display: flex;
      align-items: center;
    }

    &__right-header {
      position: relative;

      ${media.desktop} {
        display: none;
      }
    }

    &__left-header {
      flex-grow: 1;
      overflow: hidden;
    }

    &__transport {
      margin-right: 4px;

      ${media.desktop} {
        margin-right: 5px;
      }
    }

    &__line {
      margin-right: 10px;

      ${media.desktop} {
        margin-right: 16px;
      }
    }

    &__title {
      color: ${props => props.theme.colorValues.grey};
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnTitle3};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      
      ${media.desktop} {
        ${props => props.theme.typography.fnRegular};
        ${props => props.theme.typography.fnTitle1};
      }

      & > a:hover {
        text-decoration: underline;
      }
    }

    &__swap-button {
      cursor: pointer;
    }

    &__provider-link {
      /* color: ${props => props.theme.colorValues.primary}; */
      /* cursor: pointer; */
      color: ${props => props.theme.colorValues.lightgrey};
      margin-top: 13px;
      width: max-content;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

`;

export default Header;