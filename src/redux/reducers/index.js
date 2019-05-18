import {
  CREATE_TODO, TOGGLE_MODAL, EDIT_TODO, CLEAR_DONE_TODO_STATUS,
} from '../actions';

const initialState = {
  todos: [],
};

export default function fetchRestaurants(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL: {
      return {
        ...state,
        isOpen: action.payload,
      };
    }
    case CREATE_TODO: {
      return {
        ...state,
        todos: [...state.todos, { ...action.payload }],
      };
    }
    case EDIT_TODO: {
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.payload.id ? action.payload : todo)),
      };
    }
    case CLEAR_DONE_TODO_STATUS: {
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.status),
      };
    }
    default:
      return state;
  }
}
