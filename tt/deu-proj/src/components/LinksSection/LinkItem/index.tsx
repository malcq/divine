import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { NetLink } from '../../../models/links';
import { STATIC_URLS, ANIMATION_VALUES } from '../../../utils/constants';
import { Icon } from '../../UI/Icon';

interface Props extends NetLink { };

const LinkItem: React.FC<Props> = ({ title, url }) => {
  const [isOpenCollapse, setIsOpenCollapse] = useState(false)

  return (
    <StyledContainer isOpenCollapse={isOpenCollapse} >
      <div className="link-item">
        <div className="link-item__header">
          <div className="link-item__contanier">
            {
              isOpenCollapse ? (
                <div
                  className="link-item__text"
                >
                  {title}
                </div>
              ) : (
                  <a
                    className="link-item__text link-item__text_link"
                    href={url}
                  >
                    {title}
                  </a>
                )
            }
            <div className="link-item__arrow-box">
              <Icon
                className="link-item__more-button"
                srcUrl={`${STATIC_URLS.SVG}/keyboard_arrow_left.svg`}
                width={8}
                height={12}
                onClick={() => setIsOpenCollapse(!isOpenCollapse)}
              />
            </div>
          </div>

        </div>
        {isOpenCollapse &&
          <a
            className="link-item__link"
            href={url}
          >
            {url}
          </a>}
      </div>
    </StyledContainer>
  )
};

interface StyledProps {
  isOpenCollapse: boolean;
};
const StyledContainer = styled.div<StyledProps>`
  padding-top: 16px;
  padding-bottom: 15px;
  box-shadow: 0 0.5px 0 0px ${(props) => props.theme.colorValues.lightestgrey};
  .link-item {
    &__contanier {
      display: flex;
      align-items: flex-start;
      width: 100%;
      justify-content: space-between;
    }
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    &__arrow-box{
      width: 24px;
      height: 24px;
      display: flex;
      align-items:center;
      justify-content:center;
    }
    &__more-button {
      cursor: pointer;
      display: inline-block;
      transform: ${props => props.isOpenCollapse ? 'rotate(-90deg)' : 'rotate(-180deg)'};
      padding-left: 8px;
      padding-right: 5px;
      display: flex;
      align-items: center;
      user-select: none;
      justify-content: center;
      opacity: 0.3;
      transition: transform ${ANIMATION_VALUES.CARD_OPENING_ANIMATION.buttonRotateTime}ms;
      -webkit-tap-highlight-color: transparent;
    }
    &__text {
      ${props => props.theme.typography.fnTitle2};
      ${props => props.theme.typography.fnText};
      color: ${props => props.theme.colorValues.grey};
      max-width: 311px;
      &_link{
        color: ${props => props.theme.colorValues.primary};
      }
    }
    &__link{
      ${(props) => props.theme.typography.fnText};
      ${(props) => props.theme.typography.fnBody};
      color:${(props) => props.theme.colorValues.primary};
      margin-top: 12px;
      display: block;
      padding-bottom: 16px;
    }
  }
`;


export default LinkItem;
