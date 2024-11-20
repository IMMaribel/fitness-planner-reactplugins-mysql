import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';  
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import WorkoutCreateModal from '../components/Workouts/WorkoutCreateModal';
import { RiCalendarFill } from 'react-icons/ri';
import EventEditModal from '@/components/Calendar/EventEditModal';
import listPlugin from '@fullcalendar/list';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editWorkout, setEditWorkout] = useState(null);

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

  // Creación de eventos
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

  // Abrir el modal de edición
  const handleEventClick = (clickInfo) => {
    const workoutData = clickInfo.event.extendedProps;
    setEditWorkout({ ...workoutData });
    setEditModalOpen(true);
  };

  // Guardar los cambios en el workout editado
  const handleEditSave = async () => {
    if (!editWorkout) {
      return;
    }

    const payload = {
      workout_date: editWorkout.workout_date,
      workout_type: editWorkout.workout_type,
      duration_minutes: editWorkout.duration_minutes,
      intensity_level: editWorkout.intensity_level,
      exercises: editWorkout.exercises,
      calories_burned: editWorkout.calories_burned || 0,
      notes: editWorkout.notes || '',
    };

    try {
      await axios.put(`http://localhost:5000/api/workouts/${editWorkout.user_id}`, payload);
      setEvents(events.map((event) => event.user_id === editWorkout.user_id ? 
        { 
        ...event, 
        title: editWorkout.workout_type, 
        start: editWorkout.workout_date, 
        extendedProps: { ...editWorkout } 
        } 
        : event
          ));
      handleCloseEditModal();
      } catch (error) {
        console.error('Error al actualizar el workout:', error);
      }
  };

  // Eliminar el workout editado
  const handleEditDelete = () => {
    if (!editWorkout) {
      return;
    }

    axios.delete(`http://localhost:5000/api/workouts/${editWorkout.user_id}`)
      .then(() => {
        // Eliminar el evento del calendario
        setEvents(events.filter((event) => event.id !== editWorkout.user_id));
        handleCloseEditModal();
      })
      .catch((error) => {
        console.error('Error al eliminar el workout:', error);
      });
  };

  // Cerrar el modal de edición
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditWorkout(null);
  };

  return (
    <div className="w-full px-2 sm:px-4 lg:px-24">
      <div className="flex items-center space-x-3 mb-6">
        <RiCalendarFill className="text-4xl text-indigo-600" />
        <h1 className="text-4xl font-bold text-white">Calendar</h1>
      </div>

    <div className="w-full overflow-x-auto">
    <div className="w-full max-w-full h-full sm:h-auto">
       <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        selectable={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
        }}
            height="auto"
            aspectRatio={1.5} 
            buttonText={{
              today: 'Today',
              month: 'Month',
              week: 'Week',
              day: 'Day',
              listWeek: 'List'
            }}
            locale="eng"
            />
        </div>
      </div>

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

      {editModalOpen && editWorkout && (
        <EventEditModal
          editWorkout={editWorkout}
          handleChange={(e) => {
            const { name, value } = e.target;
            setEditWorkout((prevWorkout) => ({
              ...prevWorkout,
              [name]: value,
            }));
          }}
          handleSave={handleEditSave}
          handleDelete={handleEditDelete}
          handleCloseModal={handleCloseEditModal}
          />
        )}
    </div>
  );
}

export default Calendar;
