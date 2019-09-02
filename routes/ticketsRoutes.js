'use sstrict';
var express = require('express');
var ticketController = require('../controllers/ticketsController');
var api = express.Router();

api.post('/Save-Ticket', ticketController.saveTicket);
api.put('/Update-Ticket/:id', ticketController.updateTicket);
api.put('/Update-Confim/:id', ticketController.updateTicketConfirm);
api.put('/Update-Process/:id', ticketController.updateTicketProcess);
api.put('/Update-finish/:id',ticketController.updateTicketEnd);
api.put('/Delete-ticket/:id', ticketController.deleteTicket);
api.get('/List-Tickets', ticketController.listTicket);
api.get('/Buscar-Ticket/:id', ticketController.buscarTicket);
api.post('/Assigned-Ticket', ticketController.TicketAsiganado);

module.exports = api;