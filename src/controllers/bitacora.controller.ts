import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { obtenerHistorialBitacora } from '../services/bitacora.service';

export const listarBitacora = async (req: AuthRequest, res: Response) => {
    try {
        const result = await obtenerHistorialBitacora();
        res.status(200).json({ ok: true, data: result, mensaje: "Historial de bitácora obtenido" });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: "error_servidor", mensaje: error.message });
    }
};