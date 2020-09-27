
export type CardBehaviorState = {
  isOpen: boolean,
  showMin: boolean,
  showMax: boolean,
  maxHeight: number,
  minHeight: number,
};

export type CardBehaviorAction =
  | { type: 'set_is_open' }
  | { type: 'set_show_min' }
  | { type: 'set_show_max' }
  | { type: 'set_hide_min' }
  | { type: 'set_hide_max' }
  | { type: 'set_max_height', height: number }
  | { type: 'set_min_height', height: number }
  | { type: 'set_default' }
  | { type: 'set_hard_open' }
  | { type: 'max_open_min_hide' };

export const InitialCardState: CardBehaviorState = {
  isOpen: false,
  showMin: true,
  showMax: false,
  maxHeight: 0,
  minHeight: 0
};

export const getInitialCardState = (isOpen: boolean): CardBehaviorState => {
  return {
    isOpen,
    showMin: true,
    showMax: false,
    maxHeight: 0,
    minHeight: 0
  }
};

export const cardBehaviorReducer = (
  state: CardBehaviorState,
  action: CardBehaviorAction
): CardBehaviorState => {
  switch (action.type) {
    case 'set_hard_open':
      return {
        ...state,
        isOpen: true
      };
    case 'set_is_open':
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case 'set_show_max':
      return {
        ...state,
        showMax: true
      };
    case 'max_open_min_hide':
      return {
        ...state,
        showMax: true,
        showMin: false,
      };
    case 'set_show_min':
      return {
        ...state,
        showMin: true
      }
    case 'set_hide_max':
      return {
        ...state,
        showMax: false
      };
    case 'set_hide_min':
      return {
        ...state,
        showMin: false
      };
    case 'set_max_height':
      return {
        ...state,
        maxHeight: action.height
      };
    case 'set_min_height':
      return {
        ...state,
        minHeight: action.height
      };
    case 'set_default':
      return {
        ...state,
        isOpen: false,
        showMin: true,
        showMax: false,
        maxHeight: 0,
      };
    default:
      return state;
  };
};

