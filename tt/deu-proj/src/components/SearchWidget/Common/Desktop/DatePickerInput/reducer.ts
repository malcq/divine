export type dropdownTypes =
  | 'none'
  | 'departure'
  | 'timepicker'
  | 'datepicker';

export type State = {
  selectedDropdown: dropdownTypes,
}

export type ReducerAction =
  | { type: 'change_dropdown', dropdown: dropdownTypes };

export function getInitialState(): State {
  return {
    // selectedDropdown: "none",
    selectedDropdown: "none",
  }
};

export function reducer(state: State, action: ReducerAction): State {
  switch (action.type) {
    case "change_dropdown":
      return {
        ...state,
        selectedDropdown: action.dropdown,
      };
    default:
      return state;
  }
}