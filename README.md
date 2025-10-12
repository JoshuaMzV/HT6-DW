# API de Gestión de Usuarios (T3-DW)

API REST para la gestión de usuarios, desarrollada con Node.js y Express. Incluye un cliente frontend en React (Vite) con páginas de Registro y Login que consumen esta API.

## Despliegue
- Backend (API): https://ht6-dw-1.onrender.com
- Frontend : https://t3-dw.netlify.app/
- Frontend: desplegar la carpeta `client/` (Vite) en Netlify / Vercel / Render. El frontend usa la variable de entorno `VITE_API_URL` para apuntar a la URL base de la API.

## Estructura del repositorio
- ht6-api-users/ — servidor Express (endpoints /users, /register, /login, etc.)
- client/ — app React (Vite) con páginas Register y Login
- netlify.toml — configuración opcional para Netlify
- .gitignore — evita subir node_modules y dist

## Ejecutar en local

### Backend
1. Clonar repo:
```bash
git clone https://github.com/JoshuaMzV/HT6-DW
cd HT6-DW/ht6-api-users
```
2. Instalar e iniciar:
```bash
npm install
# para desarrollo local
npm run dev
# en producción/Render usar:
npm start
```
La API estará en: `http://localhost:3000` (o el puerto que indique `process.env.PORT`).

### Frontend (React)
1. Entrar a la carpeta `client`:
```bash
cd HT6-DW/client
npm install
```
2. Ejecutar en desarrollo (puedes indicar la URL de la API):
- PowerShell:
```powershell
$env:VITE_API_URL='http://localhost:3000'; npm run dev
```
3. Para build:
```bash
npm run build
# puede servir dist con http-server:
npx http-server dist -p 5000
```
Nota: el frontend usa `import.meta.env.VITE_API_URL` para construir las llamadas (no pongas `/register` allí, sólo la URL base).

## Endpoints de la API

1) Crear un Nuevo Usuario  
- Endpoint: `POST /users`  
- Endpoint alternativo (usado por el cliente): `POST /register` (misma lógica)  
- Body (JSON):
```json
{
  "name": "Joshua Mendez",
  "email": "joshua@example.com",
  "password": "Password123!",
  "dpi": "1234567890123"
}
```
- Respuesta 201:
```json
{
  "id": 1,
  "name": "Joshua Mendez",
  "email": "joshua@example.com",
  "dpi": "1234567890123"
}
```
- Errores:
  - 400 Bad Request: datos inválidos
  - 409 Conflict: DPI o email ya registrado

Validaciones principales:
- DPI: exactamente 13 dígitos numéricos
- Email: formato válido
- Contraseña: mínimo 8 caracteres, una mayúscula, un número y un símbolo

2) Listar Usuarios  
- Endpoint: `GET /users`  
- Query params opcionales: `name`, `email`, `limit`, `offset`  
- Ejemplos:
  - `GET /users`
  - `GET /users?name=joshua`
  - `GET /users?limit=5&offset=0`

3) Actualizar Usuario  
- Endpoint: `PUT /users/:dpi`  
- Body ejemplo:
```json
{
  "name": "Nombre nuevo",
  "email": "nuevo@example.com"
}
```
- Respuesta 200 con usuario actualizado.  
- Errores: 404 si no existe, 409 si email entra en conflicto.

4) Eliminar Usuario  
- Endpoint: `DELETE /users/:dpi`  
- Respuesta 204 No Content si eliminado, 404 si no existe.

5) Login (autenticación)
- Endpoint: `POST /login`  
- Body:
```json
{
  "email": "joshua@example.com",
  "password": "Password123!"
}
```
- Respuesta 200 con datos del usuario (sin contraseña) si credenciales correctas; 401 si no.

## Despliegue recomendado
- Backend: Render (añadir script `"start": "node index.js"` en `ht6-api-users/package.json` y configurar Start Command `npm start`).
- Frontend: Netlify/Vercel apuntando a la carpeta `client/`.
  - En Netlify definir variable de entorno `VITE_API_URL=https://ht6-dw.onrender.com` antes de build.

## Notas de seguridad y mejoras
- Actualmente las contraseñas se almacenan en memoria en texto plano (solo para la tarea). En producción usar hashing (bcrypt) y base de datos.
- Se recomienda persistir sesión (JWT o tokens + almacenamiento seguro) y proteger rutas del frontend según contexto.

## Autores / Entregantes
Joshua Iván André Méndez Vásquez — 9490-22-4032  
Universidad Mariano Gálvez de Guatemala — Sede "El Naranjo"

Si trabajas en repositorio privado y quieres añadir un colega, invita al usuario `ingVillatoroUMG`.

## Rama sugerida
- Rama para implementar frontend y ajustes: `feature/auth-react` (o `cliente` si ya la usas).

## Endpoints adicionales (resumen)
- `POST /register` -> Registrar usuario (usado por el frontend)  
- `POST /login` -> Iniciar sesión (devuelve datos del usuario sin contraseña)

--- 
