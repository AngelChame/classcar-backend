-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido_paterno" TEXT NOT NULL,
    "apellido_materno" TEXT,
    "correo" TEXT NOT NULL,
    "telefono" TEXT,
    "contrasena_hash" TEXT NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estudiantes" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "fecha_nacimiento" DATE,

    CONSTRAINT "estudiantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructores" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "especialidad" TEXT,

    CONSTRAINT "instructores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disponibilidad_instructores" (
    "id" SERIAL NOT NULL,
    "id_instructor" INTEGER NOT NULL,
    "dia_semana" TEXT NOT NULL,
    "hora_inicio" TIME NOT NULL,
    "hora_fin" TIME NOT NULL,

    CONSTRAINT "disponibilidad_instructores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cursos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "duracion" INTEGER,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automoviles" (
    "id" SERIAL NOT NULL,
    "modelo" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "automoviles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clases" (
    "id" SERIAL NOT NULL,
    "id_curso" INTEGER NOT NULL,
    "id_instructor" INTEGER NOT NULL,
    "id_automovil" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "hora_inicio" TIME NOT NULL,
    "hora_fin" TIME NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "clases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservas" (
    "id" SERIAL NOT NULL,
    "id_estudiante" INTEGER NOT NULL,
    "id_clase" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bitacora_clases" (
    "id" SERIAL NOT NULL,
    "id_clase" INTEGER NOT NULL,
    "estado_anterior" TEXT,
    "estado_nuevo" TEXT,
    "fecha_cambio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motivo" TEXT,

    CONSTRAINT "bitacora_clases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "estudiantes_id_usuario_key" ON "estudiantes"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "instructores_id_usuario_key" ON "instructores"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "automoviles_placa_key" ON "automoviles"("placa");

-- AddForeignKey
ALTER TABLE "estudiantes" ADD CONSTRAINT "estudiantes_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructores" ADD CONSTRAINT "instructores_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disponibilidad_instructores" ADD CONSTRAINT "disponibilidad_instructores_id_instructor_fkey" FOREIGN KEY ("id_instructor") REFERENCES "instructores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clases" ADD CONSTRAINT "clases_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "cursos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clases" ADD CONSTRAINT "clases_id_instructor_fkey" FOREIGN KEY ("id_instructor") REFERENCES "instructores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clases" ADD CONSTRAINT "clases_id_automovil_fkey" FOREIGN KEY ("id_automovil") REFERENCES "automoviles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_id_estudiante_fkey" FOREIGN KEY ("id_estudiante") REFERENCES "estudiantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_id_clase_fkey" FOREIGN KEY ("id_clase") REFERENCES "clases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bitacora_clases" ADD CONSTRAINT "bitacora_clases_id_clase_fkey" FOREIGN KEY ("id_clase") REFERENCES "clases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
