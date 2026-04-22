import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminNombre = process.env.ADMIN_NOMBRE;
    const adminApellido = process.env.ADMIN_APELLIDO;

    if (!adminEmail || !adminPassword || !adminNombre || !adminApellido) {
        throw new Error('Faltan variables de entorno para el administrador en el archivo .env');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    await prisma.usuario.upsert({
        where: { correo: adminEmail },
        update: {},
        create: {
            nombre: adminNombre,
            apellidoPaterno: adminApellido,
            correo: adminEmail,
            contrasenaHash: hashedPassword,
            rol: 'admin',
            activo: true,
        },
    });

    console.log('¡Administrador maestro creado exitosamente!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });