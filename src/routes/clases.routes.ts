import { Router } from 'express';
import { listarMisClases, verDetalleClase, reservarClase, cancelar, completar, asignarAuto,listarTodasLasClases } from '../controllers/clase.controller';
import { verificarToken } from '../middlewares/auth.middleware';
import { verificarRol } from '../middlewares/roles.middleware';

const router = Router();

router.use(verificarToken);

router.get('/mis-clases', verificarRol('alumno', 'instructor'), listarMisClases);
router.get('/:id', verDetalleClase);

router.post('/', verificarRol('alumno'), reservarClase);
router.patch('/:id/cancelar', verificarRol('alumno', 'admin'), cancelar);
router.patch('/:id/completar', verificarRol('instructor', 'admin'), completar);
router.patch('/:id/automovil', verificarRol('admin'), asignarAuto);
router.get('/', verificarToken, verificarRol('admin'), listarTodasLasClases);

export default router;