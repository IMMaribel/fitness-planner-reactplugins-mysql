
function WorkoutCreateModal({ newWorkout, handleCreateChange, handleCreateSave, handleCloseCreateModal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg w-full max-w-sm md:w-2/3 lg:w-1/2 overflow-y-auto">
            <h2 className="text-xl sm:text-2xl mb-4">Add Workout</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm sm:text-base mb-2 text-gray-200">Exercises</label>
                <input
                  type="text"
                  name="exercises"
                  placeholder="Enter exercises"
                  value={newWorkout.exercises || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 sm:p-3 rounded-md bg-gray-800 text-gray-100 text-sm sm:text-base"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-base mb-2 text-gray-200">Date</label>
                <input
                  type="date"
                  name="workout_date"
                  value={newWorkout.workout_date || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 sm:p-3 rounded-md bg-gray-800 text-gray-100 text-sm sm:text-base"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-base mb-2 text-gray-200">Type</label>
                <select
                  name="workout_type"
                  value={newWorkout.workout_type || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 sm:p-3 rounded-md bg-gray-800 text-gray-100 text-sm sm:text-base"
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
                  placeholder="Enter duration in minutes"
                  value={newWorkout.duration_minutes || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-base mb-2 text-gray-200">Intensity</label>
                <select
                  name="intensity_level"
                  value={newWorkout.intensity_level || ''}
                  onChange={handleCreateChange}
                  className="select-dropdown w-full p-2 sm:p-3 rounded-md bg-gray-800 text-gray-100 text-sm sm:text-base"
                  tabIndex={0}
                >
                  <option value="" disabled>Select Intensity</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-base mb-2 text-gray-200">Burned Calories</label>
                <input
                  type="number"
                  name="calories_burned"
                  placeholder="Enter burned calories"
                  value={newWorkout.calories_burned || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 sm:p-3 rounded-md bg-gray-800 text-gray-100 text-sm sm:text-base"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm sm:text-base mb-2 text-gray-200">Notes</label>
                <textarea
                  name="notes"
                  placeholder="Enter notes"
                  value={newWorkout.notes || ''}
                  onChange={handleCreateChange}
                  className="w-full p-2 sm:p-3 rounded-md bg-gray-800 text-gray-100 text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                <button
                  type="button"
                  className="w-full sm:w-auto btn btn-primary bg-purple-600 hover:bg-purple-600/80 transition-transform duration-300 hover:scale-105 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-md"
                  onClick={handleCreateSave}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="w-full sm:w-auto btn btn-secondary bg-indigo-600 hover:bg-indigo-600/80 transition-transform duration-300 hover:scale-105 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-md5"
                  onClick={handleCloseCreateModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
  );
}

export default WorkoutCreateModal;
