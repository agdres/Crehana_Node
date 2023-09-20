const express = require('express');
const router = express.Router();
const {
  listalibros,
  formulariolibros,
  agregaLibro,
  actualizaLibro,
  eliminaLibro
} = require('../middlewares/libros')

router.get('/', listalibros);

router.post('/agregar', agregaLibro);

router.post('/actualizar', actualizaLibro);

router.post('/eliminar', eliminaLibro);

router.get('/nueva', formulariolibros);

router.get('/:id', formulariolibros);

module.exports = router;
