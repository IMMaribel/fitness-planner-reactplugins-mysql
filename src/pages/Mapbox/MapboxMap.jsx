import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import MarkerDetailsForm from './MarkerDetailsForm';
import LocationList from './LocationList';
import LocationFilter from './LocationFilter';
import axios from 'axios';
import { RiMapPinFill } from 'react-icons/ri';

function MapboxMap() {
  const [viewport, setViewport] = useState({
    latitude: 41.3879,
    longitude: 2.16992,
    zoom: 10,
    width: '100%',
    height: '500px',
  });

  const [marker, setMarker] = useState(null);
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: '',
    type: 'Gym',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Obtener todas las ubicaciones desde la API
  const fetchLocations = () => {
    axios
      .get('http://localhost:5000/api/locations')
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las ubicaciones:', error);
      });
  };

  useEffect(() => {
    // Obtener todas las ubicaciones al cargar el componente
    fetchLocations();
  }, []);

  // Manejar los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Guardar la ubicación en la base de datos
  const handleSaveLocation = () => {
    if (marker) {
      const locationData = {
        name: newLocation.name || 'Unnamed Location',
        latitude: marker.latitude,
        longitude: marker.longitude,
        type: newLocation.type,
        description: 'A new location added to the map',
      };

      axios
        .post('http://localhost:5000/api/locations', locationData)
        .then((response) => {
          alert('Location saved successfully');
          setMarker(null);
          fetchLocations();
        })
        .catch((error) => {
          console.error('Error al guardar la ubicación:', error);
          alert('Failed to save the location');
        });
    } else {
      alert('Please select a location on the map first.');
    }
  };

  // Eliminar la ubicación de la lista
  const handleDeleteLocation = (id) => {
    axios
      .delete(`http://localhost:5000/api/locations/${id}`)
      .then(() => {
        alert('Location deleted successfully');
        fetchLocations(); // Actualizar la lista de ubicaciones después de eliminar
      })
      .catch((error) => {
        console.error('Error al eliminar la ubicación:', error);
        alert('Failed to delete the location');
      });
  };

  // Manejar el cambio de búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Buscar la ubicación
  const handleSearch = () => {
    if (searchQuery) {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            searchQuery
          )}.json?access_token=pk.eyJ1IjoibWFyaWJlbDciLCJhIjoiY20za3BuM2UzMGV1bzJyczlwYnNocXlldCJ9.CWEUVYsCagxJ9xT-_ieVsA`
        )
        .then((response) => {
          if (response.data.features.length > 0) {
            const { center } = response.data.features[0];
            setViewport({
              ...viewport,
              longitude: center[0],
              latitude: center[1],
              zoom: 14,
            });
            setMarker({
              latitude: center[1],
              longitude: center[0],
            });
          } else {
            alert('Location not found. Please try again.');
          }
        })
        .catch((error) => {
          console.error('Error searching for the location:', error);
          alert('Failed to search for the location.');
        });
    }
  };

  // Filtrar ubicaciones antes de mostrarlas en el mapa
  const filteredLocations =
    filterType === 'All'
      ? locations
      : locations.filter((location) => location.type === filterType);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-3 mb-6">
        <RiMapPinFill className="text-4xl text-indigo-600" />
        <h1 className="text-4xl font-bold text-white">Map</h1>
      </div>

      {/* Buscador */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a location..."
          className="mt-1 p-2 text-black border border-gray-300 rounded-md w-full"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:bg-blue-400 text-white p-2 rounded-none transition-transform duration-500 hover:scale-110"
        >
          Search
        </button>
      </div>

      {/* Filtro de ubicaciones */}
      <LocationFilter filterType={filterType} setFilterType={setFilterType} />

      <MapContainer
        viewport={viewport}
        setViewport={setViewport}
        marker={marker}
        setMarker={setMarker}
        locations={filteredLocations}
      />

      <MarkerDetailsForm
        newLocation={newLocation}
        handleInputChange={handleInputChange}
        handleSaveLocation={handleSaveLocation}
      />

      <LocationList
        locations={filteredLocations}
        handleDeleteLocation={handleDeleteLocation}
      />
    </div>
  );
}

export default MapboxMap;
