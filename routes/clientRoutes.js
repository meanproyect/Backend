'use strict';

var express = require('express');
var clientController = require('../controllers/clientController');
var api = express.Router();

api.post('/Save-Client', clientController.createClient);
api.put('/Update-Client/:id', clientController.updateClient);
api.put('/Delete-Client/:id', clientController.deleteClient);
api.get('/List-Clients', clientController.listClients);

module.exports = api;