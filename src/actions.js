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
  CLEAR_MOVE: 'CLEAR_MOVE',
  CLEAR_NEW: 'CLEAR_NEW',
};

// reducers (state + action = new state)

// state refers to items[]
export const items = (state = [], action) => {
  let index = state.findIndex((e) => (e.id === action.id));

  switch (action.type) {

    case C.ADD_ITEM:
      let max = 0;
      state.forEach((e, i, a) => {if (e.id > max) { max = e.id; }});
      let newId = max + 1;

      let newItem = {
        description: action.description,
        done: action.done,
        isNew: true,
        id: newId,
      };

      return [
        newItem,
        ...state
      ];

    case C.DELETE_ITEM:
      state.splice(index, 1);
      return state;

    case C.MAKE_TOP:

      return [
        item(state[index], action),
        ...state.slice(0, index), 
        ...state.slice(index + 1)
      ];

    case C.MOVE_UP:
      return [
        ...state.slice(0, index - 1), 
        item(state[index], action),
        state[index - 1], 
        ...state.slice(index + 1)
      ];
    
    case C.MOVE_DOWN:
      if (index >= state.length - 1) {
        return state;
      }

      return [
        ...state.slice(0, index), 
        state[index + 1], 
        item(state[index], action),
        ...state.slice(index + 2)
      ];

    case C.CHANGE_DONE:
      // set the item as done
      state[index] = item(state[index], action);

      // move it to the bottom
      if (action.done) {
        state = [
          ...state.slice(0, index), 
          ...state.slice(index + 1, state.length), 
          state[index], 
        ];
      }
      return state;

    case C.CLEAR_MOVE:
      state[index] = item(state[index], action);
      return state;

    case C.CLEAR_NEW:
      return state.map((e) => item(e, action));

    case C.IMPORT_ITEMS:
      return action.items;

    default:
      return state;
  }
}

// called by items(), above, for a single item.
// state refers to item: {description, done, etc.}
export const item = (state = {}, action) => {
  switch (action.type) {

    case C.CHANGE_DONE:
      return {
        ...state,
        justMoved: true,
        done: action.done,
      };

    case C.MOVE_UP:
    case C.MOVE_DOWN:
    case C.MAKE_TOP:
        return {
        ...state,
        justMoved: true,
      };

    case C.CLEAR_MOVE:
      return {
        ...state,
        justMoved: false,
        isNew: false,
      };

    case C.CLEAR_NEW:
      return {
        ...state,
        isNew: false,
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

export const deleteItem = (id) => (
  {
    type: C.DELETE_ITEM,
    id,
  }
)

export const changeDone = (id, done) => (
  {
    type: C.CHANGE_DONE,
    id,
    done,
  }
)

export const makeTop = (id) => (
  {
    type: C.MAKE_TOP,
    id,
  }
)

export const moveUp = (id) => (
  {
    type: C.MOVE_UP,
    id,
  }
)

export const moveDown = (id) => (
  {
    type: C.MOVE_DOWN,
    id,
  }
)

export const importItems = (items) => (
  {
    type: C.IMPORT_ITEMS,
    items,
  }
)

export const clearMove = (id) => (
  {
    type: C.CLEAR_MOVE,
    id,
  }
)

export const clearNew = () => (
  {
    type: C.CLEAR_NEW,
  }
)

