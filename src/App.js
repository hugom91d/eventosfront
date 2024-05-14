// App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EventDetail from './components/EventDetail';
import {setEvents, addEvent, editEvent, deleteEvent } from './redux/eventsSlice';
import EventList from './components/EventList';
import axios from 'axios';
import { urlApi } from './constantes/url';

function App() {
  const events = useSelector(state => state.events.events);
  const dispatch = useDispatch();

  useEffect(() => {
 
    fetchEvents();
  }, [dispatch]);

  const handleAddEvent = () => {
    const newEvent = {
      id: Math.random(), // solo para este ejemplo, deberías usar una mejor forma de generar ids
      date: '2023-05-13',
      place: 'Lugar del evento',
      description: 'Descripción del evento',
      price: 0 // Precio del evento
    };
    dispatch(addEvent(newEvent));
  };


  const fetchEvents = async () => {
    // let events = [
    //   {
    //     id: '123123123123123',
    //     fecha: new Date(),
    //     lugar: 'Quito',
    //     descripcion: 'Event in Quito', 
    //     precio: 10.01
    //   } , 
    //   {
    //     id: '123123123123122',
    //     fecha: new Date(),
    //     lugar: 'Quito',
    //     descripcion: 'Event in Quito', 
    //     precio: 10.01
    //   }
    // ]

    // dispatch(setEvents(events));
    try {
      const response = await axios.get(urlApi+'api/eventos'); 
      dispatch(setEvents(response.data)); 
      
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
    }
  };

  const handleEditEvent = (id, updatedEvent) => {
    dispatch(editEvent({ id, updatedEvent }));
  };

  const handleDeleteEvent = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <Router>
      <div className="App">
        <div className='w3-container w3-black'>
          <h2>Event Management</h2>
       
        </div>

        <Routes>
          <Route
            exact
            path="/events"
            element={<EventList events={events} handleEditEvent={handleEditEvent} handleDeleteEvent={handleDeleteEvent} />}

          />

          <Route
            path="/event/:eventId"
            element={<EventDetail events={events} />}

          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
