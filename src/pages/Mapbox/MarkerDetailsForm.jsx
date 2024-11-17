
function MarkerDetailsForm({ newLocation, handleInputChange, handleSaveLocation }) {
  return (
    <div className="mt-20">
      <div className="mb-4">
        <label className="block text-sm font-medium text-white" htmlFor="locationName">
          Location Name:
        </label>
        <input
          id="locationName"
          type="text"
          name="name"
          value={newLocation.name}
          onChange={handleInputChange}
          placeholder="Enter location name"
          className="mt-1 p-2 border border-gray-300 text-black rounded-md w-full"
          autoComplete="on"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-white" htmlFor="locationType">
          Location Type:
        </label>
        <select
          id="locationType"
          name="type"
          value={newLocation.type}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full text-slate-400"
          autoComplete="off"
        >
          <option value="Gym">Gym</option>
          <option value="Yoga Club">Yoga Club</option>
          <option value="Crossfit">Crossfit</option>
          <option value="Public Park">Public Park</option>
          <option value="Outdoor Gym">Outdoor Gym</option>
        </select>
      </div>
      <button
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:bg-blue-400 text-white p-2 rounded-none transition-transform duration-500 hover:scale-110"
        onClick={handleSaveLocation}
      >
        Save Location
      </button>
    </div>
  );
}

export default MarkerDetailsForm;
