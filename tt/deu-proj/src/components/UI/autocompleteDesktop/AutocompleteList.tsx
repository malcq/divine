import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import { AutocompleteItem } from '../../../models/autocomplete';
import { reducer, getInitialState } from './reducer';

import ListItem from './AutocompleteItem';
import CustomBar from '../CustomBar';
import { getAutocompleteList } from '../../../api/autocomplete';

import { useUpdateAutocomplete } from '@utils/hooks/useUpdateAutoComplete';

type Props = {
  query?: string,
  onPlaceSelect: (item: AutocompleteItem) => void,
  suggestionsWidth: number,
  filterAutocompleteType?: 'show-all' | 'stops-only',
};
const AutocompleteList: React.FC<Props> = ({
  query,
  onPlaceSelect,
  suggestionsWidth,
  filterAutocompleteType,
}) => {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());

  function onPlaceSelectItem(item: AutocompleteItem) {
    if (!onPlaceSelect) { return; }
    onPlaceSelect(item);
    dispatch({
      type: "reset",
    });
  }
  useUpdateAutocomplete({
    dispatchStart: () => dispatch({ type: 'start_autocomplete_fetch' }),
    dispatchSuccess: (items: AutocompleteItem[]) =>  dispatch({ type: 'success_autocomplete_fetch', items }),
    dispatchError: (err: Error) =>  dispatch({ type: 'error_autocomoplete_fetch', error: err.message }),
    query,
    filterAutocompleteType,
  })


  return (
    <>
      {(
          <CSSTransition
            in={!!state.automcompleteItems}
            unmountOnExit
            timeout={200}
            classNames="autocomplete"
          >
            <StyledContainer>
              {(state.automcompleteItems && state.automcompleteItems.length)
                ? (
                  <CustomBar
                    autoHide={true}
                    styles={{
                      width: suggestionsWidth,
                      height: 168,
                      minHeight: 56,
                      maxHeight: 168
                    }}
                  >
                    {state.automcompleteItems.map((item, index) => {
                      return (
                        <ListItem
                          item={item}
                          key={`${item.title} ${index}`} // TODO: better switching to some good server id. Currently not all responses has stop_id.
                          onItemPress={onPlaceSelectItem}
                        />
                      )
                    })}
                  </CustomBar>
                )
                : (
                  <div className="autocomplete__not-found">
                    Keine Einträge gefunden
                  </div>
                )
              }
            </StyledContainer>
          </CSSTransition>
        )
      }
    </>
  )
};

const StyledContainer = styled.div`
  padding: 8px 0;
  border: 1px solid ${props => props.theme.colorValues.lightestgrey};
  background: ${props => props.theme.colorValues.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px 2px ${props => props.theme.colorValues.lightestgrey};
  overflow: hidden;

  &.autocomplete {
    &-enter {
      opacity: 0;
      transition: 200ms;
      transform: scale(0.2);
      transform-origin: top left;
    }

    &-enter-done {
      opacity: 1;
      transition: 200ms;
      transform: scale(1);
      transform-origin: top left;
    }
  }

  .autocomplete {
    &__not-found {
      user-select: none;
      margin: 0 8px;
      /* margin-left: 45.5px; */
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 56px;
      width: 448px;
      ${props => props.theme.typography.fnText};
      ${props => props.theme.typography.fnTitle2};
    }
  }

  .simplebar-scrollbar::before {
    background-color: ${props => props.theme.colorValues.primary};  
  }
  .simplebar-scrollbar.simplebar-visible:before {
    opacity: 1;
  }
`;

AutocompleteList.defaultProps = {
  filterAutocompleteType: 'show-all', 
}

export default AutocompleteList;