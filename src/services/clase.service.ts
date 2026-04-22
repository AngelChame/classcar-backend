import { PrismaClient } from '@prisma/client';
import { enviarEmail } from '../config/mailer';

const prisma = new PrismaClient();

export const obtenerClasesUsuario = async (usuarioId: number, rol: string) => {
    if (rol === 'alumno') {
        const inscripciones = await prisma.inscripcion.findMany({ where: { alumnoId: usuarioId }, select: { id: true } });
        const inscripcionesIds = inscripciones.map(i => i.id);
        return await prisma.clase.findMany({ where: { inscripcionId: { in: inscripcionesIds } }, include: { instructor: true, automovil: true } });
    } else if (rol === 'instructor') {
        const instructor = await prisma.instructor.findUnique({ where: { usuarioId } });
        if (!instructor) throw new Error('instructor_no_encontrado');
        return await prisma.clase.findMany({ where: { instructorId: instructor.id }, include: { inscripcion: { include: { alumno: true } }, automovil: true } });
    }
    throw new Error('rol_no_valido');
};

export const obtenerClasePorId = async (id: number) => {
    const clase = await prisma.clase.findUnique({ where: { id }, include: { inscripcion: true, instructor: true, automovil: true } });
    if (!clase) throw new Error('clase_no_encontrada');
    return clase;
};

export const crearReserva = async (alumnoId: number, data: any) => {
    const inscripcion = await prisma.inscripcion.findUnique({
        where: { id: data.inscripcionId },
        include: { curso: true, alumno: true, clases: true }
    });

    if (!inscripcion || inscripcion.alumnoId !== alumnoId || inscripcion.estado !== 'activo') {
        throw new Error('inscripcion_invalida');
    }

    if (inscripcion.clases.length >= inscripcion.curso.duracion) {
        throw new Error('limite_clases_superado');
    }

    const fechaFiltro = new Date(data.fecha);
    const horaInicioFiltro = new Date(`1970-01-01T${data.horaInicio}Z`);
    const horaFinFiltro = new Date(`1970-01-01T${data.horaFin}Z`);

    const slotValido = await prisma.disponibilidadInstructor.findFirst({
        where: {
            instructorId: data.instructorId,
            activo: true,
            horaInicio: horaInicioFiltro,
            horaFin: horaFinFiltro
        }
    });

    if (!slotValido) throw new Error('slot_no_disponible');

    const choqueInstructor = await prisma.clase.findFirst({
        where: {
            instructorId: data.instructorId,
            fecha: fechaFiltro,
            horaInicio: horaInicioFiltro,
            estado: 'programada'
        }
    });

    if (choqueInstructor) throw new Error('conflicto_horario_instructor');

    const choqueAlumno = await prisma.clase.findFirst({
        where: {
            inscripcion: { alumnoId },
            fecha: fechaFiltro,
            horaInicio: horaInicioFiltro,
            estado: 'programada'
        }
    });

    if (choqueAlumno) throw new Error('conflicto_horario_alumno');

    const nuevaClase = await prisma.clase.create({
        data: {
            inscripcionId: data.inscripcionId,
            instructorId: data.instructorId,
            fecha: fechaFiltro,
            horaInicio: horaInicioFiltro,
            horaFin: horaFinFiltro,
            estado: 'programada'
        }
    });

    await enviarEmail({
        para: inscripcion.alumno.correo,
        asunto: 'Confirmación de Reserva de Clase',
        html: `<h1>Clase Reservada</h1><p>Tu clase está programada para el ${data.fecha} a las ${data.horaInicio}.</p>`
    });

    return nuevaClase;
};

export const cancelarClase = async (id: number, motivo: string) => {
    return await prisma.$transaction(async (tx) => {
        const clase = await tx.clase.findUnique({ where: { id }, include: { inscripcion: { include: { alumno: true } } } });
        if (!clase) throw new Error('clase_no_encontrada');

        const claseCancelada = await tx.clase.update({
            where: { id },
            data: { estado: 'cancelada' }
        });

        await tx.bitacoraClase.create({
            data: {
                claseId: id,
                estadoAnterior: clase.estado,
                estadoNuevo: 'cancelada',
                motivo: motivo || 'Cancelación solicitada'
            }
        });

        await enviarEmail({
            para: clase.inscripcion.alumno.correo,
            asunto: 'Clase Cancelada',
            html: `<h1>Clase Cancelada</h1><p>Tu clase del ${clase.fecha.toISOString().split('T')[0]} ha sido cancelada.</p><p>Motivo: ${motivo}</p>`
        });

        return claseCancelada;
    });
};

export const completarClase = async (id: number) => {
    return await prisma.clase.update({
        where: { id },
        data: { estado: 'completada' }
    });
};

export const asignarAutomovil = async (id: number, automovilId: number) => {
    return await prisma.clase.update({
        where: { id },
        data: { automovilId }
    });
};