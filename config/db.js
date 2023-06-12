const mongo = require("mongoose");




require("dotenv").config()




const con = ()=> mongo.connect(process.env.MONGO_URI);




module.exports = con;