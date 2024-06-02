const path = require('node:path');
/*
    Es mala práctica definir rutas directamente en un string
    debido a que los path son diferentes segun los SO:
     unix -> /
     windows -> \
*/

// barra separadora de carpetas segun SO
console.log(path.sep);

// unir rutas con path join
const filePath = path.join('content', 'subfolder', 'test.txt'); // content/subfolder/test.txt
console.log(filePath);

const baseFile = path.basename('content/subfolder/archivo.txt');
console.log(baseFile);

const nameFile = path.basename('content/subfolder/archivo.txt', '.txt');
console.log(nameFile);

const extencionFile = path.extname('5.archivo.txt');
console.log(extencionFile);
