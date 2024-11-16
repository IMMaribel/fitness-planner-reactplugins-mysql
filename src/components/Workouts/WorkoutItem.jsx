import React from 'react';
import { FaCalendarAlt, FaFireAlt, FaClock, FaDumbbell, FaHeartbeat, FaStickyNote } from 'react-icons/fa';

function WorkoutItem({ workout, handleEdit, handleDelete }) {
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
    <li className="mb-4 p-6 bg-gray-800 rounded-md shadow-lg flex relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 bg-center bg-cover"
        style={{ backgroundImage: `url(${getImageForWorkoutType(workout.workout_type)})` }}
      ></div>
      <div className="flex-shrink-0 relative z-10 self-center">
        <img
          src={getImageForWorkoutType(workout.workout_type)}
          alt={workout.workout_type}
          className="w-32 h-32 mr-4 rounded-md object-cover"
        />
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
          <FaFireAlt className="mr-2" />
          <p><strong>Burned Calories:</strong> {workout.calories_burned}</p>
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
  );
}

export default WorkoutItem;
