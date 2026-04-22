import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const verificarRol = (...rolesPermitidos: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.usuario) {
            return res.status(500).json({
                ok: false,
                error: 'error_interno',
                mensaje: 'Se intentó verificar el rol sin validar el token primero'
            });
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                ok: false,
                error: 'acceso_denegado',
                mensaje: `El rol '${req.usuario.rol}' no tiene permisos para realizar esta acción`
            });
        }

        next();
    };
};