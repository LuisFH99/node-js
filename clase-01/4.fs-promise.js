// Esto solo en modulos nativos que no tienen promesas nativas
// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)
// readFilePrimise('file').then(text =>{});

const fs = require('node:fs/promises');

console.log('Leyendo el primer archivo...');

fs.readFile('./archivo.txt', 'utf-8').then((text) => {
  console.log('primer texto: ', text);
}); // Forma asincrona usando promesas

console.log('---> Hacer cosas mientras lee el archivo');

console.log('Leyendo el segundo archivo...');
fs.readFile('./archivo2.txt', 'utf-8').then((text) => {
  console.log('Segundo texto: ', text);
}); // Forma asincrona usando promesas
