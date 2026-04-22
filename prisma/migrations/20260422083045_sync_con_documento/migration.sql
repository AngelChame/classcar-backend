/*
  Warnings:

  - You are about to alter the column `modelo` on the `automoviles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.
  - You are about to alter the column `placa` on the `automoviles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `estado` on the `automoviles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `estado_anterior` on the `bitacora_clases` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `estado_nuevo` on the `bitacora_clases` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the column `id_curso` on the `clases` table. All the data in the column will be lost.
  - You are about to alter the column `estado` on the `clases` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `nombre` on the `cursos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `dia_semana` on the `disponibilidad_instructores` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `especialidad` on the `instructores` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `nombre` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.
  - You are about to alter the column `apellido_paterno` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `apellido_materno` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `correo` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `telefono` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `rol` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the `estudiantes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reservas` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `estado_anterior` on table `bitacora_clases` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estado_nuevo` on table `bitacora_clases` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `id_inscripcion` to the `clases` table without a default value. This is not possible if the table is not empty.
  - Made the column `duracion` on table `cursos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "clases" DROP CONSTRAINT "clases_id_automovil_fkey";

-- DropForeignKey
ALTER TABLE "clases" DROP CONSTRAINT "clases_id_curso_fkey";

-- DropForeignKey
ALTER TABLE "estudiantes" DROP CONSTRAINT "estudiantes_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "reservas" DROP CONSTRAINT "reservas_id_clase_fkey";

-- DropForeignKey
ALTER TABLE "reservas" DROP CONSTRAINT "reservas_id_estudiante_fkey";

-- AlterTable
ALTER TABLE "automoviles" ALTER COLUMN "modelo" SET DATA TYPE VARCHAR(80),
ALTER COLUMN "placa" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "estado" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "bitacora_clases" ALTER COLUMN "estado_anterior" SET NOT NULL,
ALTER COLUMN "estado_anterior" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "estado_nuevo" SET NOT NULL,
ALTER COLUMN "estado_nuevo" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "clases" DROP COLUMN "id_curso",
ADD COLUMN     "id_inscripcion" INTEGER NOT NULL,
ALTER COLUMN "id_automovil" DROP NOT NULL,
ALTER COLUMN "estado" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "cursos" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "duracion" SET NOT NULL;

-- AlterTable
ALTER TABLE "disponibilidad_instructores" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "dia_semana" SET DATA TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "instructores" ALTER COLUMN "especialidad" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(80),
ALTER COLUMN "apellido_paterno" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "apellido_materno" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "correo" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "telefono" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "rol" SET DATA TYPE VARCHAR(20);

-- DropTable
DROP TABLE "estudiantes";

-- DropTable
DROP TABLE "reservas";

-- CreateTable
CREATE TABLE "inscripciones" (
    "id" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "id_curso" INTEGER NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "estado" VARCHAR(20) NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inscripciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificaciones" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "titulo" VARCHAR(120) NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leida" BOOLEAN NOT NULL DEFAULT false,
    "creada_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "inscripciones" ADD CONSTRAINT "inscripciones_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones" ADD CONSTRAINT "inscripciones_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "cursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clases" ADD CONSTRAINT "clases_id_inscripcion_fkey" FOREIGN KEY ("id_inscripcion") REFERENCES "inscripciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clases" ADD CONSTRAINT "clases_id_automovil_fkey" FOREIGN KEY ("id_automovil") REFERENCES "automoviles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
