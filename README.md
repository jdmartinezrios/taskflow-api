# TaskFlow API

Proyecto de software para el módulo **Integración Continua** — Entrega 1.

API REST de gestión de tareas desarrollada en **TypeScript** con **Express** y **PostgreSQL**, desplegada con **Docker** en dos contenedores comunicados.

**Autor:** Juan David Martínez Ríos

**Repositorio:** https://github.com/jdmartinezrios/taskflow-api

## Requisitos de la Entrega 1

- Repositorio en GitHub
- Dos contenedores Docker comunicados entre sí (API + base de datos)

## Stack tecnológico

| Componente | Tecnología |
|------------|------------|
| Lenguaje | TypeScript |
| Backend | Node.js + Express |
| Base de datos | PostgreSQL 16 |
| Contenedores | Docker + Docker Compose |
| Pruebas | Jest + Supertest |

## Estructura del proyecto

```
integracion-continua-proyecto/
├── api/                 # Contenedor 1: API REST
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── db/
│   └── init.sql         # Script inicial de PostgreSQL
└── docker-compose.yml   # Orquestación de contenedores
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Información de la API |
| GET | `/health` | Estado del servicio y conexión a BD |
| GET | `/api/tasks` | Listar tareas |
| GET | `/api/tasks/:id` | Obtener tarea por ID |
| POST | `/api/tasks` | Crear tarea |
| PUT | `/api/tasks/:id` | Actualizar tarea |
| DELETE | `/api/tasks/:id` | Eliminar tarea |

## Ejecución con Docker (recomendado)

```bash
docker compose up --build
```

Servicios disponibles:

- API: http://localhost:3000
- PostgreSQL: localhost:5432

Verificar salud:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/tasks
```

Detener contenedores:

```bash
docker compose down
```

## Desarrollo local (sin Docker)

```bash
cd api
npm install
cp ../.env.example ../.env
npm run dev
```

> Necesitas PostgreSQL corriendo localmente con las credenciales de `.env.example`.

## Pruebas

```bash
cd api
npm install
npm test
```

## Repositorio

https://github.com/jdmartinezrios/taskflow-api

Clonar el proyecto:

```bash
git clone https://github.com/jdmartinezrios/taskflow-api.git
cd taskflow-api
docker compose up --build
```

## Próximas entregas

- **Entrega 2:** Jenkins como gestor de operaciones
- **Entrega 3:** Travis CI y Codeship
