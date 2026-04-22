import { Request, Response } from 'express';
import { crearNuevoUsuario, obtenerUsuarios } from '../services/usuario.service';

export const crearUsuario = async (req: Request, res: Response) => {
    try {
        const result = await crearNuevoUsuario(req.body);
        res.status(201).json({
            ok: true,
            data: result,
            mensaje: "Usuario creado y correo enviado"
        });
    } catch (error: any) {
        res.status(400).json({
            ok: false,
            error: "error_creacion",
            mensaje: error.message
        });
    }
};

export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const result = await obtenerUsuarios();
        res.status(200).json({
            ok: true,
            data: result,
            mensaje: "Lista de usuarios obtenida"
        });
    } catch (error: any) {
        res.status(500).json({
            ok: false,
            error: "error_servidor",
            mensaje: error.message
        });
    }
};