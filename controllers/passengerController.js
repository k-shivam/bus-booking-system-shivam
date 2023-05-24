const Tickets = require('../models/ticket');
const Passengers = require('../models/passenger');
const logger = require('../logger');

const getUserDetails = async(req, res) =>{
    try{
        const { ticketId} = req.params;
        if(!ticketId){
            return res.status(400).send({
                message: "Ticket Id is missing"
            })
        }

        const ticketData = await Tickets.findById(ticketId);
        if(!ticketData){
            return res.status(404).send({
                message: "Ticket doesn't Exists"
            })
        }
        const passengerId = ticketData.passengerId
        const passengerData = await Passengers.findById(passengerId);
        if(passengerData){
            return res.status(200).send(passengerData);
        }
        return res.status(404).send({
            message: "Passenger data not found"
        })
    }catch(err){
        logger.error("ERROR:: ", err);
        return res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

module.exports ={
    getUserDetails
}
