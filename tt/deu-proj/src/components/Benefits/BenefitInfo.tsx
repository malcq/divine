import React from 'react';
import styled from 'styled-components';

import { STATIC_URLS } from '@utils/constants';
import LogosSprite from '@components/UI/LogosSprite';

type Props = {
  title: string,
  iconSrc: string,
  text: string,
  baseColor: string,
  sprite: {
    backgroundPosition: string,
    backgroundSize: string,
  }
}
const BenefitInfo: React.FC<Props> = (props) => {
  const {
    iconSrc,
    text,
    title,
    baseColor,
    sprite,
  } = props;

  return (
    <StyledContainer
      iconBaseColor={baseColor}
      itemScope
      itemType="http://schema.org/Service"
    >
      <meta itemProp="serviceType" content="Transportation" />
      <div className="benefit-info__header">
        <div className="benefit-info__icon">
          <LogosSprite sprite={sprite} />
        </div>
        <h3
          className="benefit-info__title"
          itemProp="name"
        >
          {title}
        </h3>
      </div>
      <p
        className="benefit-info__content"
        itemProp="description"
      >
        {text}
      </p>
    </StyledContainer>
  );
};

type StyledContainerProps = {
  iconBaseColor?: string;
}
const StyledContainer = styled.div<StyledContainerProps>`
  .benefit-info {
    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    &__icon {
      width: 24px;
      height: 24px;
      background-color: ${props => props.iconBaseColor};
      border-radius: 100px;
      margin-right: 12px;
      display: flex;
      justify-content: center;
      align-items: center;

      & > img {
        width: 20px;
        height: 20px;
      }
    }

    &__title {
      ${props => props.theme.typography.fnTitle2};
      ${props => props.theme.typography.fnMedium};
      color: ${props => props.theme.colorValues.grey};
    }

    &__content {
      color: ${props => props.theme.colorValues.lightgrey};
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
    }
  }
`;

export default BenefitInfo;
