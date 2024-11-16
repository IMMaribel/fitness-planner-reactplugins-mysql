import { useState, useEffect } from 'react';
import axios from 'axios';

function useWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/workouts')
      .then(response => {
        setWorkouts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los workouts:', error);
        setErrorMessage('There was an error fetching the workouts. Please try again.');
      });
  }, []);

  return { workouts, setWorkouts, errorMessage, setErrorMessage };
}

export default useWorkouts;
