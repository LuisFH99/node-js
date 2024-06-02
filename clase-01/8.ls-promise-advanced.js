const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');

const folder = process.argv[2] ?? '.';

function permisionsFile (mode) {
  let result = '';
  const permisions = (mode & 0o777).toString(8).split('');
  permisions.forEach(permision => {
    result += permision & 0o4 ? 'r' : '-';
    result += permision & 0o2 ? 'w' : '-';
    result += permision & 0o1 ? 'x' : '-';
  });

  return result;
}

async function ls (folder) {
  let files;

  try {
    files = await fs.readdir(folder);
  } catch {
    console.error(pc.red(`No se puedo leer el directorio ${folder}`));
    process.exit(1);
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let stats;

    try {
      stats = await fs.stat(filePath); // captura la información del archivo.
    } catch {
      console.error(pc.red(`No se pudo leer el archivo ${filePath}`));
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? 'd' : 'f';
    const fileSize = stats.size.toString().concat('M');
    const fileModified = stats.mtime.toLocaleDateString();
    const permisionFile = permisionsFile(stats.mode);

    return `${fileType}${permisionFile.padEnd(12)} ${pc.blue(file.padEnd(30))} ${pc.green(fileSize.padStart(15))} ${pc.cyan(fileModified.padStart(12))}`;
  });

  const filesInfo = await Promise.all(filesPromises);

  filesInfo.forEach((fileInfo) => console.log(fileInfo));
}
ls(folder);

/*
fs.readdir(directorio)
  .then((files) => {
    files.forEach((file) => {
      console.log(file);
    });
  })
  .catch((err) => {
    if (err) {
      console.log("Error al leer el directorio: ", err);
      return;
    }
  });
*/
