import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registerUser = async (data: any) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.contrasena, saltRounds);

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

    return { id: newUser.id, correo: newUser.correo, rol: newUser.rol };
};

export const loginUser = async (data: any) => {
    const user = await prisma.usuario.findUnique({
        where: { correo: data.correo }
    });

    if (!user) throw new Error('credenciales_invalidas');

    const isMatch = await bcrypt.compare(data.contrasena, user.contrasenaHash);

    if (!isMatch) throw new Error('credenciales_invalidas');

    const accessToken = jwt.sign(
        { id: user.id, rol: user.rol },
        process.env.JWT_SECRET as string,
        { expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any }
    );

    const refreshToken = jwt.sign(
        { id: user.id, rol: user.rol },
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any }
    );
    return {
        accessToken,
        refreshToken,
        usuario: {
            id: user.id,
            nombre: user.nombre,
            rol: user.rol
        }
    };
};