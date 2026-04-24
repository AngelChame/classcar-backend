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

dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://classcar-frontend.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/automoviles', automovilesRoutes);
app.use('/api/instructores/disponibilidad', disponibilidadRoutes);
app.use('/api/inscripciones', inscripcionesRoutes);
app.use('/api/clases', clasesRoutes);
app.use('/api/bitacora', bitacoraRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;