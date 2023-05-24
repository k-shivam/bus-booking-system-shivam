const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    isBooked:{
        type: Boolean,
        default: false
    },
    seatId:{
        type: Number,
        min: 1,
        max: 40,
        required: true
    },
    passengerId:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

const Tickets = mongoose.model("tickets", ticketSchema);

module.exports = Tickets;
