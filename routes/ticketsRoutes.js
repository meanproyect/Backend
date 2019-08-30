'use sstrict';
var express = require('express');
var ticketController = require('../controllers/ticketsController');
var api = express.Router();

api.post('/Save-Ticket', ticketController.saveTicket);
api.put('/Update-Ticket/:id', ticketController.updateTicket);
api.put('/Delete-ticket/:id', ticketController.deleteTicket);
api.get('/List-Tickets', ticketController.listTicket);
api.get('/Buscar-Ticket/:id', ticketController.buscarTicket)

module.exports = api;