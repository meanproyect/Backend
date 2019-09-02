'use sstrict';
var express = require('express');
var supportController = require('../controllers/SupportController');
var api = express.Router();

api.post('/save-Support', supportController.saveSupport);
api.put('/update-Support/:id', supportController.updateSupport);
api.put('/update-Support-Datos/:id', supportController.updateDatos);
api.put('/delete-Support/:id',supportController.deleteSupport);
api.get('/list-Support', supportController.listSupport);
api.get('/buscar-Support/:id', supportController.buscandoSupport);

module.exports = api;