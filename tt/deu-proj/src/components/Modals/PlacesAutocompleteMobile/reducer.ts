import { AutocompleteItem } from "../../../models/autocomplete";

export type State = {
  queryValue: string;
  loading: boolean;
  error: string | null;
  automcompleteItems: AutocompleteItem[];
}

export type ReducerAction =
  | { type: 'set_search', value: string }
  | { type: 'reset' }
  | { type: 'start_autocomplete_fetch' }
  | { type: 'success_autocomplete_fetch', items: AutocompleteItem[] }
  | { type: 'error_autocomoplete_fetch', error: string, };


export function getInitialState(): State {
  return {
    queryValue: '',
    automcompleteItems: [],
    error: null,
    loading: false,
  }
}

export const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case 'set_search':
      return {
        ...state,
        queryValue: action.value,
      };
    case 'start_autocomplete_fetch':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'success_autocomplete_fetch':
      return {
        ...state,
        loading: false,
        automcompleteItems: action.items,
      };
    case 'error_autocomoplete_fetch':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case 'reset':
      return getInitialState();
    default:
      return state;
  }
}