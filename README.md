# API de Gestión de Usuarios

Esta es una API REST para la gestión de usuarios, desarrollada con Node.js y Express.

## Despliegue

La API está desplegada en Render y puedes acceder a ella a través de la siguiente URL:

https://ht6-dw.onrender.com

[ht6-api-users](https://ht6-dw.onrender.com)

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

*   **Endpoint:** `GET /users`
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

*   **Endpoint:** `PUT /users/:dpi`
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

*   **Endpoint:** `DELETE /users/:dpi`
*   **Descripción:** Elimina un usuario del sistema.
*   **Validaciones:**
    *   El usuario con el DPI especificado debe existir.
*   **Respuesta Exitosa (204 No Content):**
    *   No se devuelve contenido en el cuerpo de la respuesta.
*   **Respuestas de Error:**
    *   `404 Not Found`: Si el usuario no existe.


Joshua Iván André Méndez Vásquez
9490-22-4032

Universidad Mariano Galvez de Guatemala Sede "El Naranjo"
