import express from 'express';
import db from '../db.js';

const router = express.Router();

// Ruta para obtener datos para los gráficos (por ejemplo, calorías y tipos de ejercicios)
router.get('/chart-data', (req, res) => {
    const sql = `
      SELECT workout_type, SUM(calories_burned) as total_calories, COUNT(*) as count
      FROM workouts
      GROUP BY workout_type
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error al obtener datos del gráfico:', err);
        res.status(500).json({ error: 'Error al obtener datos del gráfico' });
      } else {
        res.json(results);
      }
    });
  });
  
  export default router;