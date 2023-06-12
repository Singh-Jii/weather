const mongo = require("mongoose");



const us = mongo.Schema({


    name: {

        type:String,
        
        required: true
    
    },


    email : {
        
        type: String,
        
        required: true,
        
        unique: true
    
    },


    password: {
        
        type: String,
        
        required: true
    
    },


    pc : {
        
        
        type:String, 
        
        required:true
    
    }



})




const client = mongo.model("client",us);




module.exports = client;

