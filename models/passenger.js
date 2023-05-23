const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    sex:{
        type: String,
        required: true,
        maxlength:1
    },
    age:{
        type: Number,
        required: true,
        min: 18
    }
},{
    timestamps: true
})

const Passengers = mongoose.model('passengers', userSchema);

module.exports = Passengers;