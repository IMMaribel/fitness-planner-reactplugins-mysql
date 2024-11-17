import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapContainer({ viewport, setViewport, marker, setMarker }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Obtener todas las ubicacionesç
    axios
      .get('http://localhost:5000/api/locations')
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las ubicaciones:', error);
      });
  }, []);

    const handleMapClick = (event) => {
        const { lng, lat } = event.lngLat;
        setMarker({ latitude: lat, longitude: lng });
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
        {locations.map((location) => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
            onClick={() => handleMapClick(location.id)}
          >
            <div className=" w-4 h-4 rounded-full cursor-pointer border-2 border-white"></div>
          </Marker>
        ))}

        {/* Marcador para nueva ubicación*/}
        {marker && (
          <Marker latitude={marker.latitude} longitude={marker.longitude}>

            <div className="bg-blue-700 w-4 h-4 rounded-full cursor-pointer border-2 border-white"></div>
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
