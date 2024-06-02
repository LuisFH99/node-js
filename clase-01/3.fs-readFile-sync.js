const fs = require('node:fs');

console.log('Leyendo el primer archivo...');
const text = fs.readFileSync('./archivo.txt', 'utf-8');
console.log('primer texto: ', text);

console.log('---> Hacer cosas mientras lee el archivo');

console.log('Leyendo el segundo archivo...');
const secontText = fs.readFileSync('./archivo2.txt', 'utf-8');
console.log('Segundo texto: ', secontText);
