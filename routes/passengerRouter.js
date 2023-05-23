const express = require('express');

const {getUserDetails } = require('../controllers/passengerController');

const passengerRouter = express.Router();

passengerRouter.get('/:ticketId', getUserDetails);

module.exports = passengerRouter;