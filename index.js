const { Pool } = require("pg");

//Las credenciales se cambian de acuerdo al usuario que tengas en postgres sql en user y password
const config = {
  user: "postgres",
  host: "localhost",
  password: "xxxxxx",
  database: "always_music",
};

const pool = new Pool(config);

const argumentos = process.argv.slice(2);

const funcion = argumentos[0];
const nombre = argumentos[1];
const rut = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];

//Función que retorna los datos de todos los estudiantes
const consultaEstudiantes = async () => {
  const res = await pool.query("SELECT * FROM estudiantes");
  console.log("Registro actual de estudiantes", res.rows);
}

//Función que retorna los datos de un estudiante según su rut (id)
const consultaRutEstudiante = async ({ rut }) => {
  const res = await pool.query(
    `SELECT * FROM estudiantes WHERE rut='${rut}'`
  );
  console.log(res.rows);
}

//Función para crear un nuevo estudiante en la BD
const nuevoEstudiante = async ({ nombre, rut, curso, nivel }) => {
  await pool.query(
    `INSERT INTO estudiantes values ('${nombre}','${rut}', '${curso}', '${nivel}')`
  );
  console.log(`Estudiante ${nombre} agregado con éxito`);
}

//Función para editar los datos de un estudiante en la BD
const editarEstudiante = async ({ nombre, rut, curso, nivel }) => {
  await pool.query(
    `UPDATE estudiantes SET nombre='${nombre}', rut='${rut}', curso='${curso}', nivel='${nivel}' WHERE rut = '${rut}'`
  );
  console.log(`Estudiante ${nombre} editado con éxito`);
}

//Función para eliminar a un/a estudiante de la BD
const eliminarEstudiante = async ({ rut }) => {
  await pool.query(`DELETE FROM estudiantes WHERE rut = '${rut}'`);
  console.log(`Registro de estudiante con rut ${rut} eliminado`);
}

const funciones = {
  nuevoEstudiante: nuevoEstudiante,
  consultaEstudiantes: consultaEstudiantes,
  consultaRutEstudiante: consultaRutEstudiante,
  editarEstudiante: editarEstudiante,
  eliminarEstudiante: eliminarEstudiante
};


const arreglo = Object.keys(funciones);

//Ejecución de funciones solicitadas
(async () => {
  if (funcion == "nuevo") {
    nuevoEstudiante({
      nombre,
      rut,
      curso,
      nivel,
    });
  } else if (funcion == "consulta") {
    consultaEstudiantes();
  } else if (funcion == "consultarut") {
    const rut = nombre; 
    consultaRutEstudiante({ rut });
  } else if (funcion == "editar") {
    editarEstudiante({ nombre, rut, curso, nivel });
  } else if (funcion == "eliminar") {
    const rut = nombre; 
    eliminarEstudiante({ rut });
  }
})();

//Ejemplos para aplicar
//node index.js nuevo 'Violeta Parr' '18564159-K' guitarra 6
//node index.js consulta
//node index.js editar 'Violeta Parr' '18564159-K' guitarra 7
//node index.js consultarut '18564159-K'
//node index.js eliminar '18564159-K'
//node index.js nuevo 'Luka Couffaine' '21356835-8' guitarra 10