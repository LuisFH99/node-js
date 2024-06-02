const fs = require('node:fs');

console.log('Leyendo el primer archivo...');
// const text = fs.readFileSync('./archivo.txt', 'utf-8'); //Forma Sincrona

fs.readFile('./archivo.txt', 'utf-8', (err, text) => { // <- despues de haber terminado de leer ejecutas este callback
  if (err) {
    console.log('se tuvo un error: ', err);
    return;
  }
  console.log('primer texto: ', text);
}); // Forma asincrona

console.log('---> Hacer cosas mientras lee el archivo');

console.log('Leyendo el segundo archivo...');
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  if (err) {
    console.log('se tuvo un error: ', err);
    return;
  }
  console.log('Segundo texto: ', text);
}); // Forma Asincrona
