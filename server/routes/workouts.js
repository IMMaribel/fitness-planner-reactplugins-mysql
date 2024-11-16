import express from 'express';
import db from '../db.js';

const router = express.Router();

// Ruta para obtener todos los workouts
router.get('/workouts', (req, res) => {
  const sql = 'SELECT * FROM workouts';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener los workouts:', err);
      res.status(500).json({ error: 'Error al obtener los workouts' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para crear un nuevo workout
router.post('/workouts', (req, res) => {
  const { workout_date, workout_type, duration_minutes, intensity_level, exercises, calories_burned, notes } = req.body;

  const sql = `
    INSERT INTO workouts (workout_date, workout_type, duration_minutes, intensity_level, exercises, calories_burned, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [workout_date, workout_type, duration_minutes, intensity_level, exercises, calories_burned, notes], (err, results) => {
    if (err) {
      console.error('Error al crear el workout:', err);
      res.status(500).json({ error: 'Error al crear el workout' });
    } else {
      res.json({ user_id: results.insertId, ...req.body });
    }
  });
});

// Ruta para actualizar un workout
router.put('/workouts/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { workout_date, workout_type, duration_minutes, intensity_level, exercises, calories_burned, notes } = req.body;

  const sql = `
    UPDATE workouts 
    SET workout_date = ?, workout_type = ?, duration_minutes = ?, intensity_level = ?, exercises = ?, calories_burned = ?, notes = ?
    WHERE user_id = ?
  `;

  db.query(sql, [workout_date, workout_type, duration_minutes, intensity_level, exercises, calories_burned, notes, user_id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el workout:', err);
      res.status(500).json({ error: 'Error al actualizar el workout' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Workout no encontrado' });
    } else {
      res.json({ message: 'Workout actualizado correctamente' });
    }
  });
});

// **Ruta para eliminar un workout**
router.delete('/workouts/:user_id', (req, res) => {
  const { user_id } = req.params;

  const sql = 'DELETE FROM workouts WHERE user_id = ?';

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Error al eliminar el workout:', err);
      res.status(500).json({ error: 'Error al eliminar el workout' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Workout no encontrado' });
    } else {
      res.json({ message: 'Workout eliminado correctamente' });
    }
  });
});

export default router;
