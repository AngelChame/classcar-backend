import { Router } from 'express';
import { listarAutomoviles, obtenerUnAutomovil, crearNuevoAutomovil, editarAutomovil, modificarEstadoAutomovil } from '../controllers/automovil.controller';
import { verificarToken } from '../middlewares/auth.middleware';
import { verificarRol } from '../middlewares/roles.middleware';

const router = Router();

router.use(verificarToken);

router.get('/', verificarRol('admin', 'instructor'), listarAutomoviles);
router.get('/:id', verificarRol('admin'), obtenerUnAutomovil);

router.post('/', verificarRol('admin'), crearNuevoAutomovil);
router.put('/:id', verificarRol('admin'), editarAutomovil);
router.patch('/:id/estado', verificarRol('admin'), modificarEstadoAutomovil);

export default router;