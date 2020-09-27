import { useEffect, useState } from 'react';
import { AutocompleteItem } from '../../models/autocomplete';

type useAutocompleteBehaviourOptions = {
  initialSearchValue?: string,
  placeholderValue?: boolean,
}

export const useAutocompleteBehaviour = (
  autocompleteRef: React.RefObject<HTMLDivElement>,
  searchInputRef: React.RefObject<HTMLDivElement>,
  options: useAutocompleteBehaviourOptions,
  selectedStop?: AutocompleteItem
) => {
  const {
    initialSearchValue = '',
    placeholderValue = false,
  } = options;

  const [searchValue, setSearchValue] = useState<string>(initialSearchValue);
  const [placeholderIsOpen, setPlaceholderIsOpen] = useState<boolean>(placeholderValue);

  const [autocompleteOpened, setAutocompleteOpened] = useState<boolean>(false);

  useEffect(() => {
    function handleAutocompleteOutsideClick(ev: MouseEvent) {
      const outsideAutocomplete = !autocompleteRef?.current?.contains?.(ev.target as HTMLElement);
      const outsideInput = !searchInputRef.current?.contains?.(ev.target as HTMLElement);

      const shouldClose = autocompleteOpened &&
          outsideAutocomplete &&
          outsideInput;

      if (!searchValue && shouldClose) {
        setPlaceholderIsOpen(false)
      }

      if (shouldClose) {
        setAutocompleteOpened(false)
      }
    }

    document.addEventListener('mousedown', handleAutocompleteOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleAutocompleteOutsideClick);
    }
  }, [autocompleteOpened]);

  useEffect(() => {
    if (!autocompleteOpened && selectedStop?.title !== undefined) {
      setSearchValue(selectedStop?.title)
    } 
    if (!autocompleteOpened && selectedStop?.title === undefined) {
      setSearchValue('')
    }
  }, [autocompleteOpened, selectedStop]);

  return {
    searchValue,
    setSearchValue,
    autocompleteOpened,
    setAutocompleteOpened,
    placeholderIsOpen,
    setPlaceholderIsOpen,
  };
}