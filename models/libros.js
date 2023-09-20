const fs = require('fs').promises;

const FILE_PATH = `${process.env.RUTA_MODELOS}/libros.json`;

async function contenidoArchivo() {
    const contenidoArchivo = await fs.readFile(FILE_PATH, 'utf8');
    return JSON.parse(contenidoArchivo);
}

async function reescribirArchivo(contenido) {
    return !!fs.writeFile(FILE_PATH, JSON.stringify(contenido, null, 4), 'utf8');
}

async function obtenerLibro(id) {
    const libros = await contenidoArchivo();
    return libros[id];
}

async function Listarlibros() {
    const libros = await contenidoArchivo();
    return Object.keys(libros)
        .map(idlibro => ({ ...libros[idlibro] }));
}

async function agregarLibros(libro) {
    let libros = await contenidoArchivo();
    libros[libro.id] = libro;
    return await reescribirArchivo(libros);
}

async function actualizarLibros(libro) {
    const libros = await contenidoArchivo();
    if (libros[libro.id]) {
        Object.assign(libros[libro.id], libro);
        return await reescribirArchivo(libros);
    }
    return;
}

async function eliminarLibros(id) {
    const libros = await contenidoArchivo();
    if (libros[id]) {
        delete libros[id];
        return await reescribirArchivo(libros);
    }
}

module.exports = {
    obtenerLibro,
    Listarlibros,
    agregarLibros,
    actualizarLibros,
    eliminarLibros
}
