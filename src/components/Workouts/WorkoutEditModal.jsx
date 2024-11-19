import React from 'react';

function WorkoutEditModal({ editWorkout, handleChange, handleSave, handleCloseModal }) {
  return (
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
            <option value="" disabled>Select Type</option>
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
          <select
            name="intensity_level"
            value={editWorkout.intensity_level || ''}
            onChange={handleChange}
            className="select-dropdown"
            tabIndex={0}
          >
            <option value="" disabled>Select Intensity</option>
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
        <div className="flex justify-center space-x-2">
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
  );
}

export default WorkoutEditModal;
