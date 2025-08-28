# Servidor de Búsqueda de Superhéroes

Este proyecto es un servidor básico de Node.js que utiliza Express para proporcionar un endpoint de búsqueda de personajes de superhéroes utilizando la API de Superhero.

## Requisitos

- Node.js v18 o superior
- npm (incluido con Node.js)

## Instalación

1. Clona este repositorio o descarga los archivos.
2. Navega al directorio del servidor:
   ```bash
   cd /Users/elianarivarola/Documents/nodetest/server
   ```
3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

## Ejecución

1. Asegúrate de estar en el directorio del servidor:
   ```bash
   cd /Users/elianarivarola/Documents/nodetest/server
   ```
2. Inicia el servidor:
   ```bash
   node index.js
   ```
3. El servidor estará escuchando en el puerto 3000.

## Uso

Puedes probar el endpoint de búsqueda utilizando Postman o tu navegador web:

- **URL**: `http://localhost:3000/search?q=nombre_del_personaje`

Reemplaza `nombre_del_personaje` con el nombre del personaje que deseas buscar.

## Notas

- Asegúrate de que el archivo `index.js` esté presente en el directorio del servidor.
- Si encuentras algún problema, verifica que todas las dependencias estén correctamente instaladas y que el servidor esté ejecutándose en el puerto correcto.
