import React, { useMemo } from 'react';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';

import { withTranslation } from 'i18n';
import { SCHEMA_URL } from '@utils/constants';
import media from '@utils/media';

interface FareItemProps extends WithTranslation {
  name: string,
  comfortClass?: number,
  priceInCents: number,
  link?: string,
  topTitle?: string,
  className?: string,
}
const FareItem: React.FC<FareItemProps> = ({
  t,
  name,
  comfortClass,
  priceInCents,
  topTitle,
  link = '',
  className = '',
}) => {
  const priceInEuro = useMemo(() => (priceInCents / 100).toString().replace('.', ','), [priceInCents]);
  const replacement = new RegExp(String.fromCharCode(160), 'g');
  const title = React.useMemo(() => {
    if (comfortClass) {
      return  `${comfortClass}. ${t('journeys__fare-class')}`
    }
    return topTitle ? topTitle : '';
  }, [comfortClass, t, topTitle]);
  const priceTitle = `${priceInEuro} €`;
  return (
    <Container
      href={link}
      target="_blank"
      itemScope
      itemType={`${SCHEMA_URL}/Ticket`}
      isPaddingTop={!!topTitle}
      className={className}
    >
      <meta itemProp="url" content={link} />
      {title &&
        <p
          className="fare-item__class"
          itemProp="ticketedSeat"
          itemScope
          itemType={`${SCHEMA_URL}/Seat`}
        >
          <span itemProp="seatingType">
            {title}
          </span>
        </p>
      }
      <p
        className="fare-item__name"
        itemProp="description"
      >
        {name.replace(replacement, ' ')}
      </p>
      <p className="fare-item__price">
        <meta itemProp="totalPrice" content={priceInEuro}/>
        <meta itemProp="priceCurrency" content="EUR"/>
        {priceTitle}
      </p>
      <p className="fare-item__choose">{t('journeys__fare-choose')}</p>
    </Container>
  );
};

type StylesProps = {
  isPaddingTop: boolean;
}
const Container = styled.a<StylesProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 12px 12px 35px 12px;
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  border-radius: 6px;
  width: 140px;
  min-width: 140px;
  height: 148px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  :active {
    .fare-item__choose {
      background-color: ${props => props.theme.colorValues.primaryHover};
    }
  }

  ${media.desktop} {
    :hover {
      .fare-item__choose {
        background-color: ${props => props.theme.colorValues.primaryHover};
      }
    }
  }
  
  & .fare-item {
    &__class {
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnCaption2};
      color: ${props => props.theme.colorValues.lightgrey};
    }

    &__name {
      flex-grow: 1;
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnTitle2};
      line-height: 20px;
      color: ${props => props.theme.colorValues.grey};
      margin-bottom: 8px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      padding-top: ${props => props.isPaddingTop ? 10 : 0}px;
    }

    &__price {
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnCaption3};
      color: ${props => props.theme.colorValues.grey};
      margin-bottom: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__choose {
      position: absolute;
      bottom: 0;
      left: 0;
      margin-left: -1px;
      margin-bottom: -1px;
      padding: 8px 0;
      text-align: center;
      width: 140px;
      height: 36px;
      border-radius: 0 0 6px 6px;
      background-color: ${props => props.theme.colorValues.primary};
      color: #fff;
      ${props => props.theme.typography.fnMedium};
      ${props => props.theme.typography.fnBody};
      line-height: 20px;
    }
  }
`;

export default withTranslation('common')(FareItem);