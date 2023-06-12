
const client = require("../models/user.model");



const bc = require("bcrypt");


const jot = require("jsonwebtoken");


const rc = require("../helpers/redis");





const signup =  async (request,response) =>{



    try{



        const {name,email,password,pc} = request.body;


        
        const iup = await client.findOne({email});


         if(iup) return response.send("User already Present, login please");


         
         const hash = await bc.hash(password,8);



         const nu = new client({name,email, password: hash, pc});



         await nu.save();



         response.send("Signup Successful")



    }
    
    
    catch(errors) {
          


        response.send(errors.message);


    }



}



const login = async (request,response)=> {



    try {
         


        const {email, password} = request.body;



        const iup  = await client.findOne({email});



        if(!iup) return response.send("client not present, Register please");



        const ipc = await bc.compare(password,iup.password);


        if(!ipc) return response.send("Invalid Credentials");



        const token = await jot.sign({userId:iup._id,pc:iup.pc},process.env.JWT_SECRET, {expiresIn:"1hr"})



        response.send({message: "Login Success", token});


    } 


    catch(errors) {


        response.send(errors.message)


    }

}



const logout = async (request,response) =>{



    try{



        const token = request.headers?.authorization?.split(" ")[1];



        if(!token) return response.status(403);

        await rc.set(token,token);



        response.send("logout successful");


    }


    catch(errors) {


        response.send(errors.message)



    }


}




module.exports = {login,logout,signup}