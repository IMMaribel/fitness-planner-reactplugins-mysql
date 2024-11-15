import { Router } from 'express';
import db from '../db.js';

const router = Router();

// Obtener todos los workouts
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

// Actualizar un workout
router.put('/workouts/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { workout_date, workout_type, duration_minutes, intensity_level, exercises, calories_burned, notes } = req.body;

  console.log('Datos recibidos para actualizar el workout:', {
    workout_date,
    workout_type,
    duration_minutes,
    intensity_level,
    exercises,
    calories_burned,
    notes,
  });

  if (!workout_date || !workout_type || !duration_minutes || !intensity_level || !exercises) {
    return res.status(400).json({ error: 'Por favor, proporciona todos los campos requeridos' });
  }

  const sql = `
    UPDATE workouts 
    SET workout_date = ?, workout_type = ?, duration_minutes = ?, intensity_level = ?, exercises = ?, calories_burned = ?, notes = ?
    WHERE user_id = ?
  `;

  db.query(sql, [workout_date, workout_type, duration_minutes, intensity_level, exercises, calories_burned || null, notes || null, user_id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el workout:', err);
      return res.status(500).json({ error: 'Error al actualizar el workout' });
    } else if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Workout no encontrado' });
    } else {
      return res.json({ message: 'Workout actualizado correctamente' });
    }
  });
});

// Crear un nuevo workout
router.post('/workouts', (req, res) => {
  const { workout_date, workout_type, duration_minutes, intensity_level, exercises, calories_burned, notes } = req.body;

  if (!workout_date || !workout_type || !duration_minutes || !intensity_level || !exercises) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  const sql = `
    INSERT INTO workouts (workout_date, workout_type, duration_minutes, intensity_level, exercises, calories_burned, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [workout_date, workout_type, duration_minutes, intensity_level, exercises, calories_burned || 0, notes || ''], (err, result) => {
    if (err) {
      console.error('Error al crear el workout:', err);
      return res.status(500).json({ error: 'Error creating the workout' });
    }

    // Nuevo workout
    const newWorkout = {
      user_id: result.insertId,
      workout_date,
      workout_type,
      duration_minutes,
      intensity_level,
      exercises,
      calories_burned,
      notes
    };

    res.status(201).json(newWorkout);
  });
});

export default router;
