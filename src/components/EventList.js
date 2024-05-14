// EventList.js

import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setEvents } from '../redux/eventsSlice';
import { urlApi } from '../constantes/url';

function EventList({ events, handleEditEvent, handleDeleteEvent }) {
    const dispatch = useDispatch();
    const deleteEvents = async (event) => {

        try {
            const response = await axios.delete(urlApi+'api/eventos/'+event.id);
            handleDeleteEvent(event.id);
            dispatch(setEvents(response.data));

        } catch (error) {
            console.error('Error al obtener los eventos:', error);
        }
    };

    return (
        <div class="w3-container">
            <div className="w3-container w3-padding">

                <Link className='w3-button w3-black w3-round-small' to={`/event/new`}>Add event</Link> <br />
            </div>


            <div class="w3-card-4">
                <div class="w3-container w3-black">
                    <h4>Events</h4>
                </div>

                <table className="w3-table-all">
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Place</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th></th>
                    </tr>

                    {events.length < 1 &&
                        <tr>
                            <td colSpan={6} style={{ textAlign: 'center' }}>No hay eventos disponibles</td>
                        </tr>
                    }

                    {events.map((event, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{moment(event.fecha).calendar()}</td>
                            <td>{event.lugar}</td>
                            <td>{event.descripcion}</td>
                            <td>{event.precio}</td>
                            <td style={{ textAlign: 'center' }}>

                                <Link className='w3-button w3-black w3-round-small' to={`/event/${event.id}`}>Details</Link> <br /><br />
                                <button className='w3-button w3-black w3-round-small' onClick={() => deleteEvents(event)}>Delete</button>

                            </td>
                        </tr>
                    ))}


                </table>
            </div>

        </div>
    );
}

export default EventList;
