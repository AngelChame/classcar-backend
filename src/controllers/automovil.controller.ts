import { Request, Response } from 'express';
import { obtenerAutomoviles, obtenerAutomovilPorId, crearAutomovil, actualizarAutomovil, cambiarEstadoAutomovil } from '../services/automovil.service';

export const listarAutomoviles = async (req: Request, res: Response) => {
    try {
        const result = await obtenerAutomoviles();
        res.status(200).json({ ok: true, data: result, mensaje: "Automóviles obtenidos" });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: "error_servidor", mensaje: error.message });
    }
};

export const obtenerUnAutomovil = async (req: Request, res: Response) => {
    try {
        const result = await obtenerAutomovilPorId(Number(req.params.id));
        res.status(200).json({ ok: true, data: result, mensaje: "Automóvil obtenido" });
    } catch (error: any) {
        res.status(404).json({ ok: false, error: "no_encontrado", mensaje: error.message });
    }
};

export const crearNuevoAutomovil = async (req: Request, res: Response) => {
    try {
        const result = await crearAutomovil(req.body);
        res.status(201).json({ ok: true, data: result, mensaje: "Automóvil registrado exitosamente" });
    } catch (error: any) {
        res.status(400).json({ ok: false, error: "error_creacion", mensaje: error.message });
    }
};

export const editarAutomovil = async (req: Request, res: Response) => {
    try {
        const result = await actualizarAutomovil(Number(req.params.id), req.body);
        res.status(200).json({ ok: true, data: result, mensaje: "Automóvil actualizado" });
    } catch (error: any) {
        res.status(400).json({ ok: false, error: "error_actualizacion", mensaje: error.message });
    }
};

export const modificarEstadoAutomovil = async (req: Request, res: Response) => {
    try {
        const result = await cambiarEstadoAutomovil(Number(req.params.id), req.body.estado);
        res.status(200).json({ ok: true, data: result, mensaje: "Estado del automóvil actualizado" });
    } catch (error: any) {
        res.status(400).json({ ok: false, error: "error_actualizacion", mensaje: error.message });
    }
};