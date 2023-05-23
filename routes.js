const express = require('express');

const router = express.Router();

const adminRouter = require('./routes/adminRouter');
const passengerRouter = require('./routes/passengerRouter');
const ticketRouter = require('./routes/ticketRouter');

router.use('/admin', adminRouter);
router.use('/passenger', passengerRouter);
router.use('/ticket', ticketRouter);

module.exports = router;