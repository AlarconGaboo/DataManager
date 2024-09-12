// funciones/leerArchivo.js
const fs = require('fs/promises');

const leerArchivo = async (filePath) => {
  try {
    // Verifica si el archivo existe antes de leerlo
    await fs.access(filePath);
    const datos = await fs.readFile(filePath, 'utf-8');
    if (datos.length === 0) {
      console.log("El archivo se encuentra vacío");
    } else {
      console.log(JSON.parse(datos));
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log("El archivo no existe. Creando el archivo...");
      await fs.writeFile(filePath, '{}'); // Crea el archivo con un objeto vacío
      console.log("Archivo creado. El archivo está vacío.");
    } else {
      console.log("Lo sentimos, ha ocurrido un error al leer el archivo");
      console.error(error);
    }
  }
};

module.exports = leerArchivo;

