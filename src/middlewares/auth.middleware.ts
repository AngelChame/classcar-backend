import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extendemos Request para inyectar los datos del usuario decodificado
export interface AuthRequest extends Request {
    usuario?: any;
}

export const verificarToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Leer el header Authorization: Bearer <token>
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            ok: false,
            error: 'no_autorizado',
            mensaje: 'No se proporcionó un token de acceso'
        });
    }

    try {
        // Verificar con jwt.verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        // Adjuntar el payload a req.usuario
        req.usuario = decoded;
        next();
    } catch (error) {
        // Si expiró o es inválido, responder 401
        return res.status(401).json({
            ok: false,
            error: 'token_expirado',
            mensaje: 'Token inválido o expirado'
        });
    }
};