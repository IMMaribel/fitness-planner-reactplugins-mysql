
function LocationList({ locations, handleDeleteLocation }) {
  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4">Saved Locations</h2>
      {locations.length === 0 ? (
        <p className="text-gray-300">No locations saved.</p>
      ) : (
        <ul className="space-y-3">
          {locations.map((location) => (
            <li key={location.id} className="flex justify-between items-center p-2 bg-gray-700 rounded-md">
              <div>
                <p className="text-white font-semibold">{location.name}</p>
                <p className="text-gray-400 text-sm">{location.type}</p>
              </div>
              <button
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => handleDeleteLocation(location.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationList;
