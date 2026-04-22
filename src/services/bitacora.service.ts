import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const obtenerHistorialBitacora = async () => {
    return await prisma.bitacoraClase.findMany({
        include: {
            clase: {
                select: {
                    fecha: true,
                    horaInicio: true,
                    inscripcion: {
                        select: {
                            alumno: { select: { nombre: true, apellidoPaterno: true } }
                        }
                    },
                    instructor: {
                        select: {
                            usuario: { select: { nombre: true, apellidoPaterno: true } }
                        }
                    }
                }
            }
        },
        orderBy: {
            fechaCambio: 'desc'
        }
    });
};