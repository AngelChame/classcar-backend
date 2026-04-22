import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const obtenerAutomoviles = async () => {
    return await prisma.automovil.findMany();
};

export const obtenerAutomovilPorId = async (id: number) => {
    const auto = await prisma.automovil.findUnique({
        where: { id }
    });
    if (!auto) throw new Error('automovil_no_encontrado');
    return auto;
};

export const crearAutomovil = async (data: any) => {
    return await prisma.automovil.create({
        data: {
            modelo: data.modelo,
            placa: data.placa,
            estado: data.estado || 'disponible'
        }
    });
};

export const actualizarAutomovil = async (id: number, data: any) => {
    return await prisma.automovil.update({
        where: { id },
        data: {
            modelo: data.modelo,
            placa: data.placa
        }
    });
};

export const cambiarEstadoAutomovil = async (id: number, estado: string) => {
    return await prisma.automovil.update({
        where: { id },
        data: { estado }
    });
};