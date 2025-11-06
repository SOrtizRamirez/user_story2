 # 📦 RIWI-SportsLine — Backend (NestJS)

 Backend de RIWI-SportsLine construido con NestJS, TypeORM y PostgreSQL. Su objetivo principal es soportar la gestión de usuarios (y futuros módulos) siguiendo buenas prácticas y principios de arquitectura limpia.

 ---

 ## ✅ Objetivo del proyecto

 Estructura inicial de backend con:

 - Generación del proyecto con Nest CLI
 - Configuración de variables de entorno
 - Migración desde Sequelize a TypeORM
 - Creación de entidad base `User`
 - Documentación para facilitar el onboarding

 ---

 ## ✅ Requisitos

 Asegúrate de tener instalado:

 | Dependencia | Versión recomendada |
 | --- | --- |
 | Node.js | >= 18 |
 | npm | >= 9 |
 | PostgreSQL | >= 14 |
 | Nest CLI | >= 10 |

 Instalar Nest CLI (si no lo tienes):

 ```bash
 npm install -g @nestjs/cli
 ```

 ---

 ## ✅ Clonar el proyecto

 Clona tu fork (no el repositorio base):

 ```bash
 git clone https://github.com/SOrtizRamirez/user_story2.git
 cd user_story2
 ```

 ---

 ## ✅ Instalar dependencias

 ```bash
 npm install
 ```

 ---

 ## ✅ Variables de entorno

 Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

 ```env
 PORT=3000
 DB_HOST=localhost
 DB_PORT=5432
 DB_USER=postgres
 DB_PASSWORD=123456
 DB_NAME=riwi_sportsline
 ```

 ---

 ## ✅ Ejecutar el proyecto

 - Modo desarrollo (hot-reload):

 ```bash
 npm run start:dev
 ```

 - Modo producción:

 ```bash
 npm run start
 ```

 ---

 ## ✅ Base de datos — TypeORM

 - El proyecto utiliza TypeORM + PostgreSQL.
 - La configuración del datasource está en `app.module.ts` usando variables de entorno.
 - En desarrollo, TypeORM puede auto-generar el esquema de la base de datos con `synchronize: true`.

 > ⚠ Importante: No uses `synchronize: true` en entornos de producción.

 ---

 ## ✅ Entidad base — User

 Campos creados:

 | Campo | Tipo | Restricciones |
 | --- | --- | --- |
 | id | number | PK, auto-generado |
 | name | string | requerido |
 | email | string | requerido, único |
 | password | string | requerido |

 Rutas mínimas disponibles:

 | Método | Ruta | Descripción |
 | --- | --- | --- |
 | GET | /users | Listar todos los usuarios |
 | POST | /users | Crear un nuevo usuario |

 ---

 ## ✅ Estructura del proyecto

 ```text
 src/
 ├── app.module.ts
 ├── main.ts
 └── user/
     ├── user.entity.ts
     ├── user.module.ts
     ├── user.service.ts
     └── user.controller.ts
 ```

 ---

 ## ✅ Scripts útiles

 | Comando | Descripción |
 | --- | --- |
 | npm run start | Ejecuta en modo normal |
 | npm run start:dev | Modo desarrollo con hot-reload |
 | npm run build | Compila a JS |
 | npm run test | Ejecuta pruebas |