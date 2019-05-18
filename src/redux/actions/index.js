export const CREATE_TODO = 'CREATE_TODO';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const CLEAR_DONE_TODO_STATUS = 'CLEAR_DONE_TODO_STATUS';
export const EDIT_TODO = 'EDIT_TODO';

export function createTodoAction(formData) {
  return {
    type: CREATE_TODO,
    payload: formData,
  };
}
export function editTodoAction(formData) {
  return {
    type: EDIT_TODO,
    payload: formData,
  };
}
export function clearDoneTodoStatusAction() {
  return {
    type: CLEAR_DONE_TODO_STATUS,
    payload: null,
  };
}

export function toggleModal(isOpen) {
  return {
    type: TOGGLE_MODAL,
    payload: isOpen,
  };
}
