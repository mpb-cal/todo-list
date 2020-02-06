// action types

//export const C = {
const C = {
  ADD_ITEM: 'ADD_ITEM',
  MAKE_TOP: 'MAKE_TOP',
  MOVE_UP: ' MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
  CHANGE_DONE: 'CHANGE_DONE',
  DELETE_ITEM: 'DELETE_ITEM',
  IMPORT_ITEMS: 'IMPORT_ITEMS',
};

// reducers (state + action = new state)

export const items = (state = [], action) => {
  switch (action.type) {
    case C.ADD_ITEM:
      return [
        {
          description: action.description,
          done: action.done
        },
        ...state
      ];
    case C.DELETE_ITEM:
      state.splice(action.index, 1);
      return state;
    case C.MAKE_TOP:
      return [
        state[action.index], 
        ...state.slice(0, action.index), 
        ...state.slice(action.index + 1)
      ];
    case C.MOVE_UP:
      return [
        ...state.slice(0, action.index - 1), 
        state[action.index], 
        state[action.index - 1], 
        ...state.slice(action.index + 1)
      ];
    case C.MOVE_DOWN:
      if (action.index >= state.length - 1) {
        return state;
      }

      return [
        ...state.slice(0, action.index), 
        state[action.index + 1], 
        state[action.index], 
        ...state.slice(action.index + 2)
      ];
    case C.CHANGE_DONE:
      state[action.index] = item(state[action.index], action);
      if (action.done) {
        state = [
          ...state.slice(0, action.index), 
          ...state.slice(action.index + 1, action.index.length), 
          state[action.index], 
        ];
      }
      return state;
    case C.IMPORT_ITEMS:
      return action.items;
    default:
      return state;
  }
}

export const item = (state = {}, action) => {
  switch (action.type) {
    case C.CHANGE_DONE:
      return {
        ...state,
        done: action.done,
      };
    default:
      return state;
  }
}

// action creators

export const addItem = (description) => (
  {
    type: C.ADD_ITEM,
    description,
    done: false,
  }
)

export const deleteItem = (index) => (
  {
    type: C.DELETE_ITEM,
    index,
  }
)

export const changeDone = (index, done) => (
  {
    type: C.CHANGE_DONE,
    index,
    done,
  }
)

export const makeTop = (index) => (
  {
    type: C.MAKE_TOP,
    index,
  }
)

export const moveUp = (index) => (
  {
    type: C.MOVE_UP,
    index,
  }
)

export const moveDown = (index) => (
  {
    type: C.MOVE_DOWN,
    index,
  }
)

export const importItems = (items) => (
  {
    type: C.IMPORT_ITEMS,
    items,
  }
)

