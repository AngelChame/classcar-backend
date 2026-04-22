import { Router } from 'express';
import { listarBitacora } from '../controllers/bitacora.controller';
import { verificarToken } from '../middlewares/auth.middleware';
import { verificarRol } from '../middlewares/roles.middleware';

const router = Router();

router.use(verificarToken);

router.get('/', verificarRol('admin'), listarBitacora);

export default router;