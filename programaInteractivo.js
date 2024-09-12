const consultarAPI = require('./funciones/apiRequest');
const validarOpcionesEntrada = require('./funciones/validarOpcionesEntrada');

const argumentosEntrada = process.argv.slice(2);
const opcion = argumentosEntrada[0];
const propiedad = argumentosEntrada[1];
const valor = argumentosEntrada[2];

const opcionesAPI = ['comments', 'photos', 'albums', 'todos', 'posts'];

if (opcionesAPI.includes(opcion)) {
  // Consulta y guarda los datos de la API.
  consultarAPI(opcion);
} else {
  validarOpcionesEntrada(opcion, propiedad, valor);
}
