# Riwi Sportsline

Este es el proyecto backend para la aplicación Riwi Sportsline, construido con NestJS y TypeORM.

## Requisitos previos

- Node.js v18.x o superior
- PostgreSQL (o la base de datos que prefieras)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/riwi-sportsline.git
   cd riwi-sportsline
2. Instala las dependencias:
   ```bash
   npm install
3. Configura tus variables de entorno en un archivo .env en la raíz del proyecto:
   ```bash
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=usuario
    DB_PASSWORD=contraseña
    DB_NAME=riwi_sportsline
    JWT_SECRET=mi_secreto_jwt
4. Ejecuta la aplicación:
   ```bash
   npm run start

---
# Migración a NestJS con TypeORM — Riwi SportsLine

Este documento resume **todo el trabajo realizado hasta el momento** durante la migración del backend desde Express + Sequelize hacia **NestJS + TypeORM + PostgreSQL**, incluyendo módulos, controladores, servicios, DTOs, repositorios, configuración, errores comunes, soluciones y guías de arquitectura.

---

## ✅ 1. Objetivos de la Migración

- Reemplazar **Sequelize → TypeORM**, aprovechando decoradores, relaciones y migraciones.
- Reestructurar el proyecto bajo arquitectura modular recomendada por NestJS.
- Implementar DTOs con validación.
- Integrar variables de entorno con `ConfigModule`.
- Actualizar controladores para usar inyección de dependencias.
- Establecer una base sólida para pruebas unitarias.

---

## ✅ 2. Estructura Actual del Proyecto

```
src/
 ├── app.module.ts
 ├── main.ts
 ├── config/
 │     └── orm.config.ts
 ├── modules/
 │     ├── products/
 │     │     ├── products.controller.ts
 │     │     ├── products.service.ts
 │     │     ├── products.repository.ts
 │     │     └── entities/product.entity.ts
 │     ├── clients/
 │     │     ├── clients.controller.ts
 │     │     ├── clients.service.ts
 │     │     ├── clients.repository.ts
 │     │     └── entities/client.entity.ts
 │     ├── users/
 │           ├── users.controller.ts
 │           ├── users.service.ts
 │           ├── entities/user.entity.ts
 │           └── dtos/
 ├── common/
 │     └── exceptions / pipes / guards (pendiente)
 └── dtos/
       └── create-order.dto.ts
```

---

## ✅ 3. Configuración de TypeORM

Archivo: **`orm.config.ts`**

- Conexión a PostgreSQL
- Carga automática de entidades
- Activación de sincronización en desarrollo
- Preparación para migraciones

---

## ✅ 4. Repositorios Implementados

### **ProductsRepository**
- Extiende `Repository<Product>`
- Métodos CRUD
- Integrado mediante `@InjectRepository`

### **ClientsRepository**
- Acceso a tabla `clients`
- CRUD completo
- Relación con órdenes (pendiente)

---

## ✅ 5. Controladores Realizados

Todos los controladores ahora:

✅ Usan inyección de dependencias 
✅ Reciben DTOs validados 
✅ Devuelven respuestas tipadas 
✅ Integran servicios y repositorios 

---

## ✅ 6. Servicios Implementados

Cada módulo tiene su servicio con:

- Métodos findAll, findOne, create, update, delete
- Manejo de errores
- Validación previa de existencia
- Tipado estricto con DTOs

---

## ✅ 7. DTOs Migrados Desde Express

Los DTOs ahora incluyen:

- Decoradores `class-validator`
- Decoradores `class-transformer`
- Definición explícita de tipos
- Eliminación de valores opcionales innecesarios

Errores corregidos:

- `clientId: number | undefined` → ahora es obligatorio
- Se agregaron inicializadores en constructores cuando fue necesario

---

## ✅ 8. Tareas Base de Migración (Completadas y Pendientes)

| Tarea | Estado |
|------|--------|
| Generar módulos, controladores, servicios | ✅ |
| Migrar DTOs desde Express | ✅ |
| Centralizar variables de entorno | ✅ |
| Actualizar controladores con DI | ✅ |
| Integrar pruebas unitarias | ⏳ En progreso |
| Migraciones y seeds de TypeORM | ⏳ Pendiente |
| Implementar relaciones (User–Orders, Client–Orders) | ⏳ Pendiente |

---

## 12. Contacto

Este documento es parte del proyecto de formación profesional de **Sharon Ortiz**, psicóloga y desarrolladora full‑stack.

---
