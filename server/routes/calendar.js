import express from 'express';
import db from '../db.js';

const router = express.Router();

// Ruta para obtener todos los eventos del calendario
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM calendar_events';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener eventos del calendario:', err);
      res.status(500).json({ error: 'Error al obtener eventos del calendario' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para agregar un evento al calendario
router.post('/', (req, res) => {
  const { workout_id, event_date, title, description } = req.body;

  const sql = `
    INSERT INTO calendar_events (workout_id, event_date, title, description)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [workout_id, event_date, title, description], (err, result) => {
    if (err) {
      console.error('Error al agregar el evento:', err);
      res.status(500).json({ error: 'Error al agregar el evento' });
    } else {
      res.json({ message: 'Evento agregado correctamente', id: result.insertId });
    }
  });
});

export default router;
