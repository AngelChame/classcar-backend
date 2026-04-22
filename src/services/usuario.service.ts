import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { enviarEmail } from '../config/mailer';

const prisma = new PrismaClient();

const generarPasswordTemporal = () => {
    return crypto.randomBytes(8).toString('hex');
};

export const crearNuevoUsuario = async (data: any) => {
    const passwordTemporal = generarPasswordTemporal();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwordTemporal, saltRounds);

    const newUser = await prisma.usuario.create({
        data: {
            nombre: data.nombre,
            apellidoPaterno: data.apellidoPaterno,
            apellidoMaterno: data.apellidoMaterno,
            correo: data.correo,
            telefono: data.telefono,
            contrasenaHash: hashedPassword,
            rol: data.rol
        }
    });

    if (data.rol === 'instructor') {
        await prisma.instructor.create({
            data: {
                usuarioId: newUser.id,
                especialidad: data.especialidad
            }
        });
    }

    const htmlCorreo = `
        <h1>Bienvenido a la Autoescuela</h1>
        <p>Hola ${newUser.nombre}, tu cuenta ha sido creada exitosamente.</p>
        <p>Tu rol asignado es: <strong>${newUser.rol}</strong></p>
        <p>Tu contraseña temporal es: <strong>${passwordTemporal}</strong></p>
        <p>Por favor, inicia sesión y cambia tu contraseña lo antes posible.</p>
    `;

    await enviarEmail({
        para: newUser.correo,
        asunto: 'Tus credenciales de acceso',
        html: htmlCorreo
    });

    return { id: newUser.id, correo: newUser.correo, rol: newUser.rol };
};

export const obtenerUsuarios = async () => {
    return await prisma.usuario.findMany({
        select: {
            id: true,
            nombre: true,
            apellidoPaterno: true,
            correo: true,
            rol: true,
            activo: true
        }
    });
};