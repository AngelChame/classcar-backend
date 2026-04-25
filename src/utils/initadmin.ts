import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log("⚠️ Variables de entorno del Admin incompletas en el .env.");
      return;
    }

    // Buscamos si ya existe el administrador
    const adminExiste = await prisma.usuario.findFirst({
      where: { correo: adminEmail }
    });

    if (!adminExiste) {
      // Hasheamos la contraseña de tu .env para que sea segura
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      await prisma.usuario.create({
        data: {
          nombre: process.env.ADMIN_NOMBRE || "Administrador",
          apellidoPaterno: process.env.ADMIN_APELLIDO || "Principal",
          correo: adminEmail,
          contrasenaHash: hashedPassword,
          rol: "admin",
          activo: true
        }
      });
      console.log("✅ Administrador principal creado exitosamente en la base de datos.");
    }
  } catch (error) {
    console.error("❌ Error al inicializar el administrador:", error);
  }
};