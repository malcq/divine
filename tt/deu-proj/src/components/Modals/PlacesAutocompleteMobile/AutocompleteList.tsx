import React from 'react';
import styled from 'styled-components';

import { AutocompleteItem } from '../../../models/autocomplete';

import ListItem from './AutocompleteItem';

type Props = {
  items?: AutocompleteItem[],
  onPlaceSelect: (item: AutocompleteItem) => void,
};
const AutocompleteList: React.FC<Props> = (props) => {
  const { items = [] } = props;
  return (
    <StyledContainer>
      {items.map((item, index) => {
        return (
          <ListItem
            item={item}
            key={`${item.title} ${index}`}
            onItemPress={props.onPlaceSelect}
          />
        )
      })}
    </StyledContainer>
  )
};

const StyledContainer = styled.div`
  height: calc(100% - 80px);
  overflow: auto;
`;

AutocompleteList.defaultProps = {
  items: [],
};

export default AutocompleteList;