import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Para permitir la interacción con los eventos
import axios from 'axios';
import WorkoutCreateModal from '../components/Workouts/WorkoutCreateModal';
import { RiCalendarFill } from 'react-icons/ri';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({});

  // Cargar los workouts existentes
  useEffect(() => {
    axios.get('http://localhost:5000/api/workouts')
      .then((response) => {

        const calendarEvents = response.data.map((workout) => ({
          id: workout.user_id,
          title: workout.workout_type,
          start: workout.workout_date,
          extendedProps: {
            ...workout,
          },
        }));
        setEvents(calendarEvents);
      })
      .catch((error) => {
        console.error('Error al cargar los workouts:', error);
      });
  }, []);

  // Manejar la creación de eventos (workouts)
  const handleDateClick = (arg) => {
    // Abrir el modal para crear un nuevo workout
    setNewWorkout({ workout_date: arg.dateStr });
    setCreateModalOpen(true);
  };

  // Guardar un nuevo workout
  const handleCreateSave = () => {
    if (!newWorkout) {
      return;
    }

    const payload = {
      workout_date: newWorkout.workout_date,
      workout_type: newWorkout.workout_type,
      duration_minutes: newWorkout.duration_minutes,
      intensity_level: newWorkout.intensity_level,
      exercises: newWorkout.exercises,
      calories_burned: newWorkout.calories_burned || 0,
      notes: newWorkout.notes || '',
    };

    axios.post('http://localhost:5000/api/workouts', payload)
      .then((response) => {
        // Agregar el nuevo workout al calendario como un evento
        const newEvent = {
          id: response.data.user_id,
          title: newWorkout.workout_type,
          start: newWorkout.workout_date,
          extendedProps: {
            ...newWorkout,
          },
        };
        setEvents([...events, newEvent]);
        handleCloseCreateModal();
      })
      .catch((error) => {
        console.error('Error al crear el workout:', error);
      });
  };

  // Cerrar el modal de creación
  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setNewWorkout(null);
  };

  // Eliminación de un evento (y del workout correspondiente)
  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Do you want to delete the workout: ${clickInfo.event.title}?`)) {
      axios.delete(`http://localhost:5000/api/workouts/${clickInfo.event.id}`)
        .then(() => {
          // Eliminar
          setEvents(events.filter((event) => event.id !== clickInfo.event.id));
        })
        .catch((error) => {
          console.error('Error al eliminar el workout:', error);
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-3 mb-6">
        <RiCalendarFill className="text-4xl text-indigo-600" />
        <h1 className="text-4xl font-bold text-white">Calendar</h1>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        selectable={true}
      />

      {createModalOpen && (
        <WorkoutCreateModal
          newWorkout={newWorkout}
          handleCreateChange={(e) => {
            const { name, value } = e.target;
            setNewWorkout((prevWorkout) => ({
              ...prevWorkout,
              [name]: value,
            }));
          }}
          handleCreateSave={handleCreateSave}
          handleCloseCreateModal={handleCloseCreateModal}
        />
      )}
    </div>
  );
}

export default Calendar;
