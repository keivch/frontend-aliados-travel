# frontend-aliados-travel

Prueba de frontend de Aliados Travel. Para descargarlo y levantarlo,


## Clonar el proyecto

```sh
git clone https://github.com/keivch/frontend-aliados-travel.git
cd frontend-aliados-travel
```

## Levantar sin Docker

Necesitas tener instalado Node.js y pnpm. Desde la carpeta del proyecto, instalas
las dependencias y levanta el servidor de desarrollo:

```sh
pnpm install
pnpm dev
```

Abrir en el navegador la dirección que aparece en la consola, normalmente
`http://localhost:5173`.

## Levantar con Docker

Necesitas tener Docker Desktop instalado y abierto. Construyo la imagen y luego
levanto el contenedor:

```powershell
docker build `
  --build-arg VITE_API_URL="http://localhost:5000/api" `
  --build-arg VITE_API_BOOKS_URL="https://openlibrary.org" `
  -t aliados-travel .

docker run --rm -p 8080:80 aliados-travel
```

Después abrir `http://localhost:8080`.
