const Tickets = require('../models/ticket');
const Passengers = require('../models/passenger');
const logger = require('../logger');

const createTicket = async (req, res) =>{
    const {seatId, passenger} = req.body || {};
    const {name, email, sex, age} = passenger || {};
    try{
        if(parseInt(seatId) > 40 || parseInt(seatId) < 1){
            return res.status(400).send(
                {message:"Invalid SeatID. Seat no starts from 1 to till 40 only!"}
            )
        }
        let exists = await Tickets.findOne({
            isBooked: true,
            seatId: seatId
        });
        if(exists){
            return res.status(400).send({
                message:"The seat you are looking for is already booked"
            })
        }
        const passenger = new Passengers({
            name,
            email,
            age,
            sex
        })
        const passengerData = await passenger.save();
        if(passengerData){
            const ticket = new Tickets({
                seatId,
                isBooked:true,
                passenger:{
                    passengerName: name,
                    email,
                    passengerId: passengerData._id
                }
            })
            const ticketData = await ticket.save();
            if(ticketData){
                return res.status(201).send(ticketData);
            }
        }
    }catch(err){
        logger.error("Error:: ", err)
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

const viewOpenTickets = async (req, res) =>{
    try{
        const data = await Tickets.find({
            isBooked: false
        });
        return res.status(200).send(data)
    }catch(err){
        logger.error("ERROR:: ", err)
        return res.status(500).send({message:"Internal server error"});
    }
}

const viewClosedTickets = async (req, res) =>{
    try{
        const data = await Tickets.find({
            isBooked: true
        });
        return res.status(200).send(data)
    }catch(err){
        logger.error("ERROR:: ", err)
        return res.status(500).send({message:"Internal server error"});
    }
}

const getTicketStatus = async (req, res) =>{
    try{
        const {ticketId} = req.params;
        const ticketData = await Tickets.findById(ticketId);
        if(ticketData){
            return res.status(200).json({
                isBooked: ticketData.isBooked
            })
        }else{
            return res.status(404).json({
                message:"Ticket ID is incorrect"
            })
        }
    }catch(err){
        logger.error("ERROR:: ", err);
        return res.status(500).send({
            message:"Internal server error"
        })
    }
}

const updateTicketStatus = async(req, res) =>{
    try{
        const {ticketId} = req.params;
        const {isBooked, passenger} = req.body;
        const {name, email} = passenger;

        const ticketData = await Tickets.findByIdAndUpdate(ticketId,{
            $set:{
                isBooked
            }
        })
        if(!ticketData){
            return res.status(404).send({
                message:"Ticket ID is incorrect"
            })
        }
        const passengerId = ticketData?.passenger?.passengerId;
        console.log(passengerId)
        await Passengers.findByIdAndUpdate(passengerId,{
            $set:passenger
        })
        return res.json({
            "message":"Successfully Updated Details!"
        })
    }catch(err){
        logger.error("ERROR:: ", err);
        return res.status(500).send({
            message:"Internal Server Error"
        })
    }
}


module.exports = {
    createTicket,
    viewOpenTickets,
    viewClosedTickets,
    getTicketStatus,
    updateTicketStatus
}
