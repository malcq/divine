import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import CustomBar from './CustomBar';
import { useOutsideClick } from '../../utils/hooks/useOutsideClick';

import { SelectItem } from '../../models/widget';
import { ANIMATION_VALUES, STATIC_URLS } from '@utils/constants';
import { Icon } from '@components/UI/Icon';

type Props = {
  dropdownWidth: number;
  title: string,
  values: SelectItem[],
  onSelect: (options: SelectItem) => void,
  popoverHeight?: number,
};
const PillSelectDesktop: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = React.useRef<HTMLDivElement>(null);
  const theme = React.useContext(ThemeContext);

  /**
   * typescript cant work with default props in functional component,
   * so we enter default values like this
  */
  const {
    popoverHeight = 200,
  } = props;

  useOutsideClick(selectRef, () => {
    setIsOpen(false);
  })

  const selectableItemHandler = (item: SelectItem) => {
    props.onSelect(item);
    setIsOpen(false);
  }

  return (
    <StyledContainer
      isOpen={isOpen}
      ref={selectRef}
      dropdownWidth={props.dropdownWidth}
    >
      <div
        className="pill-select-desktop__button"
        onClick={(e) => setIsOpen(prevValue => !prevValue)}
      >
        <p
          className="pill-select-desktop__title"
          title={props.title}
        >
          {props.title}
        </p>
        <Icon
          srcUrl={`${STATIC_URLS.SVG}/widget/arrow-dropdown.svg`}
          width={8}
          height={12}
          color={isOpen ? theme.colorValues.primary : theme.colorValues.black}
        />
      </div>

      <CSSTransition
        unmountOnExit
        in={isOpen}
        timeout={ANIMATION_VALUES.DROPDOWN_ANIMATION.timeout}
        classNames="select-modal"
      >
        <div className="pill-select-desktop__select-modal" data-selectable-item>
          <CustomBar
            autoHide={false}
            styles={{
              width: props.dropdownWidth,
              height: popoverHeight,
            }}
          >
            {props.values.map((item, index) => {
              if (item.disabled) { return null; }

              return (
                <div
                  className="pill-select-desktop__select-modal-item"
                  onClick={() => selectableItemHandler(item)}
                  title={item.title}
                  key={index}
                >
                  {item.title}
                </div>
              )
            })}
          </CustomBar>
        </div>
      </CSSTransition>
    </StyledContainer>
  );
}

type StyledContainerProps = {
  dropdownWidth: number;
  isOpen?: boolean,
}
const StyledContainer = styled.div<StyledContainerProps>`
  padding: 6px 12px;
  border-radius: 16px;
  border: 1px solid;
  position: relative;
  background-color: ${props => {
    return props.isOpen ? `${props.theme.colorValues.primary}0F` : props.theme.colorValues.white;
  }};

  border-color: ${props => {
    return props.isOpen ? props.theme.colorValues.primary : props.theme.colorValues.lightestgrey;
  }};
  user-select: none;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.colorValues.aliceBlue};
  }

  .pill-select-desktop {
    &__button {
      display: flex;
      align-items: center;
    }

    &__title {
      white-space: nowrap;
      overflow: hidden; 
      text-overflow: ellipsis;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      margin-right: 4px;
      color: ${props => {
        return props.isOpen ? props.theme.colorValues.primary : `rgba(0,0,0,0.86)`;
      }};
    }

    &__select-modal {
      width: ${props => props.dropdownWidth}px;
      /* height: 224px; */
      border-radius: 8px;
      background-color: ${props => props.theme.colorValues.white};
      box-shadow: rgba(0,0,0,0.18) 0 2px 8px 2px;
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 1;
      padding: 12px 0;
    }

    &__select-modal-item {
      padding: 4px 20px;
      white-space: nowrap;
      overflow: hidden; 
      text-overflow: ellipsis;
      ${props => props.theme.typography.fnRegular};
      ${props => props.theme.typography.fnTitle2};

      &:hover {
        background-color: ${props => props.theme.colorValues.zumthor};
      }
    }
  }

  .select-modal {
    &-enter,
    &-enter-active {
      transform-origin: top left;
    }

    &-enter {
      transform: scale(0.2);
      opacity: 0;
    }

    &-enter-active {
      opacity: 1;
      transform: scaleY(1);
      transition: ${ANIMATION_VALUES.DROPDOWN_ANIMATION.transition}ms;
    }
  }
  
  .simplebar-scrollbar::before {
    background-color: ${props => props.theme.colorValues.primary};  
  }
  .simplebar-scrollbar.simplebar-visible:before {
    opacity: 1;
  }
`;
export default PillSelectDesktop;