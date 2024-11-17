import express from 'express';
import cors from 'cors';
import workoutsRoutes from './routes/workouts.js';
import locationsRoutes from './routes/locations.js';
import calendarRoutes from './routes/calendar.js';
import chart from './routes/chart.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'  
}));
app.use(express.json()); 


app.use('/api', workoutsRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/chart', chart);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
