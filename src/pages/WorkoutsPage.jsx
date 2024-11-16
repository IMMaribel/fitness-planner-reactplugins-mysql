import React, { useState } from 'react';
import axios from 'axios';
import useWorkouts from '../hooks/useWorkouts';
import WorkoutList from '../components/Workouts/WorkoutList';
import WorkoutEditModal from '../components/Workouts/WorkoutEditModal';
import WorkoutCreateModal from '../components/Workouts/WorkoutCreateModal';
import { FaDumbbell } from 'react-icons/fa';

function WorkoutsPage() {
  const { workouts, setWorkouts, errorMessage, setErrorMessage } = useWorkouts();
  const [editWorkout, setEditWorkout] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({});

  // Eliminación de un workout
  const handleDelete = (user_id) => {
    axios.delete(`http://localhost:5000/api/workouts/${user_id}`)
      .then(() => {
        setWorkouts(workouts.filter(workout => workout.user_id !== user_id));
      })
      .catch(error => {
        console.error('Error al eliminar el workout:', error);
        setErrorMessage('There was an error deleting the workout. Please try again.');
      });
  };

  // Apertura del modal de edición
  const handleEdit = (workout) => {
    setEditWorkout(workout);
    setModalOpen(true);
  };

  // Guardar los cambios en el workout
  const handleSave = async () => {
    if (!editWorkout) {
      return;
    }

    const payload = {
      workout_date: editWorkout.workout_date ? editWorkout.workout_date.split('T')[0] : '',
      workout_type: editWorkout.workout_type,
      duration_minutes: editWorkout.duration_minutes,
      intensity_level: editWorkout.intensity_level,
      exercises: editWorkout.exercises,
      calories_burned: editWorkout.calories_burned || 0,
      notes: editWorkout.notes || '',
    };

    try {
      await axios.put(`http://localhost:5000/api/workouts/${editWorkout.user_id}`, payload);
      setWorkouts(workouts.map(workout => workout.user_id === editWorkout.user_id ? editWorkout : workout));
      handleCloseModal();
    } catch (error) {
      console.error('Error al actualizar el workout:', error);
      setErrorMessage('There was an error updating the workout. Please try again.');
    }
  };

  // Cerrar el modal de edición
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditWorkout(null);
  };

  // Apertura del modal de creación
  const handleCreate = () => {
    setNewWorkout({});
    setCreateModalOpen(true);
  };

  // Cambios en los inputs del formulario de creación
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout(prevWorkout => ({
      ...prevWorkout,
      [name]: value
    }));
  };

  // Guardar un nuevo workout
  const handleCreateSave = async () => {
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

    try {
      const response = await axios.post('http://localhost:5000/api/workouts', payload);
      setWorkouts([...workouts, response.data]);
      handleCloseCreateModal();
    } catch (error) {
      console.error('Error al crear el workout:', error);
      setErrorMessage('There was an error creating the workout. Please try again.');
    }
  };

  // Cerrar el modal de creación
  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setNewWorkout(null);
  };

  return (
    <div className="container mx-auto p-4">
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      
      <div className="flex items-center space-x-3 mb-6">
        <FaDumbbell className="text-4xl text-indigo-600" />
        <h1 className="text-4xl font-bold text-white">Workouts</h1>
      </div>
  
      <div className="flex justify-end mb-4">
        <button
          className="bg-gradient-to-r from-indigo-600/50 to-purple-600/50 px-6 py-2 text-sm font-medium text-white rounded-none transition-transform duration-500 hover:scale-110"
          onClick={handleCreate}
        >
          + Add Workout
        </button>
      </div>
  
      {/* Lista de workouts */}
      <WorkoutList
        workouts={workouts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
  
      {/* Modal para editar workout */}
      {modalOpen && (
        <WorkoutEditModal
          editWorkout={editWorkout}
          handleChange={(e) => {
            const { name, value } = e.target;
            setEditWorkout(prevWorkout => ({
              ...prevWorkout,
              [name]: value
            }));
          }}
          handleSave={handleSave}
          handleCloseModal={handleCloseModal}
        />
      )}
  
      {/* Modal para crear workout */}
      {createModalOpen && (
        <WorkoutCreateModal
          newWorkout={newWorkout}
          handleCreateChange={handleCreateChange}
          handleCreateSave={handleCreateSave}
          handleCloseCreateModal={handleCloseCreateModal}
        />
      )}
    </div>
  );
  
}

export default WorkoutsPage;
