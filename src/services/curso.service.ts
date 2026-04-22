import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const obtenerCursos = async () => {
    return await prisma.curso.findMany({
        where: { activo: true }
    });
};

export const obtenerCursoPorId = async (id: number) => {
    const curso = await prisma.curso.findUnique({
        where: { id }
    });
    if (!curso) throw new Error('curso_no_encontrado');
    return curso;
};

export const crearNuevoCurso = async (data: any) => {
    return await prisma.curso.create({
        data: {
            nombre: data.nombre,
            descripcion: data.descripcion,
            duracion: data.duracion
        }
    });
};

export const actualizarCurso = async (id: number, data: any) => {
    return await prisma.curso.update({
        where: { id },
        data: {
            nombre: data.nombre,
            descripcion: data.descripcion,
            duracion: data.duracion
        }
    });
};

export const cambiarEstadoCurso = async (id: number, activo: boolean) => {
    return await prisma.curso.update({
        where: { id },
        data: { activo }
    });
};