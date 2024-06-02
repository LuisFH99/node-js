/*
 process -> es un objeto global que proporciona informacion y control sobre el porceso actual en ejecucion
 tiene propiedades y metodos que nos permite interactuar con el entorno de ejecucion de node js e informacion
 relacionada con el proceso actual.
*/

// argunmentos de entrada
console.log(process.argv);

// controlar el proceso y su salida
// 0 -> todo ok y termina
// 1 -> se tuvo error y tiene que salir

// process.exit(1);

// control de eventos del proceso
process.on('exit', () => {
  // limpiar recursos
});

// obtener el current working directory -> desde que carpeta estamos ejecutando el codigo
console.log(process.cwd());

// variables de entorno

console.log(process.env.DATO);
