# Aplicación Fullstack MERN

Esta es una aplicación fullstack construida utilizando la pila MERN (MongoDB, Express, React, Node.js) usando typescript. El backend maneja la lógica del servidor y la API,
mientras que el frontend proporciona una interfaz de usuario para interactuar con la aplicación. Utilizando una api externa para la sincrozación de datos en la BD
Realizando Un Crud, creando personajes de dragon ball.

## Características

- Autenticación de usuarios (login, registro)
- Operaciones CRUD para varias entidades
- Integración con APIs externas para la sincronización de datos
- Interfaz de usuario responsiva usando React y Tailwind CSS o Material UI
- Gestión de estado con Context API o Redux
- Validación de formularios con React Hook Form y Zod
- Enrutamiento con React Router DOM
- Solicitudes HTTP con Axios
- Gestión de criptografía con `crypto-js`

## Tecnologías Utilizadas

- **Frontend**: React, React Router DOM, Tailwind CSS / Material UI
- **Backend**: Node.js, Express
- **Base de Datos**: MongoDB
- **Autenticación**: JWT (JSON Web Tokens)
- **Despliegue**: Vercel para el frontend, Vercel/Heroku para el backend
- **Criptografía**: `crypto-js`
- **Formularios y Validación**: React Hook Form, Zod
- **Solicitudes HTTP**: Axios
- **Sincronización de Datos**: [API externa](https://dragonball-api.com/api/characters)

## Requisitos

- Node.js (versión 14 o superior)
- MongoDB (local o en la nube, por ejemplo, MongoDB Atlas)
- npm o yarn como gestor de paquetes

## Instalación

### Clonar el Repositorio

### backend
```bash
git clone https://github.com/xavier77dev/dragon_ball_test_tech.git
cd dragon_ball_test_tech
cd backend
npm install
npm run dev
```
## variables de entorno
MONGO_URI="tu_cadena_de_conexion_a_mongodb"
SECRET_KEY='tu_secreto_jwt'
PASSWORD_SECRET='tu_password_secret'
PORT=3000
API_DRAGONBALL='https://dragonball-api.com/api/characters'


### Frontend
```bash
git clone https://github.com/xavier77dev/dragon_ball_test_tech.git
cd dragon_ball_test_tech
cd frontend
npm install
npm run dev
```
## variables de entorno
VITE_API_URL=http://localhost:3000


