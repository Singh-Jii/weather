const red = require("redis");



const ir = require("ioredis");





const rc = red.createClient();




rc.on("connect", async ()=>{


    console.log("Connected to redis");



});



rc.on("error",  (errors) =>{


    console.log(errors.message);


});




rc.connect();




module.exports = rc;