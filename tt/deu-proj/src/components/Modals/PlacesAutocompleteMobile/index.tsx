import React, { useEffect } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import dynamic from 'next/dynamic';

import { reducer, getInitialState } from './reducer';

import Header from './Header';

import { AutocompleteItem } from '../../../models/autocomplete';
import { useUpdateAutocomplete } from '@utils/hooks/useUpdateAutoComplete';

const AutocompleteList = dynamic(() => import('./AutocompleteList'));
/**
 * 🔔🔔🔔
 * For styles look into global styles file
 * We can't define them here,
 * because modal will renders in its own container (not root)
 */
interface Props extends ReactModalProps {
  onClose?: () => void,
  onPlaceSelect?: (item: AutocompleteItem) => void,
  filterAutocompleteType?: 'show-all' | 'stops-only',
}

const PlacesAutocompleteMobile: React.FC<Props> = (props) => {
  const [state, dispatch] = React.useReducer(reducer, undefined, getInitialState);
  
  function onInputChange(value: string) {
    dispatch({
      type: 'set_search',
      value,
    })
  }

  function onPlaceSelect(item: AutocompleteItem) {
    if (!props.onPlaceSelect) { return; }
    props.onPlaceSelect(item);
    dispatch({
      type: "set_search",
      value: item.title,
    });
  }

  useUpdateAutocomplete({
    dispatchStart: () => dispatch({ type: 'start_autocomplete_fetch' }),
    dispatchSuccess: (items: AutocompleteItem[]) =>  dispatch({ type: 'success_autocomplete_fetch', items }),
    dispatchError: (err: Error) =>  dispatch({ type: 'error_autocomoplete_fetch', error: err.message }),
    query: state.queryValue,
    filterAutocompleteType: props.filterAutocompleteType,
  })


  const { isOpen } = props;
  return (
    <ReactModal
      closeTimeoutMS={200}
      isOpen={isOpen}
      portalClassName="places-search-modal"
      overlayClassName="places-search-modal__overlay"
      className="places-search-modal__content"
      bodyOpenClassName="places-search-modal__body--open"
      ariaHideApp={false}
      onRequestClose={props.onClose}
      shouldCloseOnEsc
    >
      <Header
        value={state.queryValue}
        onInputChange={onInputChange}
        onBackPress={props.onClose}
      />
      <AutocompleteList
        items={state.automcompleteItems}
        onPlaceSelect={onPlaceSelect}
      />
    </ReactModal>
  )
}

PlacesAutocompleteMobile.defaultProps = {
  filterAutocompleteType: 'show-all', 
}

export default PlacesAutocompleteMobile;
