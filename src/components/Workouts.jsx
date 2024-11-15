import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaFireAlt, FaClock, FaDumbbell, FaHeartbeat, FaStickyNote } from 'react-icons/fa';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [editWorkout, setEditWorkout] = useState(null); // Estado edit
  const [modalOpen, setModalOpen] = useState(false); // Estado modal edit
  const [createModalOpen, setCreateModalOpen] = useState(false); // Estado modal de creación
  const [newWorkout, setNewWorkout] = useState({}); // Estado add workout
  const [errorMessage, setErrorMessage] = useState(''); // Estado errores

  // Obtener todos los workouts
  useEffect(() => {
    axios.get('http://localhost:5000/api/workouts') // Cambiar la URL si es necesario
      .then(response => {
        console.log('Datos obtenidos:', response.data); // Para verificar los datos en la consola
        setWorkouts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los workouts:', error);
        setErrorMessage('There was an error fetching the workouts. Please try again.');
      });
  }, []);

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

  // Abrir el modal de edición
  const handleEdit = (workout) => {
    setEditWorkout(workout);
    setModalOpen(true);
  };

  // Guardar los cambios
  const handleSave = () => {
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

    axios.put(`http://localhost:5000/api/workouts/${editWorkout.user_id}`, payload)
      .then(() => {
        setWorkouts(workouts.map(workout => workout.user_id === editWorkout.user_id ? editWorkout : workout));
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error al actualizar el workout:', error);
        setErrorMessage('There was an error updating the workout. Please try again.');
      });
  };

  // Cambios en los inputs del formulario de edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditWorkout(prevWorkout => ({
      ...prevWorkout,
      [name]: value
    }));
  };

  // Cerrar el modal y actualizar el workout que se está editando
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditWorkout(null);
  };

    // Abrir el modal de creación
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
    const handleCreateSave = () => {
      if (!newWorkout) {
        return;
      }
  
      axios.post('http://localhost:5000/api/workouts', newWorkout)
        .then(response => {
          setWorkouts([...workouts, response.data]);
          handleCloseCreateModal();
        })
        .catch(error => {
          console.error('Error al crear el workout:', error);
          setErrorMessage('There was an error creating the workout. Please try again.');
        });
    };
  
    // Cerrar el modal de creación
    const handleCloseCreateModal = () => {
      setCreateModalOpen(false);
      setNewWorkout(null);
    };

    // Obtener la imagen según el tipo de ejercicio
    const getImageForWorkoutType = (workoutType) => {
      switch (workoutType) {
        case 'Cardio':
          return '/images/cardio.png';
        case 'Strength':
          return '/images/strength.jpg';
        case 'Flexibility':
          return '/images/flexibility.png';
        case 'Balance':
          return '/images/balance.jpg';
        case 'Mixed':
          return '/images/mixed.jpg';
        default:
          return '/images/default.jpg'; // imagen por defecto
    }
  };

  return (
    <div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div className="flex justify-end mb-4">
        <button
          className="bg-gradient-to-r from-indigo-600/50 to-purple-600/50 px-6 py-2 text-sm font-medium text-white rounded-none transition-transform duration-500 hover:scale-110"
          onClick={handleCreate}
        >
         + Add Workout
        </button>
      </div>
      <ul>
        {workouts.map((workout, index) => (
          <li key={workout.user_id || index} className="mb-4 p-6 bg-gray-800 rounded-md shadow-lg flex relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-center bg-cover" style={{ backgroundImage: `url(${getImageForWorkoutType(workout.workout_type)})` }}></div>
            <div className="flex-shrink-0 relative z-10 self-center">
              <img src={getImageForWorkoutType(workout.workout_type)} alt={workout.workout_type} className="w-36 h-36 mr-8 shadow-black shadow-2xl rounded-full
               object-cover" />
            </div>
            <div className="flex-grow relative z-10">
              <h2 className="text-xl font-bold mb-2">Exercises: {workout.exercises}</h2>
              <div className="mb-2 flex items-center">
                <FaCalendarAlt className="mr-2" />
                <p><strong>Date:</strong> {workout.workout_date.split('T')[0]}</p>
              </div>
              <div className="mb-2 flex items-center">
                <FaDumbbell className="mr-2" />
                <p><strong>Type:</strong> {workout.workout_type}</p>
              </div>
              <div className="mb-2 flex items-center">
                <FaClock className="mr-2" />
                <p><strong>Duration:</strong> {workout.duration_minutes} mins</p>
              </div>
              <div className="mb-2 flex items-center">
                <FaHeartbeat className="mr-2" />
                <p><strong>Intensity:</strong> {workout.intensity_level}</p>
              </div>
              <div className="mb-2 flex items-center">
                <FaFireAlt className="mr-2" /><p><strong>Burned Calories:</strong> {workout.calories_burned}</p>
              </div>
              <div className="mb-2 flex items-center">
                <FaStickyNote className="mr-2" />
                <p><strong>Notes:</strong> {workout.notes}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  className="btn bg-purple-600 hover:bg-purple-600/50 mr-2 px-6 py-2 text-sm font-medium text-white transition-transform duration-300 hover:scale-105"
                  onClick={() => handleEdit(workout)}
                >
                  Edit
                </button>
                <button
                  className="btn bg-indigo-600 hover:bg-indigo-600/50 px-6 py-2 text-sm font-medium text-white transition-transform duration-300 hover:scale-105"
                  onClick={() => handleDelete(workout.user_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal para editar workout */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg w-1/3">
            <h2 className="text-2xl mb-4">Edit Workout</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm mb-2">Exercises</label>
                <input
                  type="text"
                  name="exercises"
                  placeholder={editWorkout.exercises}
                  value={editWorkout.exercises || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Date</label>
                <input
                  type="date"
                  name="workout_date"
                  placeholder={editWorkout.workout_date}
                  value={editWorkout.workout_date ? editWorkout.workout_date.split('T')[0] : ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Type</label>
                <select
                  name="workout_type"
                  value={editWorkout.workout_type || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                >
                  <option value="">Select Type</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Strength">Strength</option>
                  <option value="Flexibility">Flexibility</option>
                  <option value="Balance">Balance</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Duration (mins)</label>
                <input
                  type="number"
                  name="duration_minutes"
                  placeholder={editWorkout.duration_minutes}
                  value={editWorkout.duration_minutes || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Intensity</label>
                <input
                  type="text"
                  name="intensity_level"
                  placeholder={editWorkout.intensity_level}
                  value={editWorkout.intensity_level || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Burned Calories</label>
                <input
                  type="number"
                  name="calories_burned"
                  placeholder={editWorkout.calories_burned}
                  value={editWorkout.calories_burned || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Notes</label>
                <textarea
                  name="notes"
                  placeholder={editWorkout.notes}
                  value={editWorkout.notes || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn btn-primary bg-purple-600 hover:bg-purple-600/50 mr-2 transition-transform duration-300 hover:scale-105"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-primary bg-indigo-600 hover:bg-indigo-600/50 transition-transform duration-300 hover:scale-105"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Modal para crear workout */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg w-1/3 z-60">
            <h2 className="text-2xl mb-4">Add Workout</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm mb-2">Exercises</label>
                <input
                  type="text"
                  name="exercises"
                  placeholder="Enter exercises"
                  value={newWorkout.exercises || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Date</label>
                <input
                  type="date"
                  name="workout_date"
                  value={newWorkout.workout_date || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Type</label>
                <select
                  name="workout_type"
                  value={newWorkout.workout_type || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                >
                  <option value="">Select Type</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Strength">Strength</option>
                  <option value="Flexibility">Flexibility</option>
                  <option value="Balance">Balance</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Duration (mins)</label>
                <input
                  type="number"
                  name="duration_minutes"
                  placeholder="Enter duration in minutes"
                  value={newWorkout.duration_minutes || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Intensity</label>
                <select
                  name="intensity_level"
                  value={newWorkout.intensity_level || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                >
                  <option value="">Select Intensity</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Burned Calories</label>
                <input
                  type="number"
                  name="calories_burned"
                  placeholder="Enter burned calories"
                  value={newWorkout.calories_burned || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Notes</label>
                <textarea
                  name="notes"
                  placeholder="Enter notes"
                  value={newWorkout.notes || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn btn-primary bg-purple-600 hover:bg-purple-600/50 mr-2 transition-transform duration-300 hover:scale-105"
                  onClick={handleCreateSave}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="btn btn-primary bg-indigo-600 hover:bg-indigo-600/50 transition-transform duration-300 hover:scale-105"
                  onClick={handleCloseCreateModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workouts;
