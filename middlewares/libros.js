const uuid = require('uuid');
const libros = require('../models/libros')

// listado de libros
async function listalibros(req, res, next) {
    try {
        const data = await libros.Listarlibros();
        console.log(data);
        res.render('libros', { data });
    } catch (error) {
        next(error);
    }
}


async function formulariolibros(req, res, next) {
    const id = req.params.id;
    const libro = id ? await libros.obtenerLibro(id) : null;
    if (id && !libro) {
        return next(createError(404));
    }
    return res.render('libros-form', { libro });
}

// agregar
async function agregaLibro(req, res, next) {
    try {
        let libro = req.body;
        libro.id = uuid.v4();
        await libros.agregarLibros(libro);
    } catch (error) {
        next(error);
    }
    res.redirect('/libros');
}

// actualizar
async function actualizaLibro(req, res, next) {
    try {
        let libro = req.body;
        await libros.actualizarLibros(libro);
    } catch (error) {
        next(error);
    }
    res.redirect('/libros');
}

// eliminar
async function eliminaLibro(req, res, next) {
    try {
        await libros.eliminarLibros(req.body.libroId);
        res.redirect('/libros');
    } catch (error) {
        next(error);
    }
    next();
}

module.exports = {
    listalibros,
    formulariolibros,
    agregaLibro,
    actualizaLibro,
    eliminaLibro
};
