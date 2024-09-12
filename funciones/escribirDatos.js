const fs = require('fs/promises');

const escribirDatos = async (filePath, datos) => {
  try {
    try {
      await fs.access(filePath);
      const datosExistentes = await fs.readFile(filePath, 'utf-8');
      if (datosExistentes.length > 0) {
        console.log(`Los datos ya están guardados en ${filePath}.`);
        return; // Salir si el archivo ya tiene datos
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`El archivo ${filePath} no existe. Se creará uno nuevo.`);
      } else {
        throw error;
      }
    }

    // Escribe los datos en el archivo
    await fs.writeFile(filePath, JSON.stringify(datos, null, 2));
    console.log(`Los datos han sido guardados exitosamente en ${filePath}`);
  } catch (error) {
    console.log('Lo sentimos, ha ocurrido un error al escribir los datos');
    console.error(error);
  }
};

module.exports = escribirDatos;
