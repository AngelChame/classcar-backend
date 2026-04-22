import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { obtenerClasesUsuario, obtenerClasePorId, crearReserva, cancelarClase, completarClase, asignarAutomovil,obtenerTodasLasClasesAdmin } from '../services/clase.service';

export const listarMisClases = async (req: AuthRequest, res: Response) => {
    try {
        const result = await obtenerClasesUsuario(req.usuario.id, req.usuario.rol);
        res.status(200).json({ ok: true, data: result, mensaje: "Clases obtenidas" });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: "error_servidor", mensaje: error.message });
    }
};

export const verDetalleClase = async (req: AuthRequest, res: Response) => {
    try {
        const result = await obtenerClasePorId(Number(req.params.id));
        res.status(200).json({ ok: true, data: result, mensaje: "Detalle de clase" });
    } catch (error: any) {
        res.status(404).json({ ok: false, error: "no_encontrado", mensaje: error.message });
    }
};

export const reservarClase = async (req: AuthRequest, res: Response) => {
    try {
        const result = await crearReserva(req.usuario.id, req.body);
        res.status(201).json({ ok: true, data: result, mensaje: "Clase reservada exitosamente" });
    } catch (error: any) {
        const status = ['conflicto_horario_instructor', 'conflicto_horario_alumno', 'limite_clases_superado', 'slot_no_disponible'].includes(error.message) ? 409 : 400;
        res.status(status).json({ ok: false, error: error.message, mensaje: "No se pudo reservar la clase" });
    }
};

export const cancelar = async (req: AuthRequest, res: Response) => {
    try {
        const result = await cancelarClase(Number(req.params.id), req.body.motivo);
        res.status(200).json({ ok: true, data: result, mensaje: "Clase cancelada" });
    } catch (error: any) {
        res.status(400).json({ ok: false, error: "error_cancelacion", mensaje: error.message });
    }
};

export const completar = async (req: AuthRequest, res: Response) => {
    try {
        const result = await completarClase(Number(req.params.id));
        res.status(200).json({ ok: true, data: result, mensaje: "Clase completada" });
    } catch (error: any) {
        res.status(400).json({ ok: false, error: "error_actualizacion", mensaje: error.message });
    }
};

export const asignarAuto = async (req: AuthRequest, res: Response) => {
    try {
        const result = await asignarAutomovil(Number(req.params.id), Number(req.body.automovilId));
        res.status(200).json({ ok: true, data: result, mensaje: "Automóvil asignado" });
    } catch (error: any) {
        res.status(400).json({ ok: false, error: "error_actualizacion", mensaje: error.message });
    }
};

export const listarTodasLasClases = async (req: AuthRequest, res: Response) => {
    try {
        const result = await obtenerTodasLasClasesAdmin();
        res.status(200).json({ ok: true, data: result, mensaje: "Clases obtenidas" });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: "error_servidor", mensaje: error.message });
    }
};