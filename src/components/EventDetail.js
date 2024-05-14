import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, editEvent, setEvents } from '../redux/eventsSlice';
import { urlApi } from '../constantes/url';

const EventDetail = ({ events }) => {

    const dispatch = useDispatch();
    const { eventId } = useParams();
    const event = events.find(event => event.id == eventId);


    const [inputs] = useState([
        {
            id: 'fecha',
            label: 'Date',
            type: 'date',
            validations: { required: 'This field is required' }
        },
        {
            id: 'lugar',
            label: 'Place',
            type: 'text',
            validations: { required: 'This field is required' }
        },
        {
            id: 'descripcion',
            label: 'Description',
            type: 'text',
            validations: { required: 'This field is required' }
        },
        {
            id: 'precio',
            label: 'Price',
            type: 'number',
            validations: { required: 'This field is required' }
        }
    ])

    console.log('event', events)


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: event ? { ...event, date: new Date(event.fecha).toISOString().substring(0, 10) } : null
    });

    const onSubmit = (data) => {
        console.log(data);
        if (eventId == "new") {
            createEvent(data);
        } else {
            fetchEditEvent(eventId, data);
        }
    };

    const createEvent = async (event) => {
        try {
            const response = await axios.post(urlApi + 'api/eventos/', event);
            dispatch(addEvent(event));
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
        }
    }

    const fetchEditEvent = async (id, event) => {
        try {
            const response = await axios.put(urlApi + 'api/eventos/' + id, event);
            dispatch(editEvent({ id, event }));
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
        }
    }


    return (

        <div className='w3-container'>

            <div className="w3-container w3-padding">

                <Link className='w3-button w3-black w3-round-small' to={`/events`}>Back</Link> <br />
            </div>

            <div class="w3-card-4 w3-half">
                <div class="w3-container w3-black">
                    <h4>Event</h4>
                </div>
                <form class="w3-container" onSubmit={handleSubmit(onSubmit)}>


                    {inputs.map((input) => (
                        <p>
                            <label class="w3-text-black"><b>{input.label}</b></label>
                            <input
                                className='w3-input w3-border'
                                type={input.type}
                                id={input.id} {...register(input.id, { ...input.validations })} />

                            {errors[input.id] &&
                                <span className='w3-text-red'>{errors[input.id].message}</span>

                            }
                        </p>
                    ))}


                    <p>
                        <button class="w3-btn w3-black">Register</button></p>
                </form>
            </div>

        </div>
    );
};

export default EventDetail;
