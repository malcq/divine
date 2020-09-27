
type InitialState = {
  selectedAutocompleteType: string;
  timePickerModalOpen: boolean;
  autocompleteModalOpen: boolean;
  isMountMaxContent: boolean;
  showMobile: boolean;
};

type Actions =
  | { type: 'set_selected_type', selectedType: string }
  | { type: 'set_time_modal', state: boolean }
  | { type: 'set_autocomplite_modal', state: boolean }
  | { type: 'set_mount_search_widget', state: boolean }
  | { type: 'set_show_mobile_widget', state: boolean };

export const initialHeaderState: InitialState = {
  autocompleteModalOpen: false,
  isMountMaxContent: false,
  selectedAutocompleteType: '',
  showMobile: false,
  timePickerModalOpen: false
};

const reducer = (state: InitialState, action: Actions): InitialState => {
  switch (action.type) {
    case 'set_selected_type':
      return {
        ...state,
        selectedAutocompleteType: action.selectedType
      };
    case 'set_time_modal':
      return {
        ...state,
        timePickerModalOpen: action.state
      };
    case 'set_autocomplite_modal':
      return {
        ...state,
        autocompleteModalOpen: action.state
      };
    case 'set_mount_search_widget':
      return {
        ...state,
        isMountMaxContent: action.state,
      };
    case 'set_show_mobile_widget':
      return {
        ...state,
        showMobile: action.state
      }
    default:
      return state
  }
};

export default reducer;