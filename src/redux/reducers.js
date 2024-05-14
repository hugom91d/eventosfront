import { ADD_EVENT, EDIT_EVENT, DELETE_EVENT } from './actions';

const initialState = {
  events: []
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload]
      };
    case EDIT_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload.updatedEvent : event
        )
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };
    default:
      return state;
  }
};

export default eventReducer;
