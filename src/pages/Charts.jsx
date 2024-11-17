import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import axios from 'axios';
import { RiBarChartFill } from 'react-icons/ri';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

function Charts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Obtener todos los workouts almacenados al cargar el componente
    axios
      .get('http://localhost:5000/api/workouts')
      .then((response) => {
        setWorkouts(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los workouts:', error);
      });
  }, []);

  // Datos para el gráfico de barras apiladas
  const barChartData = {
    labels: ['Cardio', 'Strength', 'Flexibility', 'Balance', 'Mixed'],
    datasets: [
      {
        label: 'Low Intensity',
        data: workouts.filter(w => w.intensity_level === 'Low').reduce((acc, curr) => {
          acc[curr.workout_type] = (acc[curr.workout_type] || 0) + 1;
          return acc;
        }, { Cardio: 0, Strength: 0, Flexibility: 0, Balance: 0, Mixed: 0 }),
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
      },
      {
        label: 'Medium Intensity',
        data: workouts.filter(w => w.intensity_level === 'Medium').reduce((acc, curr) => {
          acc[curr.workout_type] = (acc[curr.workout_type] || 0) + 1;
          return acc;
        }, { Cardio: 0, Strength: 0, Flexibility: 0, Balance: 0, Mixed: 0 }),
        backgroundColor: 'rgba(255, 206, 86, 0.5)'
      },
      {
        label: 'High Intensity',
        data: workouts.filter(w => w.intensity_level === 'High').reduce((acc, curr) => {
          acc[curr.workout_type] = (acc[curr.workout_type] || 0) + 1;
          return acc;
        }, { Cardio: 0, Strength: 0, Flexibility: 0, Balance: 0, Mixed: 0 }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };

  // Datos para el gráfico de líneas
  const lineChartData = {
    labels: workouts.map(workout => workout.workout_date.split('T')[0]),
    datasets: [
      {
        label: 'Calories Burned',
        data: workouts.map(workout => workout.calories_burned),
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-3 mb-6">
        < RiBarChartFill className="text-4xl text-indigo-600" />
        <h1 className="text-4xl font-bold text-white">Workout Statistics</h1>
      </div>

      {/* Gráfico de Barras Apiladas */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Workout Types by Intensity</h2>
        <Bar data={barChartData} options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Number of Workouts by Type and Intensity'
            }
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            }
          }
        }} />
      </div>

      {/* Gráfico de Líneas */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Calories Burned Over Time</h2>
        <Line data={lineChartData} options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Calories Burned Over Time'
            }
          }
        }} />
      </div>
    </div>
  );
}

export default Charts;
