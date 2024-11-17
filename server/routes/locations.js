import express from 'express';
import db from '../db.js';

const router = express.Router();

// Ruta para obtener todas las ubicaciones
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM locations';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener ubicaciones:', err);
      return res.status(500).json({ error: 'Error al obtener ubicaciones' });
    }
    res.json(results);
  });
});

// Ruta para agregar una nueva ubicación
router.post('/', (req, res) => {
  const { name, latitude, longitude, type, description } = req.body;

  // Verificación de datos para asegurarnos de que los datos son válidos
  if (!name || !latitude || !longitude || !type || !description) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = `
    INSERT INTO locations (name, latitude, longitude, type, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, latitude, longitude, type, description], (err, result) => {
    if (err) {
      console.error('Error al agregar la ubicación:', err);
      return res.status(500).json({ error: 'Error al agregar la ubicación' });
    }
    res.json({ message: 'Ubicación agregada correctamente', id: result.insertId });
  });
});

// Ruta para eliminar una ubicación (si necesitas esta funcionalidad)
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM locations WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la ubicación:', err);
      return res.status(500).json({ error: 'Error al eliminar la ubicación' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    res.json({ message: 'Ubicación eliminada correctamente' });
  });
});

export default router;
