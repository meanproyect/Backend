'use strict';

var express = require('express');
var AdministratorController = require('../controllers/AdministratorController');
var api = express.Router();

api.post('/save-user', AdministratorController.saveuser);
api.put('/update-user/:id', AdministratorController.updateuser);
api.put('/Update-User-datos/:id', AdministratorController.updateDatos);
api.put('/delete-user/:id', AdministratorController.deleteUser);
api.get('/list-user', AdministratorController.listUser);
api.get('/Buscar-user/:id', AdministratorController.buscandoUser);

module.exports = api;