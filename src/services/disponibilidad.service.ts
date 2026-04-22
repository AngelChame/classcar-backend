import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const obtenerDisponibilidad = async (instructorId?: number) => {
    if (instructorId) {
        return await prisma.disponibilidadInstructor.findMany({
            where: { instructorId, activo: true }
        });
    }
    return await prisma.disponibilidadInstructor.findMany({
        where: { activo: true },
        include: { instructor: { include: { usuario: { select: { nombre: true, apellidoPaterno: true } } } } }
    });
};

export const crearDisponibilidad = async (instructorId: number, data: any) => {
    return await prisma.disponibilidadInstructor.create({
        data: {
            instructorId,
            diaSemana: data.diaSemana,
            horaInicio: new Date(`1970-01-01T${data.horaInicio}Z`),
            horaFin: new Date(`1970-01-01T${data.horaFin}Z`),
            activo: true
        }
    });
};

export const eliminarDisponibilidad = async (id: number, instructorId: number) => {
    return await prisma.$transaction(async (tx) => {
        const slot = await tx.disponibilidadInstructor.findUnique({
            where: { id }
        });

        if (!slot) throw new Error('slot_no_encontrado');
        if (slot.instructorId !== instructorId) throw new Error('no_autorizado_para_eliminar_este_slot');

        await tx.disponibilidadInstructor.update({
            where: { id },
            data: { activo: false }
        });

        return { id, mensaje: 'Slot desactivado' };
    });
};