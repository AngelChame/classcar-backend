import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { cambiarPassword } from '../controllers/auth.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', login);
router.patch('/cambiar-password', verificarToken, cambiarPassword);

export default router;