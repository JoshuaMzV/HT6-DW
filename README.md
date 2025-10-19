# API de Gestión de Usuarios con JWT

API REST para gestión de usuarios desarrollada con Node.js y Express, con autenticación mediante JSON Web Tokens (JWT). Incluye un endpoint de login que genera un token válido por 30 segundos y middleware para proteger rutas.

## Despliegue

La API está desplegada en Render y puedes acceder a ella a través de la siguiente URL:

https://ht7-dw.onrender.com

[[ht6-api-users](https://ht6-dw.onrender.com)](https://ht7-dw.onrender.com)

## Variables de Entorno

Crear un archivo `.env` dentro de `ht6-api-users/` con:

```
PORT=3000
JWT_SECRET=supersecret_dev_key_change_me
JWT_EXPIRES=30s
```

En Render, define estas variables en el Dashboard del servicio (Environment > Environment Variables).

## Ejecución en Local

Para ejecutar la API en tu entorno local, sigue estos pasos:

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/JoshuaMzV/HT6-DW
    ```
2.  Navega a la carpeta del proyecto:
    ```bash
    cd ht6-api-users
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    ```
4.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

La API estará disponible en `http://localhost:3000`.

## Endpoints de la API

Todas las rutas de usuarios están protegidas con JWT. Primero debes iniciar sesión para obtener un token.

### 0. Login (Obtener Token)

*   **Endpoint:** `POST /login`
*   **Descripción:** Autentica a un usuario existente y devuelve un token JWT válido por 30 segundos.
*   **Solicitud (Body):**
        ```json
        {
            "email": "joshua@example.com",
            "password": "Password123!"
        }
        ```
*   **Respuesta Exitosa (200 OK):**
        ```json
        {
            "token": "<jwt>",
            "expiresIn": "30s"
        }
        ```
*   **Errores:** `400 Bad Request` si faltan campos; `401 Unauthorized` si credenciales inválidas.

Usa el token en el header Authorization para las rutas protegidas:

```
Authorization: Bearer <jwt>
```

### 1. Crear un Nuevo Usuario

*   **Endpoint:** `POST /users`
*   **Descripción:** Crea un nuevo usuario en el sistema.
*   **Validaciones:**
    *   El DPI no debe estar registrado previamente.
    *   El email no debe repetirse en otro usuario.
    *   El DPI debe tener exactamente 13 dígitos numéricos.
    *   El email debe tener un formato válido.
    *   La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.
*   **Solicitud (Body):**
    ```json
    {
      "name": "Joshua Mendez",
      "email": "joshua@example.com",
      "password": "Password123!",
      "dpi": "1234567890123"
    }
    ```
*   **Respuesta Exitosa (201 Created):**
    ```json
    {
      "id": 1,
      "name": "Joshua Mendez",
      "email": "joshua@example.com",
      "password": "Password123!",
      "dpi": "1234567890123"
    }
    ```
*   **Respuestas de Error:**
    *   `400 Bad Request`: Si algún dato no es válido.
    *   `409 Conflict`: Si el DPI o el email ya existen.

### 2. Listar Todos los Usuarios

*   **Endpoint:** `GET /users` (PROTEGIDO)
*   **Descripción:** Retorna una lista de todos los usuarios registrados.
*   **Parámetros de Consulta (Query Params):**
    *   `name` (opcional): Busca usuarios por nombre (parcial, insensible a mayúsculas).
    *   `email` (opcional): Busca un usuario por su email exacto.
    *   `limit` (opcional): Limita el número de resultados.
    *   `offset` (opcional): Define el punto de inicio para la paginación.
*   **Ejemplos de Solicitud:**
    *   `GET /users`
    *   `GET /users?name=joshua`
    *   `GET /users?email=joshua@example.com`
    *   `GET /users?limit=5&offset=0`
*   **Respuesta Exitosa (200 OK):**
    ```json
    [
      {
        "id": 1,
        "name": "Joshua Mendez",
        "email": "joshua@example.com",
        "dpi": "1234567890123"
      }
    ]
    ```

### 3. Actualizar un Usuario

*   **Endpoint:** `PUT /users/:id` (PROTEGIDO)
*   **Descripción:** Actualiza la información de un usuario existente.
*   **Validaciones:**
    *   El usuario con el DPI especificado debe existir.
    *   Si se actualiza el email, no debe entrar en conflicto con otro usuario.
*   **Solicitud (Body):**
    ```json
    {
      "name": "Joshua Mendez Actualizado",
      "email": "joshua.new@example.com"
    }
    ```
*   **Respuesta Exitosa (200 OK):**
    ```json
    {
      "id": 1,
      "name": "Joshua Mendez Actualizado",
      "email": "joshua.new@example.com",
      "password": "Password123!",
      "dpi": "1234567890123"
    }
    ```
*   **Respuestas de Error:**
    *   `404 Not Found`: Si el usuario no existe.
    *   `409 Conflict`: Si el nuevo email ya está en uso.

### 4. Eliminar un Usuario

*   **Endpoint:** `DELETE /users/:id` (PROTEGIDO)
*   **Descripción:** Elimina un usuario del sistema.
*   **Validaciones:**
    *   El usuario con el DPI especificado debe existir.
*   **Respuesta Exitosa (204 No Content):**
    *   No se devuelve contenido en el cuerpo de la respuesta.
*   **Respuestas de Error:**
    *   `404 Not Found`: Si el usuario no existe.

Nota: En los endpoints `PUT` y `DELETE`, `:id` acepta el ID numérico del usuario o el DPI de 13 dígitos.


Joshua Iván André Méndez Vásquez
9490-22-4032

Universidad Mariano Galvez de Guatemala Sede "El Naranjo"

## Despliegue en Render

1. Crea un nuevo Web Service apuntando a este repo y carpeta `ht6-api-users/`.
2. Configuración:
    - Runtime: Node
    - Build Command: (vacío)
    - Start Command: `node index.js`
    - Root Directory: `ht6-api-users`
    - Environment Variables: `PORT`, `JWT_SECRET`, `JWT_EXPIRES`
3. Guarda y despliega. Copia la URL y colócala en la sección Despliegue arriba.
