import { Router } from 'express';
import { listarDisponibilidad, crearSlot, eliminarSlot } from '../controllers/disponibilidad.controller';
import { verificarToken } from '../middlewares/auth.middleware';
import { verificarRol } from '../middlewares/roles.middleware';

const router = Router();

router.use(verificarToken);

// Rutas de consulta
router.get('/', listarDisponibilidad);
router.get('/:instructorId', listarDisponibilidad);

// Rutas de gestión (solo instructores)
router.post('/', verificarRol('instructor'), crearSlot);
router.delete('/:id', verificarRol('instructor'), eliminarSlot);

export default router;