require('dotenv').config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const HASHNUM = process.env.HASHNUM;
const MONGO_URI = process.env.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV


module.exports = {
    PORT,
    SECRET,
    HASHNUM,
    MONGO_URI,
    NODE_ENV
}