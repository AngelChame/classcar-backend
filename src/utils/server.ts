import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from '../routes/auth.routes';
import usuariosRoutes from '../routes/usuarios.routes';
import cursosRoutes from '../routes/cursos.routes';
import automovilesRoutes from '../routes/automoviles.routes';
import disponibilidadRoutes from '../routes/disponibilidad.routes';
import inscripcionesRoutes from '../routes/inscripciones.routes';
import clasesRoutes from '../routes/clases.routes';
import bitacoraRoutes from '../routes/bitacora.routes';

import { seedAdmin } from './initadmin';

dotenv.config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3001'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/automoviles', automovilesRoutes);
app.use('/api/instructores/disponibilidad', disponibilidadRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);
app.use('/api/clases', clasesRoutes);
app.use('/api/bitacora', bitacoraRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedAdmin(); 
});

export default app;