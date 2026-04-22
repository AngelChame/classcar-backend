import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const obtenerTodasLasInscripciones = async () => {
    return await prisma.inscripcion.findMany({
        include: {
            alumno: { select: { nombre: true, apellidoPaterno: true, correo: true } },
            curso: { select: { nombre: true } }
        }
    });
};

export const obtenerMisInscripciones = async (alumnoId: number) => {
    return await prisma.inscripcion.findMany({
        where: { alumnoId },
        include: { curso: true }
    });
};

export const inscribirAlumno = async (alumnoId: number, cursoId: number) => {
    const curso = await prisma.curso.findUnique({ where: { id: cursoId } });
    if (!curso || !curso.activo) {
        throw new Error('curso_no_disponible');
    }

    const inscripcionExistente = await prisma.inscripcion.findFirst({
        where: {
            alumnoId,
            cursoId,
            estado: 'activo'
        }
    });

    if (inscripcionExistente) {
        throw new Error('alumno_ya_inscrito');
    }

    return await prisma.inscripcion.create({
        data: {
            alumnoId,
            cursoId,
            fechaInicio: new Date(),
            estado: 'activo'
        }
    });
};

export const abandonarInscripcion = async (inscripcionId: number, alumnoId: number) => {
    const inscripcion = await prisma.inscripcion.findUnique({
        where: { id: inscripcionId }
    });

    if (!inscripcion) throw new Error('inscripcion_no_encontrada');
    if (inscripcion.alumnoId !== alumnoId) throw new Error('no_autorizado');

    return await prisma.inscripcion.update({
        where: { id: inscripcionId },
        data: { estado: 'abandonado' }
    });
};