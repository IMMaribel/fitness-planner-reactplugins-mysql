import express from 'express';
import cors from 'cors';
import workoutsRoutes from './routes/workouts.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'  
}));
app.use(express.json()); 


app.use('/api', workoutsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
