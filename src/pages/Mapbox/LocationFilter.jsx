import React from 'react';

function LocationFilter({ filterType, setFilterType }) {
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm mb-2 text-white">Filter by Location Type:</label>
      <select
        value={filterType}
        onChange={handleFilterChange}
        className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
      >
        <option value="All">All Locations</option>
        <option value="Gym">Gym</option>
        <option value="Yoga Club">Yoga Club</option>
        <option value="Crossfit">Crossfit</option>
        <option value="Public Park">Public Park</option>
        <option value="Outdoor Gym">Outdoor Gym</option>
      </select>
    </div>
  );
}

export default LocationFilter;
