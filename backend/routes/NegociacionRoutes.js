const express = require('express');
const { registrarNegociacion, obtenerNegociaciones, obtenerDataNegociaciones, actualizarNegociacion, eliminarNegociacion } = require('../controllers/NegociacionControllers');
const router = express.Router();

//Agregar negociación
router.post('/agregarNegociacion', registrarNegociacion)

// Obtener todas las negociaciones
router.get('/obtenerNegociaciones', obtenerNegociaciones);

// Obtener data de las negociaciones
router.get('/obtenerdatanegociacion/:id', obtenerDataNegociaciones);

//Actualizar negociación
router.put('/actualizarNegociacion/:id', actualizarNegociacion);

//Eliminar negociación
router.delete('/eliminarnegociacion/:id', eliminarNegociacion);

module.exports = router;