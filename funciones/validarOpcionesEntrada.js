const leerArchivo = require('./leerArchivo');
const escribirDatos = require('./escribirDatos');
const eliminaPropiedad = require('./eliminaPropiedad');
const verificaParametrosEntrada = require('./verificaParametrosEntrada');

const validarOpcionesEntrada = (opcion, propiedad, valor) => {
  const filePath = 'datos.txt'; // Archivo de datos local
  switch (opcion) {
    case 'leer':
      leerArchivo(filePath);
      break;
    case 'agregar':
      if (propiedad && valor) {
        escribirDatos(filePath, { [propiedad]: valor });
      } else {
        console.log("Para agregar datos, debes proporcionar una propiedad y un valor.");
        verificaParametrosEntrada();
      }
      break;
    case 'eliminar':
      if (propiedad) {
        eliminaPropiedad(filePath, propiedad);
      } else {
        console.log("Para eliminar datos, debes proporcionar una propiedad.");
        verificaParametrosEntrada();
      }
      break;
    default:
      verificaParametrosEntrada();
  }
};

module.exports = validarOpcionesEntrada;
