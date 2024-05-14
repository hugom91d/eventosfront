import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events: []
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents(state, action) {
            state.events = action.payload;
        },
        addEvent(state, action) {
            state.events.push(action.payload);
        },
        editEvent(state, action) {
            const index = state.events.findIndex(event => event.id === action.payload.id);
            if (index !== -1) {
                state.events[index] = action.payload.updatedEvent;
            }
        },
        deleteEvent(state, action) {
            state.events = state.events.filter(event => event.id !== action.payload);
        }
    }
});

export const {setEvents ,addEvent, editEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
