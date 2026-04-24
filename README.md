ClassCar Backend - API de Gestión de Autoescuela
Este repositorio contiene la lógica del lado del servidor para ClassCar, una plataforma integral diseñada para la gestión operativa de autoescuelas, permitiendo el control de usuarios (alumnos, instructores, administradores), parque vehicular, cursos y agendamiento de clases.

🚀 Despliegue en Producción
La API y la base de datos se encuentran desplegadas y operativas en los siguientes enlaces:

API Endpoint: https://classcar-backend-production.up.railway.app/

Base de Datos (PostgreSQL): postgresql://postgres:nMqVnAlKlLTgarjyJyhMJDyVldRNdnYo@shortline.proxy.rlwy.net:42802/railway

🏗️ Arquitectura del Sistema
El backend ha sido desarrollado siguiendo una Arquitectura en Capas (Layered Architecture), lo que garantiza la escalabilidad, el mantenimiento sencillo y la separación de responsabilidades.

Capas Principales:
Capa de Rutas (Routes): Define los puntos de entrada (endpoints) de la API y asigna los middlewares de seguridad.

Capa de Controladores (Controllers): Gestiona las peticiones HTTP, extrae los datos de la solicitud y coordina la respuesta final al cliente.

Capa de Servicios (Services): Contiene la lógica de negocio. Aquí es donde se procesan los datos, se realizan validaciones complejas y se interactúa con APIs externas (como la de la NHTSA para vehículos).

Capa de Acceso a Datos (Prisma ORM): Utiliza Prisma como motor de comunicación con PostgreSQL, asegurando consultas seguras, tipadas y eficientes mediante un esquema definido (schema.prisma).

Tecnologías Utilizadas (Tech Stack):
Lenguaje: TypeScript (v6.0+)

Entorno: Node.js

Framework: Express.js

Base de Datos: PostgreSQL

ORM: Prisma

Seguridad: JSON Web Tokens (JWT) y Bcrypt para el hash de contraseñas.

Validación: Zod (para asegurar la integridad de los datos de entrada).

Correo: Nodemailer (notificaciones automáticas de registro).

🛡️ Características de Seguridad
Autenticación JWT: Protección de rutas sensibles mediante tokens de acceso.

Gestión de Roles: Sistema de permisos diferenciado para admin, instructor y alumno.

Hash de Contraseñas: Almacenamiento seguro de credenciales mediante algoritmos de encriptación.

CORS: Configuración para permitir comunicación segura exclusivamente con el dominio del frontend.

🛠️ Instalación y Configuración Local
Si deseas ejecutar este proyecto localmente, sigue estos pasos:

Clonar el repositorio:

Bash
git clone https://github.com/AndresGonzalez10/classcar-backend.git
cd classcar-backend
Instalar dependencias:

Bash
npm install
Configurar variables de entorno:
Crea un archivo .env en la raíz y añade tus credenciales (puedes basarte en el archivo proporcionado anteriormente).

Generar el cliente de Prisma:

Bash
npx prisma generate
Ejecutar en modo desarrollo:

Bash
npm run dev
📊 Scripts Disponibles
npm run dev: Inicia el servidor de desarrollo con recarga automática (nodemon).

npm run build: Compila el código TypeScript a JavaScript en la carpeta /dist.

npm start: Ejecuta la versión compilada del servidor en producción.