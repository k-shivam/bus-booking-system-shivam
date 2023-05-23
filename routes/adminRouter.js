const express = require('express');

const { adminLogin, adminSignUp, resetAll } = require('../controllers/adminController');
const {auth, adminCheck} = require('../middlewares/adminMiddlewares');

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.post('/signup', adminSignUp);
adminRouter.post('/reset', [auth, adminCheck], resetAll);

module.exports = adminRouter;
