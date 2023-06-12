const jot = require("jsonwebtoken");



const rc = require("../helpers/redis");




const authen = async (request, response, next) => {




    try {



        const token = request.headers?.authorization?.split(" ")[1];




        
        if (!token) return response.status(401).send("Please login again");



        const itv = await jot.verify(token, process.env.JWT_SECRET);



        if (!itv) return response.send("Authentication failed, Please login again");




        const itb = await rc.get(token);




        if (itb) return response.send("Unauthorized");



        request.body.userId = itv.userId;


        request.body.pc = itv.pc;



      
        next()



    } 
    
    
    catch (errors) {



        response.send(errors.message);



    }


};




module.exports = { authen };