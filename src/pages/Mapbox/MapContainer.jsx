import React from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapContainer({ viewport, setViewport, marker, setMarker, locations }) {
  // Manejar el clic en el mapa para agregar un marcador
  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat;
    if (lng && lat) {
      setMarker({ latitude: lat, longitude: lng });
    }
  };

  return (
    <div id="mapContainer" className="h-[700px] w-full">
      <ReactMapGL
        {...viewport}
        mapboxAccessToken="pk.eyJ1IjoibWFyaWJlbDciLCJhIjoiY20za3BuM2UzMGV1bzJyczlwYnNocXlldCJ9.CWEUVYsCagxJ9xT-_ieVsA"
        onMove={(evt) => setViewport(evt.viewState)}
        onClick={handleMapClick}
        mapStyle="mapbox://styles/maribel7/cm3kq376z00nx01scblezbo9i"
        dragPan={true}
        dragRotate={true}
        scrollZoom={true}
        touchZoomRotate={true}
        width="100%"
        height="600px"
      >
        {/* Mostrar ubicaciones guardadas */}
        {locations
          .filter((location) => location.latitude && location.longitude) // Filtrar para evitar valores inválidos
          .map((location) => (
            <Marker
              key={location.id}
              latitude={location.latitude}
              longitude={location.longitude}
            >
              <div className="w-4 h-4 rounded-full cursor-pointer border-2 border-indigo-600"></div>
              <span className="text-s mt-1 text-white bg-purple-600/50 px-1 py-0.5 rounded-md">
                {location.name}
              </span>
            </Marker>
          ))}

        {/* Marcador para nueva ubicación */}
        {marker && marker.latitude && marker.longitude && (
          <Marker latitude={marker.latitude} longitude={marker.longitude}>
            <div className="bg-indigo-600 w-4 h-4 rounded-full cursor-pointer border-2 border-white"></div>
          </Marker>
        )}

        {/* Control de navegación */}
        <div style={{ position: 'absolute', right: 10, top: 10 }}>
          <NavigationControl showCompass={true} showZoom={true} />
        </div>
      </ReactMapGL>
    </div>
  );
}

export default MapContainer;
