import { Request, Response } from 'express';
import { obtenerCursos, obtenerCursoPorId, crearNuevoCurso, actualizarCurso, cambiarEstadoCurso } from '../services/curso.service';

export const listarCursos = async (req: Request, res: Response) => {
    try {
        const result = await obtenerCursos();
        res.status(200).json({ ok: true, data: result, mensaje: "Cursos obtenidos" });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: "error_servidor", mensaje: error.message });
    }
};

export const obtenerUnCurso = async (req: Request, res: Response) => {
    try {
        const result = await obtenerCursoPorId(Number(req.params.id));
        res.status(200).json({ ok: true, data: result, mensaje: "Curso obtenido" });
    } catch (error: any) {
        res.status(404).json({ ok: false, error: "no_encontrado", mensaje: error.message });
    }
};

export const crearCurso = async (req: Request, res: Response) => {
    try {
        const result = await crearNuevoCurso(req.body);
        res.status(201).json({ ok: true, data: result, mensaje: "Curso creado exitosamente" });
    } catch (error: any) {
        res.status(400).json({ ok: false, error: "error_creacion", mensaje: error.message });
    }
};

export const editarCurso = async (req: Request, res: Response) => {
    try {
        const result = await actualizarCurso(Number(req.params.id), req.body);
        res.status(200).json({ ok: true, data: result, mensaje: "Curso actualizado" });
    } catch (error: any) {
        res.status(400).json({ ok: false, error: "error_actualizacion", mensaje: error.message });
    }
};

export const cambiarEstado = async (req: Request, res: Response) => {
    try {
        const result = await cambiarEstadoCurso(Number(req.params.id), req.body.activo);
        res.status(200).json({ ok: true, data: result, mensaje: "Estado del curso actualizado" });
    } catch (error: any) {
        res.status(400).json({ ok: false, error: "error_actualizacion", mensaje: error.message });
    }
};