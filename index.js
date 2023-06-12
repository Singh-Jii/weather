const exp = require("express");


const con = require("./config/db");


const { ur } = require("./routes/user.route");


const cr = require("./routes/city.route");


const rc = require("./helpers/redis");



const logger = require("./middlewares/logger");



require("dotenv").config()



const my_port = process.env.my_port || 8000;


const application = exp();


application.use(exp.json());


application.get("/", async(request,response)=>{


  response.send(await rc.get("name"));


})

application.use("/api/user",ur)



application.use("/api/weather",cr);




application.listen(my_port, async ()=>{


      try{


       await con();


       console.log("connected to db")


       logger.log("info","Database connected")


      } 
      
      catch(errors) {


        console.log(errors.message)


        logger.log("errors","Database connection fail")


      }


console.log("server is running",my_port)



})


