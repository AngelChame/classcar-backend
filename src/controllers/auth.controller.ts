import { Request, Response } from 'express';
import { registerUser, loginUser, actualizarPassword } from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export const register = async (req: Request, res: Response) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json({
            ok: true,
            data: result,
            mensaje: "Usuario registrado exitosamente"
        });
    } catch (error: any) {
        res.status(400).json({
            ok: false,
            error: "error_registro",
            mensaje: error.message
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const result = await loginUser(req.body);
        res.status(200).json({
            ok: true,
            data: result,
            mensaje: "Login exitoso"
        });
    } catch (error: any) {
        res.status(401).json({
            ok: false,
            error: "no_autorizado",
            mensaje: "Credenciales invalidas"
        });
    }
};

// Ahora TypeScript ya sabe qué es AuthRequest
export const cambiarPassword = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.usuario || !req.usuario.id) {
            return res.status(401).json({ ok: false, error: "no_autorizado", mensaje: "Token inválido" });
        }

        const { passwordActual, passwordNueva } = req.body;

        if (!passwordActual || !passwordNueva) {
            return res.status(400).json({ ok: false, error: "datos_incompletos", mensaje: "Ambas contraseñas son requeridas" });
        }

        const result = await actualizarPassword(req.usuario.id, passwordActual, passwordNueva);
        
        res.status(200).json({ ok: true, data: result, mensaje: "Contraseña actualizada exitosamente" });
    } catch (error: any) {
        const status = error.message === 'password_actual_incorrecta' ? 401 : 500;
        const mensajeHumanizado = error.message === 'password_actual_incorrecta' 
            ? "La contraseña actual no es correcta." 
            : error.message;

        res.status(status).json({ ok: false, error: error.message, mensaje: mensajeHumanizado });
    }
};