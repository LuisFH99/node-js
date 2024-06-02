const fs = require('node:fs/promises');
// IIFE -> inmediatly Invoked Function Expression
(async () => {
  console.log('Leyendo el primer archivo...');

  const text = await fs.readFile('./archivo.txt', 'utf-8');
  console.log('primer texto: ', text);

  console.log('---> Hacer cosas mientras lee el archivo');

  console.log('Leyendo el segundo archivo...');
  const secontText = await fs.readFile('./archivo2.txt', 'utf-8');
  console.log('Segundo texto: ', secontText);
})();
// esto es lo mismo que:

/* async function init() {
  console.log("Leyendo el primer archivo...");

  const text = await fs.readFile("./archivo.txt", "utf-8");
  console.log("primer texto: ", text);

  console.log("---> Hacer cosas mientras lee el archivo");

  console.log("Leyendo el segundo archivo...");
  const secontText = await fs.readFile("./archivo2.txt", "utf-8");
  console.log("Segundo texto: ", secontText);
}
init() */
