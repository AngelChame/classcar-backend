import { Router } from 'express';
import { listarCursos, obtenerUnCurso, crearCurso, editarCurso, cambiarEstado } from '../controllers/curso.controller';
import { verificarToken } from '../middlewares/auth.middleware';
import { verificarRol } from '../middlewares/roles.middleware';

const router = Router();

router.use(verificarToken);

router.get('/', listarCursos);
router.get('/:id', obtenerUnCurso);

router.post('/', verificarRol('admin'), crearCurso);
router.put('/:id', verificarRol('admin'), editarCurso);
router.patch('/:id/estado', verificarRol('admin'), cambiarEstado);

export default router;