const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 35
    },
    password:{
        type: String,
        required: true,
        minlength:5,
        maxlength: 100
    },
    isAdmin:{
        type: Boolean,
        required: true
    }
})

const Admins = mongoose.model('admins', adminSchema);

module.exports = Admins;
