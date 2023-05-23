const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../logger');
const { SECRET } = require('../settings');

const Admins = require('../models/admin');
const Tickets = require('../models/admin');

const adminLogin = async(req, res) =>{
    try{
        const {email="", password} = req.body || {}
        const admin = await Admins.findOne({
            email
        });
        if(!admin){
            return res.status(404).send("Invalid Email!")
        }

        const passwordVerify = await bcrypt.compare(password, admin.password);
        if(!passwordVerify){
            return res.status(404).send("Incorrect Password")
        }

        const token = jwt.sign({
            _id: admin._id,
            isAdmin: admin.isAdmin
        },SECRET)

        return res.header('x-auth-header', token).status(200).json({
            "message":"Login Successful!"
        })
    }catch(err){
        logger.error("ERROR:: ", err);
    }
}

const adminSignUp = async (req, res) =>{
    try{
        const {email, password, isAdmin} = req.body || {};

        let admin = await Admins.findOne({
            email
        });
        if(admin){
            return res.status(400).send("Admin already exists");
        }

        admin = new Admins({
            email,
            password,
            isAdmin
        })

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
        const data = await admin.save();

        const token = jwt.sign({
            _id: data._id,
            isAdmin: data.isAdmin
        }, SECRET)

        return res.status(200).json({
            message:"Signup Successfull",
            token
        });
    }catch(err){
        logger.error("ERROR:: ", err)
        return res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

const resetAll = async(req, res) =>{
    try{
        await Tickets.updateMany({},{
            $set:{
                isBooked:false
            }
        });
        return res.status(200).json({
            message:"Successfully Reset all seats!"
        })
    }catch(err){
        logger.error("ERROR:: ", err)
        return res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

module.exports ={
    adminLogin,
    adminSignUp,
    resetAll
}
