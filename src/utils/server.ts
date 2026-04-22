import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../routes/auth.routes';
import usuariosRoutes from '../routes/usuarios.routes';
import cursosRoutes from '../routes/cursos.routes';
import automovilesRoutes from '../routes/automoviles.routes';
import disponibilidadRoutes from '../routes/disponibilidad.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/automoviles', automovilesRoutes);
app.use('/api/instructores/disponibilidad', disponibilidadRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;