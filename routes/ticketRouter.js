const express = require('express');

const {
    createTicket, 
    viewOpenTickets, 
    viewClosedTickets, 
    getTicketStatus, 
    updateTicketStatus
} = require('../controllers/ticketController');

const ticketRouter = express.Router();

ticketRouter.post('/create', createTicket);
ticketRouter.get('/viewOpen', viewOpenTickets);
ticketRouter.get('/viewClosed', viewClosedTickets);
ticketRouter.get('/:ticketId', getTicketStatus);
ticketRouter.put('/:ticketId', updateTicketStatus);

module.exports = ticketRouter;