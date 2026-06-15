# DiscoStore 🎵

API REST para la gestión del catálogo de álbumes de una tienda de música. Construida con **Express**, **SQLite** (nativo de Node.js v22) y **Zod**.

---

## Requisitos

- Node.js **v22 o superior** (requerido para `node:sqlite`)
- npm

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/VictorRodz/Lab-14--Victor.git


# 2. Instalar dependencias
npm install
```

---

## Configuración

Crear el archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
PORT=3000
HOST=localhost
```

---

## Poblar la base de datos

Antes de iniciar el servidor, ejecutar este comando **una sola vez** para crear el archivo `data/albumes.db` con los 7 álbumes iniciales:

```bash
npm run createdb
```

---

## Iniciar el servidor

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000/`

---

## Estructura del proyecto

```
LAB-14--VICTOR/
├── data/
│   ├── albumes.js      # Capa de acceso a datos (queries SQLite)
│   ├── CREATE.SQL      # Script SQL para crear la tabla
│   ├── createdb.js     # Script para inicializar y poblar la BD
│   └── data.json       # Datos iniciales de los 7 álbumes
├── routes/
│   └── albumes/
│       ├── getAll.js         # GET /albumes
│       ├── getBySlug.js      # GET /album/:slug
│       ├── getByGenero.js    # GET /genero/:genero
│       ├── search.js         # GET /search/:text
│       ├── createAlbum.js    # POST /albumes
│       ├── updateAlbum.js    # PUT /album/:slug
│       └── deleteAlbum.js    # DELETE /album/:slug
├── .env                # Variables de entorno (no subir a GitHub)
├── .gitignore
├── index.js            # Punto de entrada del servidor
├── package.json
├── README.md
└── REFERENCIAS.md
```

---

## Rutas disponibles

| Método   | Ruta              | Descripción                                       | Código HTTP     |
|----------|-------------------|---------------------------------------------------|-----------------|
| GET      | `/`               | Información del API                               | 200             |
| GET      | `/albumes`        | Lista de slugs de todos los álbumes               | 200             |
| GET      | `/album/:slug`    | Detalle completo de un álbum                      | 200 / 404       |
| GET      | `/genero/:genero` | Slugs de álbumes de un género específico          | 200             |
| GET      | `/search/:text`   | Búsqueda por título, artista o descripción        | 200             |
| POST     | `/albumes`        | Crear un nuevo álbum                              | 201 / 400 / 409 |
| PUT      | `/album/:slug`    | Actualizar un álbum existente                     | 200 / 400 / 404 |
| DELETE   | `/album/:slug`    | Eliminar un álbum                                 | 204 / 404       |
| GET      | `/imagenes/*`     | Servir imágenes estáticas                         | 200             |

---

## Estructura del álbum

```json
{
  "titulo": "Thriller",
  "artista": "Michael Jackson",
  "genero": "Pop",
  "anio": 1982,
  "sello": "Epic",
  "pistas": 9,
  "imagen": "thriller.avif",
  "slug": "thriller",
  "resumen": "El álbum más vendido de la historia.",
  "descripcion": "Álbum de Michael Jackson que redefinió la música pop de los años 80."
}
```

---

## Códigos de respuesta HTTP

| Código | Significado    | Cuándo ocurre                                       |
|--------|----------------|-----------------------------------------------------|
| 200    | OK             | Lectura exitosa o actualización (PUT) exitosa       |
| 201    | Created        | POST creó un recurso. Incluye cabecera `Location`   |
| 204    | No Content     | DELETE exitoso. Sin cuerpo en la respuesta          |
| 400    | Bad Request    | La validación Zod del cuerpo falló                  |
| 404    | Not Found      | El recurso a leer, actualizar o eliminar no existe  |
| 409    | Conflict       | POST intenta crear un álbum cuyo slug ya existe     |

---

## Ejemplos de uso

### Obtener todos los álbumes
```bash
curl http://localhost:3000/albumes
```

### Obtener álbum por slug
```bash
curl http://localhost:3000/album/thriller
```

### Álbumes por género
```bash
curl http://localhost:3000/genero/Pop
```

### Buscar álbumes
```bash
curl http://localhost:3000/search/jackson
```

### Crear un álbum
```bash
curl -X POST http://localhost:3000/albumes \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Nuevo Álbum",
    "artista": "Artista",
    "genero": "Pop",
    "anio": 2024,
    "sello": "Universal",
    "pistas": 10,
    "imagen": "nuevo.avif",
    "slug": "nuevo-album",
    "resumen": "Resumen breve.",
    "descripcion": "Descripción completa del álbum."
  }'
```

### Actualizar un álbum
```bash
curl -X PUT http://localhost:3000/album/thriller \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Thriller (Edición Especial)",
    "artista": "Michael Jackson",
    "genero": "Pop",
    "anio": 1982,
    "sello": "Epic",
    "pistas": 9,
    "imagen": "thriller.avif",
    "slug": "thriller",
    "resumen": "El álbum más vendido de la historia.",
    "descripcion": "Edición especial con remixes y temas inéditos."
  }'
```

### Eliminar un álbum
```bash
curl -X DELETE http://localhost:3000/album/thriller
```