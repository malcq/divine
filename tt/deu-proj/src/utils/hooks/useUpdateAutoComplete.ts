import { useEffect, useRef } from 'react';
import { getAutocompleteList } from '@api/autocomplete';
import { AutocompleteItem } from '@models/autocomplete';


type UpdateAutcompleteHookProps = {
  dispatchStart: () => void,
  dispatchSuccess: (items: AutocompleteItem[]) => void,
  dispatchError: (e: Error) => void,
  query?: string,
  filterAutocompleteType?: 'show-all' | 'stops-only',
}

export const useUpdateAutocomplete = ({
  dispatchStart,
  dispatchSuccess,
  dispatchError,
  query,
  filterAutocompleteType
}: UpdateAutcompleteHookProps) => {
  const lastReq = useRef(0);

  useEffect(() => {
      async function updateAutocomplete() {
        if (!query) { return; }
        const finalQuery = query.trim();
        dispatchStart();

        const filterType = filterAutocompleteType === 'show-all' ? 'all' : 'places-only';

        try {
          const curPos = lastReq.current;
          const response = await getAutocompleteList(finalQuery, {
            responseType: filterType,
          });

          if (lastReq.current === curPos) {
            dispatchSuccess(response)
          }
        
        } catch (err) {
          console.log(err)
          dispatchError(err)
        }
      }

      lastReq.current++;
      updateAutocomplete();
  }, [query, filterAutocompleteType]);
}