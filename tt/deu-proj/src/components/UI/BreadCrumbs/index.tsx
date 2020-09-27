import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../../../i18n';
import { SCHEMA_URL } from '../../../utils/constants';
import BreadCrumbLink from './BreadCrumbLink';
import KeyboardArrow from '../icons/KeyboardArrowRightLink';
import { StopLandingPlace } from '../../../models/stopLanding';

type Props = {
  placeInfo: StopLandingPlace,
  className?: string,
};

const BreadCrumbs: React.FC<Props> = (props) => {
  const { t } = useTranslation('common');

  const arrow = <KeyboardArrow
    className="bread-crumbs__arrow"
    width="5px"
    height="8px"
  />;

  const breadCrumbsPart = () => {
    if (props.placeInfo.type === 'city') {
      return (
        <>
          <span
            itemProp="itemListElement"
            itemScope
            itemType={`${SCHEMA_URL}/ListItem`}
          >
            <meta itemProp="name" content={props.placeInfo.state} />
            <meta itemProp="position" content="2" />
            <BreadCrumbLink endPoint='state' title={props.placeInfo.state} />
          </span>
          {arrow}
          <span
            itemProp="itemListElement"
            itemScope
            itemType={`${SCHEMA_URL}/ListItem`}
          >
            <meta itemProp="name" content={props.placeInfo.title} />
            <meta itemProp="position" content="3" />
            {props.placeInfo.title}
          </span>
        </>
      )
    };

    if (props.placeInfo.type === 'stop') {
      return (
        <>
          <span
            itemProp="itemListElement"
            itemScope
            itemType={`${SCHEMA_URL}/ListItem`}
          >
            <meta itemProp="name" content={props.placeInfo.city_name} />
            <meta itemProp="position" content="2" />
            <BreadCrumbLink endPoint='city' title={props.placeInfo.city_name} />
          </span>
          {arrow}
          <span
            itemProp="itemListElement"
            itemScope
            itemType={`${SCHEMA_URL}/ListItem`}
          >
            <meta itemProp="name" content={props.placeInfo.title} />
            <meta itemProp="position" content="3" />
            {props.placeInfo.title}
          </span>
        </>
      )
    };

    return (
      <>
        <span
          itemProp="itemListElement"
          itemScope
          itemType={`${SCHEMA_URL}/ListItem`}
        >
          <meta itemProp="name" content={props.placeInfo.title} />
          <meta itemProp="position" content="2" />
          {props.placeInfo.title}
        </span>
      </>
    )
  };


  return (
    <StyledWrapper
      className={props.className}
      itemScope
      itemType={`${SCHEMA_URL}/BreadcrumbList`}
    >
      <span
        itemProp="itemListElement"
        itemScope
        itemType={`${SCHEMA_URL}/ListItem`}
      >
        <meta itemProp="name" content={t('homepage')} />
        <meta itemProp="position" content="1" />
        <BreadCrumbLink endPoint='home' title={t('homepage')} />
      </span>
      {arrow}
      {breadCrumbsPart()}
    </StyledWrapper>
  )
};

const StyledWrapper = styled.h4`
  color: ${props => props.theme.colorValues.lightgrey};
  ${props => props.theme.typography.fnCaption};
  ${props => props.theme.typography.fnText};
  text-overflow: ellipsis; 
  overflow: hidden;
  white-space: nowrap;
  text-transform: capitalize;

  .bread-crumbs {

    &__arrow {
      margin: 0 5px;
      opacity: .3; 
    }
  }

`

export default BreadCrumbs;