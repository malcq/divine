export type FaqState = {
  id: number,
  isOpen: boolean
};

type FaqActions =
  | { type: 'set_opened', id: number }
  | { type: 'set_close', id: number }
  | { type: 'set_new_state', arr: any[] }
  | { type: 'set_default' };

const reducer = (state: FaqState[], action: FaqActions): FaqState[] => {

  if (action.type === 'set_opened') {
    return state.map((item) => {
      if (item.id === action.id) {
        return {
          ...item,
          isOpen: true
        }
      }
      return {
        ...item,
        isOpen: false
      }
    })
  }
  if (action.type === 'set_close') {
    return state.map((item) => {
      if (item.id === action.id) {
        return {
          ...item,
          isOpen: false
        }
      }
      return item
    })
  }
  if (action.type === 'set_new_state') {
    return action.arr.map((_, idx) => ({
      id: idx,
      isOpen: false
    }))
  }
  if (action.type === 'set_default') {
    return state.map((item) => ({
      ...item,
      isOpen: false
    }))
  }
  return state;
};

export const getFaqInitialState = (arr: any[]): FaqState[] => {
  return arr.map((_, idx) => ({
    id: idx,
    isOpen: false
  }))
};

export default reducer;