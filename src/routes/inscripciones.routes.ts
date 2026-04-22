import { Router } from 'express';
import { listarTodas, listarMisInscripciones, crearInscripcion, abandonar } from '../controllers/inscripcion.controller';
import { verificarToken } from '../middlewares/auth.middleware';
import { verificarRol } from '../middlewares/roles.middleware';

const router = Router();

router.use(verificarToken);

router.get('/', verificarRol('admin'), listarTodas);
router.get('/mis-inscripciones', verificarRol('alumno'), listarMisInscripciones);
router.post('/', verificarRol('alumno'), crearInscripcion);
router.patch('/:id/abandonar', verificarRol('alumno'), abandonar);

export default router;