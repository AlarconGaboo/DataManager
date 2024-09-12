const fs = require('fs/promises');

const eliminaPropiedad = async (filePath, propiedad) => {
  try {
    let objetoDatos = {};
    try {
      const datos = await fs.readFile(filePath, 'utf-8');
      if (datos.length > 0) {
        objetoDatos = JSON.parse(datos);
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log("El archivo no existe. No se puede eliminar ninguna propiedad.");
        return;
      } else {
        throw error;
      }
    }

    if (objetoDatos.hasOwnProperty(propiedad)) {
      delete objetoDatos[propiedad];
      await fs.writeFile(filePath, JSON.stringify(objetoDatos, null, 2));
      console.log("Los datos han sido eliminados exitosamente");
    } else {
      console.log("Esta propiedad no existe");
    }
  } catch (error) {
    console.log('Lo sentimos, ha ocurrido un error al eliminar la propiedad');
    console.error(error);
  }
};

module.exports = eliminaPropiedad;
