const fs = require('fs/promises');
const fetch = require('node-fetch'); // Asegúrate de tener node-fetch instalado

const apiEndpoints = {
  comments: 'https://jsonplaceholder.typicode.com/comments',
  photos: 'https://jsonplaceholder.typicode.com/photos',
  albums: 'https://jsonplaceholder.typicode.com/albums',
  todos: 'https://jsonplaceholder.typicode.com/todos',
  posts: 'https://jsonplaceholder.typicode.com/posts',
};

const consultarAPI = async (endpoint) => {
  try {
    console.log(`Consultando la API para ${endpoint}...`); // Confirmación de la solicitud
    const response = await fetch(apiEndpoints[endpoint]);
    if (!response.ok) {
      throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
    }
    const data = await response.json();

    // Verifica si el archivo ya existe y si contiene datos
    const filePath = `./${endpoint}.txt`;
    try {
      await fs.access(filePath);
      const datosExistentes = await fs.readFile(filePath, 'utf-8');
      if (datosExistentes.length > 0) {
        console.log(`Los datos para ${endpoint} ya están guardados en ${filePath}.`);
        return; // Salir si el archivo ya tiene datos
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`El archivo ${filePath} no existe. Creando uno nuevo.`);
      } else {
        throw error;
      }
    }

    // Escribe los datos en el archivo
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`Datos guardados en ${filePath}`);
  } catch (error) {
    console.error(`Error al consultar la API: ${error}`);
  }
};

module.exports = consultarAPI;
