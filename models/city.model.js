const mongo = require("mongoose");



const uc = mongo.Schema({
    userId: {
        
        type: mongo.Schema.Types.ObjectId,
        
        ref:"user", 
        
        required: true
    
    },


    previousSearches: [{
            
            type:String,
            
            required:true
        
        }]


})




const ucl = mongo.model("cities", uc)

module.exports = ucl;