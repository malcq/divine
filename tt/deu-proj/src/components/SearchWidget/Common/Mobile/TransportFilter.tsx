import React, { useContext } from 'react';
import styled, { ThemeContext, css } from 'styled-components';
import FlipMove from 'react-flip-move';

import { STATIC_URLS, ProviderTypes } from '../../../../utils/constants';

import { TransportFilter as ITransportFilter, ButtonTransportTypes } from '../../../../models/widget';
import { Icon } from '../../../UI/Icon';
import { useTranslation } from '../../../../../i18n';
import media from '../../../../utils/media';

interface TransportButtonProps {
  selected: boolean,
  onSelect: (type: ButtonTransportTypes) => void,
  type: ButtonTransportTypes,
}
const TransportButton: React.FC<TransportButtonProps> = React.forwardRef((props, ref: any) => {
  const { t } = useTranslation('search-widget');
  const { colorValues } = useContext(ThemeContext)

  function onSelect() {
    props.onSelect(props.type);
  }

  const iconSrc: string = React.useMemo(() => {
    switch (props.type) {
      case 'bus':
        return `${STATIC_URLS.SVG}/bus.svg`;
      case 'train':
        return `${STATIC_URLS.SVG}/train.svg`;
    }
  }, [props.type]);

  const title: string = React.useMemo(() => {
    switch (props.type) {
      case 'bus':
        return t(`button__transport--bus`);
      case 'train':
        return t(`button__transport--train`);
    }
  }, [props.type]);

  return (
    <TransportButtonContainer
      onClick={onSelect}
      selected={props.selected}
      ref={ref}
    >
      <Icon
        srcUrl={iconSrc}
        color={colorValues.primary}
        width={16}
        height={16}
      />
      <span className="transport-filter-button__title">
        {title}
      </span>
      {props.selected &&
        <Icon
          className="transport-filter-button__remove-button"
          height={16}
          width={16}
          srcUrl={`${STATIC_URLS.SVG}/remove-transport.svg`}
          color={colorValues.primary}
        />}
    </TransportButtonContainer>
  )
})

interface Props {
  state: ProviderTypes | null,
  availableFilters: string[];
  onChange: (type: ButtonTransportTypes) => void,
}
const TransportFilter: React.FC<Props> = (props) => {
  const { availableFilters } = props;

  const {
    busAvailable,
    isBusSelected,
    isTrainSelected,
    trainAvailable,
  } = React.useMemo(() => {
    const isOneAvailableFilter = availableFilters.length === 1;
    const isBus = props.state === ProviderTypes.flixbus;
    const isTrain = props.state === ProviderTypes.deutsche_bahn;
    return {
      busAvailable: !props.state || isBus,
      trainAvailable: !props.state || isTrain,
      isBusSelected: isBus || isOneAvailableFilter && availableFilters.includes('bus'),
      isTrainSelected: isTrain || (isOneAvailableFilter && availableFilters.includes('train')),
    }
  }, [props.state, availableFilters])
  
  return (
    <StyledContainer>
      <FlipMove
        className="transport-filter"
        leaveAnimation="none"
      >
        {
          availableFilters.includes('bus') && busAvailable && (
            <TransportButton
              type='bus'
              onSelect={props.onChange}
              selected={isBusSelected}
            />
          )
        }
        {
          availableFilters.includes('train') && trainAvailable && (
            <TransportButton
              type='train'
              onSelect={props.onChange}
              selected={isTrainSelected}
            />
          )
        }
      </FlipMove>
    </StyledContainer>
  )
};

const StyledContainer = styled.div`
  .transport-filter {
    display: flex;
    padding: 8px;

    ${media.desktop} {
      padding: 8px 5px;
      max-width: 1090px;
      margin: 0 auto;
    }
  
    & > button {
      margin-right: 4px;
    }

    & > button:last-child {
      margin-right: 0;
    }
  }

`;

type TransportButtonContainerProps = {
  selected?: boolean,
}
const TransportButtonContainer = styled.button<TransportButtonContainerProps>`
  cursor: pointer;
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  padding: 5px 11px 5px 7px;
  display: flex;
  border-radius: 16px;
  align-items: center;

  ${props => props.selected
    ? css`
        border: 1px solid ${props => props.theme.colorValues.primary};
        background-color: ${props => props.theme.colorValues.primary}0F;
        color: ${props => props.theme.colorValues.primary};
    `
    : css`
      border: 1px solid ${props => props.theme.colorValues.lightestgrey};
      color: ${props => props.theme.colorValues.grey};
    `
  };

  :active {
    opacity: 0.7;
  }

  :hover {
    background-color: ${props => props.theme.colorValues.aliceBlue};
  }

  .transport-filter-button {
    &__title {
      display: block;
      margin-left: 7px;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnBody};
      color: ${props => props.theme.colorValues.grey};
    }

    &__remove-button {
      margin-left: 8px;
    }
  }
`;

export default TransportFilter;