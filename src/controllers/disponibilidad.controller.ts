import { Request, Response } from 'express';
import { obtenerDisponibilidad, crearDisponibilidad, eliminarDisponibilidad } from '../services/disponibilidad.service';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const listarDisponibilidad = async (req: Request, res: Response) => {
    try {
        const instructorIdParam = req.params.instructorId ? Number(req.params.instructorId) : undefined;
        
        let instructorInternoId;
        if (instructorIdParam) {
            const instructor = await prisma.instructor.findUnique({ where: { usuarioId: instructorIdParam } });
            instructorInternoId = instructor?.id;
        }

        const result = await obtenerDisponibilidad(instructorInternoId);
        res.status(200).json({ ok: true, data: result, mensaje: "Disponibilidad obtenida" });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: "error_servidor", mensaje: error.message });
    }
};

export const crearSlot = async (req: AuthRequest, res: Response) => {
    try {
        const instructor = await prisma.instructor.findUnique({
            where: { usuarioId: req.usuario.id }
        });

        if (!instructor) {
            return res.status(403).json({ ok: false, error: "no_es_instructor", mensaje: "El usuario no tiene un perfil de instructor" });
        }

        const result = await crearDisponibilidad(instructor.id, req.body);
        res.status(201).json({ ok: true, data: result, mensaje: "Slot de disponibilidad creado" });
    } catch (error: any) {
        res.status(400).json({ ok: false, error: "error_creacion", mensaje: error.message });
    }
};

export const eliminarSlot = async (req: AuthRequest, res: Response) => {
    try {
        const instructor = await prisma.instructor.findUnique({
            where: { usuarioId: req.usuario.id }
        });

        if (!instructor) {
            return res.status(403).json({ ok: false, error: "no_es_instructor", mensaje: "El usuario no tiene un perfil de instructor" });
        }

        const result = await eliminarDisponibilidad(Number(req.params.id), instructor.id);
        res.status(200).json({ ok: true, data: result, mensaje: "Slot eliminado correctamente" });
    } catch (error: any) {
        res.status(400).json({ ok: false, error: "error_eliminacion", mensaje: error.message });
    }
};