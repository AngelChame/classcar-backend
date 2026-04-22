import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

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