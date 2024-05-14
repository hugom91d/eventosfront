export const ADD_EVENT = 'ADD_EVENT';
export const EDIT_EVENT = 'EDIT_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

export const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: event
});

export const editEvent = (id, updatedEvent) => ({
  type: EDIT_EVENT,
  payload: {
    id,
    updatedEvent
  }
});

export const deleteEvent = (id) => ({
  type: DELETE_EVENT,
  payload: id
});
