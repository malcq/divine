import React from 'react';
import styled from 'styled-components';

import {
  AutocompleteItem as IAutocompleteItem,
  AutocompleteItemTypes,
} from '../../../models/autocomplete';
import { STATIC_URLS } from '../../../utils/constants';


const getAutocompleteItemIcon = (type?: AutocompleteItemTypes): string => {
  switch (type) {
    case AutocompleteItemTypes.city:
      return `${STATIC_URLS.SVG}/location-city.svg`;
    case AutocompleteItemTypes.place:
    default:
      return `${STATIC_URLS.SVG}/location-place.svg`;
  }
}

type Props = {
  item: IAutocompleteItem,
  onItemPress?: (item: IAutocompleteItem) => void,
};
const AutocompleteItem: React.FC<Props> = (props) => {
  const { item } = props;

  const iconSrc = getAutocompleteItemIcon(item.place_type);

  function onItemPress() {
    if (!props.onItemPress) { return; }
    return props.onItemPress(item);
  }

  return (
    <StyledContainer
      onClick={onItemPress}
    >
      <img
        className="autocomplete-item__icon"
        alt="place-icon"
        src={iconSrc}
      />
        <p
          className="autocomplete-item__title"
          title={item.title}
        >
          {item.title}
        </p>
    </StyledContainer>
  )
};

const StyledContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  :hover {
    background: ${props => props.theme.colorValues.zumthor};
  }

  .autocomplete-item {
    &__icon {
      display: block;
      width: 24px;
      height: 24px;
      margin: 0 12px;
    }
    
    &__title-container {
      flex-grow: 1;
    }
    
    &__title {
      padding: 16px 6px 16px 0;
      width: 100%;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnTitle2};
      color: ${props => props.theme.colorValues.grey};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

AutocompleteItem.defaultProps = {
  onItemPress: () => null,
}

export default AutocompleteItem;