import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { obtenerTodasLasInscripciones, obtenerMisInscripciones, inscribirAlumno, abandonarInscripcion } from '../services/inscripcion.service';

export const listarTodas = async (req: AuthRequest, res: Response) => {
    try {
        const result = await obtenerTodasLasInscripciones();
        res.status(200).json({ ok: true, data: result, mensaje: "Inscripciones obtenidas" });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: "error_servidor", mensaje: error.message });
    }
};

export const listarMisInscripciones = async (req: AuthRequest, res: Response) => {
    try {
        const result = await obtenerMisInscripciones(req.usuario.id);
        res.status(200).json({ ok: true, data: result, mensaje: "Mis inscripciones obtenidas" });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: "error_servidor", mensaje: error.message });
    }
};

export const crearInscripcion = async (req: AuthRequest, res: Response) => {
    try {
        const result = await inscribirAlumno(req.usuario.id, Number(req.body.cursoId));
        res.status(201).json({ ok: true, data: result, mensaje: "Inscripción exitosa" });
    } catch (error: any) {
        const status = error.message === 'alumno_ya_inscrito' ? 409 : 400;
        res.status(status).json({ ok: false, error: "error_inscripcion", mensaje: error.message });
    }
};

export const abandonar = async (req: AuthRequest, res: Response) => {
    try {
        const result = await abandonarInscripcion(Number(req.params.id), req.usuario.id);
        res.status(200).json({ ok: true, data: result, mensaje: "Inscripción abandonada" });
    } catch (error: any) {
        res.status(400).json({ ok: false, error: "error_actualizacion", mensaje: error.message });
    }
};