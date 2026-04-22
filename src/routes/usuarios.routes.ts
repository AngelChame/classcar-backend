import { Router } from 'express';
import { crearUsuario, listarUsuarios } from '../controllers/usuario.controller';
import { verificarToken } from '../middlewares/auth.middleware';
import { verificarRol } from '../middlewares/roles.middleware';

const router = Router();

router.use(verificarToken);
router.use(verificarRol('admin'));

router.post('/', crearUsuario);
router.get('/', listarUsuarios);

export default router;